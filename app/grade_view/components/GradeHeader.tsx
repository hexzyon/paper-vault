'use client'

import { useState } from "react";
import SearchItems from "./SearchItems";
import MainSubjects from "./MainSubjects";
import OptionalSubjects from "./OptionalSubjects";

type GradeHeaderProps = {
  gradeId: string
}

const gradeDetails: Record<string, { title: string; description: string }> = {
  grade5: {
    title: 'Grade 5 Subjects',
    description: 'This grade focuses on foundational subjects for young learners.',
  },
  grade11: {
    title: 'Grade 11 Subjects',
    description: 'In this grade, students continue building their basic skills.',
  },
  grade13: {
    title: 'Grade 13 Subjects',
    description: 'Students begin to explore more advanced topics.',
  },
}

export default function GradeHeader({ gradeId }: GradeHeaderProps) {
  const grade = gradeDetails[gradeId];
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const allData = [
    'Grade 5 Scholarship',
    'G.C.E. Ordinary Level',
    'G.C.E. Advanced Level',
    'IELTS',
    'TOEFL',
    'SAT Exam',
    'Cambridge English'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsSearching(false)

    if (value.trim() === '') {
      setResults([])
    } else {
      const filtered = allData.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      console.log(filtered)
      setResults(filtered)
    }
  }

  const handleSearchClick = () => {
  const filtered = allData.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  setResults(filtered);
  setIsSearching(true);
};

  if (!grade) {
    return (
      <section className="p-4 text-center text-red-600 text-xlfont-anek items-center justify-center mt-4 mb-1">
        Invalid grade ID: {gradeId}
      </section>
    );
  }

  return (
    <>
    <section className="font-anek items-center justify-center p-2 mt-4 mb-1">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between my-6 mb-1">
        <h2 className="text-4xl text-dark_brown dark:text-white text-center xl:text-6xl 2xl:text-6xl">{grade.title}</h2>


        <div className="relative flex font-anek mt-5 md:mt-0 font-normal text-lg flex-col items-center justify-center text-center">

          <div className="w-full z-10">
            <div className="flex items-center justify-center bg-white dark:bg-dark_grey border dark:border-white rounded-xl border-dark_brown shadow-md px-1 py-1 xl:w-[500px] 2xl:w-[600px]">
              
              <div className="inset-y-0 start-0 flex items-center ps-1 pointer-events-none mr-2">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search"
                className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-dark_grey_100 2xl:text-3xl"
              />
              <button 
              onClick={handleSearchClick}
              className="bg-dark_brown dark:bg-orange text-white px-2 md:px-6 py-1 rounded-lg 2xl:text-3xl">
                Search
              </button>
            </div>

            {results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark_grey text-black dark:text-white border dark:border-white rounded-md shadow max-h-60 overflow-y-auto z-50 xl:w-[500px] 2xl:w-[600px]">

                {results.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark_grey_500"
                    onClick={() => {
                      setQuery(item)
                      setResults([])
                      setIsSearching(true)
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </section>
    {isSearching ? (
      
        <SearchItems results={results.length > 0 ? results : ['No matching items found.']} />
      ) : (
        <>
          <MainSubjects gradeId={gradeId}/>
          {gradeId !== "grade5" && <OptionalSubjects />}
        </>
      )}
    </>
  );
}