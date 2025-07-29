import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GradeHeader from "../components/GradeHeader";
import { type Metadata } from 'next';

type Props = {
  params: {
    gradeId: string
  }
}

export default function GradeView({ params }: Props) {
  const { gradeId } = params;

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
        <Header />

        <GradeHeader gradeId={gradeId}/>


        
      </div>
      <Footer/>
    </main>
  );
}