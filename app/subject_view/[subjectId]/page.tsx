'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FilterContent from '@/app/subject_view/components/FilterSideBar'
import PaperCard from '@/app/subject_view/components/PaperCard'
import { dummyPapers } from '@/app/subject_view/data'
import { Filter } from 'lucide-react'
import appwriteService from '@/appwrite/config'

export default function SubjectViewPage() {
  const params = useParams<{ subjectId: string }>();
  const searchParams = useSearchParams();
  const gradeId = searchParams.get('gradeId') || '';
  const subjectId = params.subjectId;
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');

  const [papers, setPapers] = useState<any[]>([]);
  const [gradeName, setGradeName] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  type Filters = {
    language: string;
    type: string;
    yearRange: [number, number];
    examType: string;
  };

  const [filters, setFilters] = useState<Filters>({
    language: '',
    type: '',
    yearRange: [2000, new Date().getFullYear()],
    examType: '',
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const sub:any = await appwriteService.getSubjectsById(subjectId);
        setSubjectName(sub.documents[0].subject_name);

        const grade:any = await appwriteService.getGradesById(gradeId);
        setGradeName(grade.documents[0].grade_name)
        // Check subjects_has_grades for given grade & subject
        const rel = (await appwriteService.findSubjectGradeRelation(gradeId, subjectId));
        
        if (!rel) {
          setPapers([]);
          return;
        }
        // Fetch papers for this subjectsHasGrades ID
        const res = await appwriteService.getPapersBySubjectGrade(rel.$id);
        setPapers(res.documents);
      } catch (err) {
        console.error(err);
        setPapers([]);
      }
    };
    load();
  }, [gradeId, subjectId]);

  // Apply UI filters on the fetched papers
  const visiblePapers = papers.filter(p => {
    if (filters.language && p.language !== filters.language) return false;
    if (filters.examType && p.type !== filters.examType) return false;
    if (p.year < filters.yearRange[0] || p.year > filters.yearRange[1]) return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto">
        <Header />
        <div className="flex flex-col md:flex-row font-anek">
          <aside className="md:w-1/4 w-full pr-4 py-4">
            <div className="hidden md:block space-y-6">
              <FilterContent filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          <main className="flex-1 pl-0 md:pl-4 py-3 mt-4 md:border-l md:border-dark_grey_500">
            <h1 className="text-2xl md:text-4xl font-bold text-dark_brown dark:text-white mb-4 mx-2">
              Grade {gradeName.replace('Grade', '')} {subjectName} Subject Past Papers
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-dark_grey_500 rounded-lg px-4 py-2 text-lg dark:bg-dark_grey dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Mobile Slide-in Filter Sidebar */}
              <div
                className={`
    fixed top-0 right-0 h-full w-4/5 max-w-sm z-40 bg-white dark:bg-dark_grey text-dark_brown dark:text-white
    transform transition-transform duration-300 ease-in-out
    ${showFilters ? 'translate-x-0' : 'translate-x-full'}
    overflow-y-auto shadow-xl rounded-l-xl
  `}
              >
                {/* Header with Close Button */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <h2 className="text-xl font-semibold">Filter</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Filter Content */}
                <div className="p-4">
                  <FilterContent filters={filters} setFilters={setFilters} />
                </div>
              </div>

            </div>

            <div className="mt-4">
              {visiblePapers.map(paper => (
                <PaperCard
                  key={paper.$id}
                  title={paper.title}
                  region={paper.type2 || ''}
                  term={paper.term}
                  isExpanded={expandedId === paper.$id}
                  onToggle={() =>
                    setExpandedId(expandedId === paper.$id ? null : paper.$id)
                  }
                  paperUrl={paper.paper_url}
                  subjectId={paper.subjectsHasGrades.subjects.$id}
                  marking_scheme={paper.marking_scheme}
                />
              ))}
              {visiblePapers.length === 0 && (
                <p className="text-center text-lg text-gray-500 dark:text-gray-400">
                  No papers available.
                </p>
              )}

            </div>
          </main>
        </div>
      </div>
      <Footer />
    </main>
  )
}
