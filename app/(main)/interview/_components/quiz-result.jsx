"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto space-y-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 rounded-lg text-white">
      {/* Header */}
      <h1 className="flex items-center gap-2 text-3xl font-bold text-blue-400">
        <Trophy className="h-6 w-6 text-amber-400" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress
            value={result.quizScore}
            className="w-full h-4 rounded-full bg-slate-700"
            style={{ "--progress-color": "#38BDF8" }} // Primary Sky Blue
          />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-[#1E293B]/50 p-4 rounded-lg border border-cyan-500/30">
            <p className="font-medium text-cyan-400">Improvement Tip:</p>
            <p className="text-slate-200">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-indigo-400">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-slate-700 rounded-lg p-4 space-y-2 bg-[#1E293B]/30"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-slate-200">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-slate-400">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-[#1E293B]/50 p-2 rounded border border-slate-700">
                <p className="font-medium text-cyan-400">Explanation:</p>
                <p className="text-slate-200">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
