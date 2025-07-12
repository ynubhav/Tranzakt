import Homenav from "../components/homenavbar";
import { motion } from "framer-motion";

export default function History(){
    return(
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
    <>
    <Homenav pfplink={'johnpork.jpeg'}/>
    <div>Transaction History and spendings graph</div>
</>
</motion.div>
)}