"use client";
import { createDirectLink } from "@/lib/actions/directLink.action";
import { RiAiGenerate } from "react-icons/ri";
import { useFormState } from "react-dom";
import FormLoader from "../FormLoader";


const initialState = {
    message: "",
    status: "",
    userId: "75b0d6b1-059a-4e84-8091-6644a1150e95",
}   

function ShorteningBox() {

    const [state, formAction] = useFormState(createDirectLink, initialState);

    

    return (
        <form action={formAction} className="w-full bg-black-200 min-h-[150px] rounded-[20px] py-3 px-5 flex flex-row items-center justify-center">
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
