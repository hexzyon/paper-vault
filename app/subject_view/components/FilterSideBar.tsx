"use client"

import { useState } from "react";

//  function FilterSidebar() {
//   return (
//     <aside className="md:w-1/4 w-full p-4">
//       {/* Mobile Toggle Button */}
//       <details className="md:hidden mb-4">
//         <summary className="cursor-pointer px-4 py-2 bg-dark_brown text-white rounded">
//           Filter By
//         </summary>

//         {/* Filters Panel (Mobile) */}
//         <div className="mt-4 space-y-6">
//           <FilterContent />
//         </div>
//       </details>

//       {/* Desktop Panel */}
//       <div className="hidden md:block space-y-6">
//         <FilterContent />
//       </div>
//     </aside>
//   );
// }

export default function FilterContent() {
  const minYear = 2000;
  const maxYear = 2025;

  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2025);

  // Ensure startYear is always less than endYear
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= endYear) setStartYear(value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= startYear) setEndYear(value);
  };

  return (
    <>
      <div className="text-3xl pt-4 mx-1 text-dark_brown dark:text-white">
        <h1>Filter By</h1>
      </div>
      <div className="border mb-4 md:mb-0 rounded-lg p-2 bg-dark_white dark:bg-dark_grey_500  shadow-md shadow-light_pink dark:shadow-dark_grey_100 border-light_pink dark:border-dark_grey_100">
        <h3 className="font-semibold text-lg text-dark_brown dark:text-white">Language</h3>
        <div className="mt-2 space-y-1">
          {["Sinhala", "English", "Tamil"].map((lang) => (
            <div key={lang} className="flex items-center">
              <input type="radio" name="language" id={lang} className="mr-2" />
              <label htmlFor={lang} className="text-dark_brown dark:text-dark_white">
                {lang}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border mb-4 md:mb-0 rounded-lg p-4 bg-dark_white dark:bg-dark_grey_500  shadow-md shadow-light_pink dark:shadow-dark_grey_100 border-light_pink dark:border-dark_grey_100">
        <h3 className="font-semibold text-lg text-dark_brown dark:text-white">Exam Type</h3>
        <select className="mt-2 w-full p-2 border rounded dark:bg-gray-500 dark:text-white">
          <option>Term Test</option>
          <option>Final</option>
        </select>
      </div>

      <div className="border mb-4 md:mb-0 rounded-lg p-4 bg-dark_white dark:bg-dark_grey_500 shadow-md shadow-light_pink dark:shadow-dark_grey_100 border-light_pink dark:border-dark_grey_100">
        <h3 className="font-semibold text-lg text-dark_brown dark:text-white mb-4">Select Year</h3>

        <div className="relative h-10 flex items-center">
          {/* Background track */}
          <div className="absolute w-full h-2 bg-gray-200 rounded-md dark:bg-gray-500" />

          {/* Selected range overlay */}
          <div
            className="absolute h-2 bg-dark_brown rounded-md dark:bg-dark_white"
            style={{
              left: `${((startYear - minYear) / (maxYear - minYear)) * 100}%`,
              right: `${100 - ((endYear - minYear) / (maxYear - minYear)) * 100}%`,
            }}
          />

          {/* Start slider */}
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={startYear}
            onChange={handleStartChange}
            className="absolute w-full bg-transparent appearance-none pointer-events-auto"
          />

          {/* End slider */}
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={endYear}
            onChange={handleEndChange}
            className="absolute w-full bg-transparent appearance-none pointer-events-auto"
          />
        </div>

        {/* Year labels */}
        <div className="flex justify-between mt-4 text-sm text-dark_brown dark:text-dark_white">
          <span>Start: {startYear}</span>
          <span>End: {endYear}</span>
        </div>
      </div>
    </>
  );
}
