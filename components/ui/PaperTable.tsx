"use client";
import { useState, useMemo, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import appwriteService from "@/appwrite/config";

export default function PaperTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [papers, setPapers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);

  // ✅ Fetch papers with relations included (subject + grade)
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await appwriteService.getPapers();

        const enhancedPapers = response.documents.map((paper: any) => ({
          ...paper,
          subject: paper.subjectsHasGrades?.subjects?.subject_name ?? "N/A",
          grade: paper.subjectsHasGrades?.grades?.grade_name ?? "N/A",
          status: paper.status === true ? "Published" : "Draft"
        }));

        setPapers(enhancedPapers);

        // Get subjects
        const subjectsResponse = await appwriteService.getSubjects();
        setSubjects(subjectsResponse.documents);

        // Get grades
        const gradesResponse = await appwriteService.getGrades();
        setGrades(gradesResponse.documents);

      } catch (error) {
        console.error("Failed to load papers:", error);
      }
    };

    fetchPapers();
  }, []);

  const filteredData = useMemo(() => {
    return papers.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = !selectedSubject || item.subject === selectedSubject;
      const matchesGrade = !selectedGrade || item.grade === selectedGrade;
      const matchesStatus = !selectedStatus || item.status === selectedStatus;

      return matchesSearch && matchesSubject && matchesGrade && matchesStatus;
    });
  }, [papers, searchTerm, selectedSubject, selectedGrade, selectedStatus]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100">
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
          {subjects.map((subj) => (
            <option key={subj.$id} value={subj.subject_name}>
              {subj.subject_name}
            </option>
          ))}
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
          {grades.map((grd) => (
            <option key={grd.$id} value={grd.grade_name}>
              {grd.grade_name}
            </option>
          ))}
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
        <table className="w-full table-auto border-separate border-spacing-y-3 text-left text-gray-700 dark:text-gray-300 shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100 p-2 rounded-lg">
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
                <td className="hidden lg:table-cell">
                  {new Date(item.date).toISOString().split("T")[0]}
                </td>
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
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
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
