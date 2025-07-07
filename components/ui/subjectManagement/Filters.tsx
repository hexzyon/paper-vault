"use client";
export default function Filters({
  searchTerm,
  onSearch,
  subjectFilter,
  onSubjectFilter,
  gradeFilter,
  onGradeFilter,
}: any) {
  return (
    <div className="grid grid-cols-6 md:flex-row gap-3 mb-4">
      <input
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search here..."
        className="col-span-12 md:col-span-2 border border-dark_brown dark:border-dark_grey_100 rounded-md px-3 py-1 text-lg"
      />
      <select
        value={subjectFilter}
        onChange={(e) => onSubjectFilter(e.target.value)}
        className="col-span-6 md:col-end-9 md:col-span-2 border rounded-md px-2 py-1 text-base"
      >
        <option value="">All Subjects</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>
      <select
        value={gradeFilter}
        onChange={(e) => onGradeFilter(e.target.value)}
        className="col-span-6 md:col-end-11 md:col-span-2 border rounded-md px-2 py-1 text-base"
      >
        <option value="">All Grades</option>
        {[...Array(13)].map((_, i) => (
          <option key={i} value={`Grade ${i + 1}`}>
            Grade {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
