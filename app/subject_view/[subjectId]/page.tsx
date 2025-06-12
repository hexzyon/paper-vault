"use client"
import Footer from "@/app/components/Footer";
import FilterSidebar from "../components/FilterSideBar";
import PaperCard from "../components/PageCard";
import Header from "@/app/components/Header";
import FilterContent from "../components/FilterSideBar";
import { useState } from "react";
import { Filter } from "lucide-react";

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
    const [showFilters, setShowFilters] = useState(false);

    return (
        <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
            <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
                <Header />
                <div className="flex flex-col md:flex-row font-anek">

                    <aside className="md:w-1/4 w-full pr-4 py-4">
                        {/* Desktop Panel */}
                        <div className="hidden md:block space-y-6">
                            <FilterContent />
                        </div>
                    </aside>

                    <main className="flex-1 pl-0 md:pl-4 py-3 mt-4 md:border-l md:border-dark_grey_500">
                        <h1 className="text-2xl md:text-4xl font-bold text-dark_brown dark:text-white mb-4 mx-2">
                            Grade 11 Maths Past Papers
                        </h1>

                        <div className="w-full">
                            {/* Row with Filter and Search */}
                            <div className="w-full flex px-0 py-2 gap-2">
                                {/* Filter button - 1/4 */}
                                <div className="w-1/4 md:hidden">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="w-full px-4 py-3 border border-dark_grey_500 text-dark_brown dark:text-white rounded"
                                    >
                                        <div className="flex">
                                            <Filter className="text-dark_brown dark:text-white w-4 mr-2" />
                                            {showFilters ? "Hide" : "Filter"}
                                        </div>

                                    </button>
                                </div>

                                {/* Search input - 3/4 */}
                                <div className="w-3/4 md:w-full">
                                    <input
                                        type="text"
                                        placeholder="Search Papers..."
                                        className="w-full border border-dark_grey_500 rounded-lg px-4 py-2 text-lg dark:bg-dark_grey dark:text-white dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Full-width filter panel (mobile or small screen) */}
                            {showFilters && (
                                <div className="w-full mt-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                    <FilterContent />
                                </div>
                            )}
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
