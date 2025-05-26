import Image from 'next/image';
import BookImage from '../../public/bookA.png';

export default function HeroSection() {
    return (
        <div className="relative flex font-anek font-normal text-lg flex-col items-center justify-center py-12 text-center overflow-hidden">

            <Image
                src={BookImage}
                alt="Book Background"
                className="absolute top-12 md:top-12 left-96 ml-40 transform -translate-x-1/2 z-0 w-[100px] md:w-[500px] pointer-events-none"
            />

            <div className='flex'>
                <div className="text-6xl md:text-7xl mr-12 font-bold text-dark_brown dark:text-orange">PAST</div>
                <div className="mt-3 ml-52 text-lg md:text-4xl text-dark_brown dark:text-orange flex gap-4 flex-wrap justify-center z-10 relative">
                    <span><span className='text-4xl mt-12 text-dark_brown dark:text-white'>100+</span> Subjects</span>
                    <span><span className='text-4xl mt-6 ml-24 text-dark_brown dark:text-white'>1000+</span> Papers</span>
                </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:space-x-6">

                <div className="flex items-center space-x-2 mt-16">
                    <div className='row mb-16'>
                    <span className="text-4xl md:text-[220px] font-bold text-dark_brown dark:text-orange mr-48">P</span>
                    </div>
                    
                    <div className='row text-end'>
                        <span className="text-4xl md:text-[220px] font-bold text-dark_brown dark:text-orange ml-32">PERS</span>
                        <p className="mt-0 text-base md:text-3xl text-gray-600 dark:text-orange z-10 relative">
                            Access Sri Lanka’s <span className="text-orange dark:text-white font-medium">Largest <br />Collection</span> of <span className="text-orange dark:text-white font-medium">Past Papers</span>
                        </p>
                    </div>
                </div>
            </div>



            <div className="mt-12 flex items-center bg-white dark:bg-dark_grey border dark:border-white rounded-full shadow px-4 py-2 max-w-md w-full z-10 relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-dark_grey_100"
                />
                <button className="bg-dark_brown dark:bg-orange text-white px-2 md:px-6 py-2 rounded-full">
                    Search
                </button>
            </div>
        </div>

    );
}
