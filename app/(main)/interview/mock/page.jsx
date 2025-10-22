import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 mx-2">
        <Link href="/interview">
          <Button variant="link" className="gap-2 pl-0 text-blue-400 hover:text-cyan-400">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div className="space-y-1">
          <h1 className="text-5xl md:text-6xl font-bold gradient-title text-white">
            Mock Interview
          </h1>
          <p className="text-slate-200">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      {/* Quiz Component */}
      <div className="mx-2">
        <Quiz />
      </div>
    </div>
  );
}
