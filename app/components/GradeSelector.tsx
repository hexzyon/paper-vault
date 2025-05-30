'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';

const GradeSelector = () => {
  const { isDark } = useTheme();
  const ArrowLeft = isDark ? '/darkArrowL.png' : '/arrowL.png';
  const ArrowRight = isDark ? '/darkArrowR.png' : '/arrowR.png';

  const totalGrades = 13;
  const grades = Array.from({ length: totalGrades }, (_, i) => i + 1);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="font-anek">
      <div className="flex items-center justify-center my-6">
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
        <h2 className="text-3xl text-dark_brown dark:text-white text-center 2xl:text-5xl">Select Grade</h2>
        <div className="w-1/12 border-t-2 border-dark_brown dark:border-white mx-4" />
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center h-36 sm:h-44 md:h-36 lg:h-48 xl:h-52 2xl:h-56">
            {grades.map((grade, index) => {
              const total = grades.length;
              const center = selectedIndex;
              const rawDiff = Math.abs(index - center);
              const diff = Math.min(rawDiff, total - rawDiff);

              const baseWidth = 'w-32 sm:w-40 md:w-32 lg:w-44 xl:w-56 2xl:w-64 w-28';

              let sizeClass = '';

              if (diff === 0) {
                sizeClass = `h-28 sm:h-36 md:h-28 lg:h-36 xl:h-44 2xl:h-48 scale-100 z-0 shadow-2xl ${baseWidth} text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl`;
              } else if (diff === 1) {
                sizeClass = `h-20 sm:h-28 md:h-24 lg:h-28 xl:h-36 2xl:h-40 scale-100 z-0 shadow-xl ${baseWidth} text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl`;
              } else if (diff === 2) {
                sizeClass = `h-20 sm:h-28 md:h-20 lg:h-24 xl:h-32 2xl:h-36 scale-100 z-0 shadow-lg ${baseWidth} text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl`;
              } else {
                sizeClass = `h-16 scale-80 z-0 shadow ${baseWidth}`;
              }

              return (
                <div
                  key={grade}
                  className="
                    flex-[0_0_33%] sm:flex-[0_0_33%] md:flex-[0_0_20%]
                    px-2 flex items-center justify-center transition-transform duration-300 ease-in-out
                  "
                >
                  <div
                    className={`
                      bg-white dark:bg-dark_grey_500
                      bg-[url('/gradeBack.png')]
                      dark:bg-[url('/darkGradeBack.png')]
                      bg-no-repeat bg-center bg-[length:60%_50%]
                      flex items-center justify-center
                      rounded-md text-dark_brown dark:text-white font-semibold
                      transition-all duration-300 ease-in-out
                      ${sizeClass}
                    `}
                  >
                    {grade}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30">
          <button className="text-dark_brown px-2 hover:scale-110 transition" onClick={scrollPrev}>
            <Image src={ArrowLeft} alt="Arrow Left" width={15} height={15} />
          </button>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30">
          <button className="text-dark_brown px-2 hover:scale-110 transition" onClick={scrollNext}>
            <Image src={ArrowRight} alt="Arrow Right" width={15} height={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeSelector;
