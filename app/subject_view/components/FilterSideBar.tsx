"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function FilterContent() {
  const minYear = 2000
  const maxYear = 2025

  const [startYear, setStartYear] = useState(2005)
  const [endYear, setEndYear] = useState(2025)

  const [expandedSection, setExpandedSection] = useState<string | null>("language")
  const [yearExpanded, setYearExpanded] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedExam, setSelectedExam] = useState("")

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i)

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section))
  }

  const toggleYearMode = () => {
    setYearExpanded(prev => !prev)
  }

  return (
    <div className="space-y-4 text-dark_brown dark:text-white">
      <h1 className="hidden md:flex text-dark_brown dark:text-white text-3xl mt-4 mx-1">Filter By</h1>

      {/* Language Section (Expanded by default) */}
      <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("language")}
        >
          <h3 className="text-lg font-semibold">Language</h3>
          {expandedSection === "language" ? <ChevronDown /> : <ChevronRight />}
        </div>
        {expandedSection === "language" && (
          <div className="mt-3 space-y-2 max-h-32 overflow-y-auto pr-2">
            {["Sinhala", "English", "Tamil"].map((lang) => (
              <div key={lang} className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  id={lang}
                  value={lang}
                  checked={selectedLanguage === lang}
                  onChange={() => setSelectedLanguage(lang)}
                  className="mr-2"
                />
                <label htmlFor={lang}>{lang}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exam Type Section */}
      <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("exam")}
        >
          <h3 className="text-lg font-semibold">Exam Type</h3>
          {expandedSection === "exam" ? <ChevronDown /> : <ChevronRight />}
        </div>
        {expandedSection === "exam" && (
          <div className="mt-3 space-y-2">
            {["Provincial Exams", "Divisional Exams", "School Based Exams"].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="radio"
                  name="examType"
                  id={type}
                  value={type}
                  checked={selectedExam === type}
                  onChange={() => setSelectedExam(type)}
                  className="mr-2"
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Year Section */}
      <div className="border rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_100 p-4 bg-white dark:bg-dark_grey_500 dark:border-gray-400">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleYearMode}
        >
          <h3 className="text-lg font-semibold">Select Year</h3>
          {yearExpanded ? <ChevronDown /> : <ChevronRight />}
        </div>

        {/* Slider mode */}
        {!yearExpanded && (
          <>
            <div className="relative h-10 flex items-center mt-4">
              <div className="absolute w-full h-2 bg-gray-200 rounded-md dark:bg-gray-500" />
              <div
                className="absolute h-2 bg-dark_brown rounded-md dark:bg-dark_white"
                style={{
                  left: `${((startYear - minYear) / (maxYear - minYear)) * 100}%`,
                  right: `${100 - ((endYear - minYear) / (maxYear - minYear)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={startYear}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val <= endYear) setStartYear(val)
                }}
                className="absolute w-full bg-transparent appearance-none pointer-events-auto"
              />
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={endYear}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val >= startYear) setEndYear(val)
                }}
                className="absolute w-full bg-transparent appearance-none pointer-events-auto"
              />
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span>{startYear}</span>
              <span>{endYear}</span>
            </div>
          </>
        )}

        {/* Year list grid (shown when expanded) */}
        {yearExpanded && (
          <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-2 max-h-40 overflow-y-auto mt-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setStartYear(year)
                  setEndYear(year)
                }}
                className={`text-xs px-2 py-1 rounded ${
                  year >= startYear && year <= endYear
                    ? "bg-dark_brown text-white dark:bg-gray-800"
                    : "bg-gray-200 dark:bg-gray-500 text-dark_brown dark:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
