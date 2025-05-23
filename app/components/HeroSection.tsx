import Image from 'next/image';
import BookImage from '../../public/bookA.png';

export default function HeroSection() {
    return (
        <div className="relative flex font-anek font-normal text-lg flex-col items-center justify-center py-12 px-4 text-center overflow-hidden">

            <Image
                src={BookImage}
                alt="Book Background"
                width={300}
                height={300}
                className="absolute top-12 md:top-12 left-96 ml-40 transform -translate-x-1/2 z-0 w-[100px] md:w-[300px] pointer-events-none"
            />

            <div className='flex'>
                <div className="text-6xl md:text-5xl font-bold text-dark_brown">PAST</div>
                <div className="mt-1 ml-40 text-lg md:text-xl text-dark_brown flex gap-4 flex-wrap justify-center z-10 relative">
                    <span><span className='text-3xl mt-6'>100+</span> Subjects</span>
                    <span><span className='text-3xl mt-6'>1000+</span> Papers</span>
                </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:space-x-6">

                <div className="flex items-center space-x-2">
                    <div className='row mb-16'>
                    <span className="text-4xl md:text-9xl font-bold text-dark_brown mr-48">P</span>
                    </div>
                    
                    <div className='row text-end'>
                        <span className="text-4xl md:text-9xl font-bold text-dark_brown">PERS</span>
                        <p className="mt-0 text-base md:text-2xl text-gray-600 z-10 relative">
                            Access Sri Lanka’s <span className="text-orange font-medium">Largest <br />Collection</span> of <span className="text-orange font-medium">Past Papers</span>
                        </p>
                    </div>
                </div>
            </div>



            <div className="mt-6 flex items-center bg-white border rounded-full shadow px-4 py-2 max-w-md w-full z-10 relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow bg-transparent focus:outline-none text-gray-700"
                />
                <button className="bg-dark_brown text-white px-6 py-2 rounded-full">
                    Search
                </button>
            </div>
        </div>

    );
}
