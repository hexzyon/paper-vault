"use client";
import { X, Save, CheckCircle } from "lucide-react";

export default function AddBookModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark_grey_500 p-6 rounded-xl shadow-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-white font-semibold">
          Add New Book
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Book Title
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white"
              placeholder="Enter Paper Title"
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Grade/Level
            </label>
            <select className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white">
              <option>Select grade/level</option>
              {[...Array(13)].map((_, i) => (
                <option key={i}>{`Grade ${i + 1}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white">
              <option>Select Subject</option>
              <option>Maths</option>
              <option>Physics</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white">
              <option>Select language</option>
              <option>English</option>
              <option>Sinhala</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 border px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 dark:border-white"
          >
            <X className="w-5 h-5" /> Cancel
          </button>
          <button
            type="button"
            className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            <Save className="w-5 h-5" /> Save as Draft
          </button>
          <button
            type="submit"
            className="flex items-center gap-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
          >
            <CheckCircle className="w-5 h-5" /> Publish
          </button>
        </div>
      </div>
    </div>
  );
}
