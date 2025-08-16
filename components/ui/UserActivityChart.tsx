"use client";
import { useTheme } from "@/context/theme-context";
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import appwriteService from "@/appwrite/config";

type ChartData = {
  day: number; 
  downloads: number;
};

export default function UserActivityChart() {
  const { isDark } = useTheme();
  const [data, setData] = useState<ChartData[]>([]);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [growthPercent, setGrowthPercent] = useState(0);

  const strockColor = isDark ? "#ebeced" : "#ff4736";
  const fillColor = isDark ? "#ADB5BD" : "#FBC6C1";

  const axisColor = isDark ? "#ced4da" : "#9ca3af";
  const tickTextColor = isDark ? "#dee2e6" : "#374151";

  const tooltipBgColor = isDark ? "#343a40" : "#f9fafb";
  const tooltipBorderColor = isDark ? "#495057" : "#d1d5db";
  const tooltipTextColor = isDark ? "#f8f9fa" : "#111827";
  const tooltipLabelColor = isDark ? "#adb5bd" : "#6b7280";

  useEffect(() => {
    const loadData = async () => {
      const docs = await appwriteService.fetchDownloadsLast60Days();

      // Map downloads by day
      const map = new Map<string, number>();
      docs.forEach((doc: any) => {
        const dateKey = new Date(doc.date).toISOString().slice(0, 10); // YYYY-MM-DD
        const prev = map.get(dateKey) ?? 0;
        map.set(dateKey, prev + (doc.download_count ?? 0));
      });

      const today = new Date();
      const chart: ChartData[] = [];

      let curr30Total = 0;
      let prev30Total = 0;

      for (let i = 59; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const count = map.get(key) ?? 0;

        const day = d.getDate();
        if (i < 30) curr30Total += count;
        else prev30Total += count;

        if (i < 30) {
          chart.push({ day, downloads: count });
        }
      }

      setData(chart);
      setTotalDownloads(curr30Total);

      const growth = prev30Total > 0 ? ((curr30Total - prev30Total) / prev30Total) * 100 : 100;
      setGrowthPercent(growth);
    };

    loadData();
  }, []);

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 flex-1">
      <h2 className="text-2xl 2xl:text-4xl text-gray-800 dark:text-white mb-1">User Activity</h2>
      <p className="text-md lg:text-xl text-gray-600 dark:text-gray-300 mb-2">
        All user downloads over the last 30 days.
      </p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl 2xl:text-4xl text-gray-700 dark:text-gray-200">
          {totalDownloads}
        </span>
        <span
          className={`text-sm 2xl:text-lg px-2 py-1 rounded-full ${
            growthPercent >= 0
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {growthPercent >= 0 ? "▲" : "▼"} {Math.abs(growthPercent).toFixed(1)}%
        </span>
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
