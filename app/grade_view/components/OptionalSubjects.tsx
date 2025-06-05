'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaCalculator, FaFlask, FaGlobe, FaLanguage, FaPagelines } from 'react-icons/fa';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Languages'];

type StatusType = 'Available' | 'Coming Soon';

type SubjectCardProps = {
  title: string;
  status: StatusType;
  icon: JSX.Element;
};

const subjectsData: Record<string, SubjectCardProps[]> = {
  'Category 1': [
    { title: 'Mathematics', status: 'Available', icon: <FaCalculator /> },
    { title: 'Science', status: 'Coming Soon', icon: <FaFlask /> },
    { title: 'Buddhism', status: 'Coming Soon', icon: <FaPagelines /> },
    { title: 'Mathematics', status: 'Available', icon: <FaLanguage /> },
    { title: 'History', status: 'Available', icon: <FaBook /> },
    { title: 'ICT', status: 'Coming Soon', icon: <FaGlobe /> },
  ],
  'Category 2': [
    { title: 'Economics', status: 'Available', icon: <FaCalculator /> },
    { title: 'Commerce', status: 'Coming Soon', icon: <FaBook /> },
  ],
  'Category 3': [
    { title: 'Music', status: 'Coming Soon', icon: <FaCalculator /> },
    { title: 'Dance', status: 'Available', icon: <FaPagelines /> },
  ],
  Languages: [
    { title: 'Sinhala', status: 'Available', icon: <FaCalculator /> },
    { title: 'English', status: 'Coming Soon', icon: <FaLanguage /> },
  ],
};

const statusBadge: Record<StatusType, string> = {
  'Available': 'bg-red-100 text-red-600',
  'Coming Soon': 'bg-gray-100 text-gray-600',
};

const SubjectCard = ({ title, status, icon }: SubjectCardProps) => {
  return (
    <motion.div
      layout
      className="relative border font-anek border-red-100 rounded-xl p-4 flex flex-col text-left shadow-sm bg-white dark:bg-dark_grey min-h-[200px]"
    >
      <div className="text-4xl text-red-400 mb-3">{icon}</div>
              <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded ${statusBadge[status]}`}>
                {status}
              </span>
              <h3 className="text-lg font-semibold text-dark_brown dark:text-white">{title}</h3>
              <button
                className="mt-4 w-full py-2 border rounded hover:bg-dark_brown hover:text-white transition-colors"
              >
                View Papers
              </button>
    </motion.div>
  );
};

export default function OptionalSubjects() {
  const [activeCategory, setActiveCategory] = useState('Category 1');
  const [visibleCount, setVisibleCount] = useState(4);

  const subjects = subjectsData[activeCategory] || [];
  const visibleSubjects = subjects.slice(0, visibleCount);

  return (
    <section className="px-4 py-8 max-w-6xl mx-auto text-center font-anek">
      <h2 className="text-2xl text-dark_brown mb-6">Optional Subjects</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(4);
            }}
            className={`px-4 py-1 rounded-full border ${
              cat === activeCategory ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {visibleSubjects.map((subject, index) => (
            <motion.div
              key={subject.title + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SubjectCard {...subject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < subjects.length && (
        <div className="mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-6 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Show More ↓
          </button>
        </div>
      )}
    </section>
  );
}
