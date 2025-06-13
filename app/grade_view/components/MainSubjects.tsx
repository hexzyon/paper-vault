'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' 
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBook, FaFlask, FaCalculator, FaGlobe, FaLanguage,
  FaPagelines, FaCaretDown
} from 'react-icons/fa'

type StatusType = 'Available' | 'Coming Soon'

const mainSubjects: {
  id: number
  name: string
  icon: JSX.Element
  status: StatusType
}[] = [
  { id: 1, name: 'Mathematics', icon: <FaCalculator />, status: 'Available' },
  { id: 2, name: 'Science', icon: <FaFlask />, status: 'Coming Soon' },
  { id: 3, name: 'Buddhism', icon: <FaPagelines />, status: 'Coming Soon' },
  { id: 4, name: 'English', icon: <FaLanguage />, status: 'Available' },
  { id: 5, name: 'History', icon: <FaBook />, status: 'Available' },
  { id: 6, name: 'Geography', icon: <FaGlobe />, status: 'Coming Soon' },
]

const statusBadge: Record<StatusType, string> = {
  'Available': 'bg-light_pink text-black dark:bg-dark_grey dark:text-white',
  'Coming Soon': 'bg-gray-200 text-black dark:bg-gray-500 dark:text-white',
}

type Props = {
  gradeId: string
}

export default function MainSubjects({ gradeId }: Props) {
  const [visibleCount, setVisibleCount] = useState(4)
  const router = useRouter() 

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  const handleViewPapers = (subjectId: number) => {
    router.push(`/subject_view/${subjectId}?gradeId=${gradeId}`)
  }

  return (
    <section className="pt-10 pb-4 font-anek text-center">
      <div className="flex items-center justify-center text-center my-2 mb-6 xl:mb-10">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
        <h2 className="text-3xl xl:text-4xl text-dark_brown dark:text-white 2xl:text-5xl">Main Subjects</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-screen-2xl mx-auto px-4 md:px-0">
        <AnimatePresence>
          {mainSubjects.slice(0, visibleCount).map((subject) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border rounded-xl p-5 shadow-md shadow-light_pink dark:shadow-dark_grey_100 bg-white dark:bg-dark_grey_500 text-left relative"
            >
              <div className="text-3xl md:text-4xl xl:text-6xl text-red-400 mb-3">{subject.icon}</div>
              <span className={`absolute top-3 right-3 text-xs xl:text-lg px-2 py-1 rounded ${statusBadge[subject.status]}`}>
                {subject.status}
              </span>
              <h3 className="text-xl xl:text-3xl text-dark_brown dark:text-white">{subject.name}</h3>
              <button
                className="mt-2 w-full py-1 text-md xl:text-xl text-dark_brown dark:text-dark_grey_100 border border-dark_brown dark:border-dark_grey_100 
                rounded-md hover:bg-dark_brown hover:dark:bg-gray-700 hover:text-white hover:dark:text-white transition-colors"
                onClick={() => handleViewPapers(subject.id)} 
              >
                View Papers
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < mainSubjects.length && (
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
