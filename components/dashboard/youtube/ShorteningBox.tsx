"use client";
import { createDirectLink } from "@/lib/actions/directLink.action";
import { RiAiGenerate } from "react-icons/ri";
import { useFormState } from "react-dom";
import FormLoader from "../../ui/FormLoader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from 'next-client-cookies';
import ShortenerPopup from "./ShortenerPopup";
import { getYoutubeVideoId } from "@/lib/utils";
import { getYoutubeVideoData } from "@/lib/actions/youtube.action";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

function ShorteningBox() {
    const cookies = useCookies();

    // Handle the field update
    const [ytData, setYtData] = useState({
        image: "",
        title: "",
        description: "",
    })

    const [state, formAction] = useFormState(createDirectLink, {
        message: "",
        status: "",
        shortenLink: "",
        userId: cookies.get("userId"),
    });

    const [showPopup, setShowPopup] = useState(false);
    const [promisePending, setPromisePending] = useState(false);
    const linkRef = useRef<HTMLInputElement>(null);

    // track the pasted link, & check if is a valida youtube link
    const verifyLinkValidity = (link: string) => {
        const videoId = getYoutubeVideoId(link);


        if (videoId) {
            setYtData({
                image: "",
                title: "",
                description: "",
            })
            setPromisePending(true);

            getYoutubeVideoData(videoId)
                .then(data => {
                    setYtData({
                        image: data?.snippet.thumbnails.standard.url,
                        title: data?.snippet.title,
                        description: data?.snippet.description
                    })
                })
                .catch(error => console.log({ error }))
                .finally(() => setPromisePending(false))
        } else {
            setYtData({
                image: "",
                title: "",
                description: "",
            })
        }
    }

    return (
        <form action={formAction} className="flex flex-col gap-5">
            <div className="w-full bg-white-200 min-h-[150px] rounded-lg py-3 px-5 flex flex-row items-center justify-center  border-[2px]">
                <FormLoader />

                <div className="flex items-center justify-center flex-row border-[4px] w-full min-h-[100px] rounded-lg border-dashed bg-transparent border-gray-300">
                    <input
                        onChange={(e) => verifyLinkValidity(e.target.value)}
                        ref={linkRef}
                        name="link"
                        className="outline-none w-full p-5 text-[20px] lg:text-[20px] bg-transparent text-black font-medium "
                        type="text"
                        placeholder="Paste Youtube video link..." />
                </div>

                <button className="mx-5 rounded-md flex-col  flex items-center justify-center text-[30px] min-h-[100px] px-5 font-bold text-black-100">
                    <MdOutlineDriveFolderUpload />
                    <h1>Generate</h1>
                </button>

            </div>

            {promisePending && <VideoPreviewShrimmer />}
            {ytData.title && <div className="section lg:p-10">



                <div className="w-full rounded-md overflow-hidden">
                    <input
                        type="text"
                        name="image"
                        value={ytData.image} hidden />
                    <img
                        className="w-full"
                        src={ytData.image}
                        alt="" />
                </div>

                <input
                    className="py-4 text-[40px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"
                    name="title"
                    type="text"
                    value={ytData.title}
                    onChange={(data) => setYtData({ ...ytData, title: data.target.value })}
                />


                <textarea
                    name="description"
                    value={ytData.description}
                    onChange={(data) => setYtData({ ...ytData, description: data.target.value })}
                    className="text-[15px] bg-transparent focus:outline-none font-sans text-gray-400 w-full min-h-[400px]" />


            </div>}

        </form>
    )
}

function VideoPreviewShrimmer() {
    return <div className="w-full bg-white-200 rounded-lg py-3 px-5 flex flex-col gap-3  border-[2px]">
        <div className="bg-gray-300 animate-pulse h-[300px] w-full rounded-md" />
        <div className="bg-gray-200 animate-pulse h-[30px] w-[40%] rounded-md" />
        <div className="bg-gray-200 animate-pulse h-[70px] w-full rounded-md" />
    </div>
}

export default ShorteningBox
