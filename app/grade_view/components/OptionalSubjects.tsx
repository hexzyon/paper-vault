'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaCalculator, FaCaretDown, FaFlask, FaGlobe, FaLanguage, FaPagelines } from 'react-icons/fa';

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
  'Available': 'bg-light_pink text-black dark:bg-dark_grey dark:text-white',
  'Coming Soon': 'bg-gray-200 text-black dark:bg-gray-500 dark:text-white',
};

const SubjectCard = ({ title, status, icon }: SubjectCardProps) => {
  return (
    <motion.div
      layout
      className="border rounded-xl px-2 md:px-3 py-5 shadow-md shadow-light_pink dark:shadow-dark_grey_100 bg-white dark:bg-dark_grey_500 text-left relative"
    >
      <div className="text-3xl md:text-4xl xl:text-6xl text-red-400 mb-3">{icon}</div>
              <span className={`absolute top-3 right-3 text-[10px] xl:text-lg px-2 py-1 rounded ${statusBadge[status]}`}>
                {status}
              </span>
              <h3 className="text-lg md:text-xl xl:text-3xl text-dark_brown dark:text-white">{title}</h3>
              <button
                className="mt-2 w-full py-1 text-md xl:text-xl text-dark_brown dark:text-white border border-dark_brown dark:border-white
                rounded-md hover:bg-dark_brown hover:dark:bg-gray-700 hover:text-white hover:dark:text-white transition-colors"
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
    <section className="px-0 md:px-0 pt-2 pb-10  max-w-screen-2xl mx-auto text-center font-anek">
      <div className="flex items-center justify-center text-center my-2 mb-6 xl:mb-10">
          <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
          <h2 className="text-2xl md:text-3xl text-dark_brown dark:text-white xl:text-4xl 2xl:text-5xl">Optional Subjects</h2>
          <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
        </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(4);
            }}
            className={`px-2 md:px-4 py-1 rounded-full border text-sm md:text-md xl:text-lg shadow-sm shadow-light_pink dark:shadow-dark_grey_100 ${
              cat === activeCategory ? 'bg-dark_brown text-white dark:bg-gray-800 dark:text-white' 
              : 'bg-white text-dark_brown dark:bg-dark_grey_500 dark:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-screen-2xl mx-auto my-10 ">
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
            className="px-6 py-2 border border-dark_brown shadow-sm bg-white dark:bg-dark_grey_500 shadow-light_pink dark:shadow-dark_grey_100 
            rounded-xl text-dark_brown dark:text-white hover:bg-dark_brown hover:dark:bg-gray-700 
            hover:text-white hover:dark:text-white transition-colors"
          >
            <div className='flex'>Show More <FaCaretDown className='mt-1'/></div>
          </button>
        </div>
      )}
    </section>
  );
}
