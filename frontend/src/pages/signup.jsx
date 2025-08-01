import { useState } from "react";
import Button from "../components/button";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Warning from "../components/warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Homenav from "../components/homenavbar";

export default function Signup(){
        const [username,setusername]=useState("");
        const [password,setpass]=useState("-");
        const [initpass,setinitpass]=useState("");
        const [firstname,setfname]=useState("");
        const [lastname,setlname]=useState("");
        const navigate=useNavigate();
        
    return(
        <div className=" min-h-screen bg-gray-800">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow"><Homenav pfplink={'johnpork.jpeg'} /></div>
        <div className="mt-[64px] overflow-y-auto">
        <div className="flex justify-center pt-10">
        <div className="w-1/1 mx-4 mb-4 bg-gray-50 rounded-2xl grid grid-cols-1 shadow-sm">
                <Pheader hname={'Sign Up'} hdescription={'Enter your description to sign up...'}/>
                <Field onChange={(e)=>{setfname(e.target.value)}} fname={'First Name*'} ftype={'text'} fplaceholder={'name'}/>
                <Field onChange={(e)=>{setlname(e.target.value)}} fname={'Last Name'} ftype={'text'} fplaceholder={'lastname'}/>
                <Field onChange={(e)=>{setusername(e.target.value)}} fname={'Email*'} ftype={'text'} fplaceholder={'name@email.com'}/>
                <Field onChange={(e)=>{setinitpass(e.target.value)}} fname={'Password*'} ftype={'password'} fplaceholder={'*******'}/>
                <Field onChange={(e)=>{setpass(e.target.value)}} fname={'Confirm Password*'} ftype={'password'} fplaceholder={'*******'}/>
                {initpass===password&&(password.length>5)&&username&&firstname&&lastname&&<Button onClick={async()=>{
                   try{
                    const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password,
                        friends:[]
                    })
                    toast.success('Account created succesfully!')
                     {
                    localStorage.setItem("token",response.data.token)
                    navigate('/dashboard')
                    }
                }
                catch(err){
                        toast.error('Email already taken')
                    }

                }} name={'Sign Up'}/>}
                <Warning description={'Already have an account '} topage={'Login'} onClick={()=>{navigate('/signin')}}/>
        </div>
        </div>
        </div>
        </div>
    )
}

 