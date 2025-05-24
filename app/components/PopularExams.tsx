export default function PopularExams() {
    const exams = ["Grade 5 Scholarship", "G.C.E Ordinary Level", "G.C.E Advanced Level"];
    return (
        <section className="text-center py-8 font-anek text-base font-normal">
            <div className="flex items-center justify-center my-6">
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
                <h2 className="text-3xl text-dark_brown dark:text-white text-center">Popular Exams</h2>
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
            </div>

            <div className="flex justify-center gap-3">
                <div className="relative w-64 h-36 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    
                    <div className="absolute inset-0 bg-white/70 dark:bg-dark_grey_500/70"></div>
                    <div className="absolute inset-0 bg-[url('/popular_exams/exam1.png')] bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-full ml-24">
                        <p className="text-3xl font-medium text-dark_brown dark:text-white">Grade 5</p>
                        <p className="text-2xl font-medium text-dark_brown dark:text-white">Scholarship</p>
                    </div>
                </div>

                <div className="relative w-64 h-36 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    
                    <div className="absolute inset-0 bg-white/70 dark:bg-dark_grey_500/70"></div>
                    <div className="absolute inset-0 bg-[url('/popular_exams/exam2.png')] bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-full ml-24">
                        <p className="text-3xl font-medium text-dark_brown dark:text-white">G.C.E.</p>
                        <p className="text-2xl font-medium text-dark_brown dark:text-white">O/L</p>
                    </div>
                </div>

                <div className="relative w-64 h-36 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                    
                    <div className="absolute inset-0 bg-white/70 dark:bg-dark_grey_500/70"></div>
                    <div className="absolute inset-0 bg-[url('/popular_exams/exam3.png')] bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-full ml-24">
                        <p className="text-3xl font-medium text-dark_brown dark:text-white">G.C.E.</p>
                        <p className="text-2xl font-medium text-dark_brown dark:text-white">A/L</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
