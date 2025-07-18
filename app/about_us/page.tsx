import { FaRegEye, FaRegCompass } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CrosshairIcon } from "lucide-react";

export default function Page() {
    return (
        <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
            <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
                <Header />

                <section className="px-0 py-12 text-dark_brown dark:text-dark_white text-center font-anek">
                    {/* Header */}
                    <h2 className="text-4xl md:text-5xl mb-4">About Paper Vault</h2>
                    <p className="max-w-screen-2xl mx-auto text-sm sm:text-sm md:text-base lg:text-xl mb-10 leading-relaxed">
                        Paper Vault is Sri Lanka's premier digital repository of past examination papers, marking schemes.<br className="hidden sm:flex"/>
                        Founded in 2025, we aim to make quality educational materials accessible to students across all<br className="hidden sm:flex"/>
                        provinces of Sri Lanka.
                    </p>

                    {/* Mission and Vision */}
                    <div className="flex flex-col gap-6 items-center mb-12 px-8">
                        {/* Mission Card */}
                        <div className="bg-white dark:bg-dark_grey_500 border border-light_pink dark:border-gray-500 rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_500 px-0 py-5 w-full max-w-screen-2xl transition duration-300">
                            <h3 className="text-xl sm:text-3xl md:text-4xl flex items-center justify-center gap-2 mb-2">
                                <CrosshairIcon className="text-xl sm:text-2xl md:text-3xl" />
                                Our Mission
                            </h3>
                            <p className="text-sm sm:text-sm md:text-base lg:text-xl leading-relaxed mx-5">
                                To empower students by providing a reliable and accessible platform for past papers,<br className="hidden sm:flex"/>
                                helping them improve their knowledge and achieve academic success.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white dark:bg-dark_grey_500 border border-light_pink dark:border-gray-500 rounded-xl shadow-md shadow-light_pink dark:shadow-dark_grey_500 px-0 py-5 w-full max-w-screen-2xl transition duration-300">
                            <h3 className="text-xl sm:text-3xl md:text-4xl flex items-center justify-center gap-2 mb-2">
                                <FaRegEye className="text-xl sm:text-2xl md:text-3xl" />
                                Our Vision
                            </h3>
                            <p className="text-sm sm:text-sm md:text-base lg:text-xl leading-relaxed mx-5">
                                To be the leading online resource for Sri Lankan students, ensuring every learner has <br className="hidden sm:flex"/>
                                the tools they need to excel in their exams.
                            </p>
                        </div>
                    </div>

                    {/* What We Do */}
                    <div className="px-2">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What We Do ?</h3>
                        <ul className="text-sm sm:text-base md:text-base lg:text-xl space-y-2 max-w-2xl mx-auto">
                            <li>Provide past papers for various subjects and grades.</li>
                            <li>Ensure free and easy access to exam resources.</li>
                            <li>Help students practice and enhance their exam performance.</li>
                        </ul>
                    </div>
                </section>

            </div>
            <Footer />
        </main>

    );
}
