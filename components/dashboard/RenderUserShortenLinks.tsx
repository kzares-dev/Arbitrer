"use client";
import { useEffect, useState } from "react";
import CopyToClipboard from "../CopyToClipboard";
import { DirectLink } from "@prisma/client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

// helper client component to display data and make the pagination works
function RenderUserShortenLinks({ links }: { links: DirectLink[] }) {
    const [data, setData] = useState<DirectLink[]>(links);
    const [currentPage, setCurrentPage] = useState(1);

    // this effect track the pagination change
    useEffect(() => {

    }, [])

    return <div className="flex flex-col gap-5 ">
        {data.map((item: DirectLink) => (
            <div className="items-center w-full min-h-[100px] bg-white-200 rounded-md flex flex-row px-1 md:px-4" key={item.id}>


                <div className="flex-1">
                    <h2 className="font-light text-gray-600 text-[16px]">{item.originalLink}</h2>
                    <h1 className="font-light text-gray-400 text-[20px]">{process.env.SERVER_URL + item.shortenLink}</h1>
                </div>

                <CopyToClipboard text={process.env.SERVER_URL + item.shortenLink} />

            </div>
        ))}


        <Pagination>
            <PaginationContent>
                
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="#"> {currentPage} </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#"> {currentPage + 1} </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    </div>
}

export default RenderUserShortenLinks;