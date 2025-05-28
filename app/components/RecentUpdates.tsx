const papers = [
  { title: "2023 Grade 11 Maths Paper - ", medium: "Sinhala Medium", province: "Western Province", term: "Third Term", updated: "2023/01/20" },
  { title: "2023 Grade 11 Maths Paper - ", medium: "Sinhala Medium", province: "Western Province", term: "Third Term", updated: "2023/01/20" },
  { title: "2023 Grade 11 Maths Paper - ", medium: "Sinhala Medium", province: "Western Province", term: "Third Term", updated: "2023/01/20" },
];

export default function RecentUpdates() {
  return (
    <section className="py-8 font-anek items-center justify-center p-4">
      <div className="flex items-center justify-center my-6">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
        <h2 className="text-3xl text-dark_brown dark:text-white text-center 2xl:text-5xl">Recently Updated</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {papers.map((paper, idx) => (
          <div key={idx} className="w-full p-4 border border-light-pink rounded-lg shadow bg-white dark:bg-dark_grey_500 dark:bg-opacity-30 text-dark_brown">
            <p className="font-medium text-black dark:text-white text-2xl 2xl:text-3xl xl:text-2xl">{paper.title}</p>
            <p className="font-medium text-black dark:text-white text-md 2xl:text-xl xl:text-lg">{paper.medium}</p>
            <p className="font-medium text-md text-gray-600 dark:text-white 2xl:text-xl xl:text-lg">{paper.province}</p>
            <p className="inline-block bg-light_pink dark:bg-dark_grey px-2 py-1 rounded text-xs text-black dark:text-white 2xl:text-lg  xl:text-md">{paper.term}</p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
              <p className="text-sm text-gray-500 dark:text-dark_white 2xl:text-lg">Updated: {paper.updated}</p>
              <button className="mt-2 md:mt-0 bg-orange text-white py-1 px-4 rounded hover:bg-dark-brown transition 2xl:text-xl">Download</button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
