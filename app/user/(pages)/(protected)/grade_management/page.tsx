"use client";
import { useEffect, useState } from "react";
import GradeGroup from "@/components/ui/gradeManagement/GradeGroup";
import AddGradeModal from "@/components/ui/gradeManagement/AddGradeModal";
import { Plus } from "lucide-react";
import UserHeader from "@/components/ui/UserHeader";
import appwriteService from "@/appwrite/config";

type Grade = {
  $id: string;
  grade_name: string;
  education_level: string;
  image_url?: string;
};

type GroupedGrades = {
  [category: string]: {
    description: string;
    grades: Grade[];
  };
};

// Describe each category
const categoryDescriptions: Record<string, string> = {
  "Primary Education": "Grades 1-5 including Scholarship Examination",
  "Secondary Education": "Grades 6-11 including G.C.E O/L Examination",
  "Higher Education": "Grades 12-13 including G.C.E A/L Examination",
};

export default function GradeManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [groupedGrades, setGroupedGrades] = useState<GroupedGrades>({});

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await appwriteService.getGrades();
        const grades: any = res.documents;

        // Group grades by education_level
        const groups: GroupedGrades = {};

        grades.forEach((grade: Grade) => {
          const category = grade.education_level;
          if (!groups[category]) {
            groups[category] = {
              description: categoryDescriptions[category] || "",
              grades: [],
            };
          }
          groups[category].grades.push(grade);
        });

        // Sort grades by numeric value inside grade_name
        Object.values(groups).forEach((group) => {
          group.grades.sort((a, b) => {
            const numA = parseInt(a.grade_name.match(/\d+/)?.[0] || "0");
            const numB = parseInt(b.grade_name.match(/\d+/)?.[0] || "0");
            return numA - numB;
          });
        });

        setGroupedGrades(groups);
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      }
    };

    fetchGrades();
  }, []);

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black font-anek overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto mb-6">
        <UserHeader />

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
        {["Primary Education", "Secondary Education", "Higher Education"].map((category) => {
          const group = groupedGrades[category];
          if (!group) return null;

          return (
            <GradeGroup
              key={category}
              title={category}
              description={categoryDescriptions[category] || ""}
              grades={group.grades}
            />
          );
        })}


        {showModal && <AddGradeModal onClose={() => setShowModal(false)} />}
      </div>
    </main>
  );
}
