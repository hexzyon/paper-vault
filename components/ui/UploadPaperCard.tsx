"use client"
import { PlusIcon, Upload } from "lucide-react";
import { useState } from "react";
import AddNewPaperModal from "./AddNewPaperModal";

export default function UploadPaperCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500
    flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-2 mt-3">
        <div className="bg-gray-300 p-3 rounded-full">
          <Upload className="w-5 h-5 2xl:w-7 2xl:h-7 text-gray-800" />
        </div>
        <h2 className="text-2xl 2xl:text-4xl text-gray-800 dark:text-white">Upload New Paper</h2>
      </div>
      <p className="text-lg 2xl:text-2xl text-gray-500 dark:text-gray-300 mb-4 my-4">
        Add new exam paper to the system.
      </p>
      <button onClick={() => setIsModalOpen(true)} className="inline-flex w-auto items-center mb-2 gap-1 text-xl 2xl:text-2xl bg-rose-600 dark:bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-rose-700 dark:hover:bg-gray-900 transition">
        <PlusIcon /> Upload Paper
      </button>

      {isModalOpen && (
        <AddNewPaperModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
