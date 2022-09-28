import { Github, Linkedin } from 'react-bootstrap-icons';
import Image from 'next/image';
import Link from 'next/link';
import profilePic from '../public/images/gerardo.png'
import profileBackground from '../public/images/background.png';

export default function ImageCard() {
    return (
        <>
            <div className="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8 lg:py-8">
                <div
                    className="grid gap-10 mx-auto place-content-center bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(${profileBackground.src})`,
                    }}
                >
                    <div>
                        <Image
                            className="object-cover h-48 w-96 rounded antialiased"
                            src={profilePic}
                            alt="Gerardo Vazquez"
                            layout="intrinsic"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:text-center">
                <p className="text-lg font-bold">Gerardo Vazquez</p>
                <p className="mb-5 text-xs text-gray-800">Software Engineer & Product Manager</p>
                <div className="flex items-center space-x-3 sm:justify-center">
                    <Link
                        href="https://www.linkedin.com/in/gvzqz"
                        className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                    >
                        <Linkedin />
                    </Link>
                    <Link
                        href="https://github.com/gvzq"
                        className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                    >
                        <Github />
                    </Link>
                </div>
            </div>
            <div className="w-full my-4">
                <div className="h-1 mx-auto bg-slate-500 w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
        </>
    )
}