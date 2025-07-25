"use client";
import { useEffect, useState } from "react";
import appwriteService from "@/appwrite/config";

export default function FilterBar({ onFilter }: { onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    grade: "",
    status: "",
  });

  const [subjects, setSubjects] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [statusList, setStatusList] = useState<string[]>(["Published", "Draft"]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const subjectsRes = await appwriteService.getSubjects();
        const gradesRes = await appwriteService.getGrades();

        setSubjects(subjectsRes.documents.map((doc: any) => doc.subject_name));
        setGrades(gradesRes.documents.map((doc: any) => doc.grade_name));
      } catch (error) {
        console.error("Error loading filter data:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search here..."
        value={filters.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        className="border border-gray-500 md:flex-1 px-3 py-2 rounded-md text-base w-full"
      />

      <select
        value={filters.subject}
        onChange={(e) => handleFilterChange("subject", e.target.value)}
        className="border px-2 py-2 rounded-md text-base w-full md:w-48"
      >
        <option value="">All Subjects</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>

      <select
        value={filters.grade}
        onChange={(e) => handleFilterChange("grade", e.target.value)}
        className="border px-2 py-2 rounded-md text-base w-full md:w-48"
      >
        <option value="">All Grades</option>
        {grades.map((grade, index) => (
          <option key={index} value={grade}>{grade}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="border px-2 py-2 rounded-md text-base w-full md:w-48"
      >
        <option value="">Status</option>
        {statusList.map((status, index) => (
          <option key={index} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
}
