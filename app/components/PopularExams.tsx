'use client'

export default function PopularExams() {
    const exams = [
        { title: "Grade 5", subtitle: "Scholarship", img: "/popular_exams/exam1.png" },
        { title: "G.C.E.", subtitle: "O/L", img: "/popular_exams/exam2.png" },
        { title: "G.C.E.", subtitle: "A/L", img: "/popular_exams/exam3.png" }
    ];

    return (
        <section className="text-center py-8 font-anek text-base font-normal my-8">
            <div className="flex items-center justify-center my-6 mb-12">
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
                <h2 className="text-3xl text-dark_brown dark:text-white 2xl:text-5xl">Popular Exams</h2>
                <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 md:overflow-visible px-4 w-full">
                {exams.map((exam, index) => (
                    <div
                        key={index}
                        className="
                relative flex-1 w-full md:max-w-[400px] h-[150px] md:h-[150px] lg:h-[180px] 2xl:h-[250px] xl:h-[220px]
                rounded-xl shadow-lg border-light_pink border dark:border-dark_grey_100 shadow-light_pink dark:shadow-dark_grey_100 overflow-hidden my-2 md:my-0 py-16 md:py-0
                hover:shadow-lg transition
                bg-white dark:bg-dark_grey_500
            "
                    >
                        <div className="absolute inset-0 bg-white/70 dark:bg-dark_grey_500/70"></div>

                        <div
                            className="absolute inset-0 bg-contain md:bg-cover bg-no-repeat bg-center "
                            style={{ backgroundImage: `url(${exam.img})` }}
                        ></div>

                        <div className="relative sm:ml-40 ml-36 md:ml-28 lg:ml-32 xl:ml-44 2xl:ml-48 flex flex-col items-center justify-center text-center h-full">
                            <p className="text-4xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-6xl font-medium text-dark_brown dark:text-white">{exam.title}</p>
                            <p className="text-4xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-medium text-dark_brown dark:text-white">{exam.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
