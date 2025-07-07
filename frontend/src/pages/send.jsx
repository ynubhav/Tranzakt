import { useEffect, useState } from "react";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Button from "../components/button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Send(){
    const [queries]=useSearchParams();
    const [userid,setuserid]=useState('');
    const [reciever,setreciever]=useState('');
    const [paymentdone,setsucces]=useState(false);
    useEffect(()=>{setreciever(queries.get('firstname'));
    setuserid(queries.get('userid'));},[queries])
    // console.log(reciever);
    const [amount,setamt]=useState(0);
    return(
        <div className="fixed top-0 left-0 w-screen h-screen  bg-green-300">
        <div className="flex justify-center">
        <div className="grid grid-cols-1 w-[350px] rounded-2xl bg-white mt-10 shadow-2xl shadow-amber-100">
            <Pheader hname={'Send Money'} hdescription={'Tranzact safely ❤️'}/>
            <div className="p-2 mx-2 font-bold">To:{reciever}</div>
            <Field fname={'Amount ($)'} fplaceholder={'Enter Amount'} ftype={'Number'}  onChange={(e)=>{setsucces(false);setamt(e.target.value)}}/>
            <Button name={'Initiate Tranzaction'} onClick={async()=>{
                const response=await axios.post('http://localhost:3000/api/v1/account/transfer',{
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
            }}/>
            {paymentdone&&<div>Transfer Succesfull</div>}
        </div>
        </div>
        </div>
        
    )
}