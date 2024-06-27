"use client";
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLinkOutline } from "react-icons/io5";
import { CgMenuLeft } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { useWindowWidth } from "@react-hook/window-size";
import { GrAnalytics } from "react-icons/gr";

function Sidebar() {
    const [hideSidebar, setHideSidebar] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const windowWith = useWindowWidth()


    useEffect(() => {
        if (windowWith <= 800) {
            setHideSidebar(true);
            setIsMobile(true);
        } else {
            setHideSidebar(false);
            setIsMobile(false);
        }
    }, [windowWith]);

    const links = [
        { name: 'Home', Icon: <FaHome />, href: "/" },
        { name: 'Profile', Icon: <CiUser />, href: "/dashboard/profile" },
       // { name: 'Guides', Icon: <FiBook />, href: "/" },
        { name: 'Analytics', Icon: <GrAnalytics />, href: "/dashboard/analytics" },

    ]
    const apps = [
        { name: 'Shortener', Icon: <IoLinkOutline />, href: "/dashboard/shortener" },
    ]
    return (
        <>
            {isMobile && <CgMenuLeft
                onClick={() => setHideSidebar(!hideSidebar)}
                className='fixed top-4 left-4 z-10'
                size={30}
                color='black' />}

            <nav className={` ${hideSidebar && " absolute left-0 top-0 translate-x-[-400px]"} transition ease-in-out duration-1000 max-w-[400px] w-full h-screen bg-white-200 shadow py-10 overflow-hidden flex-col gap-5`}>
                <div className="flex items-center justify-center">
                    {/** <Image width={250} alt='' src={images.logo} /> */}
                    <h1 className='text-[50px] text-black font-bold font-sans'>Arbitrer</h1>
                </div>

                <div className="w-full flex flex-col pt-10 px-5 gap-5">
                    <div className='flex gap-5 flex-col'>
                        {links.map(({ name, Icon, href }) => (
                            <Link key={name} className='flex items-center text-black-100 gap-2 text-[20px] font-semibold' href={href} >
                                {Icon}
                                {name}
                            </Link>
                        ))}
                    </div>
                    {/*-- Apps section --*/}

                    <div>
                        <h1 className='text-[40px] p-2  font-mono font-thin flex items-center gap-2'>
                            <LuLayoutDashboard />
                            Apps
                        </h1>
                        {apps.map(({ name, Icon, href }) => (
                            <Link key={name} className='text-black-100 flex items-center gap-2 text-[20px] font-semibold font-mono' href={href} >
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
