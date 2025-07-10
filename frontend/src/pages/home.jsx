import Homenav from "../components/homenavbar";
import LandingPage from "../components/landing";
import Profile from "./profile";



export default function Home(){
    return(
        <>
  <div className="min-h-screen bg-gray-800">
    <Homenav pfplink={'johnpork.jpeg'} />
    <LandingPage/>
    <div className="flex bg-gray-950 text-white">Pages</div>
  </div>
</>

       
    )
}
