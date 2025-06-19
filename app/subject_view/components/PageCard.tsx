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
    <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 mb-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
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
        <span className="bg-light_pink dark:bg-gray-800 text-black dark:text-white text-xs px-2 py-1 rounded">{region}</span>
        <span className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-xs px-2 py-1 rounded">{term}</span>
      </div>

      {expanded && (
        <div className="mt-4 flex flex-row gap-3 text-sm md:text-md">
          <button className="flex w-1/2 items-center justify-center border border-red-500 dark:border-white text-black dark:text-white px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Eye className="w-5 h-5 mr-2" /> View Paper
          </button>
          <button className="flex w-1/2 items-center justify-center bg-red-500 dark:bg-dark_grey text-white px-4 py-2 rounded hover:bg-red-600 transition">
            <Download className="w-5 h-5 mr-2" /> Download
          </button>
        </div>
      )}
    </div>
  );
}
