import { useEffect, useState } from "react";
import Homenav from "../components/homenavbar";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function History(){
  const [transactions,settrans]=useState([]);
  const [spent,setspent]=useState(0);
  const [earn,setearn]=useState(0);
  const navigate=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:3000/api/v1/account/transactions',{
            headers:{
                    Authorization:localStorage.getItem('token')
                }}
      )
      .then((response)=>{
        const data=response.data.transactions
        data.reverse()
        settrans(data);
      })
    } catch (error) {
      console.log('err');
      navigate('/home');
    }
  },[])

  useEffect(()=>{
    setearn(0);
    setspent(0);
    transactions.map((data,index)=>{
    if(data.credit)
      setearn(c=>c+data.amount)
    else
      setspent(c=>c+data.amount)
    })
    setearn(c=>((Math.floor(c*100))/100))
    setspent(c=>((Math.floor(c*100))/100))
  },[transactions])

    return(
    <>
    <div className="min-h-screen bg-black">
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow"><Homenav pfplink={'johnpork.jpeg'}/></div>
    <div className="mt-[64px] overflow-y-auto flex-1 p-4">
    <div className="text-2xl font-bold p-2 text-white">Transaction History and spendings graph</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
    <div className="grid grid-cols-1 gap-2 m-4">
    <div className="text-xl text-white font-bold p-2 md:flex justify-left gap-10">
      SUMMARY
      <div className="flex justify-between gap-2">
      <div className="text-green-300">+ ${earn}{' '}</div>
      <div className="text-red-300">- ${spent}</div>
      </div>
    </div>
    <div className="overflow-y-auto max-h-100">
      {
      transactions.map((data,index)=>{
        const firstname=data.firstname
        const recieved=data.credit
        const amount=data.amount
        const localTime = new Date(data.time).toLocaleString().split(', ');
      return(
        <div key={index} className={`text-white grid grid-cols-2 rounded-2xl p-2 gap-0.5 mt-1 bg-gray-950 border-2 ${(recieved)?'border-green-500 hover:bg-green-950 hover:shadow-sm hover:shadow-green-300':'border-red-500 hover:bg-red-950 hover:shadow-sm hover:shadow-red-300'}`}>
          <p className="text-xl font-medium">$ {''}{amount}</p>
          <p className="text-right">Date:{' '}{localTime[0]}</p>
          <p>{(recieved)?'From : ':'To : '}{firstname}</p>
          <p className="text-right">Time:{' '}{localTime[1]}</p>
        </div>
      )
      })
    }
    </div>
    </div>
    <div className="text-2xl font-bold text-white">Graphs</div>
    </div>
    </div>
    </div>
</>
)}