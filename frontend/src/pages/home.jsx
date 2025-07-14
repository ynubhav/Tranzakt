import Homenav from "../components/homenavbar";
import LandingPage from "../components/landing";
import Profile from "./profile";
import { motion } from "framer-motion";

export default function Home(){
    return(
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    ><>
  <div className="min-h-screen bg-gray-800">
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow"><Homenav pfplink={'johnpork.jpeg'} /></div>
    <div className="mt-[64px] overflow-y-auto"><LandingPage/></div>
    <div className="flex bg-gray-950 text-white p-2">
      <p>Pages</p>
    </div>
  </div>
</>
</motion.div>
       
    )
}
