import { getUserLinks } from "@/lib/actions/directLink.action";
import { cookies } from "next/headers"
import { IoLibrary } from "react-icons/io5";
import RenderUserShortenLinks from "./RenderUserShortenLinks";
import { MdOutlineSmsFailed } from "react-icons/md";


const Error = () => {
    return (
        <div className="h-[300px] w-full flex items-center justify-center flex-col gap-2  bg-white-200 border-[2px] my-5">
            <MdOutlineSmsFailed size={40} color="red" />
            <h1 className="text-[30px] font-bold ">Failed to load data</h1>
            <h2 className="text-[18px] text-gray-400">Try refreshing the page</h2>
        </div>
    )
}

async function UserShortenLinks() {

    const userId = cookies().get("userId");
    let links;

    try {
        links = await getUserLinks(userId!.value, 10, 0)
    } catch (e: any) {
        console.log(e)
        return <Error />
    }

    return (
        <div className="flex flex-col gap-5 my-10 bg-white-200 p-5 rounded-lg  border-[2px]">
            <h1 className='flex items-center gap-2  text-[30px] font-bold w-full'>
                <IoLibrary />
                Shorten Links
            </h1>

            <RenderUserShortenLinks links={links} />

        </div>
    )
}




export default UserShortenLinks
