"use client";
import { Book } from "lucide-react";

export default function GradeCard({ grade, onClick }: { grade: any; onClick: (g: any) => void }) {
  return (
    <div onClick={() => onClick(grade)} className="cursor-pointer bg-white dark:bg-dark_grey_500 p-5 rounded-xl 
      shadow-sm hover:shadow-lg hover:shadow-light_pink hover:dark:shadow-dark_grey_100 
      shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100">
      <div className="flex items-center gap-2">
        <div className="bg-rose-100 dark:bg-gray-500 p-3 rounded-full">
          {grade.image_url ? (
            <img src={grade.image_url} alt="Grade Icon" className="w-10 h-10 object-contain" />
          ) : (
            <Book className="w-6 h-6 text-rose-500 dark:text-gray-100" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-base xl:text-lg font-medium text-dark_brown dark:text-white">
            {grade.grade_name}
          </h3>
          <p className="text-sm xl:text-md text-gray-500 dark:text-gray-300">
            {grade.education_level}
          </p>
        </div>
        <span className="inline-block bg-green-100 text-green-700 text-xs xl:text-sm px-2 py-1 rounded">
          Active
        </span>
      </div>
    </div>
  );
}
