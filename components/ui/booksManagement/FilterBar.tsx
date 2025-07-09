"use client";
import { useState } from "react";

export default function FilterBar({ onFilter }: { onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    grade: "",
    status: "",
  });

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
        <option value="Physics">Physics</option>
        <option value="Maths">Maths</option>
        <option value="Chemistry">Chemistry</option>
      </select>
      <select
        value={filters.grade}
        onChange={(e) => handleFilterChange("grade", e.target.value)}
        className="border px-2 py-2 rounded-md text-base w-full md:w-48"
      >
        <option value="">All Grades</option>
        {[...Array(13)].map((_, i) => (
          <option key={i} value={`Grade ${i + 1}`}>{`Grade ${i + 1}`}</option>
        ))}
      </select>
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="border px-2 py-2 rounded-md text-base w-full md:w-48"
      >
        <option value="">Status</option>
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
      </select>
    </div>

  );
}
