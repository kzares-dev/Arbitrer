import { ShorteningBox } from "@/components/dashboard/youtube";
import { TfiYoutube } from "react-icons/tfi";

async function Youtube() {

  return (
    <section className="container">

    <h1 className='flex items-center gap-2 text-[80px] font-semibold w-full'>
        <TfiYoutube />
        Video
    </h1>

    <ShorteningBox />
      
    </section>
  )
}

export default Youtube
