import { FaPlay } from "react-icons/fa";
function VideoData({
    videoData
}: {
   videoData : {
    image: string,
    title: string,
    description: string
   }
}) {
    return (
        <div className="section lg:p-10 bg-white-default">
                <div className="w-full relative rounded-md overflow-hidden">
                    <img
                        className="w-full"
                        src={videoData.image}
                        alt="" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black-default/50">
                        <FaPlay color="white" size={50}   />
                        </div>
                </div>

                <h1
                    className="py-4 text-[40px] font-thin font-sans text-left w-full text-black-100 border-b my-2 bg-transparent focus:outline-none"
                > {videoData.title} </h1>


                <h2
                    className="text-[15px] bg-transparent focus:outline-none font-sans text-gray-400 w-full line-clamp-4" >{videoData.description} </h2>


            </div>
    )
}

export default VideoData