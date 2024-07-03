"use client"

import { useEffect } from "react"

type AddBannerType = {
    dataAdSlot: string,
    dataAdFormat: string,
    dataFullWidthResponsive: boolean,
}
export default function AddBanner({ dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive, }: AddBannerType) {

    useEffect(() =>{
        try{
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        }catch(e:any) {
            console.log(e.message)
        }
    }, [])

    return <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub"
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
        data-ad-slot={dataAdSlot}
    >

    </ins>
}