"use client";
import { useTheme } from "@/context/theme-context";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: 12, downloads: 20 },
  { day: 13, downloads: 35 },
  { day: 14, downloads: 40 },
  { day: 15, downloads: 30 },
  { day: 16, downloads: 50 },
  { day: 17, downloads: 60 },
  { day: 18, downloads: 48 },
  { day: 19, downloads: 55 },
  { day: 20, downloads: 70 },
  { day: 21, downloads: 65 },
];

export default function UserActivityChart() {
  const { isDark, toggleTheme } = useTheme();

  const strockColor = isDark ? '#ebeced' : '#ff4736';
  const fillColor = isDark ? '#ADB5BD' : '#FBC6C1';

  const axisColor = isDark ? "#ced4da" : "#9ca3af"; // Axis line & ticks
  const tickTextColor = isDark ? "#dee2e6" : "#374151"; // Tick text color

  const tooltipBgColor = isDark ? "#343a40" : "#f9fafb"; // Tooltip background
  const tooltipBorderColor = isDark ? "#495057" : "#d1d5db"; // Tooltip border
  const tooltipTextColor = isDark ? "#f8f9fa" : "#111827"; // Tooltip text
  const tooltipLabelColor = isDark ? "#adb5bd" : "#6b7280"; // Tooltip label

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 flex-1">
      <h2 className="text-2xl 2xl:text-4xl text-gray-800 dark:text-white mb-1">User Activity</h2>
      <p className="text-md lg:text-xl text-gray-600 dark:text-gray-300 mb-2">All user downloads over the last 30 days.</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl 2xl:text-4xl text-gray-700 dark:text-gray-200">78</span>
        <span className="text-green-600 text-sm 2xl:text-lg bg-green-100 px-2 py-1 rounded-full">▲ 15%</span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="day"
              stroke={axisColor}
              tick={{ fill: tickTextColor, fontSize: 12 }}
              axisLine={{ stroke: axisColor }}
              tickLine={{ stroke: axisColor }}
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
            <Area
              type="monotone"
              dataKey="downloads"
              stroke={strockColor}
              fill={fillColor}
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}
