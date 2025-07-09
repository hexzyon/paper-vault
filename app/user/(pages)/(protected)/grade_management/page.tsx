"use client";
import { useState } from "react";
import GradeGroup from "@/components/ui/gradeManagement/GradeGroup";
import AddGradeModal from "@/components/ui/gradeManagement/AddGradeModal";
import { Plus } from "lucide-react";
import UserHeader from "@/components/ui/UserHeader";

// Dummy Data
const gradesData = [
  {
    category: "Primary Education",
    description: "Grades 1-5 including Scholarship Examination",
    grades: [
      { id: 1, level: "Grade 1", educationLevel: "Primary Education", status: "Active" },
      { id: 2, level: "Grade 2", educationLevel: "Primary Education", status: "Active" },
      { id: 3, level: "Grade 3", educationLevel: "Primary Education", status: "Active" },
    ],
  },
  {
    category: "Secondary Education",
    description: "Grades 6-11 including G.C.E O/L Examination",
    grades: [
      { id: 4, level: "Grade 6", educationLevel: "Secondary Education", status: "Active" },
      { id: 5, level: "Grade 7", educationLevel: "Secondary Education", status: "Active" },
      { id: 6, level: "Grade 8", educationLevel: "Secondary Education", status: "Active" },
    ],
  },
  {
    category: "Higher Education",
    description: "Grades 12-13 including G.C.E A/L Examination",
    grades: [
      { id: 7, level: "Grade 12", educationLevel: "Higher Education", status: "Active" },
      { id: 8, level: "Grade 13", educationLevel: "Higher Education", status: "Active" },
    ],
  },
];

export default function GradeManagementPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black font-anek overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto mb-6">
        <UserHeader />
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-6">
          <h1 className="text-2xl lg:text-3xl 2xl:text-4xl text-center md:text-start text-dark_brown dark:text-white">
            Grade & Levels Management
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center w-fit bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-base mx-auto md:mx-0"
          >
            <Plus className="mr-2" /> Add New Grade
          </button>
        </div>


        {/* Grade Groups */}
        {gradesData.map((group) => (
          <GradeGroup
            key={group.category}
            title={group.category}
            description={group.description}
            grades={group.grades}
          />
        ))}

        {/* Modal */}
        {showModal && <AddGradeModal onClose={() => setShowModal(false)} />}
      </div>
    </main>
  );
}
