"use client";
import { createDirectLink } from "@/lib/actions/directLink.action";
import { RiAiGenerate } from "react-icons/ri";
import { useFormState } from "react-dom";
import FormLoader from "../../ui/FormLoader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from 'next-client-cookies';
import ShortenerPopup from "./ShortenerPopup";

function ShorteningBox() {
    const cookies = useCookies();
    const [state, formAction] = useFormState(createDirectLink, {
        message: "",
        status: "",
        shortenLink: "http://localhost:3000/dashboard/kmsdlkvnlk",
        userId: cookies.get("userId"),
    });
    const [showPopup, setShowPopup] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);

    const closePopUp = () => {
        inputRef.current!.value = "";
        setShowPopup(false)
    }

    useEffect(() => {

        if (state.status === "failed") {
            toast.error(state.message);
        }
        if (state.status === "success") {
            setShowPopup(true)
            toast.success(state.message)
        }
    }, [state])

    return (
        <form action={formAction} className="w-full bg-white-200 min-h-[150px] rounded-lg py-3 px-5 flex flex-row items-center justify-center  border-[2px]">
            {showPopup && <ShortenerPopup closePopUp={closePopUp} link={process.env.SERVER_URL + state.shortenLink} />}
            <FormLoader />

            <div className="flex items-center justify-center flex-row border-[4px] w-full min-h-[100px] rounded-lg border-dashed bg-transparent border-gray-300">
                <input
                    name="link"
                    className="outline-none w-full p-5 text-[20px] lg:text-[20px] bg-transparent text-black font-medium "
                    ref={inputRef}
                    type="text"
                    placeholder="Drop your link here..." />


            </div>
            <button disabled={!inputRef.current?.value} className="mx-5 rounded-md flex-col  flex items-center justify-center text-[30px] min-h-[100px] px-5 font-bold text-black-100 disabled:text-gray-300">
                <RiAiGenerate />
                <h1>Shorten</h1>
            </button>
        </form>
    )
}

export default ShorteningBox
