import LinkChart from '@/components/analytics/LinkChart';
import RenderChart from '@/components/analytics/RenderChart';
import CopyToClipboard from '@/components/ui/CopyToClipboard';
import { getLinkMetadata } from '@/lib/actions/directLink.action'
import { generateMonthDates, generateObjectWithValues } from '@/lib/utils';
import Link from 'next/link';
import { CgEye } from 'react-icons/cg';
import { MdInsights } from "react-icons/md";

async function VideoAnalytics({ params }: { params: { id: string } }) {
    const item = await getLinkMetadata(params.id, false);

    return (
        <div className='container'>

            {/* -- Video details section -- */}


            {/*-- Insights section--*/}
            <div className="section gap-4">
                <h1 className='flex items-center gap-2 text-[30px] w-full font-sans font-normal '>
                    <MdInsights />
                    Insights
                </h1>

                <h2 className='text-[25px] text-gray-500 font-thin font-sans flex flex-row gap-2 items-center text-left border-b pb-2'> <CgEye /> Total Views: {item?.totalViewCount} </h2>

                <Link className='text-[16px] text-blue-400 font-sans' href={`http://localhost:3000/redirect/${item?.shortenLink}`}> {`http://localhost:3000/redirect/${item?.shortenLink}`} </Link>
                {/* -- Here goes the link performance & view count -- */}
                <RenderChart data={JSON.parse(JSON.stringify(item?.viewCount))} />
            </div>
        </div>
    )
}

export default VideoAnalytics
