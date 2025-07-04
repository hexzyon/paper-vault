"use client"
import appwriteService from "@/appwrite/config";
import { useTheme } from "@/context/theme-context";
import useAuth from "@/context/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
    const { isDark, toggleTheme } = useTheme();
    const router = useRouter();
    const { setAuthStatus } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("")

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const session = await appwriteService.login(formData);
            if (session) {
                setAuthStatus(true)
                router.push("/account")
            } else {
                setError("Invalid Username or Password");
            }
        } catch (error: any) {
            setError(error.message)
        }
    }

    const logoSrc = isDark ? '/Logo_dark.png' : '/Logo.png';

    return (
        <div className="flex items-center justify-center w-full my-10 font-anek">
            <div className={`mx-auto w-full max-w-lg bg-gray-200/50 dark:bg-dark_grey_500 rounded-xl p-10`}>

                <div className="w-full flex justify-center items-center">
                    <Image
                        src={logoSrc}
                        alt="A descriptive alt text"
                        width={100}
                        height={100}
                        className="mb-6"
                    />
                </div>

                <h2 className="text-center text-2xl md:text-3xl font-bold leading-tight text-dark_brown dark:text-white">
                    Sign in to Paper Vault
                </h2>
                {error && <p className="text-red-600 dark:text-red-300 mt-8 text-center">{error}</p>}
                <form onSubmit={login} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-dark_brown dark:text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 text-dark_brown dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    placeholder="Email"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-base font-medium text-dark_brown dark:text-white">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 text-dark_brown dark:text-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold text-xl leading-7 text-white dark:text-dark_grey hover:bg-red-950 dark:hover:bg-gray-400 bg-dark_brown dark:bg-dark_grey_100"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;