"use client";
import {NextSeo} from "next-seo"

function RedirectSeo({videoData}: {videoData: {title: string, image: string, description: string}}) {
  return (
    <NextSeo
      title={videoData.title}
      description={videoData.description}
      image={videoData.image}
      
      
    />

  )
}

export default RedirectSeo