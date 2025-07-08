import { useEffect, useState } from "react";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Button from "../components/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

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
            navigate('/signin')});
        } catch (error) {
            navigate('/signin');
        }
        setTimeout(() => {
                navigate('/dashboard')
            }, 60000);
    },[])
    //=========================================//
    const [amount,setamt]=useState(0);
    return(
        <div className="fixed top-0 left-0 w-screen h-screen  bg-green-300">
        <div className="flex justify-center">
        <div className="grid grid-cols-1 w-[350px] rounded-2xl bg-white mt-10 shadow-2xl shadow-amber-100">
            <Pheader hname={'Send Money'} hdescription={'Tranzact safely ❤️'}/>
            <div className="p-2 mx-2 font-bold">To:{reciever}</div>
            <Field fname={'Amount ($)'} fplaceholder={'Enter Amount'} ftype={'Number'}  onChange={(e)=>{settransition(false);setsucces(false);setamt(e.target.value)}}/>
            <Button name={'Initiate Tranzaction'} onClick={async()=>{
                setloading(true);
                settransition(true);
                setsucces(null);
                if(!reciever)
                    navigate('/dashboard');
                try{const response=await axios.post('http://localhost:3000/api/v1/account/transfer',{
                    to:userid,
                    amount
                },
            {
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            if(response.data.message==='Transfer Successful')
                setsucces(true);
           else
               setsucces(false);}
            catch(err){
             setsucces(false);   
            }
            setTimeout(() => {
            setloading(false);
            }, 3000);
            }}/>
            
            {loading&&<div className="m-2 text-slate-400 font-bold p-2 text-center">Tranzaction initated</div>}
            {!loading&&paymentdone&&intransition&&<div className="m-2 text-green-400 font-bold p-2 text-center">Transfer of Amount $ {amount} to {reciever} {' Succesfull'}</div>}
            {!loading&&!paymentdone&&intransition&&<div className="m-2 text-red-400 font-bold p-2 text-center">Transfer Failed</div>}
        </div>
        </div>
        </div>
        
    )
}