"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/theme-context";
import { CircleUserRound } from "lucide-react";

export default function UserHeader() {
    const { isDark, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showExamsDropdown, setShowExamsDropdown] = useState(false);

    const logoSrc = isDark ? '/Logo_dark.png' : '/Logo.png';

    return (
        <>
            <header className="flex justify-between items-center p-4 shadow-2xl bg-white dark:bg-dark_grey text-black rounded-xl max-w-[1440px] mx-auto">
                {/* Logo */}
                <a href="/">
                    <Image
                        src={logoSrc}
                        alt="A descriptive alt text"
                        width={100}
                        height={100}
                    />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 font-anek font-normal text-dark_brown dark:text-dark_white">
                    <a href="/user/account" className="text-xl lg:text-2xl 2xl:text-4xl">Dashboard</a>
                    <a href="/user/past_papers" className="text-xl lg:text-2xl 2xl:text-4xl">Papers</a>
                    <a href="/user/subject_management" className="text-xl lg:text-2xl 2xl:text-4xl">Subjects</a>
                    <a href="/user/grade_management" className="text-xl lg:text-2xl 2xl:text-4xl">Grades</a>
                    <a href="/user/books_management" className="text-xl lg:text-2xl 2xl:text-4xl">Books</a>
                    
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center overflow-hidden rounded-full shadow transition hover:opacity-90"
                    >
                        <div className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center ${isDark ? 'bg-orange' : 'bg-dark_brown'}`}>
                            <img
                                src={isDark ? '/moon.png' : '/sun.png'}
                                alt="Theme Icon"
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                        </div>
                    </button>

                    <button
                        className="flex"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-7 h-7 text-dark_brown dark:text-white" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 611.999 611.999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203 C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578 c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626 h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856 c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626 C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32 c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082 c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826 c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485 c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"></path> <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258 c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258 C323.259,126.96,315.532,119.235,306.001,119.235z"></path> </g> </g> </g> </g></svg>
                        
                    </button>

                    <button
                        className="flex"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <CircleUserRound className="w-9 h-9 text-dark_brown dark:text-white"/>
                    </button>

                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-8 h-8 text-dark_brown dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Fullscreen Dropdown Menu */}
            <div
                className={`
                    fixed inset-0 z-50 bg-dark_white dark:bg-dark_grey text-dark_brown dark:text-white
                    p-6 overflow-y-auto max-h-screen
                    transform transition-transform duration-300 ease-in-out
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                 `}
            >
                {/* Close button */}
                <div className="flex justify-end mb-6">
                    <button onClick={() => setMenuOpen(false)}>
                        <svg className="w-8 h-8 text-dark_brown dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-6 text-lg font-medium">
                    <a href="/user/account" className="block">Dashboard</a>
                    <a href="/user/past_papers" className="block">Papers</a>
                    <a href="/user/subject_management" className="block">Subjects</a>
                    <a href="/user/grade_management" className="block">Grades</a>
                    <a href="/user/books_management" className="block">Books</a>

                </nav>
            </div>




        </>
    );
}
