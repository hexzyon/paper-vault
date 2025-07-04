"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { subject: "Physics", downloads: 250 },
  { subject: "Maths", downloads: 250 },
  { subject: "Sinhala", downloads: 250 },
  { subject: "Biology", downloads: 250 },
  { subject: "Chemistry", downloads: 250 },
];

export default function PopularDownloadsChart() {
  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 mt-4">
      <h2 className="font-semibold text-gray-700 mb-2">Popular Downloads</h2>
      <p className="text-sm text-gray-500 mb-2">Top 5 downloaded papers in the last 30 days.</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <Tooltip />
            <Bar dataKey="downloads" fill="#fb7185" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
