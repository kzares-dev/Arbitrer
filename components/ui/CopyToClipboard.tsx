'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCopy } from "react-icons/fa6";


const CopyToClipboard = ({ text,color="#000", size=30, className="" }: { text: string,color?: string , size?: number, className?: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500); 
            toast.success("Link copied to clipboard");
        } catch (error) {
            toast.success("Failed to copy link");
        }
    };

    return (
        <div onClick={handleClick} className={`cursor-pointer ${className} z-2 bg-white-100`}>
            <FaCopy color={!isCopied ? color : "#00FF00"} size={size} />
        </div>
    );
};

export default CopyToClipboard;