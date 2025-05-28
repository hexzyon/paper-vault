"use client"
import Image from 'next/image';
import BookImage from '../../public/bookA.png';
import { useState } from 'react';

export default function HeroSection() {
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<string[]>([])

    const allData = [
        'Grade 5 Scholarship',
        'G.C.E. Ordinary Level',
        'G.C.E. Advanced Level',
        'IELTS',
        'TOEFL',
        'SAT Exam',
        'Cambridge English'
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value.trim() === '') {
            setResults([])
        } else {
            const filtered = allData.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            )
            setResults(filtered)
        }
    }

    return (
        <div>
            {/* md: view */}
            <div className="hidden relative md:flex font-anek font-normal text-lg flex-col items-center justify-center py-8 text-center">

                <Image
                    src={BookImage}
                    alt="Book Background"
                    className="absolute top-12 md:top-12 sm:left-16 lg:left-72 lg:ml-40 xl:left-96 xl:ml-52 md:left-80 md:ml-5 2xl:left-96 2xl:ml-72 transform -translate-x-1/2 z-0 w-[400px] lg:w-[500px] pointer-events-none"
                />

                <div className='flex mt-6 md:mb-6 lg:mb-0 lg:ml-16 md:ml-16'>
                    <div className="sm:text-5xl md:text-5xl lg:text-6xl sm:mr-6 md:mr-1 lg:mr-12 font-bold text-dark_brown dark:text-orange">PAST</div>
                    <div className="mt-3 sm:ml-20 md:ml-36 lg:ml-32 sm:text-lg md:text-2xl text-dark_brown dark:text-orange flex gap-4 flex-wrap justify-center z-10 relative">
                        <span><span className='sm:xl md:text-3xl mt-12 text-dark_brown dark:text-white'>100+</span> Subjects</span>
                        <span><span className='sm:xl md:text-3xl mt-6 sm:ml-2 md:ml-0 lg:ml-16 text-dark_brown dark:text-white'>1000+</span> Papers</span>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col md:ml-16 md:flex-row items-center md:space-x-6">

                    <div className="flex items-center space-x-2 md:mt-5 lg:mt-16">
                        <div className='row mb-16'>
                            <span className="text-4xl md:text-[140px] font-bold text-dark_brown dark:text-orange md:mr-20 lg:mr-48">P</span>
                        </div>

                        <div className='row text-end'>
                            <span className="text-4xl md:text-[140px] font-bold text-dark_brown dark:text-orange ml-24">PERS</span>
                            <p className="mt-0 text-2xl lg:text-3xl text-gray-600 dark:text-orange z-10 relative">
                                Access Sri Lanka’s <span className="text-orange dark:text-white font-medium">Largest <br />Collection</span> of <span className="text-orange dark:text-white font-medium">Past Papers</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* sm: view */}
            <div className="md:hidden relative sm:flex font-anek font-normal text-lg flex-col items-center justify-center py-8 text-center">

                <Image
                    src={BookImage}
                    alt="Book Background"
                    className="absolute top-10 sm:left-20 xs:left-44 sm:ml-40 transform -translate-x-1/2 z-0 xs:w-[280px] sm:w-[380px] pointer-events-none"
                />

                <div className='flex mt-1 xs:mr-60 sm:mr-40'>
                    <div className="xs:text-8xl sm:text-9xl xs:mr-12 sm:mr-2 xs:ml-8 sm:ml-1 font-bold text-dark_brown dark:text-orange">P</div>
                    <div className="xs:text-8xl sm:text-9xl xs:ml-10 sm:ml-32 font-bold text-dark_brown dark:text-orange">ST</div>
                </div>
                <div className='flex text-end sm:ml-2'>
                    <div className="xs:text-8xl sm:text-9xl xs:ml-56 sm:ml-72 font-bold text-dark_brown dark:text-orange">PERS</div>
                </div>

                <div className='row text-center'>
                    <p className="mt-0 text-2xl text-gray-600 dark:text-orange z-10 relative">
                        Access Sri Lanka’s <span className="text-orange dark:text-white font-medium">Largest <br />Collection</span> of <span className="text-orange dark:text-white font-medium">Past Papers</span>
                    </p>
                </div>
                <div className="mt-5 sm:ml-0 md:ml-52 sm:text-2xl md:text-4xl text-dark_brown dark:text-orange flex gap-4 flex-wrap justify-center z-10 relative">
                    <span><span className='sm:xl md:text-4xl mt-12 text-dark_brown dark:text-white'>100+</span> Subjects</span>
                    <span><span className='sm:xl md:text-4xl mt-6 sm:ml-2 md:ml-24 text-dark_brown dark:text-white'>1000+</span> Papers</span>
                </div>
            </div>

            <div className="relative flex font-anek lg:mt-4 font-normal text-lg flex-col items-center justify-center text-center">

                <div className="mt-1 w-full max-w-md relative z-10">
                    <div className="flex items-center bg-white dark:bg-dark_grey border dark:border-white rounded-full shadow px-4 py-2">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search"
                            className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-dark_grey_100"
                        />
                        <button className="bg-dark_brown dark:bg-orange text-white px-2 md:px-6 py-2 rounded-full">
                            Search
                        </button>
                    </div>

                    {results.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark_grey text-black dark:text-white border dark:border-white rounded-md shadow max-h-60 overflow-y-auto z-50">

                            {results.map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark_grey_500"
                                    onClick={() => {
                                        setQuery(item)
                                        setResults([])
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
