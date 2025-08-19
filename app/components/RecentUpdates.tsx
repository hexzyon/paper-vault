"use client"
import { useCallback, useEffect, useState } from 'react';
import appwriteService from '@/appwrite/config';
import { ID } from 'appwrite';

interface Paper {
  $id: string;
  title: string;
  language: string;
  type: string;
  type2: string;
  year: string;
  term: string;
  date: string;
  status: string;
  paper_url: string;
  subjectId: string;
}

export default function RecentUpdates() {
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const res = await appwriteService.getRecentPapers();
        console.log(res);
        const papers = res.documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          language: doc.language,
          type: doc.type,
          type2: doc.type2,
          year: doc.year,
          term: doc.term,
          date: doc.date,
          status: doc.status,
          paper_url: doc.paper_url,
          subjectsHasGrades: doc.subjectsHasGrades,
          downloads: doc.downloads,
          subjectId: doc.subjectsHasGrades.subjects.$id,
        }));

        setPapers(papers);
      } catch (err) {
        console.error('Failed to load recent papers:', err);
      }
    };

    loadPapers();
  }, []);

  const handleDownload = useCallback(async (subjectId: string, paperUrl: string) => {
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
  }, []);

  return (
    <section className="font-anek items-center justify-center p-2 mt-1 md:mt-4 mb-8">
      <div className="flex items-center justify-center my-6 mb-6 md:mb-12">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
        <h2 className="text-3xl text-dark_brown dark:text-white text-center 2xl:text-5xl">Recently Update</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {papers.map((paper, idx) => (
          <div key={idx} className="w-full p-4 border border-light-pink rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-light_pink dark:shadow-dark_grey_100 bg-white dark:bg-dark_grey_500 dark:bg-opacity-30 text-dark_brown">
            <p className="font-medium text-black dark:text-white text-2xl 2xl:text-3xl xl:text-2xl">{paper.title}</p>
            <p className="font-medium text-black dark:text-white text-lg 2xl:text-2xl xl:text-xl mb-1">{paper.language}</p>
            <p className="font-medium text-md text-gray-600 dark:text-dark_grey_100 2xl:text-xl xl:text-lg mb-1">{paper.type2}</p>
            <p className="inline-block bg-light_pink dark:bg-dark_grey px-2 py-1 rounded text-xs text-black dark:text-white 2xl:text-lg  xl:text-md">{paper.term}</p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3">
              <p className="text-sm text-gray-500 dark:text-dark_white 2xl:text-lg">Updated: {new Date(paper.date).toISOString().split("T")[0]}</p>
              <button
            onClick={() => handleDownload(paper.subjectId, paper.paper_url)}
            className="mt-2 md:mt-0 bg-orange text-white py-1 px-4 rounded-lg hover:bg-dark-brown transition 2xl:text-xl">Download</button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
