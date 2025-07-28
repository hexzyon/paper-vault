import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GradeHeader from "../components/GradeHeader";
import { type Metadata } from 'next'
import OptionalSubjects from "../components/OptionalSubjects";
import MainSubjects from "../components/MainSubjects";

type Props = {
  params: {
    gradeId: string
  }
}

const validGrades = ['6874b3fd002287a1f192', 'grade11', 'grade13'];

export default function GradeView({ params }: Props) {
  const { gradeId } = params;

  const isValid = validGrades.includes(gradeId);

  if (!isValid) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Invalid grade {gradeId}
      </main>
    );
  }

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