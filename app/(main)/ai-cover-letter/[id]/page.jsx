import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = params; // removed unnecessary await
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="container mx-auto py-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] min-h-screen">
      <div className="flex flex-col space-y-2 mb-6">
        <Link href="/ai-cover-letter">
          <Button variant="link" className="gap-2 pl-0 text-cyan-400 hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-6xl font-bold gradient-title text-white/90">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <CoverLetterPreview content={coverLetter?.content} />
    </div>
  );
}
