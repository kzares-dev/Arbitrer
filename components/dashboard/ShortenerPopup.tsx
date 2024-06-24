import CopyToClipboard from "../CopyToClipboard"
import { IoMdClose } from "react-icons/io";

function ShortenerPopup({ link, closePopUp }: { link: string, closePopUp: () => void }) {
    return (
        <div className="fixed inset-0 z-20 bg-[black]/70 flex items-center justify-center">

            <div className="max-w-[500px] w-full bg-white-100 shadow-custom shadow-purple rounded-lg py-5 flex flex-col gap-3 relative pt-5">

                <IoMdClose size={30} onClick={closePopUp} className="cursor-pointer absolute top-2 right-2" color="black" />
                <h2 className="font-sans text-black-100 text-[25px] pl-4">Shorten Link:</h2>

                <div className="items-center w-full bg-white-100/20 rounded-md flex flex-row px-1 md:px-4 ">

                    <div className="flex-1 overflow-auto scrollbar-hide ml-4">
                        <h1 className="font-mono text-gray-500 text-[18px]">{link}</h1>
                    </div>
                    
                    <CopyToClipboard size={25} text={link} />


                </div>
            </div>

        </div>
    )
}

export default ShortenerPopup
