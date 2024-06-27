import { RiRobot2Fill } from "react-icons/ri";
import { StadisticsOverview, TrafficOverview } from "@/components/dashboard";

function Dashboard() {
  return (
    <section className="container">
      
      <h1 className='flex items-center gap-2 text-[80px] w-full font-sans font-normal lg:mb-10'>
        <RiRobot2Fill />
        Welcome Back
      </h1>

      <StadisticsOverview />

      <TrafficOverview />


    </section>
  )
}

export default Dashboard
