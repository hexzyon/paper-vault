'use client'

export default function PopularExams() {
    const exams = [
        { title: "Grade 5", subtitle: "Scholarship", img: "/popular_exams/exam1.png" },
        { title: "G.C.E.", subtitle: "O/L", img: "/popular_exams/exam2.png" },
        { title: "G.C.E.", subtitle: "A/L", img: "/popular_exams/exam3.png" }
    ];

    return (
        <section className="text-center py-8 font-anek text-base font-normal">
            <div className="flex items-center justify-center my-6">
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
                <h2 className="text-3xl text-dark_brown dark:text-white">Popular Exams</h2>
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
            </div>

            <div className="flex md:justify-center md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4">
                {exams.map((exam, index) => (
                    <div
                        key={index}
                        className="
                            relative flex-shrink-0 snap-center
                            w-64 h-36 min-w-64 rounded-xl shadow-md overflow-hidden
                            hover:shadow-lg transition mx-2
                            bg-white dark:bg-dark_grey_500
                        "
                    >
                        
                        <div className="absolute inset-0 bg-white/70 dark:bg-dark_grey_500/70"></div>

                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${exam.img})` }}
                        ></div>

                        <div className="relative z-10 ml-24 flex flex-col items-center justify-center text-center h-full">
                            <p className="text-3xl font-medium text-dark_brown dark:text-white">{exam.title}</p>
                            <p className="text-2xl font-medium text-dark_brown dark:text-white">{exam.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
