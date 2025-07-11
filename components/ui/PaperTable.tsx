"use client";
import { useState, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";

const paperData = [
  {
    title: "Mathematics Grade 5 Paper",
    subject: "Maths",
    grade: "Grade 5 Scholarship",
    language: "English",
    type: "Divisional",
    type2: "Kalutara",
    year: "2025",
    term: "First",
    date: "12.15.2025",
    status: "Published",
  },
  {
    title: "Physics Term Paper",
    subject: "Physics",
    grade: "Grade 12",
    language: "English",
    type: "National",
    type2: "Gampaha",
    year: "2025",
    term: "Second",
    date: "12.16.2025",
    status: "Draft",
  },
  {
    title: "Biology Revision Paper",
    subject: "Biology",
    grade: "Grade 11",
    language: "English",
    type: "Zonal",
    type2: "Kandy",
    year: "2024",
    term: "Third",
    date: "11.10.2024",
    status: "Published",
  },
  // Add more records for demo
];

while (paperData.length < 12) {
  paperData.push({ ...paperData[paperData.length % 3] });
}

export default function PaperTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredData = useMemo(() => {
    return paperData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject =
        !selectedSubject || item.subject === selectedSubject;
      const matchesGrade = !selectedGrade || item.grade === selectedGrade;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;

      return matchesSearch && matchesSubject && matchesGrade && matchesStatus;
    });
  }, [searchTerm, selectedSubject, selectedGrade, selectedStatus]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-500 md:flex-1 rounded-md px-3 py-2 bg-white text-dark_brown dark:text-dark_grey text-lg w-full md:w-auto"
          placeholder="Search here..."
        />
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-md px-2 py-2 text-base w-full md:w-auto"
        >
          <option value="">All Subjects</option>
          <option value="Maths">Maths</option>
          <option value="Physics">Physics</option>
          <option value="Biology">Biology</option>
        </select>
        <select
          value={selectedGrade}
          onChange={(e) => {
            setSelectedGrade(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-md px-2 py-2 text-base w-full md:w-auto"
        >
          <option value="">All Grades</option>
          <option value="Grade 5 Scholarship">Grade 5 Scholarship</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-md px-2 py-2 text-base w-full md:w-auto"
        >
          <option value="">Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-3 text-left text-gray-700 dark:text-gray-300
        shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100 p-2 rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-md lg:text-lg">
              <th>Title</th>
              <th>Subject</th>
              <th>Grade/Level</th>
              <th className="hidden lg:table-cell">Language</th>
              <th className="hidden lg:table-cell">Type</th>
              <th className="hidden lg:table-cell">Type 2</th>
              <th className="hidden lg:table-cell">Year</th>
              <th className="hidden lg:table-cell">Term</th>
              <th className="hidden lg:table-cell">Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) => (
              <tr key={i} className="border-b text-xs sm:text-sm">
                <td>{item.title}</td>
                <td>{item.subject}</td>
                <td>{item.grade}</td>
                <td className="hidden lg:table-cell">{item.language}</td>
                <td className="hidden lg:table-cell">{item.type}</td>
                <td className="hidden lg:table-cell">{item.type2}</td>
                <td className="hidden lg:table-cell">{item.year}</td>
                <td className="hidden lg:table-cell">{item.term}</td>
                <td className="hidden lg:table-cell">{item.date}</td>
                <td>
                  <span
                    className={`${item.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                      } px-2 py-0 rounded text-xs`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <Pencil className="w-4 h-4 cursor-pointer text-blue-500" />
                  <Trash2 className="w-4 h-4 cursor-pointer text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="mt-2 text-sm text-gray-500 dark:text-gray-200">
        Showing {indexOfFirstItem + 1} to{" "}
        {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
      </div>

      <div className="flex justify-end mt-2 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="border px-3 py-1 rounded-md border-dark_grey dark:border-white text-dark_grey dark:text-white"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="border px-3 py-1 rounded-md border-dark_grey dark:border-white text-dark_grey dark:text-white"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
