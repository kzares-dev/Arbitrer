"use setver";
import { cookies } from "next/headers"
import { getUser } from "@/lib/actions/user.action";
import { FaUserAstronaut } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const GetProfileData = async () => {

  const userId = cookies().get("userId");
  const user = await getUser(userId!.value);

  return <div className="w-full bg-white-200 min-h-[150px] rounded-lg py-3 px-5 flex flex-col gap-4  border-[2px]">
    <h1 className='flex items-center gap-2 text-[60px] font-thin text-black-100 font-sans w-full'>
      <FaUserAstronaut size={40} />
      Profile
    </h1>

    <div className="flex flex-col gap-3">
      <span className="border gap-3 flex flex-row items-center bg-white-100 px-2 py-5 font-sans font-semibold text-lg">
        <p className="text-black-100">Username:</p>
        <p className="flex flex-row gap-1 items-center"> <MdAlternateEmail size={20} />{user.username}</p>
      </span>
      <span className="border gap-3 flex flex-row items-center bg-white-100 px-2 py-5 font-sans font-semibold text-lg">
        <p className="text-black-100">Email:</p>
        
        <p className="flex flex-row gap-1 items-center"> <MdOutlineMail size={20} /> {user.email}</p>
      </span>
    </div>
  </div>
}

export default GetProfileData
