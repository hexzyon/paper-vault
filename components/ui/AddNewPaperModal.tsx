import { X, Save, CheckCircle } from "lucide-react";

export default function AddNewPaperModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-dark_grey_500 p-6 rounded-xl shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl mb-6 text-gray-800 dark:text-white font-semibold">
          Add New Paper
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Paper Title
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Paper Title"
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Add Paper URL
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Grade/Level
            </label>
            <select className="border rounded-md px-3 py-2 w-full">
              <option>Select grade/level</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select className="border rounded-md px-3 py-2 w-full">
              <option>Select Subject</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select className="border rounded-md px-3 py-2 w-full">
              <option>Select language</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Year
            </label>
            <select className="border rounded-md px-3 py-2 w-full">
              <option>Select Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select className="border rounded-md px-3 py-2 w-full">
              <option>Select Type</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Type 2
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Type"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Term
            </label>
            <select className="border rounded-md px-3 py-2 w-full">
              <option>Select Term</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="flex items-center gap-1 border px-4 py-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={onClose}
          >
            <X className="w-5 h-5" /> Cancel
          </button>
          <button className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            <Save className="w-5 h-5" /> Save as Draft
          </button>
          <button className="flex items-center gap-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600">
            <CheckCircle className="w-5 h-5" /> Publish
          </button>
        </div>
      </div>
    </div>
  );
}
