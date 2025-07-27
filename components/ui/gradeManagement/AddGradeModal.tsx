"use client";

import { Check, Upload, X } from "lucide-react";
import { useState } from "react";
import { databases, storage, ID } from "@/appwrite/config"; // adjust path as needed
import conf from "@/conf/config";

const DB_ID = conf.appwriteDatabaseId;
const COLLECTION_ID = conf.appwriteGradesCollectionId;
const BUCKET_ID = conf.appwriteStorageId;

export default function AddGradeModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [gradeName, setGradeName] = useState("");
  const [educationLevel, setEducationLevel] = useState("Primary Education");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // Upload file if selected
      if (file) {
        const fileUpload = await storage.createFile(BUCKET_ID, ID.unique(), file);

        // Generate URL for the uploaded file
        imageUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);
      }

      // Save grade to database
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        grade_name: gradeName,
        education_level: educationLevel,
        image_url: imageUrl,
      });

      alert("Grade added successfully!");
      onClose();
    } catch (err: any) {
      console.error(err);
      alert("Failed to add grade");
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Grade/Level
          </label>
          <input
            placeholder="Enter Grade Level"
            className="border rounded-md px-3 py-1 text-base"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            required
          />

          <label className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Education Level
          </label>
          <select
            className="border rounded-md px-3 py-1 text-base"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
          >
            <option>Primary Education</option>
            <option>Secondary Education</option>
            <option>Higher Education</option>
          </select>

          <label className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Cover Image
          </label>
          <div className="border rounded-md flex flex-col items-center justify-center p-4 text-gray-500 dark:text-gray-300">
            <Upload className="w-6 h-6 mb-2" />
            <input
              type="file"
              accept="image/*"
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
              disabled={loading}
              className="bg-rose-500 flex text-white px-4 py-2 rounded-md hover:bg-rose-600 disabled:opacity-60"
            >
              <Check className="w-4 h-4 mt-1 mr-2" />
              {loading ? "Saving..." : "Save Grade"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
