'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FilterContent from '@/app/subject_view/components/FilterSideBar'
import PaperCard from '@/app/subject_view/components/PageCard'
import { dummyPapers } from '@/app/subject_view/data'
import { Filter } from 'lucide-react'

export default function SubjectViewPage() {
  const params = useParams<{ subjectId: string }>()
  const searchParams = useSearchParams()
  const gradeId = searchParams.get('gradeId') || ''

  const subjectId = params.subjectId
  const [showFilters, setShowFilters] = useState(false)

  const filteredPapers = dummyPapers.filter(
    (paper) => paper.subjectId === subjectId && paper.gradeId === gradeId
  )

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
        <Header />
        <div className="flex flex-col md:flex-row font-anek">
          <aside className="md:w-1/4 w-full pr-4 py-4">
            <div className="hidden md:block space-y-6">
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1 pl-0 md:pl-4 py-3 mt-4 md:border-l md:border-dark_grey_500">
            <h1 className="text-2xl md:text-4xl font-bold text-dark_brown dark:text-white mb-4 mx-2">
              Grade {gradeId.replace('grade', '')} Subject {subjectId} Past Papers
            </h1>

            <div className="w-full">
              <div className="w-full flex px-0 py-2 gap-2">
                <div className="w-1/4 md:hidden">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full px-4 py-3 border border-dark_grey_500 text-dark_brown dark:text-white rounded"
                  >
                    <div className="flex">
                      <Filter className="text-dark_brown dark:text-white w-4 mr-2" />
                      {showFilters ? 'Hide' : 'Filter'}
                    </div>
                  </button>
                </div>

                <div className="w-3/4 md:w-full">
                  <input
                    type="text"
                    placeholder="Search Papers..."
                    className="w-full border border-dark_grey_500 rounded-lg px-4 py-2 text-lg dark:bg-dark_grey dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>

              {showFilters && (
                <div className="w-full mt-2 bg-gray-100 dark:bg-dark_grey rounded-lg p-4">
                  <FilterContent />
                </div>
              )}
            </div>

            <div className="mt-4">
              {filteredPapers.length === 0 ? (
                <p className="text-dark_brown dark:text-white">No papers found.</p>
              ) : (
                filteredPapers.map((paper) => (
                  <PaperCard key={paper.id} {...paper} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </main>
  )
}
