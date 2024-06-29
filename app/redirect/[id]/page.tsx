import RenderCountdown from "@/components/redirect/RenderCountdown";
import BackgroundHero from "@/components/ui/BackgroundHero";
import { getRedirect } from "@/lib/actions/redirect.action"
import VideoData from "@/components/redirect/VideoData"
import RedirectSeo from "@/components/redirect/RedirectSeo"

const Redirect = async ({ params }: { params: { id: string } }) => {

  const redirectData = await getRedirect(params.id);
  const videoData = {
    image: redirectData?.image || "",
    title: redirectData?.title || "",
    description: redirectData?.description || "",
  }
 
  return (
    <section className="container h-screen items-center justify-center">

      <RedirectSeo videoData={videoData} />
      <BackgroundHero />
      <RenderCountdown
        originalLink={redirectData!.originalLink}
      />
      {redirectData.title && <VideoData videoData={videoData} />}

    </section>
  )
}

export default Redirect
