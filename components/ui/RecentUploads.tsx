"use client";

import { useEffect, useState } from "react";
import { Files } from "lucide-react";
import appwriteService from "@/appwrite/config";

interface UploadItem {
  title: string;
  uploader: string;
  uploadedAt: string;
}

export default function RecentUploads() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const currentUser = await appwriteService.getCurrentUser();
        const userName = currentUser?.name || "Unknown";

        // Fetch all papers
        const papers = await appwriteService.getAllPapersOrder();

        // Sort papers by uploadedAt descending and take top 4
        const recentPapers = papers
          .sort(
            (a: any, b: any) =>
              new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          )
          .slice(0, 4);

        const formattedUploads: UploadItem[] = recentPapers.map((paper: any) => ({
          title: paper.title,
          uploader: paper.uploaderName || userName,
          uploadedAt: getTimeAgo(paper.date),
        }));

        setUploads(formattedUploads);
      } catch (error) {
        console.error("Failed to load recent uploads:", error);
      }
    };

    fetchUploads();
  }, []);

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 flex-1">
      <h2 className="text-2xl 2xl:text-4xl text-gray-800 dark:text-white mb-2">Recent Uploads</h2>
      <ul className="space-y-3 text-sm">
        {uploads.map((upload, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className="bg-rose-200 dark:bg-gray-300 p-2 2xl:p-3 rounded-full">
              <Files className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-11 2xl:h-11 text-rose-500 dark:text-gray-600" />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-100 text-xl 2xl:text-2xl">{upload.title}</p>
              <span className="text-gray-500 dark:text-gray-300 text-lg 2xl:text-xl">
                Uploaded by {upload.uploader} – {upload.uploadedAt}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        window.location.href = "/user/past_papers";
      }}
        className="text-rose-500 dark:text-gray-200 text-2xl 2xl:text-3xl mt-3 text-center w-full">View All Uploads</button>
    </div>
  );
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
