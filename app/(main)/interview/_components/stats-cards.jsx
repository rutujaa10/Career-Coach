import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-400">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{getAverageScore()}%</div>
          <p className="text-xs text-slate-200">Across all assessments</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-400">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{getTotalQuestions()}</div>
          <p className="text-xs text-slate-200">Total questions</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-400">Latest Score</CardTitle>
          <Target className="h-4 w-4 text-indigo-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-slate-200">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
