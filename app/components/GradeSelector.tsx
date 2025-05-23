'use client'
import Image from 'next/image'
import { useState } from 'react'
import ArrowL from '../../public/arrowL.png';
import ArrowR from '../../public/arrowR.png';

const GradeSelector = () => {
    const totalGrades = 13
    const [centerIndex, setCenterIndex] = useState(12) 

    const getVisibleGrades = () => {
        const grades = []
        for (let i = -2; i <= 2; i++) {
            const index = (centerIndex + i + totalGrades) % totalGrades
            grades.push(index + 1) 
        }
        return grades
    }

    const next = () => {
        setCenterIndex((prev) => (prev + 1) % totalGrades)
    }

    const prev = () => {
        setCenterIndex((prev) => (prev - 1 + totalGrades) % totalGrades)
    }

    const sizes = ['small', 'medium', 'large', 'medium', 'small']

    return (
        <div className='font-anek'>
            <div className="flex items-center justify-center my-6">
                <div className="w-1/12 border-t-2 border-dark_brown mx-4"></div>
                <h2 className="text-2xl text-dark_brown text-center">Select Grade</h2>
                <div className="w-1/12 border-t-2 border-dark_brown mx-4"></div>
            </div>

            <div className="flex items-center justify-center gap-2">

                <button
                    onClick={prev}
                    className="text-dark_brown text-xl px-6 hover:scale-110 transition"
                >
                    <Image
                        src={ArrowL}
                        alt="Arrow"
                        width={10}
                        height={10}
                        className="w-[10px] h-auto"
                    />
                </button>

                <div className="flex gap-12 items-center font-anek text-dark_brown">
                    {getVisibleGrades().map((grade, i) => {
                        const size = sizes[i]
                        let classes =
                            'bg-[url("/gradeBack.png")] bg-no-repeat bg-center bg-[length:80%_60%] flex items-center justify-center text-dark-brown rounded-md'

                        if (size === 'small') {
                            classes += ' w-24 h-20 text-2xl font-semibold shadow-md'
                        } else if (size === 'medium') {
                            classes += ' w-28 h-24 text-3xl font-semibold shadow-lg'
                        } else {
                            classes +=
                                ' w-32 h-24 text-4xl font-semibold shadow-xl'
                        }

                        return (

                            <div key={i} className={classes}>
                                {grade}
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={next}
                    className="text-dark-brown text-2xl px-6 hover:scale-110 transition"
                >
                    <Image
                        src={ArrowR}
                        alt="Arrow"
                        width={10}
                        height={10}
                        className="w-[10px] h-auto"
                    />
                </button>
            </div>
        </div>
    )
}

export default GradeSelector
