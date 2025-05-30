"use client"
import Image from "next/image";
import Facebook from '../../public/fb.png';
import Whatsapp from '../../public/wtzp.png';
import { useTheme } from "@/context/theme-context";

export default function Footer() {
    const { isDark, toggleTheme } = useTheme();

    const Email = isDark ? '/mail.png' : '/mailL.png';
    const Mobile = isDark ? '/mobile.png' : '/mobileL.png';

    const Facebook = isDark ? '/fb.png' : '/fbLight.png';
    const Whatsapp = isDark ? '/wtzp.png' : '/wtzpLight.png';

    return (
        <footer className="bg-dark_grey_100 bg-opacity-20 text-center md:text-start dark:bg-black dark:bg-opacity-10 py-8 text-sm text-dark_brown dark:text-white font-anek">
            <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:ml-12">
                    <h4 className="font-medium text-dark-brown text-4xl md:text3xl xl:text-4xl">Paper Vault</h4>
                    <p className="text-sm xl:text-lg">Exam Success Begins with the Right Resources.</p>
                </div>
                <div></div>
                <div className="xl:justify-center md:mr-20">
                    <h4 className="font-medium text-dark-brown text-xl xl:text-2xl mb-2">Quick Links</h4>
                    <ul>
                        <li className="text-sm xl:text-lg"><a href="#">Marking</a></li>
                        <li className="text-sm xl:text-lg"><a href="#">Exams</a></li>
                        <li className="text-sm xl:text-lg"><a href="#">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-dark-brown text-xl xl:text-2xl mb-2">Contact</h4>
                    <div className="flex mb-1 justify-center md:justify-start">
                        <Image
                            src={Email}
                            alt="Arrow"
                            width={25}
                            height={5}
                        />
                        <p className="ml-4 xl:text-lg"> papervault@gmail.com</p>

                    </div>
                    <div className="flex mb-1 justify-center md:justify-start">
                        <Image
                            src={Mobile}
                            alt="Arrow"
                            width={25}
                            height={5}
                        />
                        <p className="ml-4 xl:text-lg"> +94 71 123 4567</p>
                    </div>

                </div>
                <div className="text-center justify-center items-center">
                    <div className="flex justify-center">
                    <Image
                            src={Facebook}
                            alt="Arrow"
                            width={30}
                            height={20}
                            className="m-1"
                        />
                        <Image
                            src={Whatsapp}
                            alt="Arrow"
                            width={30}
                            height={20}
                            className="m-1"
                        />
                    </div>
                </div>
            </div>
            <p className="text-center mt-6 text-dark-brown xl:text-xl">© 2025 Paper Vault. All rights reserved.</p>
        </footer>
    );
}
