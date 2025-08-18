"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/theme-context";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

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

                    <details className="relative">
                        <summary className="list-none cursor-pointer flex">
                            <CircleUserRound className="w-9 h-9 text-dark_brown dark:text-white" />
                        </summary>

                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
                            <ul className="py-2">
                                <li>
                                    <Link
                                        href="/user/logout"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </details>

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
