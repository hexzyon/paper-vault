import Image from "next/image";
import Email from '../../public/mail.png';
import Mobile from '../../public/mobile.png';
import Facebook from '../../public/fb.png';
import Whatsapp from '../../public/wtzp.png';

export default function Footer() {
    return (
        <footer className="bg-dark_brown py-8 text-sm text-white font-anek">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                    <h4 className="font-medium text-dark-brown text-4xl">Paper Vault</h4>
                    <p className="text-sm">Exam Success Begins with the Right Resources.</p>
                </div>
                <div></div>
                <div>
                    <h4 className="font-medium text-dark-brown text-xl mb-2">Quick Links</h4>
                    <ul>
                        <li className="text-sm"><a href="#">Marking</a></li>
                        <li className="text-sm"><a href="#">Exams</a></li>
                        <li className="text-sm"><a href="#">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-dark-brown text-xl mb-2">Contact</h4>
                    <div className="flex mb-1">
                        <Image
                            src={Email}
                            alt="Arrow"
                            width={20}
                            height={5}
                        />
                        <p className="ml-4"> papervault@gmail.com</p>

                    </div>
                    <div className="flex mb-1">
                        <Image
                            src={Mobile}
                            alt="Arrow"
                            width={20}
                            height={5}
                        />
                        <p className="ml-4"> +94 71 123 4567</p>
                    </div>

                </div>
                <div>
                    <h4 className="font-medium text-dark-brown text-xl mb-2">Follow Us</h4>
                    <div className="flex">
                    <Image
                            src={Facebook}
                            alt="Arrow"
                            width={20}
                            height={5}
                            className="m-1"
                        />
                        <Image
                            src={Whatsapp}
                            alt="Arrow"
                            width={20}
                            height={5}
                            className="m-1"
                        />
                    </div>
                </div>
            </div>
            <p className="text-center mt-6 text-dark-brown">© 2025 Paper Vault. All rights reserved.</p>
        </footer>
    );
}
