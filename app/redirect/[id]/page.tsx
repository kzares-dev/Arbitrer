import RenderCountdown from "@/components/redirect/RenderCountdown";
import BackgroundHero from "@/components/ui/BackgroundHero";
import { getLinkMetadata } from "@/lib/actions/directLink.action"
import VideoData from "@/components/redirect/VideoData"
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  const redirectData = await getLinkMetadata(params.id, false)
  
  return {
    title: redirectData?.title || "",
    description: redirectData?.description || "",
    openGraph: {
      images: [redirectData?.image || ""],
    },
  }
}


const Redirect = async ({ params, searchParams }: Props) => {

  const redirectData = await getLinkMetadata(params.id, true);
  const videoData = {
    image: redirectData?.image || "",
    title: redirectData?.title || "",
    description: redirectData?.description || "",
  }
 
  return (
    <section className="container h-screen items-center justify-center">

      <BackgroundHero />
      <RenderCountdown
        originalLink={redirectData!.originalLink}
      />
      {redirectData?.title && <VideoData videoData={videoData} />}

    </section>
  )
}

export default Redirect
