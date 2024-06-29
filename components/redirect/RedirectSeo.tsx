"use client";
import {NextSeo} from "next-seo"

function RedirectSeo({videoData}: {videoData: {title: string, image: string, description: string}}) {
  return (
    <NextSeo
      title={videoData.title}
      description={videoData.description}
      openGraph={{
        type: 'website',
        title: videoData.title,
        description: videoData.description,
        images: [
          {
            url: videoData.image,
            width: 800,
            height: 600,
            alt: "",
          },  
        ],
      }}
      
      
    />

  )
}

export default RedirectSeo