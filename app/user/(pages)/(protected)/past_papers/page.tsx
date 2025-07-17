"use client";

import { useEffect, useState } from "react";
import PaperTable from "@/components/ui/PaperTable";
import AddNewPaperModal from "@/components/ui/AddNewPaperModal";
import { PlusCircle } from "lucide-react";
import UserHeader from "@/components/ui/UserHeader";

export default function PastPapersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black font-anek overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto mb-6">
        <UserHeader />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-6">
          <h1 className="text-2xl flex-1 lg:text-3xl text-center md:text-start 2xl:text-4xl text-dark_brown dark:text-white">
            Past Paper/Markings Management
          </h1>
          <button
            className="inline-flex items-center justify-center w-fit bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-base mx-auto md:mx-0"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Paper
          </button>
        </div>

        <PaperTable />

        {isModalOpen && (
          <AddNewPaperModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>


    </main>
  );
}
