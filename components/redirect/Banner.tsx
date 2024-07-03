"use client"
import { useEffect, useRef } from "react";

export default function Banner(): JSX.Element {
    const banner = useRef<HTMLDivElement>(null);
    const atOptions = {
        'key': '480b698ae6593f025d993aa0fee4499c',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
    };

    useEffect(() => {
        if (banner.current && banner.current.firstChild) {
            const conf = document.createElement("script");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "//www.topcreativeformat.com/480b698ae6593f025d993aa0fee4499c/invoke.js";
            const innerHtml = `atOptions = ${JSON.stringify(atOptions)}`
            banner.current.appendChild(script)
        }
    }, [banner])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-black text-center" ref={banner}>
        
    </div>
}