"use client";
import images from '@/constants/images'
import Image from 'next/image'
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLinkOutline } from "react-icons/io5";
import { CgMenuLeft } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import { useEffect, useState } from 'react';


function Sidebar() {
    const [hideSidebar, setHideSidebar] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    // getting windows dimesion so the sidebar resize can be done correctly

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    };
    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(
            getWindowDimensions()
        );
        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowDimensions;
    };
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        if (width <= 800) {
            setHideSidebar(true);
            setIsMobile(true);
        }
        else {
            setHideSidebar(false);
            setIsMobile(false);
        }
    }, [width]);

    const links = [
        { name: 'Home', Icon: <FaHome />, href: "/" },
        { name: 'Profile', Icon: <CiUser />, href: "/" },
        { name: 'Guides', Icon: <FiBook />, href: "/" },

    ]
    const apps = [
        { name: 'Shortener', Icon: <IoLinkOutline />, href: "/" },
    ]
    return (
        <>
            {isMobile && <CgMenuLeft
                onClick={() => setHideSidebar(!hideSidebar)}
                className='fixed top-4 left-4 z-10'
                size={30}
                color='white' />}

            <nav className={` ${hideSidebar && " absolute left-0 top-0 translate-x-[-400px]"} transition ease-in-out duration-1000 max-w-[400px] w-full h-screen bg-black-200 py-10 overflow-hidden flex-col gap-5`}>
                <div className="flex items-center justify-center">
                    <Image width={250} alt='' src={images.logo} />
                </div>

                <div className="w-full flex flex-col pt-10 px-5 gap-5">
                    <div className='flex gap-5 flex-col'>
                        {links.map(({ name, Icon, href }) => (
                            <Link className='flex items-center gap-2 text-white-200 text-[20px] font-semibold' href={href} >
                                {Icon}
                                {name}
                            </Link>
                        ))}
                    </div>
                    {/*-- Apps section --*/}

                    <div>
                        <h1 className='text-[40px] p-2 text-white-100 font-mono font-thin flex items-center gap-2'>
                            <LuLayoutDashboard />
                            Apps
                        </h1>
                        {apps.map(({ name, Icon, href }) => (
                            <Link className='flex items-center gap-2 text-white-200 text-[20px] font-semibold font-mono' href={href} >
                                {Icon}
                                {name}
                            </Link>
                        ))}
                    </div>
                </div>


            </nav>
        </>
    )
}

export default Sidebar
