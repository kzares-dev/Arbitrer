import ShorteningBox from "@/components/dashboard/shortener/ShorteningBox";
import { UserLinksShrimmer } from "@/components/dashboard/shortener/UserLinksShrimmer";
import UserShortenLinks from "@/components/dashboard/shortener/UserShortenLinks";
import { Suspense } from "react";
import { IoLinkOutline } from "react-icons/io5";

const Shortener = () => {
    return (
        <section className="container">

            <h1 className='flex items-center gap-2 text-[80px] font-semibold w-full'>
                <IoLinkOutline />
                Shortener
            </h1>

            {/*-- Shortening box functionality --*/}
            <ShorteningBox />

            {/*-- Some of the prevs shorten links --*/}
            <Suspense fallback={<UserLinksShrimmer />}>
                <UserShortenLinks />
            </Suspense>

        </section>
    )
}

export default Shortener;