import { StadisticsOverview, StadisticsOverviewFallback, TotalLinksChart } from "@/components/analytics";
import { Suspense } from "react";
import { GrAnalytics } from "react-icons/gr";


function Analytics() {

  return (
    <section className="container">

      <h1 className='flex items-center gap-2 text-[80px] w-full font-sans font-normal lg:mb-10'>
        <GrAnalytics />
        Analytics
      </h1>

      <Suspense fallback={<StadisticsOverviewFallback />}>
        <StadisticsOverview />
      </Suspense>

      <TotalLinksChart />



    </section>
  )
}

export default Analytics
