"use client";
import { Check, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { databases, storage, ID } from "@/appwrite/config";
import conf from "@/conf/config";
import { Query } from "appwrite";

const DATABASE_ID = conf.appwriteDatabaseId;
const SUBJECTS_COLLECTION_ID = conf.appwriteSubjectsCollectionId;
const SUBJECTS_GRADES_COLLECTION_ID = conf.appwriteSubjectGradeCollectionId;
const GRADES_COLLECTION_ID = conf.appwriteGradesCollectionId;
const BUCKET_ID = conf.appwriteStorageId;

export default function AddSubjectModal({ onClose, subjectToEdit }: { onClose: () => void; subjectToEdit?: any | null; }) {
  const [file, setFile] = useState<File | null>(null);
  const [subjectName, setSubjectName] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMainSubject, setIsMainSubject] = useState(false);

  useEffect(() => {
    if (subjectToEdit) {
      setSubjectName(subjectToEdit.name || "");
      setGradeId(subjectToEdit.gradeId || "");
      setIsMainSubject(subjectToEdit.main_subject || false);
    }
  }, [subjectToEdit]);

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

    if (!subjectName || !gradeId) {
      alert("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (!subjectToEdit && !file) {
      alert("Please upload an icon.");
      setLoading(false);
      return;
    }

    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Uploaded file is not an image.");
        setLoading(false);
        return;
      }

      // Check file size (< 500KB)
      if (file.size > 500 * 1024) {
        alert("Image size must be less than 500KB.");
        setLoading(false);
        return;
      }
    }


    if (subjectToEdit) {
      // Update Mode
      try {
        let iconUrl = subjectToEdit.icon_url;

        if (file) {
          // upload new file & replace old
          const convertedFile = await convertImageToWebP(file);
          const fileUpload = await storage.createFile(BUCKET_ID, ID.unique(), convertedFile);
          iconUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);

          // TODO: optionally delete old image here
        }

        // update subject_grades relation
        await databases.updateDocument(
          DATABASE_ID,
          SUBJECTS_GRADES_COLLECTION_ID,
          subjectToEdit.id,   // relation document id
          {
            main_subject: isMainSubject,
            icon_url: iconUrl,
          }
        );

        alert("Subject updated successfully!");
        onClose();
      } catch (err) {
        console.error("Error updating subject", err);
        alert("Failed to update subject");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        if (file) {
          const convertedFile = await convertImageToWebP(file);

          // Step 1: Upload file
          const fileUpload = await storage.createFile(BUCKET_ID, ID.unique(), convertedFile);
          const iconUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);

          // Step 2: Check or create subject
          const existingSubjects = await databases.listDocuments(DATABASE_ID, SUBJECTS_COLLECTION_ID, [
            Query.equal("subject_name", subjectName),
          ]);

          let subjectId = "";

          if (existingSubjects.total > 0) {
            subjectId = existingSubjects.documents[0].$id;
          } else {
            const subject = await databases.createDocument(DATABASE_ID, SUBJECTS_COLLECTION_ID, ID.unique(), {
              subject_name: subjectName,

            });
            subjectId = subject.$id;
          }

          // Step 3: Create relation
          await databases.createDocument(DATABASE_ID, SUBJECTS_GRADES_COLLECTION_ID, ID.unique(), {
            subjects: subjectId,
            grades: gradeId,
            icon_url: iconUrl,
            main_subject: isMainSubject,
          });

          alert("Subject added successfully!");
          onClose();
        } else {
          alert("File did not select.");
          return;
        }
      } catch (error) {
        console.error("Error adding subject:", error);
        alert("Failed to add subject.");
      } finally {
        setLoading(false);
      }
    }


  };

  const convertImageToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas context error");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" });
              resolve(webpFile);
            } else {
              reject("Failed to convert image to WebP");
            }
          },
          "image/webp",
          0.8
        );
      };

      img.onerror = () => reject("Failed to load image");
      reader.onerror = () => reject("Failed to read image file");

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
          {subjectToEdit ? "Update Subject" : "Add New Subject"}
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Subject Name
          </label>
          <input
            placeholder="Enter Subject Name"
            className="border rounded-md px-3 py-1 text-base"
            value={subjectName}
            disabled={!!subjectToEdit}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300">
            Grade Level
          </label>
          <select
            className="border rounded-md px-3 py-2 text-base"
            value={gradeId}
            disabled={!!subjectToEdit}
            onChange={(e) => setGradeId(e.target.value)}
          >
            <option value="">Select Grade</option>
            {grades.map((g) => (
              <option key={g.$id} value={g.$id}>
                {g.grade_name || `Grade ${g.education_level}`}
              </option>
            ))}
          </select>

          <label className="block text-sm md:text-lg text-gray-700 dark:text-gray-300 mt-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mainSubject"
                checked={isMainSubject}
                onChange={(e) => setIsMainSubject(e.target.checked)}
                className="h-4 w-4 accent-rose-500"
              />
              <label htmlFor="mainSubject" className="text-sm md:text-base text-gray-800 dark:text-gray-200">
                Mark as Main Subject
              </label>
            </div>
          </label>


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
              {loading ? "Saving..." : subjectToEdit ? "Update Subject" : "Save Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
