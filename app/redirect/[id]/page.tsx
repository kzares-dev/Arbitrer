import RenderCountdown from "@/components/redirect/RenderCountdown";
import BackgroundHero from "@/components/ui/BackgroundHero";
import { getRedirect } from "@/lib/actions/redirect.action"

const Redirect = async ({ params }: { params: { id: string } }) => {

  const redirectData = await getRedirect(params.id);


  return (
    <section className="container h-screen items-center justify-center">

      <BackgroundHero/>
      <RenderCountdown originalLink={redirectData!.originalLink} />

    </section>
  )
}

export default Redirect
