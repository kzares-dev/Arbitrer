import { getUserLinks } from "@/lib/actions/directLink.action";
import { DirectLink } from "@prisma/client";
import { cookies } from "next/headers"
import CopyToClipboard from "../CopyToClipboard";
import { IoLibrary } from "react-icons/io5";
async function UserShortenLinks() {

    const userId = cookies().get("userId");
    const links = await getUserLinks(userId!.value, 10, 0)

    return (
        <div className="flex flex-col gap-5 my-10 bg-black-200 p-5 rounded-[10px]">
            <h1 className='flex items-center gap-2 text-white-100 text-[30px] font-bold w-full'>
                <IoLibrary />
                Shorten Links
            </h1>

            {links.map((item: DirectLink) => (
                <div className="items-center w-full min-h-[100px] bg-black-100/20 rounded-md flex flex-row px-1 md:px-4" key={item.id}>


                    <div className="flex-1">
                        <h2 className="font-light text-gray-600 text-[16px]">{item.originalLink}</h2>
                        <h1 className="font-light text-gray-400 text-[20px]">{process.env.SERVER_URL + item.shortenLink}</h1>
                    </div>

                    <CopyToClipboard text={process.env.SERVER_URL + item.shortenLink} />

                </div>
            ))}
        </div>
    )
}

export default UserShortenLinks
