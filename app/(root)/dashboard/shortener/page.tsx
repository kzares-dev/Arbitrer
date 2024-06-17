import { IoLinkOutline } from "react-icons/io5";

const Shortener = () => {
    return (
        <section className="flex-1 h-screen overflow-y-hidden max-w-[950px] mx-auto p-5 lg:pt-20">

            <h1 className='flex items-center gap-2 text-purple text-[80px] font-semibold w-full'>
                <IoLinkOutline />
                Shortener
            </h1>


            {/*-- Shortening box functionality --*/}
            <div className="w-full bg-black-250 min-h-[200px] rounded-[20px] py-3 px-5">
                
            </div>



            {/*-- Some of the prevs shorten links --*/}

        </section>
    )
}

export default Shortener;