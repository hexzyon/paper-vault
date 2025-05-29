'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/theme-context'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Autoplay, EffectCoverflow, FreeMode, Pagination } from 'swiper/modules'

const GradeSelector = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const { isDark } = useTheme()
  const ArrowLeft = isDark ? "/darkArrowL.png" : "/arrowL.png"
  const ArrowRight = isDark ? "/darkArrowR.png" : "/arrowR.png"

  const totalGrades = 13
  const [grades, setGrades] = useState<number[]>([])

  useEffect(() => {
    const generatedGrades = Array.from({ length: totalGrades }, (_, i) => i + 1)
    setGrades(generatedGrades)
  }, [])

  return (
    <div className="font-anek">
      <div className="flex items-center justify-center my-6">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
        <h2 className="text-3xl text-dark_brown dark:text-white text-center 2xl:text-5xl">Select Grade</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
      </div>

      <div className="relative w-full">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          centeredSlides={true}
          slidesPerView={5}
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          className="mySwiper w-auto"
        >
          {grades.map((grade) => (
            <SwiperSlide key={grade}>
              <div
                className="
                  bg-white dark:bg-dark_grey_500
                  bg-[url('/gradeBack.png')]
                  dark:bg-[url('/darkGradeBack.png')]
                  bg-no-repeat bg-center bg-[length:60%_50%]
                  flex items-center justify-center
                  rounded-md shadow-lg text-dark_brown dark:text-white font-semibold
                  w-32 h-20 text-4xl transition-all duration-300 ease-in-out
                  2xl:w-80 2xl:h-56 2xl:text-5xl
                  xl:w-64 xl:h-44 xl:text-5xl
                  lg:w-48 lg:h-32 lg:text-4xl
                "
              >
                {grade}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Optional Manual Arrows (if needed) */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button
            className="text-dark_brown px-2 hover:scale-110 transition"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image src={ArrowLeft} alt="Arrow Left" width={20} height={20} />
          </button>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <button
            className="text-dark_brown px-2 hover:scale-110 transition"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image src={ArrowRight} alt="Arrow Right" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GradeSelector
