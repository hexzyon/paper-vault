"use client";

import { useEffect, useState } from "react";
import { X, Save, CheckCircle } from "lucide-react";
import appwriteService from "@/appwrite/config";

export default function AddBookModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [language, setLanguage] = useState("");
  const [grades, setGrades] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectGradePairs, setSubjectGradePairs] = useState<any[]>([]);

  // Load grades, subjects, and subject-grade pairs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradesRes, subjectsRes, shgRes] = await Promise.all([
          appwriteService.getGrades(),
          appwriteService.getSubjects(),
          appwriteService.getSubjectGradePairs(), 
        ]);

        setGrades(gradesRes.documents);
        setSubjects(subjectsRes.documents);
        setSubjectGradePairs(shgRes.documents);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (status: boolean) => {
    if (!title || !gradeId || !subjectId || !language) {
      alert("Please fill all fields");
      return;
    }

    console.log(subjectGradePairs);

    const matchedPair = subjectGradePairs.find(
      (pair) => pair.subjects.$id === subjectId && pair.grades.$id === gradeId
    );

    if (!matchedPair) {
      alert("Selected subject and grade combination not found.");
      return;
    }

    const data = {
      title,
      subjectsHasGrades: matchedPair.$id,
      language,
      status,
    };

    try {
      await appwriteService.createBook(data);
      alert("Book saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save the book.");
    }
  };

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
              placeholder="Enter Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Grade/Level
            </label>
            <select
              className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white"
              value={gradeId}
              onChange={(e) => setGradeId(e.target.value)}
            >
              <option value="">Select grade/level</option>
              {grades.map((grade) => (
                <option key={grade.$id} value={grade.$id}>
                  {grade.grade_name || grade.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select
              className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.$id} value={subject.$id}>
                  {subject.subject_name || subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm md:text-lg mb-1 text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select
              className="border rounded-md px-3 py-2 w-full dark:bg-dark_grey_300 dark:text-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
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
            onClick={() => handleSave(false)} // Draft
            className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            <Save className="w-5 h-5" /> Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)} // Publish
            className="flex items-center gap-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
          >
            <CheckCircle className="w-5 h-5" /> Publish
          </button>
        </div>
      </div>
    </div>
  );
}
