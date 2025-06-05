'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBook, FaFlask, FaCalculator, FaGlobe, FaLanguage, FaPagelines } from 'react-icons/fa'

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
  'Available': 'bg-red-100 text-red-600',
  'Coming Soon': 'bg-gray-100 text-gray-600',
}

export default function MainSubjects() {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  return (
    <section className="py-10 font-anek text-center">
      <h2 className="text-3xl mb-8 text-dark_brown dark:text-white">Main Subjects</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        <AnimatePresence>
          {mainSubjects.slice(0, visibleCount).map((subject) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border rounded-xl p-5 shadow-md bg-white dark:bg-dark_grey text-left relative"
            >
              <div className="text-4xl text-red-400 mb-3">{subject.icon}</div>
              <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded ${statusBadge[subject.status]}`}>
                {subject.status}
              </span>
              <h3 className="text-lg font-semibold text-dark_brown dark:text-white">{subject.name}</h3>
              <button
                className="mt-4 w-full py-2 border rounded hover:bg-dark_brown hover:text-white transition-colors"
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
            className="px-6 py-2 border rounded-xl text-dark_brown hover:bg-dark_brown hover:text-white transition-colors"
          >
            Show More ⌄
          </button>
        </div>
      )}
    </section>
  )
}
