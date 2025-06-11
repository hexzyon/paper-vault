"use client"
import { useState } from "react";
import { ChevronDown, ChevronRight, Eye, Download } from "lucide-react";

export default function PaperCard({
  title,
  region,
  term,
}: {
  title: string;
  region: string;
  term: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-xl shadow-sm p-4 mb-4 bg-white dark:bg-dark_grey dark:border-gray-700">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-semibold text-dark_brown dark:text-white">{title}</h3>
        {expanded ? (
          <ChevronDown className="text-dark_brown dark:text-white" />
        ) : (
          <ChevronRight className="text-dark_brown dark:text-white" />
        )}
      </div>

      <div className="flex space-x-2 mt-2">
        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">{region}</span>
        <span className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded">{term}</span>
      </div>

      {expanded && (
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <button className="flex items-center justify-center border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 dark:hover:bg-gray-800 transition">
            <Eye className="w-4 h-4 mr-2" /> View Paper
          </button>
          <button className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            <Download className="w-4 h-4 mr-2" /> Download
          </button>
        </div>
      )}
    </div>
  );
}
