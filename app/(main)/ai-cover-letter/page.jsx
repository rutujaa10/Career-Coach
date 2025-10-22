import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-slate-200 p-6">
      {/* Header */}
     <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between mb-6">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] via-[#3B82F6] to-[#1E40AF] drop-shadow-[0_2px_8px_rgba(30,64,175,0.5)]">
    My Cover Letters
  </h1>

  <Link href="/ai-cover-letter/new">
    <Button className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/40 transition-all duration-200">
      <Plus className="h-4 w-4 mr-2" />
      Create New
    </Button>
  </Link>
</div>


      {/* Cover Letter List */}
      <div className="space-y-4">
        <CoverLetterList
          coverLetters={coverLetters}
          cardClassName="bg-gradient-to-br from-white/5 to-white/2 text-slate-200 border border-slate-700 hover:border-cyan-400"
          titleClassName="text-white font-semibold text-xl"
          dateClassName="text-slate-400"
          statusClassName={{
            positive: "text-emerald-400",
            neutral: "text-amber-400",
            negative: "text-rose-400",
          }}
        />
      </div>
    </div>
  );
}
