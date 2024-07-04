"use client";
import { useEffect, useState } from "react";
import CopyToClipboard from "../ui/CopyToClipboard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getUserYoutubeLinks } from "@/lib/actions/directLink.action";
import LinkShrimmer from "./LinkShrimmer";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

type DirectLink = {
  id: string,
  createdAt: Date,
  totalViewCount: number,
  originalLink: string,
  shortenLink: string
  image?: string,
  description?: string,
  title?: string,
  postDescription?: string,
}

export default function RenderLink(
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
  }
) {

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

  return <div className="flex flex-col gap-2 border-[2px] border-gray-200 rounded-md p-3">
    {(promisePending) ? <div className="">
      <LinkShrimmer />
      <LinkShrimmer />
      <LinkShrimmer />
    </div> : data.map((item: DirectLink) => (
      <Link href={`/dashboard/analytics/${item.id}`} className="min-h-[80px] py-4 px-1 md:px-4 flex-row cursor-pointer border-b-[2px] border-gray-200" key={item.id}>
        
        <span className="flex-1"> {item.createdAt.toLocaleDateString()} </span>
        <span className="flex-1"> {item.originalLink} </span>
        <span className="flex-1"> {item.shortenLink} </span>
        <span className="flex-1"> {item.totalViewCount} </span>
        
      </Link>))
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