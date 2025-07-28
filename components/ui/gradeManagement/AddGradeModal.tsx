"use client";

import { Check, Upload, X } from "lucide-react";
import { useState } from "react";
import { databases, storage, ID } from "@/appwrite/config"; 
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

      if (file) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          alert("Only image files are allowed.");
          setLoading(false);
          return;
        }

        // Validate file size < 500KB
        if (file.size > 500 * 1024) {
          alert("Image must be smaller than 500KB.");
          setLoading(false);
          return;
        }

        // Convert to WEBP
        const webpFile = await convertToWebp(file);
        const fileUpload = await storage.createFile(BUCKET_ID, ID.unique(), webpFile);
        imageUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);
      }

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

  const convertToWebp = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        if (!reader.result) return reject("Failed to read file.");
        img.src = reader.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas not supported.");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Failed to convert to WEBP.");
            const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
            });
            resolve(webpFile);
          },
          "image/webp",
          0.8
        );
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
