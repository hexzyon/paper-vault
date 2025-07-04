'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaBook } from 'react-icons/fa';

type SearchItemsProps = {
  results: string[];
}

export default function SearchItems({ results }: SearchItemsProps) {
  return (
    <section className="font-anek text-center mt-8 mb-12">
      <div className="flex items-center justify-center text-center my-2 mb-6 xl:mb-10">
          <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
          <h2 className="text-3xl xl:text-4xl text-dark_brown dark:text-white 2xl:text-5xl">Search Results</h2>
          <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4"></div>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-screen-2xl mx-auto px-4 md:px-0">
        <AnimatePresence>
          {results.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="border rounded-xl p-5 shadow-md shadow-light_pink dark:shadow-dark_grey_100 bg-white dark:bg-dark_grey_500 text-left relative"
            >
              <div className="text-3xl md:text-4xl xl:text-6xl text-red-400 dark:text-white mb-3"><FaBook/></div>
              <span className={`absolute top-3 right-3 text-xs xl:text-lg px-2 py-1 rounded bg-red-100 dark:bg-dark_grey text-red-600 dark:text-white`}>
                Available
              </span>
              <h3 className="text-xl xl:text-3xl text-dark_brown dark:text-white">{item}</h3>
              <button
                className="mt-2 w-full py-1 text-md xl:text-xl text-dark_brown dark:text-dark_grey_100 border border-dark_brown dark:border-dark_grey_100 
                rounded-md hover:bg-dark_brown hover:dark:bg-gray-700 hover:text-white hover:dark:text-white transition-colors"
              >
                View Papers
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
