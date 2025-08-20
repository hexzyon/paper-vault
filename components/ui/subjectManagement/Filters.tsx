"use client";

import { useState } from "react";

export default function Filters({
  searchTerm,
  onSearch,
  subjectFilter,
  onSubjectFilter,
  gradeFilter,
  onGradeFilter,
  subjects, 
  grades
}: any) {

  const [tempQuery, setTempQuery] = useState("");

  const handleSearch = () => {
    onSearch(tempQuery);
  };

  return (
    <div className="grid grid-cols-6 md:flex-row gap-3 mb-4">
      <input
        value={tempQuery}
        onChange={(e) => setTempQuery(e.target.value)}
        placeholder="Search here..."
        className="col-span-6 md:col-span-3 border border-gray-500 dark:border-dark_grey_100 rounded-md px-3 py-1 text-lg"
      />
      <button
          onClick={handleSearch}
          className="bg-dark_brown col-span-6 md:col-span-1 dark:bg-dark_grey_100 text-white dark:text-dark_black px-2 md:px-2 py-1 rounded-lg 2xl:text-3xl"
        >
          Search
        </button>
      <select
        value={subjectFilter}
        onChange={(e) => onSubjectFilter(e.target.value)}
        className="col-span-6 md:col-end-9 md:col-span-2 border rounded-md px-2 py-1 text-base"
      >
        <option value="">All Subjects</option>
        {subjects.map((s: string) => <option key={s}>{s}</option>)}
      </select>
      <select
        value={gradeFilter}
        onChange={(e) => onGradeFilter(e.target.value)}
        className="col-span-6 md:col-end-11 md:col-span-2 border rounded-md px-2 py-1 text-base"
      >
        <option value="">All Grades</option>
        {grades.map((g: string) => <option key={g}>{g}</option>)}
      </select>
    </div>
  );
}
