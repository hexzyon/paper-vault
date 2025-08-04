"use client"
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";
import { Link } from "lucide-react";


interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string
    children?: React.ReactNode
}

const components = [
    {
        title: "G.C.E A/L Exam",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "G.C.E O/L Exam",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted .",
    },
    {
        title: "Grade 5 Scholarship",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator ",
    },
    {
        title: "Provincial Exams",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Divisional Exams",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "School Based Exams",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function Header() {
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
                <nav className="hidden md:flex space-x-10 font-anek font-normal text-dark_brown dark:text-dark_white">
                    <a href="/" className="text-xl lg:text-2xl 2xl:text-4xl">Home</a>
                    <a href="/subject_view/marking" className="text-xl lg:text-2xl 2xl:text-4xl">Markings</a>
                    <a href="#" className="text-xl lg:text-2xl 2xl:text-4xl">Books</a>
                    <div className="relative z-50">
                        <NavigationMenu className="z-50 bg-white dark:bg-dark_grey text-dark_brown dark:text-white">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="
                                        z-50 text-xl lg:text-2xl 2xl:text-4xl 
                                      text-dark_brown dark:!text-white 
                                      bg-white dark:!bg-dark_grey 
                                      hover:bg-dark_white dark:hover:!bg-dark_grey_300
                                      data-[state=open]:bg-dark_white dark:data-[state=open]:!bg-dark_grey_300
                                      data-[state=open]:text-dark_brown dark:data-[state=open]:!text-white
                                        transition-colors pb-4 lg:pb-3
                                        ">
                                        Exams
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="z-50 bg-white dark:bg-dark_grey text-dark_brown dark:text-white">
                                        <ul className="grid w-[200px] gap-3 p-4">
                                            {components.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    href={component.href}
                                                />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <a href="/about_us" className="text-xl lg:text-2xl 2xl:text-4xl">About Us</a>
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
                    <a href="/" className="block">Home</a>
                    <a href="#" className="block">Markings</a>
                    <a href="#" className="block">Books</a>

                    {/* Exams Dropdown */}
                    <div>
                        <button
                            className="flex items-center justify-between w-full"
                            onClick={() => setShowExamsDropdown(!showExamsDropdown)}
                        >
                            <span>Exams</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${showExamsDropdown ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showExamsDropdown && (
                            <ul className="pl-4 mt-3 space-y-2 text-sm text-dark_brown dark:text-white">
                                {components.map((component) => (
                                    <li key={component.title}>
                                        <a href={component.href} className="block">
                                            {component.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <a href="/about_us" className="block">About Us</a>
                </nav>
            </div>




        </>
    );
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-AnekBangla leading-none">{title}</div>
                        {children}
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);

ListItem.displayName = "ListItem";