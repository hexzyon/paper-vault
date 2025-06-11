"use client"

export default function FilterSidebar() {
  return (
    <aside className="md:w-1/4 w-full p-4">
      {/* Mobile Toggle Button */}
      <details className="md:hidden mb-4">
        <summary className="cursor-pointer px-4 py-2 bg-dark_brown text-white rounded">
          Filter By
        </summary>

        {/* Filters Panel (Mobile) */}
        <div className="mt-4 space-y-6">
          <FilterContent />
        </div>
      </details>

      {/* Desktop Panel */}
      <div className="hidden md:block space-y-6">
        <FilterContent />
      </div>
    </aside>
  );
}

function FilterContent() {
  return (
    <>
        <div className="text-3xl pt-4 mx-1 text-dark_brown dark:text-white">
            <h1>Filter By</h1>
        </div>
      <div className="border rounded-lg p-2 shadow-sm">
        <h3 className="font-semibold text-lg dark:text-white">Language</h3>
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

      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg dark:text-white">Exam Type</h3>
        <select className="mt-2 w-full p-2 border rounded dark:bg-dark_grey dark:text-white">
          <option>Term Test</option>
          <option>Final</option>
        </select>
      </div>

      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg dark:text-white">Select Year</h3>
        <div className="mt-2">
          <input type="range" min="2000" max="2025" defaultValue="2014" className="w-full" />
          <div className="flex justify-between text-xs text-dark_brown dark:text-dark_white">
            <span>2000</span>
            <span>2025</span>
          </div>
        </div>
      </div>
    </>
  );
}
