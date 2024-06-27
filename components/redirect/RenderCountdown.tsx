"use client"
import { useEffect, useRef, useState } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import Confetti from "react-confetti"
import { useWindowSize } from '@react-hook/window-size';
import MagicButton from '../ui/MagicButton';
import { IoMdLink } from "react-icons/io";
import Link from 'next/link';
import { toast } from 'react-toastify';

const RenderCountdown = ({ originalLink }: { originalLink: string }) => {

    const [completeCountdown, setCompleteCountdown] = useState<boolean>(false);
    const [windowWith, windowHeight] = useWindowSize();

    const renderTime = ({ remainingTime }: { remainingTime: any }) => {
        const currentTime = useRef(remainingTime);
        const prevTime = useRef(null);
        const isNewTimeFirstTick = useRef(false);
        const [, setOneLastRerender] = useState(0);

        if (currentTime.current !== remainingTime) {
            isNewTimeFirstTick.current = true;
            prevTime.current = currentTime.current;
            currentTime.current = remainingTime;
        } else {
            isNewTimeFirstTick.current = false;
        }

        // force one last re-render when the time is over to tirgger the last animation
        if (remainingTime === 0) {
            setTimeout(() => {
                setOneLastRerender((val) => val + 1);
            }, 20);
        }

        const isTimeUp = isNewTimeFirstTick.current;

        return (
            <div className="flex justify-center relative w-[80px] h-[60px] text-[48px] font-sans font-mono">
                <div key={remainingTime} className={`absolute left-0 top-0 w-full h-full flex items-center justify-center translate-y-0 opacity-1 transition-all duration-200 ease-in-out  ${isTimeUp ? "opacity-0 translate-y-full text-black-100" : ""}`}>
                    {remainingTime}
                </div>
                {prevTime.current !== null && (
                    <div
                        key={prevTime.current}
                        className={`absolute left-0 top-0 w-full h-full flex items-center justify-center translate-y-0 opacity-1 transition-all duration-200 ease-in-out ${!isTimeUp ? "opacity-0 translate-y-full" : ""}`}
                    >
                        {prevTime.current}
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        toast.success("Redirecting to: " + originalLink )
    }, [])

    return (
        <div className='min-w-[400px] min-h-[600px] bg-white-default z-10 border shadow flex items-center justify-center flex-col gap-3'>
            {
                !completeCountdown ?
                    <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={['#808080', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => setCompleteCountdown(true)}
                    >
                        {renderTime}
                    </CountdownCircleTimer> : <Confetti
                        numberOfPieces={40}
                        gravity={4}
                        width={windowWith}
                        height={windowHeight}
                        wind={.2}
                        recycle={false}
                    />
            }

            {completeCountdown ? <Link href={originalLink}>
                <h1 className='flex w-full font-sans gap-2 text-[30px] '>Your link is ready</h1>
                <MagicButton position="right" icon={<IoMdLink size={22} color='#4F4A45' />} title='Go to Website' />
            </Link>
                :
                <h1 className='flex items-center justify-center text-center w-full font-sans gap-2 text-[30px] '>Link is getting ready</h1>
            }

        </div>
    )
}

export default RenderCountdown
