const papers = [
    { title: "2023 Grade 11 Maths Paper - ",medium: "Sinhala Medium",province:"Western Province",term:"Third Term", updated: "2023/01/20" },
    { title: "2023 Grade 11 Maths Paper - ",medium: "Sinhala Medium",province:"Western Province",term:"Third Term", updated: "2023/01/20" },
    { title: "2023 Grade 11 Maths Paper - ",medium: "Sinhala Medium",province:"Western Province",term:"Third Term", updated: "2023/01/20" },
  ];
  
  export default function RecentUpdates() {
    return (
      <section className="py-8 font-anek">
        <div className="flex items-center justify-center my-6">
                <div className="w-1/12 border-t-2 border-dark_brown mx-4"></div>
                <h2 className="text-2xl text-dark_brown text-center">Recently Updated</h2>
                <div className="w-1/12 border-t-2 border-dark_brown mx-4"></div>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {papers.map((paper, idx) => (
            <div key={idx} className="max-w-sm mx-auto p-4 border border-light-pink rounded-lg shadow bg-white text-dark-brown">
              <p className="font-medium">{paper.title}</p>
              <p className="font-medium">{paper.medium}</p>
              <p className="font-medium text-sm text-gray-600">{paper.province}</p>
              <p className="inline-block bg-light_pink px-2 py-1 rounded text-xs">{paper.term}</p>
              <div className="flex">
              <p className="text-sm text-gray-500 mt-8 pr-12">Updated: {paper.updated}</p>
              <button className="mt-4 ml-10 bg-orange text-white py-1 px-4 rounded hover:bg-dark-brown transition">Download</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  