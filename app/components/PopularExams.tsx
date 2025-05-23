export default function PopularExams() {
    const exams = ["Grade 5 Scholarship", "G.C.E Ordinary Level", "G.C.E Advanced Level"];
    return (
        <section className="text-center py-8 font-anek text-base font-normal">
            <div className="flex items-center justify-center my-6">
                <div className="w-1/12 border-t-2 border-dark_brown mx-4"></div>
                <h2 className="text-2xl text-dark_brown text-center">Popular Exams</h2>
                <div className="w-1/12 border-t-2 border-dark_brown mx-4"></div>
            </div>

            <div className="flex justify-center gap-4">
                <div className="relative border p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition text-dark-brown w-60">
                    <img
                        src="/book.png"
                        alt="Icon"
                        className="w-6 h-6 absolute top-4 left-4"
                    />
                    <div className="flex flex-col items-center justify-center h-full text-center mt-4">
                        <p className="text-3xl font-medium text-dark_brown">Grade 5</p>
                        <p className="text-2xl font-medium text-dark_brown">Scholarship</p>
                    </div>
                </div>

                <div className="relative border p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition text-dark-brown w-60">
                    <img
                        src="/book-open.png"
                        alt="Icon"
                        className="w-6 h-6 absolute top-4 left-4"
                    />
                    <div className="flex flex-col items-center justify-center h-full text-center mt-4">
                        <p className="text-3xl font-medium text-dark_brown">G.C.E</p>
                        <p className="text-2xl font-medium text-dark_brown"><span className="text-orange">O</span>rdinary <span className="text-orange">L</span>evel</p>
                    </div>
                </div>

                <div className="relative border p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition text-dark-brown w-60">
                    <img
                        src="/exam.png"
                        alt="Icon"
                        className="w-5 h-6 absolute top-4 left-4"
                    />
                    <div className="flex flex-col items-center justify-center h-full text-center mt-4">
                        <p className="text-3xl font-medium text-dark_brown">G.C.E</p>
                        <p className="text-2xl font-medium text-dark_brown"><span className="text-orange">A</span>dvanced <span className="text-orange">L</span>evel</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
