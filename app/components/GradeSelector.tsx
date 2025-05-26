'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'

const GradeSelector = () => {
  const { isDark } = useTheme()
  const ArrowLeft = isDark ? "/darkArrowL.png" : "/arrowL.png"
  const ArrowRight = isDark ? "/darkArrowR.png" : "/arrowR.png"

  const totalGrades = 13
  const [centerIndex, setCenterIndex] = useState(12) // Starting from 13 (0-based index 12)
  const [visibleCount, setVisibleCount] = useState(3) // Default to mobile

  // Sizes adjust based on visible count
  const sizes =
    visibleCount === 5
      ? ['w-24 h-20 text-2xl shadow-md', 'w-28 h-24 text-3xl shadow-lg', 'w-32 h-24 text-4xl shadow-xl', 'w-28 h-24 text-3xl shadow-lg', 'w-24 h-20 text-2xl shadow-md']
      : ['w-28 h-24 text-3xl shadow-lg', 'w-32 h-24 text-4xl shadow-xl', 'w-28 h-24 text-3xl shadow-lg']

  const next = () => {
    setCenterIndex((prev) => (prev + 1) % totalGrades)
  }

  const prev = () => {
    setCenterIndex((prev) => (prev - 1 + totalGrades) % totalGrades)
  }

  const getVisibleGrades = () => {
    const grades = []
    const half = Math.floor(visibleCount / 2)
    for (let offset = -half; offset <= half; offset++) {
      const index = (centerIndex + offset + totalGrades) % totalGrades
      grades.push(index + 1) 
    }
    return grades
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setVisibleCount(5) 
      } else {
        setVisibleCount(3) 
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-anek">
      <div className="flex items-center justify-center my-6">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
        <h2 className="text-3xl text-dark_brown dark:text-white text-center">Select Grade</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* Left Arrow */}
        <button onClick={prev} className="text-dark_brown text-xl px-6 hover:scale-110 transition">
          <Image src={ArrowLeft} alt="Arrow Left" width={10} height={10} className="w-[10px] h-auto" />
        </button>

        {/* Cards */}
        <div className="flex gap-6 items-center overflow-hidden transition-all duration-300 ease-in-out">
          {getVisibleGrades().map((grade, i) => (
            <div
              key={i}
              className={`
                bg-white dark:bg-dark_grey_500
                bg-[url('/gradeBack.png')] 
                dark:bg-[url('/darkGradeBack.png')]
                bg-no-repeat bg-center bg-[length:80%_60%]
                flex items-center justify-center 
                rounded-md shadow-lg text-dark_brown dark:text-white font-semibold 
                ${sizes[i]} transition-all duration-300 ease-in-out
              `}
            >
              {grade}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={next} className="text-dark_brown text-xl px-6 hover:scale-110 transition">
          <Image src={ArrowRight} alt="Arrow Right" width={10} height={10} className="w-[10px] h-auto" />
        </button>
      </div>
    </div>
  )
}

export default GradeSelector
