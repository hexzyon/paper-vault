"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type Filters = {
  language: string;
  type: string;
  examType: string;
  yearRange: [number, number];
};

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
};

export default function FilterContent({ filters, setFilters }: Props) {
  const minYear = 2000;
  const maxYear = new Date().getFullYear();
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

  const [expLang, toggleLang] = useState(false);
  const [expExam, toggleExam] = useState(false);
  const [rangeExpanded, setRangeExpanded] = useState(false);

  const applyLanguage = (lang: string) =>
    setFilters({ ...filters, language: filters.language === lang ? "" : lang });
  const applyExam = (type: string) =>
    setFilters({ ...filters, examType: filters.examType === type ? "" : type });
  const applyYear = (yr: number) => setFilters({ ...filters, yearRange: [yr, yr] });

  return (
    <div className="space-y-4 text-dark_brown dark:text-white">
      <h1 className="hidden md:flex text-dark_brown dark:text-white text-3xl mt-4 mx-1">Filter By</h1>

      {/* Language Section */}
      <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleLang(!expLang)}
        >
          <h3 className="text-lg font-semibold">Language</h3>
          {expLang ? <ChevronDown /> : <ChevronRight />}
        </div>
        {expLang && (
          <div className="mt-3 space-y-2 max-h-32 overflow-y-auto pr-2">
            {["Sinhala", "English", "Tamil"].map((lang) => (
              <label key={lang} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="language"
                  checked={filters.language === lang}
                  onChange={() => applyLanguage(lang)}
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Exam Type Filter */}
      <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleExam(!expExam)}
        >
          <h3 className="text-lg font-semibold">Exam Type</h3>
          {expExam ? <ChevronDown /> : <ChevronRight />}
        </div>
        {expExam && (
          <div className="mt-3 space-y-2">
            {["Provincial", "Divisional", "School"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="examType"
                  checked={filters.examType === type}
                  onChange={() => applyExam(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Year Range Filter */}
      <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setRangeExpanded(!rangeExpanded)}
        >
          <h3 className="text-lg font-semibold">Select Year</h3>
          {rangeExpanded ? <ChevronDown /> : <ChevronRight />}
        </div>

        {rangeExpanded ? (
          <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-2 max-h-40 overflow-y-auto mt-4">
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => applyYear(yr)}
                className={`px-2 py-1 rounded text-xs ${filters.yearRange[0] === yr
                    ? "bg-dark_brown text-white dark:bg-gray-800"
                    : "bg-gray-200 dark:bg-gray-500 text-dark_brown dark:text-white"
                  }`}
              >
                {yr}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="relative h-10 flex items-center mt-4">
              <div className="absolute w-full h-2 bg-gray-200 rounded-md dark:bg-gray-500" />
              <div
                className="absolute h-2 bg-dark_brown rounded-md dark:bg-dark_white"
                style={{
                  left: `${((filters.yearRange[0] - minYear) / (maxYear - minYear)) * 100}%`,
                  right: `${100 - ((filters.yearRange[1] - minYear) / (maxYear - minYear)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={filters.yearRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    yearRange: [Number(e.target.value), filters.yearRange[1]],
                  })
                }
                className="absolute w-full bg-transparent appearance-none pointer-events-auto"
              />
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={filters.yearRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    yearRange: [filters.yearRange[0], Number(e.target.value)],
                  })
                }
                className="absolute w-full bg-transparent appearance-none pointer-events-auto"
              />
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
