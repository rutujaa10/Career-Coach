"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

let html2pdf;

if (typeof window !== "undefined") {
  import("html2pdf.js").then((mod) => {
    html2pdf = mod.default;
  });
}

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const { loading: isSaving, fn: saveResumeFn, data: saveResult, error: saveError } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent || initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved successfully!");
    if (saveError) toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(` ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(` ${contactInfo.mobile}`);
    if (contactInfo.linkedin) parts.push(` [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(` [Twitter](${contactInfo.twitter})`);

    return parts.length
      ? `## <div align="center">${user.fullName}</div>\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      const doc = iframe.contentDocument;

      doc.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; font-size:12pt; color:#000; background:#fff; padding:20px; line-height:1.5;">
          ${previewContent.replace(/\n/g, "<br/>")}
        </div>
      `;

      await html2pdf()
        .set({ filename: "resume.pdf", jsPDF: { unit: "mm", format: "a4" }, html2canvas: { scale: 2 } })
        .from(doc.body)
        .save();

      document.body.removeChild(iframe);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] min-h-screen rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#3B82F6] to-[#1E40AF] drop-shadow-lg">
          Resume Builder
        </h1>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-[#1E293B]/50 p-4 rounded-lg shadow-inner">
        <TabsList className="mb-4 border-b border-gray-600">
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#0F172A]/70 border border-gray-700 rounded-lg">
                {["email", "mobile", "linkedin", "twitter"].map((field) => (
                  <div key={field} className="flex flex-col space-y-1">
                    <label className="text-gray-200 font-medium capitalize">{field}</label>
                    <Input {...register(`contactInfo.${field}`)} type="text" placeholder={`Enter your ${field}`} className="bg-[#1E293B] text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" />
                    {errors.contactInfo?.[field] && (
                      <span className="text-red-500 text-sm">{errors.contactInfo[field]?.message}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                    Professional Summary
                  </h3>
                  <Textarea {...field} className="h-32 bg-[#1E293B] text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" placeholder="Write a compelling professional summary..." />
                  {errors.summary && <span className="text-red-500">{errors.summary.message}</span>}
                </div>
              )}
            />

            {/* Skills */}
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                    Skills
                  </h3>
                  <Textarea {...field} className="h-32 bg-[#1E293B] text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500" placeholder="List your key skills..." />
                  {errors.skills && <span className="text-red-500">{errors.skills.message}</span>}
                </div>
              )}
            />

            {/* Work Experience / Education / Projects */}
            {["experience", "education", "projects"].map((section) => (
              <Controller
                key={section}
                name={section}
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2 capitalize">
                      {section === "experience" ? "Work Experience" : section.charAt(0).toUpperCase() + section.slice(1)}
                    </h3>
                    <EntryForm type={section === "experience" ? "Experience" : section === "projects" ? "Project" : "Education"} entries={field.value} onChange={field.onChange} />
                    {errors[section] && <span className="text-red-500">{errors[section].message}</span>}
                  </div>
                )}
              />
            ))}
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <Button
            variant="link"
            className="mb-2"
            onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}
          >
            {resumeMode === "preview" ? (
              <>
                <Edit className="h-4 w-4 mr-1" />
                Edit Resume
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4 mr-1" />
                Show Preview
              </>
            )}
          </Button>

          {resumeMode !== "preview" && (
            <div className="flex items-center gap-2 p-2 mb-2 border-2 border-yellow-500 rounded text-yellow-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">You will lose edited markdown if you update the form data.</span>
            </div>
          )}

          <div className="border rounded-lg overflow-hidden shadow-lg">
            <MDEditor value={previewContent} onChange={setPreviewContent} height={800} preview={resumeMode} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}  