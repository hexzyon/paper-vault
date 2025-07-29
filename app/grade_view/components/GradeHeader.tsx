'use client'

import { useEffect, useState } from "react";
import { databases } from "@/appwrite/config";
import conf from "@/conf/config";
import { Query } from "appwrite";
import SearchItems from "./SearchItems";
import MainSubjects from "./MainSubjects";
import OptionalSubjects from "./OptionalSubjects";

type GradeHeaderProps = {
  gradeId: string;
};

const DATABASE_ID = conf.appwriteDatabaseId;
const SUBJECTS_GRADES_COLLECTION_ID = conf.appwriteSubjectGradeCollectionId;
const GRADES_COLLECTION_ID = conf.appwriteGradesCollectionId;

export default function GradeHeader({ gradeId }: GradeHeaderProps) {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<{ $id: string; subject_name: string; icon_url: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [grade, setGrade] = useState<any | null>(null);
  const [mainSubjects, setMainSubjects] = useState<any[]>([]);
  const [optionalSubjects, setOptionalSubjects] = useState<any[]>([]);
  const [allSubjects, setAllSubjects] = useState<{ $id: string; subject_name: string; icon_url: string }[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGradeData = async () => {
      try {
        // Check if grade exists
        const gradeRes = await databases.getDocument(
          DATABASE_ID,
          GRADES_COLLECTION_ID,
          gradeId
        );
        setGrade(gradeRes);

        // Get subjects_has_grades where grades == gradeId
        const subjectRelations = await databases.listDocuments(
          DATABASE_ID,
          SUBJECTS_GRADES_COLLECTION_ID,
          [Query.equal("grades", gradeId)]
        );

        const main: any[] = [];
        const optional: any[] = [];

        const all: { $id: string; subject_name: string; icon_url: string }[] = [];

        for (const relation of subjectRelations.documents) {
          const subject = relation.subjects;
          const subjectName =
            typeof subject === "object"
              ? subject.subject_name
              : relation.subject_name ?? "Unnamed Subject";

          const icon = relation.icon_url;

          const entry = {
            ...relation,
            subject_name: subjectName,
            icon_url: icon,
          };

          all.push(entry);

          if (relation.main_subject === true) {
            main.push(entry);
          } else {
            optional.push(entry);
          }
        }


        setMainSubjects(main);
        setOptionalSubjects(optional);
        setAllSubjects(all);
      } catch (error) {
        console.error("Error fetching grade or subjects:", error);
        setGrade(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGradeData();
  }, [gradeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsSearching(false);

    if (value.trim() === '') {
      setResults([]);
    } else {
      const filtered = allSubjects.filter(subject =>
        subject.subject_name.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filtered);
    }
  };

  const handleSearchClick = () => {
    const filtered = allSubjects.filter(subject =>
      subject.subject_name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setIsSearching(true);
  };

  if (!loading && !grade) {
    return (
      <section className="p-4 text-center text-red-600 text-xl font-anek items-center justify-center mt-4 mb-1">
        Invalid grade ID: {gradeId}
      </section>
    );
  }

  return (
    <>
      <section className="font-anek items-center justify-center p-2 mt-4 mb-1">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between my-6 mb-1">
          <h2 className="text-4xl text-dark_brown dark:text-white text-center xl:text-6xl 2xl:text-6xl">
            {grade?.grade_name || `Grade ${grade?.education_level}`}
          </h2>

          <div className="relative flex font-anek mt-5 md:mt-0 font-normal text-lg flex-col items-center justify-center text-center">
            <div className="w-full z-10">
              <div className="flex items-center justify-center bg-white dark:bg-dark_grey border dark:border-white rounded-xl border-dark_brown shadow-md px-1 py-1 xl:w-[500px] 2xl:w-[600px]">
                <div className="inset-y-0 start-0 flex items-center ps-1 pointer-events-none mr-2">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search"
                  className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-dark_grey_100 2xl:text-3xl"
                />
                <button
                  onClick={handleSearchClick}
                  className="bg-dark_brown dark:bg-orange text-white px-2 md:px-6 py-1 rounded-lg 2xl:text-3xl"
                >
                  Search
                </button>
              </div>

              {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark_grey text-black dark:text-white border dark:border-white rounded-md shadow max-h-60 overflow-y-auto z-50 xl:w-[500px] 2xl:w-[600px]">
                  {results.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark_grey_500"
                      onClick={() => {
                        setQuery(item.subject_name);
                        setResults([item]);
                        setIsSearching(true);
                      }}

                    >
                      {item.subject_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {isSearching ? (
        <SearchItems results={results} gradeId={gradeId} />
      ) : (
        <>
          <MainSubjects subjects={mainSubjects} gradeId={gradeId} />
          {gradeId !== "grade5" && <OptionalSubjects gradeId={gradeId} subjects={optionalSubjects} />}
        </>
      )}
    </>
  );
}
