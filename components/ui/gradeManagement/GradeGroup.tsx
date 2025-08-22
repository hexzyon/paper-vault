"use client";
import GradeCard from "./GradeCard";

export default function GradeGroup({ title, description, grades, onClick }: any) {
  return (
    <div className="mb-8 border rounded-lg border-light_pink dark:border-dark_grey_500 p-6 shadow-sm shadow-light_pink dark:shadow-dark_grey_500">
      <h2 className="text-lg lg:text-xl xl:text-2xl text-dark_brown dark:text-white mb-1">{title}</h2>
      <p className="text-sm lg:text-md xl:text-lg text-gray-500 dark:text-gray-300 mb-4">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {grades.map((grade: any) => (
          <GradeCard key={grade.id} grade={grade} onClick={onClick}/>
        ))}
      </div>
    </div>
  );
}
