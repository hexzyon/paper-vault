import Image from "next/image";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PopularExams from "./components/PopularExams";
import GradeSelector from "./components/GradeSelector";
import RecentUpdates from "./components/RecentUpdates";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
        <Header />
        <HeroSection />
        <PopularExams/>
        <GradeSelector/>
        <RecentUpdates/>
        
      </div>
      <Footer/>
    </main>
  );
}
