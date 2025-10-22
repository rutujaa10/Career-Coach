"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Navigate to generated cover letter
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
        <CardHeader>
          <CardTitle className="text-blue-400">Job Details</CardTitle>
          <CardDescription className="text-slate-200">
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-cyan-400">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                  className="bg-slate-800 text-white placeholder:text-slate-400"
                />
                {errors.companyName && (
                  <p className="text-sm text-rose-400">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-cyan-400">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                  className="bg-slate-800 text-white placeholder:text-slate-400"
                />
                {errors.jobTitle && (
                  <p className="text-sm text-rose-400">{errors.jobTitle.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-cyan-400">
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-32 bg-slate-800 text-white placeholder:text-slate-400"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-rose-400">{errors.jobDescription.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={generating}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
