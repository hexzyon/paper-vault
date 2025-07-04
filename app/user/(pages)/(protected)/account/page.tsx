import ManageSubjectsCard from "@/components/ui/ManageSubjectsCard";
import PopularDownloadsChart from "@/components/ui/PopularDownloadsChart";
import RecentUploads from "@/components/ui/RecentUploads";
import StatCard from "@/components/ui/StatCard";
import UploadPaperCard from "@/components/ui/UploadPaperCard";
import UserActivityChart from "@/components/ui/UserActivityChart";
import UserHeader from "@/components/ui/UserHeader";
import { Book, Download, Files, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccountPage = () => {
    return (
        <main className="bg-white dark:bg-dark_grey min-h-screen text-black font-anek overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
                <UserHeader />
                <h1 className="text-2xl lg:text-4xl 2xl:text-5xl mt-8 mb-6 text-dark_brown dark:text-white">Dashboard Overview</h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                    <StatCard label="Total Papers" value="2,451" icon={Files} />
                    <StatCard label="Total Subjects" value="42" icon={Book} />
                    <StatCard label="Downloads" value="4,000" icon={Download} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <ManageSubjectsCard />
                    <UploadPaperCard />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RecentUploads />
                    <UserActivityChart />
                </div>

                <div className="grid gap-4">   
                    <PopularDownloadsChart />
                </div>

                <div className="w-full flex justify-center my-10">
                    <Link
                        href={"/user/logout"}
                        className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default AccountPage;