"use client";
import { Check, Upload, X } from "lucide-react";
import { useState } from "react";

export default function AddGradeModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-dark_grey_500 p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Grade
        </h2>
        <form className="flex flex-col gap-3">
          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
              Grade/Level
            </label>
          <input
            placeholder="Enter Grade Level"
            className="border rounded-md px-3 py-1 text-base"
          />
          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
              Education Level
            </label>
          <select className="border rounded-md px-3 py-1 text-base">
            <option>Primary Education</option>
            <option>Secondary Education</option>
            <option>Higher Education</option>
          </select>
          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
              Cover Image
            </label>
          <div className="border rounded-md flex flex-col items-center justify-center p-4 text-gray-500 dark:text-gray-300">
            <Upload className="w-6 h-6 mb-2" />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-center text-sm"
            />
            {file && <span className="mt-2 text-xs">{file.name}</span>}
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              type="button"
              className="border flex border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-md"
            >
              <X className="w-4 h-4 mt-1 mr-2" />Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-500 flex text-white px-4 py-2 rounded-md hover:bg-rose-600"
            >
              <Check className="w-4 h-4 mt-1 mr-2" />Save Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
