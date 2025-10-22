"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-green-400 to-emerald-500";
      case "medium":
        return "bg-gradient-to-r from-yellow-400 to-amber-500";
      case "low":
        return "bg-gradient-to-r from-rose-400 to-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-400" };
      case "neutral":
        return { icon: LineChart, color: "text-amber-400" };
      case "negative":
        return { icon: TrendingDown, color: "text-rose-400" };
      default:
        return { icon: LineChart, color: "text-slate-400" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <Badge
          variant="outline"
          className="px-4 py-2 text-sm border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
        >
          Last updated: {lastUpdatedDate}
        </Badge>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {[
          {
            title: "Market Outlook",
            value: insights.marketOutlook,
            icon: <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />,
            subtitle: `Next update ${nextUpdateDistance}`,
          },
          {
            title: "Industry Growth",
            value: `${insights.growthRate.toFixed(1)}%`,
            icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
            content: (
              <Progress
                value={insights.growthRate}
                className="mt-2 bg-slate-700"
              />
            ),
          },
          {
            title: "Demand Level",
            value: insights.demandLevel,
            icon: <BriefcaseIcon className="h-5 w-5 text-cyan-400" />,
            content: (
              <div
                className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                  insights.demandLevel
                )}`}
              />
            ),
          },
          {
            title: "Top Skills",
            icon: <Brain className="h-5 w-5 text-indigo-400" />,
            content: (
              <div className="flex flex-wrap gap-1 mt-2">
                {insights.topSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs font-medium bg-slate-800 text-slate-200 border-slate-700"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            ),
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-md border border-white/10 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-slate-200">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                {card.value && (
                  <div className="text-2xl font-bold text-white">
                    {card.value}
                  </div>
                )}
                {card.subtitle && (
                  <p className="text-xs text-slate-400 mt-1">
                    {card.subtitle}
                  </p>
                )}
                {card.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Salary Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border border-cyan-500/20 bg-gradient-to-br from-[#1E293B]/60 to-[#0F172A]/60 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Salary Ranges by Role
            </CardTitle>
            <CardDescription className="text-slate-400">
              Minimum, median, and maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload?.length) {
                        return (
                          <div className="bg-[#1E293B] border border-cyan-500/20 rounded-lg p-2 shadow-lg text-sm text-slate-200">
                            <p className="font-semibold text-cyan-400">
                              {label}
                            </p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-slate-400">
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill="#38BDF8" name="Min Salary (K)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="median" fill="#3B82F6" name="Median Salary (K)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="max" fill="#1E40AF" name="Max Salary (K)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Industry Trends and Recommended Skills */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="grid grid-cols-1 md:grid-cols-2 gap-4"
>
  <Card className="border border-cyan-500/20 bg-gradient-to-br from-[#1E293B]/60 to-[#0F172A]/60 backdrop-blur-md">
    <CardHeader>
      <CardTitle className="text-xl text-white">Key Industry Trends</CardTitle>
      <CardDescription className="text-slate-400">
        Current trends shaping the industry
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {insights.keyTrends.map((trend, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className="h-2 w-2 mt-2 rounded-full bg-cyan-400" />
            <span className="text-slate-300">{trend}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>

  <Card className="border border-cyan-500/20 bg-gradient-to-br from-[#1E293B]/60 to-[#0F172A]/60 backdrop-blur-md">
    <CardHeader>
      <CardTitle className="text-xl text-white">Recommended Skills</CardTitle>
      <CardDescription className="text-slate-400">
        Skills to consider developing
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {insights.recommendedSkills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="text-sm text-cyan-300 border-cyan-500/30 bg-cyan-500/10"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
</motion.div>

    </div>
  );
};

export default DashboardView;


// "use client";

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   BriefcaseIcon,
//   LineChart,
//   TrendingUp,
//   TrendingDown,
//   Brain,
// } from "lucide-react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";

// const DashboardView = ({ insights }) => {
//   // Transform salary data       for the chart
//   const salaryData = insights.salaryRanges.map((range) => ({
//     name: range.role,
//     min: range.min / 1000,
//     max: range.max / 1000,
//     median: range.median / 1000,
//   }));

//   const getDemandLevelColor = (level) => {
//     switch (level.toLowerCase()) {
//       case "high":
//         return "bg-green-500";
//       case "medium":
//         return "bg-yellow-500";
//       case "low":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const getMarketOutlookInfo = (outlook) => {
//     switch (outlook.toLowerCase()) {
//       case "positive":
//         return { icon: TrendingUp, color: "text-green-500" };
//       case "neutral":
//         return { icon: LineChart, color: "text-yellow-500" };
//       case "negative":
//         return { icon: TrendingDown, color: "text-red-500" };
//       default:
//         return { icon: LineChart, color: "text-gray-500" };
//     }
//   };

//   const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
//   const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

//   // Format dates using date-fns
//   const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
//   const nextUpdateDistance = formatDistanceToNow(
//     new Date(insights.nextUpdate),
//     { addSuffix: true }
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
//       </div>

//       {/* Market Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Market Outlook
//             </CardTitle>
//             <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{insights.marketOutlook}</div>
//             <p className="text-xs text-muted-foreground">
//               Next update {nextUpdateDistance}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Industry Growth
//             </CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {insights.growthRate.toFixed(1)}%
//             </div>
//             <Progress value={insights.growthRate} className="mt-2" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
//             <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{insights.demandLevel}</div>
//             <div
//               className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
//                 insights.demandLevel
//               )}`}
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
//             <Brain className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-1">
//               {insights.topSkills.map((skill) => (
//                 <Badge key={skill} variant="secondary">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Salary Ranges Chart */}
//       <Card className="col-span-4">
//         <CardHeader>
//           <CardTitle>Salary Ranges by Role</CardTitle>
//           <CardDescription>
//             Displaying minimum, median, and maximum salaries (in thousands)
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={salaryData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip
//                   content={({ active, payload, label }) => {
//                     if (active && payload && payload.length) {
//                       return (
//                         <div className="bg-background border rounded-lg p-2 shadow-md">
//                           <p className="font-medium">{label}</p>
//                           {payload.map((item) => (
//                             <p key={item.name} className="text-sm">
//                               {item.name}: ${item.value}K
//                             </p>
//                           ))}
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
//                 <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
//                 <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Industry Trends */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Key Industry Trends</CardTitle>
//             <CardDescription>
//               Current trends shaping the industry
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-4">
//               {insights.keyTrends.map((trend, index) => (
//                 <li key={index} className="flex items-start space-x-2">
//                   <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
//                   <span>{trend}</span>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recommended Skills</CardTitle>
//             <CardDescription>Skills to consider developing</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-2">
//               {insights.recommendedSkills.map((skill) => (
//                 <Badge key={skill} variant="outline">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardView;