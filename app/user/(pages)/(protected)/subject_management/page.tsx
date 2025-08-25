"use client";
import { useEffect, useMemo, useState } from "react";
import SubjectGrid from "@/components/ui/subjectManagement/SubjectGrid";
import Filters from "@/components/ui/subjectManagement/Filters";
import AddSubjectModal from "@/components/ui/subjectManagement/AddSubjectModal";
import { Plus } from "lucide-react";
import UserHeader from "@/components/ui/UserHeader";
import appwriteService from "@/appwrite/config";

type SubjectEntry = {
  id: string;
  name: string;
  gradeName: string;
  main_subject: boolean,
  gradeId: string,
  papersCount: number;
  status: string;
  icon_url?: string;
};

export default function SubjectManagementPage() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjFilter, setSubjFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      const subjRes: any = await appwriteService.getSubjects();
      const sgPairs = await appwriteService.getSubjectGradePairs();

      const entries: SubjectEntry[] = await Promise.all(
        sgPairs.documents.map(async (sg: any) => {
          const s = subjRes.documents.find((a: any) => a.$id === sg.subjects.$id);
          const gradeName = sg.grades;
          const countRes = await appwriteService.getPapersBySubjectGrade(sg.$id);

          return {
            id: sg.$id,
            name: s.subject_name,
            gradeName: gradeName.grade_name,
            main_subject: sg.main_subject,
            gradeId: sg.grades.$id,
            papersCount: countRes.total,
            status: "Active",
            icon_url: sg.icon_url,
          };
        })
      );

      setSubjects(entries);
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    return subjects.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!subjFilter || item.name === subjFilter) &&
        (!gradeFilter || item.gradeName === gradeFilter)
      );
    });
  }, [subjects, searchTerm, subjFilter, gradeFilter]);

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
          subjectFilter={subjFilter}
          onSubjectFilter={setSubjFilter}
          gradeFilter={gradeFilter}
          onGradeFilter={setGradeFilter}
          subjects={Array.from(new Set(subjects.map((s) => s.name)))}
          grades={Array.from(new Set(subjects.map((s) => s.gradeName)))}
        />

        <SubjectGrid subjects={filtered} />

        {showModal && <AddSubjectModal onClose={() => setShowModal(false)} />}
      </div>
    </main>
  );
}
