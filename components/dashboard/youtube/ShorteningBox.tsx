"use client";
import { createDirectLink } from "@/lib/actions/directLink.action";
import { RiAiGenerate } from "react-icons/ri";
import { useFormState } from "react-dom";
import FormLoader from "../../ui/FormLoader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from 'next-client-cookies';
import VideoPreview from "./VideoPreview";
import { getYoutubeVideoId } from "@/lib/utils";
import { getYoutubeVideoData } from "@/lib/actions/youtube.action";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";

function ShorteningBox() {
    const cookies = useCookies();

    // Handle the field update
    const [ytData, setYtData] = useState({
        image: "",
        title: "",
        description: "",
        postDescription: "",
    })

    const [state, formAction] = useFormState(createDirectLink, {
        message: "",
        status: "",
        shortenLink: "",
        postDescription: "",
        userId: cookies.get("userId"),
    });

    const [showPopup, setShowPopup] = useState(false);
    const [promisePending, setPromisePending] = useState(false);
    const linkRef = useRef<HTMLInputElement>(null);
    const [isNotValidVideo, setIsNotValidVideo] = useState(true);

    // track the pasted link, & check if is a valida youtube link
    const verifyLinkValidity = (link: string) => {
        const videoId = getYoutubeVideoId(link);
        setIsNotValidVideo(false);

        if (videoId) {
            setYtData({
                image: "",
                title: "",
                description: "",
                postDescription: ""
            })
            setPromisePending(true);

            getYoutubeVideoData(videoId)
                .then(data => {
                    if (!data?.snippet) {
                        toast.error("Video not found");
                        setIsNotValidVideo(true);
                        return
                    }
                    setIsNotValidVideo(false);
                    setYtData({
                        image: data?.snippet.thumbnails.standard.url,
                        title: data?.snippet.title,
                        description: data?.snippet.description,
                        postDescription: ytData.postDescription,
                    })
                })
                .catch(error => console.log({ error }))
                .finally(() => setPromisePending(false))
        } else {
            setIsNotValidVideo(true)
            setYtData({
                image: "",
                title: "",
                description: "",
                postDescription: "",
            })
        }
    }

    // keep track of the request status
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
        <form action={formAction} className="flex flex-col gap-5">
            {showPopup && <VideoPreview
                link={state.shortenLink}
                videoTitle={ytData.title}
                videoDescription={ytData.description}
                videoImage={ytData.image}
                closePopUp={() => setShowPopup(false)}
            />}

            <div className="flex flex-col gap-5 bg-white-200 border-[2px] rounded-md">
                <div className="w-full  min-h-[150px] rounded-lg py-3 px-5 flex flex-row items-center justify-center ">
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

                <textarea
                    className="text-[20px] bg-transparent focus:outline-none font-sans text-gray-700 w-full min-h-[150px] scrollbar-hide border-[2px] rounded-md bg-white-200 my-2 p-2"
                    name="postDescription"
                    placeholder="Set a post description por publication || the default is the video title & description"
                    value={ytData.postDescription}
                    onChange={(data) => setYtData({ ...ytData, postDescription: data.target.value })}
                />
            </div>


            {
                // No link is passed will be render this component
                isNotValidVideo && <EmptyBox />
            }
            {promisePending && <VideoPreviewShrimmer />}
            {
                // when the correct link is pasted & data is loaded this component is rendered
                ytData.title && <div className="section lg:p-10">

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
                        className="text-[15px] bg-transparent focus:outline-none font-sans text-gray-400 w-full min-h-[300px] scrollbar-hide" />


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

function EmptyBox() {
    return <div className="section gap-4">
        <h1 className="w-full text-left font-semibold text-[30px] text-gray-700 font-sans py-3 border-b flex items-center gap-2"> <IoHelpCircleOutline /> How this works</h1>

        <ul className="flex flex-col gap-5 w-full text-gray-600 font-sans font-thin py-4">
            <li>1. Go to Youtube & search for an interesting video</li>
            <li>2. Copy the youtube link to that video</li>
            <li>3.  Paste the link on the top box & click generate</li>
        </ul>

    </div>
}

export default ShorteningBox
