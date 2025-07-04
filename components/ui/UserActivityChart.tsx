"use client";
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
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex-1">
      <h2 className="font-semibold text-gray-700 mb-1">User Activity</h2>
      <p className="text-sm text-gray-500 mb-2">All user downloads over the last 30 days.</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl font-bold text-gray-700">78</span>
        <span className="text-green-500 text-sm bg-green-100 px-2 py-1 rounded-full">▲ 15%</span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Area type="monotone" dataKey="downloads" stroke="#fb7185" fill="#fecdd3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
