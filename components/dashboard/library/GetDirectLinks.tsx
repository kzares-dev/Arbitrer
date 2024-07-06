import { getUserDirectLinks, getDirectLinksCount } from "@/lib/actions/directLink.action"
import { cookies } from "next/headers"
import { MdOutlineSmsFailed } from "react-icons/md"
import { PiSmileySadBold } from "react-icons/pi"
import RenderLinks from "./RenderLinks"
import { FaLink } from "react-icons/fa6"



const Error = () => {
    return (
        <div className="h-[300px] w-full flex items-center justify-center flex-col gap-2  bg-white-200 border-[2px] my-5">
            <MdOutlineSmsFailed size={40} color="red" />
            <h1 className="text-[30px] font-bold ">Failed to load data</h1>
            <h2 className="text-[18px] text-gray-400">Try refreshing the page</h2>
        </div>
    )
}

const NoLinks = () => {
    return <div className="h-[300px] w-full flex items-center justify-center flex-col gap-2  bg-white-200 border-[2px] my-5">
        <PiSmileySadBold size={40} />
        <h1 className="text-[30px] font-bold "> No links found </h1>
        <h2 className="text-[18px] text-gray-400">Try creating new one</h2>
    </div>
}

export default async function GetDirectLinks() {
    const userId = cookies().get("userId");
    let links;
    let totalPages;
    let linksQty;

    try {
        links = await getUserDirectLinks(userId!.value, 5, 0)
        linksQty = await getDirectLinksCount(userId!.value);
        if (linksQty % 5 === 0) totalPages = Math.trunc(linksQty / 5)
        else totalPages = Math.trunc(linksQty / 5) + 1
    } catch (e: any) {
        console.log(e)
        return <Error />
    }

    return (
        <div className="flex flex-col gap-5 bg-white-200 p-5 rounded-lg  border-[2px]">
            <h1 className='flex items-center gap-2  text-[30px] font-bold w-full'>
                <FaLink />
                Direct Links
            </h1>


            {
                links.length == 0
                    ? <NoLinks />
                    : <RenderLinks type="direct" linksQty={linksQty} userId={userId!.value} totalPages={totalPages} links={links} />
            }

        </div>
    )
}