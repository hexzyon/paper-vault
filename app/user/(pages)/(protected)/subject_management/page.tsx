"use client";
import { useMemo, useState } from "react";
import SubjectGrid from "@/components/ui/subjectManagement/SubjectGrid";
import Filters from "@/components/ui/subjectManagement/Filters";
import AddSubjectModal from "@/components/ui/subjectManagement/AddSubjectModal";
import { Plus } from "lucide-react";
import UserHeader from "@/components/ui/UserHeader";

// Dummy Data
const subjectsData = [
  { id: 1, name: "Mathematics", grades: "Grade 6", papers: 120, status: "Active" },
  { id: 2, name: "Science", grades: "Grade 7", papers: 150, status: "Active" },
  { id: 3, name: "History", grades: "Grade 8", papers: 98, status: "Active" },
  { id: 4, name: "Mathematics", grades: "Grade 9", papers: 245, status: "Active" },
  { id: 5, name: "Science", grades: "Grade 10", papers: 200, status: "Active" },
  { id: 6, name: "History", grades: "Grade 11", papers: 180, status: "Active" },
  { id: 7, name: "Mathematics", grades: "Grade 12", papers: 300, status: "Active" },
  { id: 8, name: "Science", grades: "Grade 13", papers: 240, status: "Active" },
];

export default function SubjectManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredSubjects = useMemo(() => {
    return subjectsData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSubject = !subjectFilter || item.name === subjectFilter;
      const matchesGrade = !gradeFilter || item.grades === gradeFilter;
      return matchesSearch && matchesSubject && matchesGrade;
    });
  }, [searchTerm, subjectFilter, gradeFilter]);

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black font-anek overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto mb-6">
            <UserHeader />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-7">
        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl text-center md:text-start text-dark_brown dark:text-white">
          Subjects Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center w-fit bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-base mx-auto md:mx-0"
        >
          <Plus className="mr-2" /> Add New Subject
        </button>
      </div>

      {/* Filters */}
      <Filters
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        subjectFilter={subjectFilter}
        onSubjectFilter={setSubjectFilter}
        gradeFilter={gradeFilter}
        onGradeFilter={setGradeFilter}
      />

      {/* Subject Cards */}
      <SubjectGrid subjects={filteredSubjects} />

      {/* Modal */}
      {showModal && <AddSubjectModal onClose={() => setShowModal(false)} />}
    </div>
    </main>
  );
}
