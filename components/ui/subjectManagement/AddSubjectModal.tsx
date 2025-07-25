"use client";
import { Check, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { databases, storage, ID } from "@/appwrite/config"; // adjust your path
import conf from "@/conf/config";
import { Query } from "appwrite";

const DATABASE_ID = conf.appwriteDatabaseId;
const SUBJECTS_COLLECTION_ID = conf.appwriteSubjectsCollectionId;
const SUBJECTS_GRADES_COLLECTION_ID = conf.appwriteSubjectGradeCollectionId;
const GRADES_COLLECTION_ID = conf.appwriteGradesCollectionId;
const BUCKET_ID = conf.appwriteStorageId;

export default function AddSubjectModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [subjectName, setSubjectName] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch grades from DB
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, GRADES_COLLECTION_ID);
        setGrades(res.documents);
      } catch (error) {
        console.error("Failed to load grades:", error);
      }
    };
    fetchGrades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!subjectName || !gradeId || !file) {
      alert("Please fill all fields and upload icon.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Upload file
      const fileUpload = await storage.createFile(BUCKET_ID, ID.unique(), file);
      const iconUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);

      // Step 2: Add to subjects
      const existingSubjects = await databases.listDocuments(DATABASE_ID, SUBJECTS_COLLECTION_ID, [
        Query.equal("subject_name", subjectName)
      ]);

      let subjectId = "";

      if (existingSubjects.total > 0) {
        // Subject exists
        subjectId = existingSubjects.documents[0].$id;
      } else {
        // Subject does not exist - create new
        const subject = await databases.createDocument(DATABASE_ID, SUBJECTS_COLLECTION_ID, ID.unique(), {
          subject_name: subjectName,
          icon_url: iconUrl,
        });
        subjectId = subject.$id;
      }

      // Step 3: Add to subjects_has_grades
      await databases.createDocument(DATABASE_ID, SUBJECTS_GRADES_COLLECTION_ID, ID.unique(), {
        subjects: subjectId,
        grades: gradeId,
      });

      alert("Subject added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject.");
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
          Add New Subject
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Subject Name
          </label>
          <input
            placeholder="Enter Subject Name"
            className="border rounded-md px-3 py-1 text-base"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Grade Level
          </label>
          <select
            className="border rounded-md px-3 py-2 text-base"
            value={gradeId}
            onChange={(e) => setGradeId(e.target.value)}
          >
            <option value="">Select Grade</option>
            {grades.map((g) => (
              <option key={g.$id} value={g.$id}>
                {g.grade_name || `Grade ${g.education_level}`}
              </option>
            ))}
          </select>

          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Subject Icon
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
              <X className="w-4 h-4 mt-1 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-rose-500 flex text-white px-4 py-2 rounded-md hover:bg-rose-600"
            >
              <Check className="w-4 h-4 mt-1 mr-2" />
              {loading ? "Saving..." : "Save Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
