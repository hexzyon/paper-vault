'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'next/navigation';
import appwriteService from '@/appwrite/config'; 

import 'swiper/css';
import 'swiper/css/navigation';

const GradeSelector = () => {
  const { isDark } = useTheme();
  const router = useRouter();

  const ArrowLeft = isDark ? '/darkArrowL.png' : '/arrowL.png';
  const ArrowRight = isDark ? '/darkArrowR.png' : '/arrowR.png';

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const totalGrades = 13;
  const grades = Array.from({ length: totalGrades }, (_, i) => i + 1);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [gradeMap, setGradeMap] = useState<Record<number, string>>({}); 

  // Step 1: Fetch grades and map them by number
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await appwriteService.getGrades();

        const map: Record<number, string> = {};
        res.documents.forEach((doc: any) => {
          const name = doc.grade_name; 
          const match = name.match(/(\d+)/); 
          if (match) {
            const num = parseInt(match[1], 10);
            map[num] = doc.$id;
          }
        });

        setGradeMap(map);
      } catch (error) {
        console.error("Failed to load grades", error);
      }
    };

    fetchGrades();
  }, []);

  // Step 2: Handle grade click
  const handleClick = (gradeNum: number) => {
    const gradeId = gradeMap[gradeNum];
    if (gradeId) {
      router.push(`/grade_view/${gradeId}`);
    } else {
      alert(`No grade found for Grade ${gradeNum.toString().padStart(2, "0")}`);
    }
  };

  return (
    <div className="font-anek mt-4 md:mt-8">
      <div className="flex items-center justify-center md:mt-6 mb-6 md:mb-12">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
        <h2 className="text-3xl text-dark_brown dark:text-white text-center 2xl:text-5xl">Select Grade</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
      </div>

      <div className="relative w-auto md:px-10 md:mx-5 max-w-screen-2xl h-24 sm:h-32 md:h-28 lg:h-28 xl:h-40 2xl:h-48">
        <Swiper
          loop={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={5}
          speed={700}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
          className="overflow-hidden"
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          modules={[Navigation, Autoplay]}
        >
          <div className="flex items-center">
            {grades.map((grade, index) => {
              const total = grades.length;
              const center = selectedIndex;
              const rawDiff = Math.abs(index - center);
              const diff = Math.min(rawDiff, total - rawDiff);

              const baseWidth = 'w-20 xs:w-24 sm:w-36 md:w-28 lg:w-36 xl:w-52 2xl:w-56';
              let sizeClass = '';

              if (diff === 0) {
                sizeClass = `h-20 sm:h-32 md:h-24 lg:h-28 xl:h-40 2xl:h-44 scale-100 z-0 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-light_pink dark:shadow-dark_grey_100 ${baseWidth} text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl`;
              } else if (diff === 1) {
                sizeClass = `h-12 sm:h-24 md:h-20 lg:h-20 xl:h-32 2xl:h-36 scale-100 my-4 z-0 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-light_pink dark:shadow-dark_grey_100 ${baseWidth} text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl`;
              } else {
                sizeClass = `h-10 sm:h-20 md:h-16 lg:h-16 xl:h-28 2xl:h-32 scale-100 my-6 z-0 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-light_pink dark:shadow-dark_grey_100 ${baseWidth} text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl`;
              }

              return (
                <SwiperSlide
                  key={grade}
                  className="flex-[0_0_30%] sm:flex-[0_0_30%] md:flex-[0_0_19%] 2xl:flex-[0_0_18%] px-2 flex items-center justify-center transition-transform"
                  style={{ width: 'auto' }}
                >
                  <button
                    onClick={() => handleClick(grade)}
                    className={`
                      bg-white dark:bg-dark_grey_500
                      bg-[url('/gradeBack.png')] dark:bg-[url('/darkGradeBack.png')]
                      bg-no-repeat bg-center bg-[length:60%_50%]
                      flex items-center justify-center
                      rounded-md text-dark_brown dark:text-white font-semibold
                      border-t-2 border-light_pink dark:border-dark_grey_100
                      ${sizeClass}
                    `}
                    style={{ transform: 'translateX(8px)' }}
                  >
                    {grade}
                  </button>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>

        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 hidden md:flex">
          <button ref={prevRef} className="text-dark_brown px-2 hover:scale-110 transition">
            <Image src={ArrowLeft} alt="Arrow Left" width={20} height={20} />
          </button>
        </div>

        <div ref={nextRef} className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 hidden md:flex">
          <button className="text-dark_brown px-2 hover:scale-110 transition">
            <Image src={ArrowRight} alt="Arrow Right" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeSelector;
