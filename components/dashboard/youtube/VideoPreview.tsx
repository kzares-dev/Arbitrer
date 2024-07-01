import { FaPlay } from "react-icons/fa6";
import CopyToClipboard from "../../ui/CopyToClipboard"
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

type ShortenerPopupType = {
    videoTitle: string,
    videoDescription: string,
    videoImage: string,
    link: string,
    postText?: string
    closePopUp: () => void,
}

function ShortenerPopup({
    videoTitle,
    videoDescription,
    videoImage,
    link,
    postText = "",
    closePopUp,
}: ShortenerPopupType) {
    return (
        <div className="fixed inset-0 z-20 bg-[black]/80 flex items-center justify-center">

            <div className="max-w-[1200px] w-full bg-white-100  lg:flex-row shadow-purple rounded-lg py-5 flex flex-col gap-3 relative pt-5">

                <div className="flex-1 px-4 lg:w-1/2">
                    <div className="section lg:p-10 bg-white-default">
                        <h1 className="w-full text-left font-semibold text-[30px] text-gray-700 font-sans py-3 border-b ">Redirect Preview:</h1>
                        <div className="w-full relative rounded-md overflow-hidden">
                            <img
                                className="w-full"
                                src={videoImage}
                                alt="" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black-default/50">
                                <FaPlay color="white" size={50} />
                            </div>
                        </div>

                        <h1 className="py-4 text-[40px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> {videoTitle} </h1>


                        <h2 className="text-[15px] bg-transparent focus:outline-none font-sans text-gray-400 w-full line-clamp-4" >{videoDescription} </h2>


                    </div>

                </div>


                <div className="px-3 lg:w-1/2 pt-10">
                    <IoMdClose size={30} onClick={closePopUp} className="cursor-pointer absolute top-2 right-2" color="black" />
                    <h1 className="w-full text-left font-semibold text-[30px] text-gray-700 font-sans py-3 border-b ">Post Preview:</h1>

                    <div className="items-center w-full bg-white-100/20 rounded-md flex py-10 flex-col  md:px-5 px-1  flex-1 justify-center relative bg-white-200 border">

                        {postText ?
                            postText :
                            <div>
                                <h1 className="py-4 text-[20px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"> {videoTitle} </h1>

                                <h2 className="text-[15px] bg-transparent focus:outline-none font-sans text-gray-400 w-full line-clamp-4" >{videoDescription} </h2>
                            </div>
                        }

                        <div className="flex-1 overflow-auto scrollbar-hide py-4">
                            <Link href={"https://localhost:3000/redirect/" + link} className="font-sans text-blue-300 text-[18px]  line-clamp-1">{"https://localhost:3000/redirect/" + link}</Link>
                        </div>

                        <CopyToClipboard className="absolute top-2 right-2" size={25} text={link} />


                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShortenerPopup
