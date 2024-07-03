import { UserLinksShrimmer, UserShortenLinks, UserYoutubeLinks } from "@/components/dashboard"
import { UserYoutubeLinksShrimmer } from "@/components/dashboard/library/UserYoutubeLinksShrimmer"
import { Suspense } from "react"
import { IoLibrarySharp } from "react-icons/io5"

function Library() {
    return (
        <section className="container">

            <div className="flex flex-col gap-2 lg:mb-10">
                <h1 className='flex items-center gap-2 text-[80px] w-full font-sans font-normal '>
                    <IoLibrarySharp />
                    Library
                </h1>
                <p className="text-[25px] max-w-[700px] text-gray-400 font-sans">Here you can find all the link's you have shorten, for more information click on one of them</p>

            </div>
            <Suspense fallback={<UserYoutubeLinksShrimmer />}>
                <UserYoutubeLinks />
            </Suspense>
            <Suspense fallback={<UserLinksShrimmer />}>
                <UserShortenLinks />
            </Suspense>

    </section>
    )
}

export default Library
