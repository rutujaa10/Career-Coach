"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <CardHeader>
        <CardTitle className="text-white text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-slate-200">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#E2E8F0", fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={{ stroke: "#334155" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#E2E8F0", fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={{ stroke: "#334155" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-[#1E293B]/90 border border-cyan-500/40 rounded-lg p-2 shadow-md">
                        <p className="text-blue-400 text-sm font-medium">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-slate-400 text-xs">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#38BDF8" // Primary Sky Blue for the line
                strokeWidth={2}
                dot={{ fill: "#3B82F6" }} // Median Blue for dots
                activeDot={{ fill: "#1E40AF", r: 6 }} // Max Blue for active
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
