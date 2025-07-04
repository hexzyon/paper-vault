"use client";

import { useState } from "react";
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

        <div className="flex justify-between items-center mb-6 mt-7">
          <h1 className="text-2xl lg:text-3xl 2xl:text-4xl text-dark_brown dark:text-white">
            Past Paper/Markings Management
          </h1>
          <button
            className="flex items-center gap-2 text-lg lg:text-xl 2xl:text-2xl bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className="w-5 h-5" />
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
