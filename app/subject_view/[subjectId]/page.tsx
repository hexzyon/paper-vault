"use client"
import Footer from "@/app/components/Footer";
import FilterSidebar from "../components/FilterSideBar";
import PaperCard from "../components/PageCard";
import Header from "@/app/components/Header";

export default function Page() {
    const papers = [
        {
            title: "2023 Grade 11 Maths Paper - Sinhala Medium",
            region: "Western province",
            term: "Third Term",
        },
        {
            title: "2022 Grade 11 Maths Paper - Sinhala Medium",
            region: "Western province",
            term: "Second Term",
        },
    ];

    return (
        <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
            <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
                <Header />
                <div className="flex flex-col md:flex-row font-anek">
                    <FilterSidebar />
                    <main className="flex-1 px-4 md:px-8 py-3 mt-4">
                        <h1 className="text-2xl md:text-4xl font-bold text-dark_brown dark:text-white mb-4 mx-2">
                            Grade 11 Maths Past Papers
                        </h1>

                        <div className="w-full px-0 py-2">
                            <input
                                type="text"
                                placeholder="Search Papers..."
                                className="w-full border rounded-lg px-4 py-2 text-lg dark:bg-dark_grey dark:text-white dark:border-gray-600"
                            />
                        </div>

                        <div className="mt-4">
                            {papers.map((paper, index) => (
                                <PaperCard key={index} {...paper} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </main>
    );
}
