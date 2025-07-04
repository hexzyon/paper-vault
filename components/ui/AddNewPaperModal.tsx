import { X, Save, CheckCircle } from "lucide-react";

export default function AddNewPaperModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-dark_grey_500 p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-white">Add New Paper</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border rounded-md px-3 py-2" placeholder="Enter Paper Title" />
          <input className="border rounded-md px-3 py-2" placeholder="https://example.com" />
          <select className="border rounded-md px-3 py-2">
            <option>Select grade/level</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>Select Subject</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>Select language</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>Select Year</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>Select Type</option>
          </select>
          <input className="border rounded-md px-3 py-2" placeholder="Enter Type 2" />
          <select className="border rounded-md px-3 py-2 col-span-2">
            <option>Select Term</option>
          </select>
        </div>
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
