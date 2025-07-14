import { useEffect, useState } from "react";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Button from "../components/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Send(){
    const [queries]=useSearchParams();
    const [userid,setuserid]=useState('');
    const [username,setusername]=useState('');
    const [reciever,setreciever]=useState('');
    const [paymentdone,setsucces]=useState(false);
    const [intransition,settransition]=useState(false);
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{setreciever(queries.get('firstname'));
    setusername(queries.get('username'));
    setuserid(queries.get('userid'));},[queries])
    // console.log(reciever);
    //=======validating if logged in===========//
     useEffect(()=>{
        try {
            const x=localStorage.getItem('token');
            axios.get('http://localhost:3000/api/v1/user/me',{
            headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{})
            .catch((err) => {
            console.error("Token invalid or request failed");
            navigate('/signin');toast.error('Not Signed In')});
        } catch (error) {
            navigate('/signin');
            toast.error('Not Signed In')
        }
    })
    //=========================================//
    const [amount,setamt]=useState(0);
    return(
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
        <div className="fixed top-0 left-0 w-screen h-screen  bg-gray-700">
        <div className="flex justify-center">
        <div className="grid grid-cols-1 w-[350px] rounded-2xl bg-white mt-10">
            <Pheader hname={'Send Money'} hdescription={'Tranzakt safely ❤️'}/>
            <div className="px-2 py-1 mx-2 font-bold">To :{' '}<span className="text-gray-700 font-bold">{reciever}</span></div>
            <div className="px-2 py-1 mx-2 font-bold">Username :{' '}<span className="text-gray-700 font-bold">{username}</span></div>
            <Field fname={'Amount ($)'} fplaceholder={'Enter Amount'} ftype={'Number'}  onChange={(e)=>{settransition(false);setsucces(false);if((((e.target.value)*100)%1==0))setamt(e.target.value)}}/>
            {!loading&&<Button name={'Initiate Tranzaction'} onClick={async()=>{
                if(!reciever)
                    navigate('/dashboard');
                if(amount<=0)
                {toast.warn('Minimum Transaction is: $ 0.01');return;}
                setloading(true);
                settransition(true);
                setsucces(null);
                try{
                    handleTransaction();
                    const response=await axios.post('http://localhost:3000/api/v1/account/transfer',{
                    to:userid,
                    amount
                },
            {
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            if(response.data.message==='Transfer Successful'){
            {toast.success('Tranzaktion succesful');setsucces(true);}
            }
           else
           { toast.clearWaitingQueue(); 
            toast.error('Transaction failed!'); setsucces(false);}}
            catch(err){
            toast.clearWaitingQueue(); 
            toast.error('Transaction failed!');
             setsucces(false);   
            }
            setTimeout(() => {
            setloading(false);
            }, 1500);
            }}/>}
            
            {loading&&<div className="m-2 text-slate-400 font-bold p-2 text-center">Tranzaction initated</div>}
            {!loading&&paymentdone&&intransition&&<><div className="m-2 text-green-400 font-bold p-2 text-center">Transfer of Amount $ {amount} to {reciever} {' Succesfull'}</div><Button name={'Go back'} onClick={()=>{navigate('/dashboard')}}/></>}
            {!loading&&!paymentdone&&intransition&&<><div className="m-2 text-red-400 font-bold p-2 text-center">Transfer Failed</div><Button name={'Go back'} onClick={()=>{navigate('/dashboard')}}/></>}
        </div>
        </div>
        </div>
        </motion.div>
    )
}

//===========================//
const handleTransaction = () => {
  toast.info("⏳ Transaction initiated...", {
    position: "top-right",
    autoClose: true,       // stays until you update or dismiss it
    closeOnClick: false,
    draggable: false,
    closeButton: true,
  })}