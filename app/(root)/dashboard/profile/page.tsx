import { GetProfileData } from "@/components/dashboard";
import DangereZone from "@/components/dashboard/profile/DangereZone";

function Profile() {
  {/*
    //TODO: To implement in this section
    - get the user data, ex: username email
    - catch the user in global state
    - analytics track
    - logout section 
  */}


  return (
    <section className="container">
      <GetProfileData />
      <DangereZone />

    </section>
  )
}

export default Profile