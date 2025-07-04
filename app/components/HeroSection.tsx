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
        <div className='h-[400px] sm:h-[450px] md:h-[400px] lg:h-[470px] xl:h-[600px]'>
            {/* md: view */}
            <div className="hidden relative max-w-screen-2xl md:flex font-anek font-normal text-lg flex-col items-center justify-center py-8 text-center">

                <Image
                    src={BookImage}
                    alt="Book Background"
                    className="absolute top-12 z-0 w-[400px] lg:w-[500px] xl:w-[750px] md:mr-20 lg:mr-32 xl:mr-44 2xl:mr-36 pointer-events-none"
                />

                <div className='absolute top-12 flex mt-6 md:mb-0 lg:mb-0 xl:mr-2 2xl:ml-8 2xl:mr-0 xl:gap-32 2xl:gap-24'>
                    <div className="sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl sm:mr-6 md:mr-1 lg:mr-12 2xl:mr-12 font-bold text-dark_brown dark:text-orange">PAST</div>
                    <div className="lg:mt-3 xl:mt-5 2xl:mt-6 sm:ml-20 md:ml-36 lg:ml-32 xl:ml-24 2xl:ml-10 2xl:mr-10 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-dark_brown dark:text-orange flex gap-1 flex-wrap justify-center z-10 relative">
                        <span><span className='sm:xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 2xl:ml-20 mt-12 text-dark_brown dark:text-white'>100+</span> Subjects</span>
                        <span><span className='sm:xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:ml-2 md:ml-0 lg:ml-16 text-dark_brown dark:text-white'>1000+</span> Papers</span>
                    </div>
                </div>

                <div className="absolute md:top-36 lg:top-44 z-10 flex flex-col md:ml-1 lg:ml-16 md:flex-row items-center md:space-x-6">

                    <div className="flex items-start space-x-2 md:mt-0 lg:mt-2 xl:mt-16 lg:mr-12 xl:mr-12 2xl:mr-10 2xl:mt-20">
                        <div className='row mb-16'>
                            <span className="text-4xl md:text-[125px] lg:text-[180px] xl:text-[230px] 2xl:text-[240px] font-bold text-dark_brown dark:text-orange md:mr-20 lg:mr-48 2xl:mr-32">P</span>
                        </div>

                        <div className='row text-end'>
                            <span className="text-4xl md:text-[125px] lg:text-[180px] xl:text-[230px] 2xl:text-[240px] font-bold text-dark_brown dark:text-orange ml-32 lg:ml-20 xl:ml-36 2xl:ml-64 xl:tracking-wider 2xl:tracking-widest">PERS</span>
                            <p className="pt-0 text-2xl lg:text-3xl xl:text-5xl md:mr-2 lg:mr-3 xl:mr-5 2xl:mr-9 text-gray-600 dark:text-orange z-10 relative">
                                Access Sri Lanka’s <span className="text-orange dark:text-white font-medium">Largest <br />Collection</span> of <span className="text-orange dark:text-white font-medium">Past Papers</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* sm: view */}
            <div className="md:hidden relative flex font-anek font-normal text-lg flex-col items-center justify-center py-8 text-center">

                <Image
                    src={BookImage}
                    alt="Book Background"
                    className="absolute top-7 sm:top-7 ml-48 sm:ml-64 transform -translate-x-1/2 z-0 w-[260px] sm:w-[360px] pointer-events-none"
                />

                <div className='absolute top-7 sm:top-6 flex sm:mt-1 mr-36 sm:mr-40'>
                    <div className="text-7xl sm:text-9xl mr-12 sm:mr-2 ml-8 sm:ml-1 font-bold text-dark_brown dark:text-orange">P</div>
                    <div className="text-7xl sm:text-9xl ml-10 sm:ml-32 font-bold text-dark_brown dark:text-orange">ST</div>
                </div>
                <div className='absolute top-28 sm:top-32 flex text-end sm:ml-2'>
                    <div className="text-7xl sm:text-9xl ml-44 sm:ml-72 font-bold text-dark_brown dark:text-orange">PERS</div>
                </div>

                <div className='absolute row top-56 sm:top-64 sm:mt-3 text-center'>
                    <p className="mt-0 text-2xl text-gray-600 dark:text-orange z-10 relative">
                        Access Sri Lanka’s <span className="text-orange dark:text-white font-medium">Largest <br />Collection</span> of <span className="text-orange dark:text-white font-medium">Past Papers</span>
                    </p>
                </div>
                <div className="absolute top-72 mt-3 sm:top-80 sm:mt-8 sm:ml-0 md:ml-52 text-2xl md:text-4xl text-dark_brown dark:text-orange flex gap-4 flex-wrap justify-center z-10">
                    <span><span className='sm:xl md:text-4xl mt-12 text-dark_brown dark:text-white'>100+</span> Subjects</span>
                    <span><span className='sm:xl md:text-4xl mt-6 sm:ml-2 md:ml-24 text-dark_brown dark:text-white'>1000+</span> Papers</span>
                </div>
            </div>

            <div className="relative flex font-anek mt-64 sm:mt-80 md:mt-4 lg:mt-4 xl:mt-20 font-normal text-lg flex-col items-center justify-center text-center">

                <div className="absolute top-7 md:mt-64 lg:mt-72 xl:mt-96 w-full max-w-80 md:max-w-md z-10 xl:mr-16 2xl:mr-40 mx-0 md:mx-10">
                    <div className="flex bg-white dark:bg-dark_grey border dark:border-white rounded-full shadow px-1 md:px-4 py-1 md:py-2 xl:w-[500px] 2xl:w-[600px]">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search"
                            className="flex-grow w-10/12 pl-3 md:pl-0 bg-transparent focus:outline-none text-gray-700 dark:text-dark_grey_100 2xl:text-3xl"
                        />
                        <button className="bg-dark_brown dark:bg-orange text-white px-4 md:px-6 py-1 md:py-2 rounded-full 2xl:text-3xl">
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
