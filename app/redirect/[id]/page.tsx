import RenderCountdown from "@/components/redirect/RenderCountdown";
import BackgroundHero from "@/components/ui/BackgroundHero";
import { getRedirect } from "@/lib/actions/redirect.action"
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
 
  // fetch data
  const redirectData = await getRedirect(params.id)
  
  return {
    title: redirectData?.title || "",
    description: redirectData?.description || "",
    openGraph: {
      images: [redirectData?.image || ""],
    },
  }
}


const Redirect = async ({ params, searchParams }: Props) => {

  const redirectData = await getRedirect(params.id);
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
