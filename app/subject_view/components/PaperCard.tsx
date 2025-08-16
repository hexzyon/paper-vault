"use client";
import appwriteService from "@/appwrite/config";
import { ChevronDown, ChevronRight, Eye, Download } from "lucide-react";
import { useCallback } from "react";

export default function PaperCard({
  title,
  region,
  term,
  isExpanded,
  onToggle,
  paperUrl,
  subjectId,
  marking_scheme,
}: {
  title: string;
  region: string;
  term: string;
  isExpanded: boolean;
  onToggle: () => void;
  paperUrl?: string;
  subjectId: string;
  marking_scheme: boolean;
}) {
  const handleDownload = useCallback(async () => {
    const today = new Date().toISOString().split("T")[0];
    console.log(subjectId);

    try {
      const existing = await appwriteService.getDownloadByDate(subjectId, today);

      if (existing.total > 0 && existing.documents.length > 0) {
        const doc = existing.documents[0];
        const newCount = (doc.download_count ?? 0) + 1;

        await appwriteService.updateDownload(doc.$id, newCount);
      } else {
        await appwriteService.createDownload(subjectId, today);
      }

      //drive download code
      const fileId = paperUrl?.match(/\/d\/(.*?)\//)?.[1];

      if (fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        alert('Invalid Google Drive URL');
      }

    } catch (err) {
      console.error("Download tracking failed:", err);
    }
  }, [subjectId]);
  return (
    <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 mb-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
      <div className="flex justify-between items-center cursor-pointer" onClick={onToggle}>
        <h3 className="text-lg font-semibold text-dark_brown dark:text-white">{marking_scheme? <span>Marking - </span>:""}{title}</h3>
        {isExpanded ? <ChevronDown className="text-dark_brown dark:text-white" /> : <ChevronRight className="text-dark_brown dark:text-white" />}
      </div>

      <div className="flex space-x-2 mt-2">
        <span className="bg-light_pink dark:bg-gray-800 text-black dark:text-white text-xs px-2 py-1 rounded">{region}</span>
        <span className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-xs px-2 py-1 rounded">{term}</span>
      </div>

      {isExpanded && (
        <div className="mt-4 flex flex-row gap-3 text-sm md:text-md">
          <a
            href={paperUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-1/2 items-center justify-center border border-red-500 dark:border-white text-black dark:text-white px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <Eye className="w-5 h-5 mr-2" /> View Paper
          </a>
          <button
            onClick={handleDownload}
            className="flex w-1/2 items-center justify-center bg-red-500 dark:bg-dark_grey text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <Download className="w-5 h-5 mr-2" /> Download
          </button>
        </div>
      )}
    </div>
  );
}
