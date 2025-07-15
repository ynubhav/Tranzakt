import Homenav from "../components/homenavbar";
import LandingPage from "../components/landing";
import Profile from "./profile";
import { motion } from "framer-motion";

export default function Home(){
    return(
      <>
  <div className="min-h-screen bg-gray-800">
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow"><Homenav pfplink={'johnpork.jpeg'} /></div>
    <div className="mt-[64px] overflow-y-auto"><LandingPage/></div>
  </div>
</>

       
    )
}
