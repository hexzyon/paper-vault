'use client'

import Link from "next/link";

export default function PopularExams() {
    const exams = [
        { title: "Grade 5", subtitle: "Scholarship", img: "/popular_exams/exam1.png", id: "grade5" },
        { title: "G.C.E.", subtitle: "O/L", img: "/popular_exams/exam2.png", id: "grade11" },
        { title: "G.C.E.", subtitle: "A/L", img: "/popular_exams/exam3.png", id: "grade13" }
    ];

    return (
        <section className="text-center py-8 font-anek text-base font-normal md:my-8">
            <div className="flex items-center justify-center md:my-6 mb-4 md:mb-12">
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
                <h2 className="text-3xl text-dark_brown dark:text-white 2xl:text-5xl">Popular Exams</h2>
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 md:overflow-visible px-4 w-full">
                {exams.map((exam, index) => (

                    <Link
                        href={`/grade_view/${exam.id}`}
                        key={index}
                        className="
                relative flex-1 w-full md:max-w-[400px] h-[150px] md:h-[150px] lg:h-[180px] 2xl:h-[250px] xl:h-[220px]
                rounded-xl shadow-md dark:shadow-md border-light_pink border dark:border-dark_grey_100 shadow-light_pink dark:shadow-dark_grey_100 overflow-hidden my-2 md:my-0 py-16 md:py-0
                hover:shadow-lg transition
                bg-white dark:bg-dark_grey_500
            "
                    >
                        <div className="absolute inset-0 bg-white/70 dark:bg-dark_grey_500/70"></div>

                        {(() => {
                            let bgClass = "absolute -inset-1 bg-no-repeat bg-center ";

                            if (exam.id === "grade5") {
                                bgClass += "bg-contain right-5 top-1";
                            } else if (exam.id === "grade11") {
                                bgClass += "bg-contain top-5";
                            } else {
                                bgClass += "bg-contain top-5"; 
                            }

                            return (
                                <div
                                    className={bgClass}
                                    style={{ backgroundImage: `url(${exam.img})` }}
                                ></div>
                            );
                        })()}

                        <div className="relative sm:ml-40 ml-32 md:ml-24 lg:ml-28 xl:ml-40 2xl:ml-44 flex flex-col items-center justify-center text-center h-full">
                            <p className="text-4xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-6xl font-medium text-dark_brown dark:text-white">{exam.title}</p>
                            <p className="text-4xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-medium text-dark_brown dark:text-white">{exam.subtitle}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
}
