"use client";
import { useEffect, useState } from "react";
import CopyToClipboard from "../../ui/CopyToClipboard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getUserYoutubeLinks } from "@/lib/actions/directLink.action";
import { LinkShrimmer } from "./UserYoutubeLinksShrimmer";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

type DirectLink = {
  id: string,
  createdAt: Date,
  totalViewCount: number,
  originalLink: string,
  shortenLink: string
  image: string,
  description: string,
  title: string,
  postDescription: string,
}

// helper client component to display data and make the pagination works
function RenderUserYoutubeLinks(
  {
    links,
    totalPages,
    userId,
    linksQty,
  }: {
    links: DirectLink[],
    totalPages: number,
    userId: string,
    linksQty: number
  }) {

  const [data, setData] = useState<DirectLink[]>(links);
  const [currentPage, setCurrentPage] = useState(1);
  const [promisePending, setPromisePending] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [serverUrl, _] = useState("http://localhost:3000/")

  // this effect track the pagination change & call the database for the data
  useEffect(() => {
    /*
        This effect runs on the first page load when the data is alredy fetched
        so it must be a trigger that keeps a record of the first page load
        
    */
    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }

    setPromisePending(true);
    const skip = currentPage === totalPages ? linksQty % 3 + 1 : 3

    getUserYoutubeLinks(userId, skip, currentPage - 1).then((data: DirectLink[]) => {
      setData(data);
      setPromisePending(false)
    })

  }, [currentPage])

  // function to handle the pagination change
  // validate if is the end of data 
  const paginationChange = (change: number) => {

    if (totalPages < currentPage + change) {
      setCurrentPage(1);
      return
    }
    if (currentPage + change < 1) {
      return;
    }
    // normal increase
    setCurrentPage(currentPage + change)
  }


  const selectClipboardCopy = (postDescription: string, videoTitle: string, videoDescription: string, link: string) => {
    let clipboardText;

    if (postDescription) {
      clipboardText = postDescription;
    } else {
      clipboardText = `${videoTitle} \n ${videoDescription}`
    }

    clipboardText += `\n \n https://localhost:3000/redirect/${link}`;
    return clipboardText;

  }

  
  return <div className="flex flex-col gap-5 ">
    {(promisePending) ? <div className="">
      <LinkShrimmer />
      <LinkShrimmer />
      <LinkShrimmer />
    </div> : data.map((item: DirectLink) => (
      <div className="min-h-[100px] py-4 border-[2px] rounded-md px-1 md:px-4 " key={item.id}>

        <div className="flex flex-row  items-center w-full py-4 gap-3">

          <div className=" w-[200px] rounded-md overflow-hidden">
            <img src={item.image} className="w-full h-full" alt="" />
          </div>

          <div className="px-3 flex-1 h-full relative">

            <CopyToClipboard className="absolute top-3 right-3" text={selectClipboardCopy(item.description, item.title, item.description, item.shortenLink)} />

            {item.postDescription
              ? <h1 className="py-4 text-[20px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> {item.postDescription} </h1>
              : <div>
                <h1 className="py-4 text-[20px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> {item.title} </h1>

                <h2 className="text-[15px] bg-transparent focus:outline-none font-sans text-gray-400 w-full line-clamp-2" >{item.description} </h2>
              </div>
            }

            <div className="flex-1 overflow-auto scrollbar-hide py-4">
              <Link href={"http://localhost:3000/redirect/" + item.shortenLink} className="font-sans text-blue-300 text-[18px]  line-clamp-1">{"http://localhost:3000/redirect/" + item.shortenLink}</Link>
            </div>

          </div>
        </div>

        <div className="w-full flex items-center py-3 flex-row gap-4">

          <div className="flex flex-row gap-2 text-[20px] text-black-100 items-center font-sans">
            <FaEye />
            <p> {item.totalViewCount} </p>
          </div>

          <div className="flex flex-row gap-2 text-[20px] text-gray-400 items-center font-sans">
            <CiCalendar />
            <p> {item.createdAt.toLocaleDateString()} </p>
          </div>

        </div>
      </div>))
    }



    <Pagination>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={() => paginationChange(-1)} />
        </PaginationItem>

        <PaginationItem>
          <div className="px-3 py-1 rounded-md bg-black-100 text-white-100 font-bold cursor-pointer">
            {currentPage}
          </div>
        </PaginationItem>

        {currentPage + 1 <= totalPages && <PaginationItem>
          <div className="px-3 py-1 rounded-md bg-gray-100 cursor-pointer">
            {currentPage + 1}
          </div>

        </PaginationItem>}

        {currentPage + 2 <= totalPages && <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>}

        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={() => paginationChange(1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  </div>
}

export default RenderUserYoutubeLinks;