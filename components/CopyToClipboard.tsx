'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCopy } from "react-icons/fa6";


const CopyToClipboard = ({ text, size=30 }: { text: string, size?: number }) => {
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
        <div onClick={handleClick} className="cursor-pointer">
            <FaCopy color={!isCopied ? "#000" : "#00FF00"} size={size} />
        </div>
    );
};

export default CopyToClipboard;