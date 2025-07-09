import ProfButton from "../components/profbutton";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from 'sonner';

export default function Profile(){
    const navigate=useNavigate();
    const [retract,setretract]=useState(true);
    const [change,setchange]=useState(0);
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
    },[change])

    return(
        <>
        <div className='fixed top-0 left-0 w-screen h-screen bg-gray-50'></div>
        {retract&&<span ><div className="fixed top-0 left-0 h-screen w-[200px] bg-gray-950 border-1 border-blue-300">
            <div className="grid grid-cols-1">
                <span onClick={()=>{setretract(!retract)}} className="border-1 border-blue-300 text-2xl text-orange-500 bg-gray-950 font-bold py-2 flex justify-center hover:cursor-pointer"><div className="inline-flex">Tranzakt.pay<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" /></svg></div></div></span>
                <ProfButton name={'Home'} onClick={()=>{setchange(c=>c+1)}}/>
                <ProfButton name={'Dashboard'} onClick={()=>{navigate('/dashboard');setchange(c=>c+1)}}/>
                <ProfButton name={'Tranzactions'} onClick={()=>{setchange(c=>c+1)}}/>
                <ProfButton name={'Get free Money'} onClick={()=>{setchange(c=>c+1)}}/>
            </div>
        </div>
        <div className="fixed bottom-0 left-0 w-[200px]">
            <div className="grid grid-cols-1">
            <div className="border-1 border-blue-300 grid"><Button name={'Logout'} onClick={()=>{handleLogout({navigate})}}/></div>
            </div>
        </div></span>}
        {!retract&&<span className="hover:cursor-pointer" onClick={()=>{setretract(!retract)}}>
            <div className="fixed top-0 left-0 h-screen w-[50px] bg-gray-950 border-1 border-blue-300">
            <div className="my-4 ml-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" /></svg></div>

            </div>
            </span>}
        </>

    )
}

//==========toast=====handlelogout=============//
function handleLogout({navigate}) {
  toast("Are you sure you want to logout?", {
    action: {
      label: "Yes",
      onClick: () => {
        // 🔥 Real logout logic here
        toast.dismiss();
        localStorage.removeItem("token");
        navigate('/home');
      },
    },
    cancel: {
      label: "Cancel",
      onClick: ()=>{
        toast.dismiss();
      }
    },
  });
}
//================//