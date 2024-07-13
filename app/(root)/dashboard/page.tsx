import { HiHandRaised } from "react-icons/hi2";
import { GiBookmarklet } from "react-icons/gi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CgLink } from "react-icons/cg";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa6";

function Dashboard() {

  return (
    <section className="container">

      <div className="section">
        <h1 className='flex items-center gap-2 text-[80px] w-full font-mono font-semibold '>
          <HiHandRaised />
          Hello
        </h1>

        <p className="text-gray-400 my-5 ">
          Arbitrer  is a URL shortener that lets you create custom, memorable short links. When someone clicks on your shortened link, they are directed to the original URL, but they first see a short advertisement. This allows you to earn money from every click on your shortened links.
        </p>

        <h1 className='flex items-center gap-2 text-[40px] w-full font-mono font-normal  border-b pb-4'>
          <GiBookmarklet className="-mb-2" />
          Getting Started
        </h1>

        <div className="py-5 px-3 rounded-md border-[2px] border-gray-200">

          <h1 className='flex items-center gap-2 text-[20px] w-full font-mono font-semibold'>
            <CgLink />
            Shortening Links:
          </h1>

          <Accordion type="multiple" >

            <AccordionItem value="option-1">
              <AccordionTrigger className="text-[20px]">Youtube Links</AccordionTrigger>
              <AccordionContent>
                <div className="section gap-4">
                  <h1 className="w-full text-left font-semibold text-[30px] text-gray-700 font-sans py-3 border-b flex items-center gap-2"> <IoHelpCircleOutline /> How this works</h1>

                  <ul className="flex flex-col gap-5 w-full text-gray-600 font-sans font-thin py-4">
                    <li>1. Go to Youtube & search for an interesting video</li>
                    <li>2. Copy the youtube link to that video</li>
                    <li>3.  Paste the link on the top box & click generate</li>
                  </ul>

                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="option-2">
              <AccordionTrigger className="text-[20px]">Direct Links</AccordionTrigger>
              <AccordionContent>
                <div className="section gap-4">
                  <h1 className="w-full text-left font-semibold text-[30px] text-gray-700 font-sans py-3 border-b flex items-center gap-2"> <IoHelpCircleOutline /> How this works</h1>

                  <ul className="flex flex-col gap-5 w-full text-gray-600 font-sans font-thin py-4">
                    <li>1. Search for a website content you like</li>
                    <li>2. Paste the link on the top box & click generate </li>
                    <li>3. Then, you will get a shorten link</li>
                    <li>4. Make the people visit that link</li>
                    <li>5. Earn Rewards per visit</li>
                  </ul>

                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        <h1 className='flex items-center gap-2 text-[40px] w-full font-mono font-normal  border-b py-5'>
          <FaChartPie  className="-mb-2" />
          Managing your views
        </h1>



      </div>



    </section>
  )
}

export default Dashboard
