import { useEffect, useState } from "react";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Button from "../components/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Send(){
    const [queries]=useSearchParams();
    const [userid,setuserid]=useState('');
    const [reciever,setreciever]=useState('');
    const [paymentdone,setsucces]=useState(false);
    const [intransition,settransition]=useState(false);
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{setreciever(queries.get('firstname'));
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
        setTimeout(() => {
                navigate('/dashboard')
            }, 60000);
    })
    //=========================================//
    const [amount,setamt]=useState(0);
    return(
        <div className="fixed top-0 left-0 w-screen h-screen  bg-green-300">
        <div className="flex justify-center">
        <div className="grid grid-cols-1 w-[350px] rounded-2xl bg-white mt-10 shadow-2xl shadow-amber-100">
            <Pheader hname={'Send Money'} hdescription={'Tranzact safely ❤️'}/>
            <div className="p-2 mx-2 font-bold">To :{' '}<span className="text-blue-300 font-black">{reciever}</span></div>
            <Field fname={'Amount ($)'} fplaceholder={'Enter Amount'} ftype={'Number'}  onChange={(e)=>{settransition(false);setsucces(false);setamt(e.target.value)}}/>
            <Button name={'Initiate Tranzaction'} onClick={async()=>{
                if(!reciever)
                    navigate('/dashboard');
                if(amount<=0)
                {toast.warn('Amount Invalid');return;}
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
            }, 3000);
            }}/>
            
            {loading&&<div className="m-2 text-slate-400 font-bold p-2 text-center">Tranzaction initated</div>}
            {!loading&&paymentdone&&intransition&&<><div className="m-2 text-green-400 font-bold p-2 text-center">Transfer of Amount $ {amount} to {reciever} {' Succesfull'}</div><Button name={'Go back'} onClick={()=>{navigate('/dashboard')}}/></>}
            {!loading&&!paymentdone&&intransition&&<><div className="m-2 text-red-400 font-bold p-2 text-center">Transfer Failed</div><Button name={'Go back'} onClick={()=>{navigate('/dashboard')}}/></>}
        </div>
        </div>
        </div>
        
    )
}


const handleTransaction = () => {
  toast.info("⏳ Transaction initiated...", {
    position: "top-right",
    autoClose: true,       // stays until you update or dismiss it
    closeOnClick: false,
    draggable: false,
    closeButton: true,
  })}