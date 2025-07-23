"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/theme-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import appwriteService from "@/appwrite/config";
import { Models } from "appwrite";

interface SubjectHasGrade {
  subjects: {
    subject_name: string;
  };
}

interface Paper {
  download_count: number;
  subjectsHasGrades: SubjectHasGrade[];
}

interface ChartData {
  subject: string;
  downloads: number;
}

export default function PopularDownloadsChart() {
  const { isDark } = useTheme();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const axisColor = isDark ? "#ced4da" : "#9ca3af";
  const tickTextColor = isDark ? "#dee2e6" : "#374151";
  const tooltipBgColor = isDark ? "#343a40" : "#f9fafb";
  const tooltipBorderColor = isDark ? "#495057" : "#d1d5db";
  const tooltipTextColor = isDark ? "#f8f9fa" : "#111827";
  const tooltipLabelColor = isDark ? "#adb5bd" : "#6b7280";
  const barFillColor = isDark ? "#ADB5BD" : "#fb7185";

  useEffect(() => {
    const fetchDownloadStats = async () => {
      const res = await appwriteService.getPapers();

      const papers: Paper[] = res.documents.map((doc: any) => {
        const shgRaw = doc.subjectsHasGrades;

        const subjectsHasGrades = Array.isArray(shgRaw)
          ? shgRaw.map((shg: any) => ({
            subjects: {
              subject_name: shg?.subjects?.subject_name ?? "Unknown",
            },
          }))
          : shgRaw
            ? [
              {
                subjects: {
                  subject_name: shgRaw?.subjects?.subject_name ?? "Unknown",
                },
              },
            ]
            : [];

        return {
          download_count: doc.downloads ?? 0,
          subjectsHasGrades,
        };
      });



      const subjectMap: Record<string, number> = {};

      papers.forEach(paper => {
        paper.subjectsHasGrades.forEach(shg => {
          const subjectName = shg.subjects.subject_name;
          subjectMap[subjectName] = (subjectMap[subjectName] || 0) + paper.download_count;
        });
      });

      const sorted = Object.entries(subjectMap)
        .map(([subject, downloads]) => ({ subject, downloads }))
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 5);

      setChartData(sorted);
    };

    fetchDownloadStats();
  }, []);

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 mt-4">
      <h2 className="text-2xl 2xl:text-4xl text-gray-700 dark:text-white mb-2">
        Popular Downloads
      </h2>
      <p className="text-md lg:text-xl text-gray-500 dark:text-gray-300 mb-2">
        Top 5 subjects that downloaded papers in the last 30 days.
      </p>
      <div className="h-52 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap="20%"
          >
            <XAxis
              type="number"
              stroke={axisColor}
              tick={{ fill: tickTextColor }}
              axisLine={{ stroke: axisColor }}
              tickLine={{ stroke: axisColor }}
            />
            <YAxis
              dataKey="subject"
              type="category"
              stroke={axisColor}
              tick={{ fill: tickTextColor }}
              axisLine={{ stroke: axisColor }}
              tickLine={{ stroke: axisColor }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBgColor,
                borderColor: tooltipBorderColor,
                borderRadius: 8,
              }}
              itemStyle={{ color: tooltipTextColor }}
              labelStyle={{ color: tooltipLabelColor }}
            />
            <Bar dataKey="downloads" fill={barFillColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
