import Image from "next/image";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 shadow-xl bg-white text-black rounded-xl">
            <Image
                src="/Logo.png"
                alt="A descriptive alt text"
                width={100}
                height={100}
                className=""
            />
            <nav className="space-x-10 font-anek font-normal">
                <a href="#" className="text-2xl">Home</a>
                <a href="#" className="text-2xl">Markings</a>
                <select className="bg-transparent w-auto min-w-fit text-2xl">
                    <option selected>Exams</option>
                    <option>New Exams</option>
                    <option>Past Exams</option>
                    <option>Results</option>
                </select>
                <a href="#" className="text-2xl">About Us</a>
            </nav>
            <div>
                <button className="flex items-center overflow-hidden rounded-full shadow transition hover:opacity-90">
                    
                    <div className="bg-dark_brown w-10 h-10 flex items-center justify-center">
                        <img src="/sun.png" alt="Sun" className="w-5 h-5" />
                    </div>

                    <div className="bg-light_pink w-10 h-10 flex items-center justify-center">
                        <img src="/moon.png" alt="Moon" className="w-5 h-5" />
                    </div>
                </button>


            </div>
        </header>
    );
}
