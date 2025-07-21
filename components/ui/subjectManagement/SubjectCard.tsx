"use client";
import { Eye, MoreVertical, Upload } from "lucide-react";

export default function SubjectCard({ subject }: { subject: any }) {
  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100
    text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 dark:bg-gray-500 p-2 rounded-full">
            {subject.icon_url ? (
            <img src={subject.icon_url} alt="Grade Icon" className="w-8 h-8 object-contain" />
          ) : (
            <Upload className="w-6 h-6 text-rose-500 dark:text-white" />
          )}
            
          </div>
          <h2 className="text-xl lg:text-2xl font-medium text-dark_brown dark:text-white">{subject.name}</h2>
        </div>
        <MoreVertical className="w-5 h-5 cursor-pointer" />
      </div>
      <p className="text-sm mb-1 flex justify-end">
        <span className="text-lg justify-self-start flex-1 text-dark_grey_500 dark:text-dark_grey_100">Grade Levels</span>
        <span className="text-lg text-dark_brown dark:text-white"> {subject.gradeName}</span>
      </p>
      <p className="text-sm mb-1 flex justify-end">
        <span className="text-lg justify-self-start flex-1 text-dark_grey_500 dark:text-dark_grey_100">Total Papers</span>
        <span className="text-lg text-dark_brown dark:text-white"> {subject.papersCount}</span>
      </p>
      <p className="text-sm mb-1 flex justify-end">
        <span className="text-lg justify-self-start flex-1 text-dark_grey_500 dark:text-dark_grey_100">Status</span>
        <div className="bg-green-200 rounded-lg px-2">
            <span className="text-lg text-green-700"> {subject.status}</span>
        </div>
        
      </p>
      <hr className="solid my-4 border-light_pink dark:border-dark_grey_100 border"/>
      <div className="justify-center flex">
  <a href="/user/past_papers" className="flex w-full items-center justify-center gap-2 text-rose-500 dark:text-white font-medium text-lg">
    <Eye className="w-4 h-4" /> View Papers
  </a>
</div>
      
    </div>
  );
}
