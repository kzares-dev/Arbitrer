import { getUserYoutubeLinks, getYoutubeLinksCount } from "@/lib/actions/directLink.action"
import { cookies } from "next/headers"
import { CgYoutube } from "react-icons/cg"
import { IoLibrary } from "react-icons/io5"
import { MdOutlineSmsFailed } from "react-icons/md"
import { PiSmileySadBold } from "react-icons/pi"
import { RenderUserYoutubeLinks } from "@/components/dashboard"



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

async function UserYoutubeLinks() {

  const userId = cookies().get("userId");
  let links;
  let totalPages;
  let linksQty;

  try {
    links = await getUserYoutubeLinks(userId!.value, 3, 0)
    linksQty = await getYoutubeLinksCount(userId!.value);
    if (linksQty % 5 === 0) totalPages = Math.trunc(linksQty / 5)
    else totalPages = Math.trunc(linksQty / 5) + 1
  } catch (e: any) {
    console.log(e)
    return <Error />
  }
  return (
    <div className="flex flex-col gap-5 my-10 bg-white-200 p-5 rounded-lg  border-[2px]">
      <h1 className='flex items-center gap-2  text-[30px] font-bold w-full'>
        <CgYoutube />
        Youtube Links
      </h1>


      {
        links.length == 0
          ? <NoLinks />
          : <RenderUserYoutubeLinks linksQty={linksQty} userId={userId!.value} totalPages={totalPages} links={links}  />
      }

    </div>
  )
}


export default UserYoutubeLinks
