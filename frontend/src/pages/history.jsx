import { useEffect, useState } from "react";
import Homenav from "../components/homenavbar";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function History(){
  const [transactions,settrans]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:3000/api/v1/account/transactions',{
            headers:{
                    Authorization:localStorage.getItem('token')
                }}
      )
      .then((response)=>{
        settrans(response.data.transactions)
      })
    } catch (error) {
      console.log('err');
      navigate('/home');
    }
  },[])

    return(
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
    <>
    <Homenav pfplink={'johnpork.jpeg'}/>
    <div className="text-2xl font-bold p-2">Transaction History and spendings graph</div>
    <div className="grid grid-cols-2 gap-2 m-4">
      {
      transactions.map((data,index)=>{
        const firstname=data.firstname
        const recieved=data.credit
        const amount=data.amount
        const localTime = new Date(data.time).toLocaleString().split(', ');
      return(
        <div className="bg-gray-500 rounded-2xl p-2 gap-0.5 mt-1">
          <p>{localTime[0]}</p>
          <p>{localTime[1]}</p>
          <p>{firstname}</p>
          <p>{recieved?'🟢':'🔴'} $ {''}{amount}</p>
        </div>
      )
      })
    }
    </div>
    
</>
</motion.div>
)}