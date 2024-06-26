import { getDirectLinksCount } from "@/lib/actions/directLink.action"
import { cookies } from "next/headers"
import { IoLinkSharp } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import Link from "next/link";

const StadisticsOverview = () => {
  const userId = cookies().get("userId")
  const directLinks = getDirectLinksCount(userId!.value);

  return (
    <div className="section">

      <h1 className='flex items-center gap-2 text-[50px] font-thin text-black-100 font-sans w-full mb-5'>
        <IoLibraryOutline size={40} />
        Your repository
      </h1>

      <Link href={"/dashboard/shortener"} className="border w-full gap-3 flex flex-row items-center bg-white-100 px-2 py-5 font-sans font-semibold text-lg cursor-pointer">
        <p className="flex flex-row gap-1 items-center"> <IoLinkSharp size={20} /> Direct Links: </p>

        <p className="text-black-100">{directLinks}</p>
      </Link>
    </div>
  )
}

const StadisticsOverviewFallback = () => {
  return <div className="section">

    <h1 className='flex items-center gap-2 text-[50px] font-thin text-black-100 font-sans w-full mb-5'>
      <IoLibraryOutline size={40} />
      Analytics
    </h1>

    <div className="border w-full gap-3 bg-gray-200 px-2 py-5 h-[50px] rounded-lg" />

  </div>
}



export { StadisticsOverview, StadisticsOverviewFallback }
