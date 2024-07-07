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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUserYoutubeLinks } from "@/lib/actions/directLink.action";
import LinkShrimmer from "./LinkShrimmer";
import { selectClipboardCopy } from "@/lib/utils";
import { CgEyeAlt } from "react-icons/cg";
import Link from "next/link";
import { IoAnalytics } from "react-icons/io5";

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
    type,
  }: {
    links: DirectLink[],
    totalPages: number,
    userId: string,
    linksQty: number,
    type: string

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
    const skip = currentPage === totalPages ? linksQty % 5 + 1 : 5

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

  return (
    <div className="">

      <Table>
        <TableCaption>A list of your recent {type} links.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Created</TableHead>
            <TableHead>Redirect Url</TableHead>
            <TableHead>Shorten Link</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Preview</TableHead>
            <TableHead className="text-right">Analytics</TableHead>

          </TableRow>
        </TableHeader>

        {(promisePending) ? <LinkShrimmer /> : <TableBody>
          {data.map((item: DirectLink) => (

            <TableRow className="my-2 font-sans text-black-100  cursor-pointer">
              <TableCell className="font-medium"> {item.createdAt.toLocaleDateString()} </TableCell>
              <TableCell> {item.originalLink} </TableCell>
              <TableCell> {`${serverUrl}redirect/${item.shortenLink}`} </TableCell>
              <TableCell className="text-right"> {item.totalViewCount} </TableCell>

              <TableCell className="text-right">

                <DropdownMenu>
                  <DropdownMenuTrigger><CgEyeAlt size={25} /></DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white-200 border">
                    <DropdownMenuLabel>Video Preview</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {!item.image && item.title && item.description && (
                      <h1 className="py-4 text-[15px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> No preview </h1>

                    )}

                    <div className="flex flex-col  items-center py-4 gap-3 w-[250px] relative">

                      <CopyToClipboard color="#fff"  className="absolute top-3 right-3 p-3 rounded-full bg-black-default shadow border" text={selectClipboardCopy(item.description, item.title, item.description, item.shortenLink)} size={25} />

                      <div className=" w-[200px] rounded-md overflow-hidden">
                        <img src={item.image} className="w-full h-full" alt="" />
                      </div>

                      <div className="px-3 flex-1 h-full relative">

                        {item.postDescription
                          ? <h1 className="py-4 text-[18px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> {item.postDescription} </h1>
                          : <div>
                            <h1 className="py-4 text-[15px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> {item.title} </h1>

                            <h2 className="text-[13px] bg-transparent focus:outline-none font-sans text-gray-400 w-full line-clamp-2" >{item.description} </h2>
                          </div>
                        }

                      </div>
                    </div>

                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>

              <TableCell >
                <Link className="w-full bg-gray-00 border px-3 py-1 hover:bg-gray-200 transition-all  rounded-md flex items-center justify-center" href={`/dashboard/analytics/${item.shortenLink}`}>
                  <IoAnalytics size={25} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        }

      </Table>


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
  )

}