import { RiRobot2Fill } from "react-icons/ri";
import { StadisticsOverview, TrafficOverview } from "@/components/dashboard";
import { GrAnalytics } from "react-icons/gr";
import { Suspense } from "react";


function Dashboard() {

  const StadisticsOverviewFallback = () => {
    return <div className="section">
  
      <h1 className='flex items-center gap-2 text-[50px] font-thin text-black-100 font-sans w-full mb-5'>
        <GrAnalytics size={40} />
        Analytics
      </h1>
  
      <div className="border w-full gap-3 bg-gray-200 px-2 py-5 h-[50px] rounded-lg" />
  
    </div>
  }


  return (
    <section className="container">

      <h1 className='flex items-center gap-2 text-[80px] w-full font-sans font-normal lg:mb-10'>
        <RiRobot2Fill />
        Welcome Back
      </h1>

      <Suspense fallback={<StadisticsOverviewFallback />}>
        <StadisticsOverview />
      </Suspense>

      <TrafficOverview />


    </section>
  )
}

export default Dashboard
