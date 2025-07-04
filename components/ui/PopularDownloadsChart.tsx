"use client";
import { useTheme } from "@/context/theme-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Physics", downloads: 200 },
  { subject: "Maths", downloads: 150 },
  { subject: "Sinhala", downloads: 250 },
  { subject: "Biology", downloads: 70 },
  { subject: "Chemistry", downloads: 210 },
];

export default function PopularDownloadsChart() {
  const { isDark, toggleTheme } = useTheme();

  const axisColor = isDark ? "#ced4da" : "#9ca3af";
  const tickTextColor = isDark ? "#dee2e6" : "#374151";

  const tooltipBgColor = isDark ? "#343a40" : "#f9fafb";
  const tooltipBorderColor = isDark ? "#495057" : "#d1d5db";
  const tooltipTextColor = isDark ? "#f8f9fa" : "#111827";
  const tooltipLabelColor = isDark ? "#adb5bd" : "#6b7280";

  const barFillColor = isDark ? "#ADB5BD" : "#fb7185";

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 mt-4">
      <h2 className="text-2xl 2xl:text-4xl text-gray-700 dark:text-white mb-2">
        Popular Downloads
      </h2>
      <p className="text-md lg:text-xl text-gray-500 dark:text-gray-300 mb-2">
        Top 5 downloaded papers in the last 30 days.
      </p>
      <div className="h-52 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              width={100} // ensures no overlap
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
