"use client";
import { createDirectLink } from "@/lib/actions/directLink.action";
import { RiAiGenerate } from "react-icons/ri";
import { useFormState } from "react-dom";
import FormLoader from "../FormLoader";
import { useEffect, useState } from "react";
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
        <form action={formAction} className="w-full bg-black-200 min-h-[150px] rounded-[20px] py-3 px-5 flex flex-row items-center justify-center">
            {showPopup && <ShortenerPopup closePopUp={() => setShowPopup(!showPopup)} link={process.env.SERVER_URL + state.shortenLink} />}
            <FormLoader />

            <div className="flex items-center justify-center flex-row border-[4px] w-full min-h-[100px] rounded-lg border-dashed bg-transparent border-white-100">
                <input
                    name="link"
                    className="outline-none w-full p-5 text-[20px] lg:text-[20px] bg-transparent text-white font-thin "
                    type="text"
                    placeholder="Drop your link here..." />


            </div>
            <button className="mx-5 rounded-md flex-col  flex items-center justify-center text-[30px] min-h-[100px] px-5 font-bold text-white-200">
                <RiAiGenerate />
                <h1>Shorten</h1>
            </button>
        </form>
    )
}

export default ShorteningBox
