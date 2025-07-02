"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import Login from "@/components/ui/Login";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const LoginPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/user/account");
        return <></>;
    }

    return(
        <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
        <Header />
        <Login />
        
      </div>
      <Footer/>
    </main>
    )
}


export default LoginPage;