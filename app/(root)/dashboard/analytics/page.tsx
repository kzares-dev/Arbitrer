import { RiRobot2Fill } from "react-icons/ri";
import { StadisticsOverview, StadisticsOverviewFallback } from "@/components/analytics";
import { Suspense } from "react";


function Analytics() {

  return (
    <section className="container">

      <h1 className='flex items-center gap-2 text-[80px] w-full font-sans font-normal lg:mb-10'>
        <RiRobot2Fill />
        Welcome Back
      </h1>

      <Suspense fallback={<StadisticsOverviewFallback />}>
        <StadisticsOverview />
      </Suspense>



    </section>
  )
}

export default Analytics
