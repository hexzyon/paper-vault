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

    const { isDark, toggleTheme } = useTheme()

    const logoSrc = isDark ? '/Logo_dark.png' : '/Logo.png'

    return (
        <header className="flex justify-between items-center p-4 shadow-xl bg-white text-black rounded-xl">
            <Image
                src={logoSrc}
                alt="A descriptive alt text"
                width={100}
                height={100}
                className=""
            />
            <nav className="flex space-x-10 font-anek font-normal">
                <a href="#" className="text-2xl">Home</a>
                <a href="#" className="text-2xl">Markings</a>
                <div className="relative z-50">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-[25px]">Exams</NavigationMenuTrigger>
                                <NavigationMenuContent className="z-50">
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
                <a href="#" className="text-2xl">About Us</a>
            </nav>
            <div>
                <button
                    onClick={toggleTheme}
                    className="flex items-center overflow-hidden rounded-full shadow transition hover:opacity-90"
                >
                    <div className={`w-10 h-10 flex items-center justify-center ${isDark ? 'bg-light_pink' : 'bg-dark_brown'}`}>
                        <img
                            src={isDark ? '/moon.png' : '/sun.png'}
                            alt="Theme Icon"
                            className="w-5 h-5"
                        />
                    </div>
                </button>


            </div>
        </header>
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
        )
    }
)

ListItem.displayName = "ListItem"
