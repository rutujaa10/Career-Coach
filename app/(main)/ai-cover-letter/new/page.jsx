import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="container mx-auto py-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] min-h-screen">
      <div className="flex flex-col space-y-2 mb-6">
        <Link href="/ai-cover-letter">
          <Button
            variant="link"
            className="gap-2 pl-0 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-6xl font-bold gradient-title text-white/90">
            Create Cover Letter
          </h1>
          <p className="text-slate-300">
            Generate a tailored cover letter for your job application
          </p>
        </div>
      </div>

      <CoverLetterGenerator />
    </div>
  );
}
