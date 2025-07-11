"use client";
import { Book } from "lucide-react";

export default function GradeCard({ grade }: { grade: any }) {
    return (
        <div className="bg-white dark:bg-dark_grey_500 p-5 rounded-xl 
        shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_100">
            <div className="flex items-center gap-2">
                <div className="bg-rose-100 dark:bg-gray-500 p-3 rounded-full">
                    <Book className="w-6 h-6 text-rose-500 dark:text-gray-100" />
                </div>
                <div className="flex-1">
                    <h3 className="text-base xl:text-lg font-medium text-dark_brown dark:text-white">
                        {grade.level}
                    </h3>
                    <p className="text-sm xl:text-md text-gray-500 dark:text-gray-300">
                        {grade.educationLevel}
                    </p>
                </div>
                <span className="inline-block bg-green-100 text-green-700 text-xs xl:text-sm px-2 py-1 rounded">
                    {grade.status}
                </span>
            </div>

        </div>
    );
}
