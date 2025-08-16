'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaCalculator, FaCaretDown, FaFlask, FaGlobe, FaLanguage, FaPagelines } from 'react-icons/fa';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Languages'];

type StatusType = 'Available' | 'Coming Soon';

type SubjectCardProps = {
  title: string;
  status: StatusType;
  icon: JSX.Element;
};

const statusBadge: Record<StatusType, string> = {
  'Available': 'bg-light_pink text-black dark:bg-dark_grey dark:text-white',
  'Coming Soon': 'bg-gray-200 text-black dark:bg-gray-500 dark:text-white',
};

type Props = {
  gradeId: string;
  subjects: {
    $id: string;
    subject_name: string;
    icon_url: string;
  }[];
};

export default function OptionalSubjects({ gradeId, subjects }: Props) {
  const [visibleCount, setVisibleCount] = useState(4)
  const router = useRouter()

  if (!subjects.length) return null;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  const handleViewPapers = (subjectId: string) => {
    router.push(`/subject_view/${subjectId}?gradeId=${gradeId}`)
  }

  return (
    <section className="pt-10 pb-4 font-anek text-center">
      <div className="flex items-center justify-center text-center my-2 mb-6 xl:mb-10">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
        <h2 className="text-2xl md:text-3xl xl:text-4xl text-dark_brown dark:text-white 2xl:text-5xl">Optional Subjects</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-screen-2xl mx-auto px-0 md:px-0">
        <AnimatePresence>
          {subjects.slice(0, visibleCount).map((subject) => (
            <motion.div
              key={subject.$id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border rounded-xl px-2 md:px-3 py-5 shadow-md shadow-light_pink dark:shadow-dark_grey_100 bg-white dark:bg-dark_grey_500 text-left relative"
            >
              <div className="text-3xl md:text-4xl xl:text-6xl text-red-400 mb-3">{subject.icon_url ? (
                <img src={subject.icon_url} alt="Grade Icon" className="w-8 h-8 object-contain" />
              ) : (
                <Upload className="w-6 h-6 text-rose-500 dark:text-white" />
              )}</div>
              <span className={`absolute top-3 right-3 text-[10px] xl:text-lg px-2 py-1 rounded ${statusBadge['Available']}`}>
                Available
              </span>
              <h3 className="text-lg md:text-xl xl:text-3xl text-dark_brown dark:text-white">{subject.subject_name}</h3>
              <button
                className="mt-2 w-full py-1 text-md xl:text-xl text-dark_brown dark:text-white border border-dark_brown dark:border-white 
                rounded-md hover:bg-dark_brown hover:dark:bg-gray-700 hover:text-white hover:dark:text-white transition-colors"
                onClick={() => handleViewPapers(subject.$id)}
              >
                View Papers
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < subjects.length && (
        <div className="mt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 border border-dark_brown shadow-sm bg-white dark:bg-dark_grey_500 shadow-light_pink dark:shadow-dark_grey_100 
            rounded-xl text-dark_brown dark:text-white hover:bg-dark_brown hover:dark:bg-gray-700 
            hover:text-white hover:dark:text-white mb-8 transition-colors"
          >
            <div className='flex'>Show More <FaCaretDown className='mt-1' /></div>
          </button>
        </div>
      )}
    </section>
  )
}
