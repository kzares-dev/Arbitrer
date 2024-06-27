"use client"
import { redirect } from "next/navigation";
import { CgDanger } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useCookies } from "next-client-cookies";
import { toast } from "react-toastify";

function DangereZone() {
    const cookies = useCookies();

    const logout = () => {
        cookies.remove("Authorization");
        toast.success("Log Out successful")
        window.location.reload();
    }

    return <div className="w-full bg-white-200 min-h-[150px] rounded-lg py-3 px-5 flex flex-col gap-4  border-[2px]">
        <h1 className='flex items-center gap-2 text-[45px] font-bold text-black-100 font-sans w-full text-red'>
            <CgDanger color="red" />
            Danger Zone
        </h1>

        <span onClick={logout} className="border flex justify-center my-5 items-center bg-white-100 rounded-lg px-2 py-4 cursor-pointer font-sans shadow">
            <p className="text-black-100 text-[25px] mr-2">Log </p>
            <RiLogoutCircleRLine color="#4F4A45" size={25} />
            <p className="text-black-100 text-[25px]">ut </p>

        </span>

    </div>

}

export default DangereZone
