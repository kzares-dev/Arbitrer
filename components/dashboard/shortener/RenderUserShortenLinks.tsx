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
import { getUserDirectLinks } from "@/lib/actions/directLink.action";
import { LinkShrimmer } from "./UserLinksShrimmer";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

type DirectLink = {
    id: string,
    createdAt: Date,
    totalViewCount: number,
    originalLink: string,
    shortenLink: string
}

// helper client component to display data and make the pagination works
function RenderUserShortenLinks(
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
    const [serverUrl, _] = useState("http://localhost:3000")

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

        getUserDirectLinks(userId, skip, currentPage - 1).then((data: DirectLink[]) => {
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



    return <div className="flex flex-col gap-5 ">
        {(promisePending) ? <div className="">
            <LinkShrimmer />
            <LinkShrimmer />
            <LinkShrimmer />
            <LinkShrimmer />
            <LinkShrimmer />
        </div> : data.map((item: DirectLink) => (
            <div className="min-h-[100px] bg-white-100 py-4 border-[2px] rounded-md px-1 md:px-4 " key={item.id}>

                <div className="flex flex-row  items-center w-full ">

                    <div className="flex-1">
                        <h2 className="font-light text-gray-600 text-[16px]">{item.originalLink}</h2>
                        <h1 className="font-light text-gray-400 text-[20px]">{serverUrl + "redirect/" + item.shortenLink}</h1>
                    </div>

                    <CopyToClipboard text={process.env.SERVER_URL + item.shortenLink} />

                </div>

                <div className="w-full flex items-center py-3 justify-between">
                    <div className="flex flex-row gap-2 text-[20px] text-black-100 items-center font-sans">
                        <CiCalendar />
                        <p> {item.createdAt.toLocaleDateString()} </p>
                    </div>

                    <div className="flex flex-row gap-2 text-[20px] text-black-100 items-center font-sans">
                        <FaEye />
                        <p> {item.totalViewCount} </p>
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

export default RenderUserShortenLinks;