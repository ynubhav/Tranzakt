import { useState } from "react";
import Button from "../components/button";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Warning from "../components/warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
        const [username,setusername]=useState("");
        const [password,setpass]=useState("");
        const [firstname,setfname]=useState("");
        const [lastname,setlname]=useState("");
        const navigate=useNavigate();
    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500">
        <div className="flex justify-center mt-10">
        <div className="w-[350px] bg-white rounded-2xl grid grid-cols-1 shadow-2xl shadow-amber-50">
                <Pheader hname={'Sign Up'} hdescription={'Enter your description to sign up...'}/>
                <Field onChange={(e)=>{setfname(e.target.value)}} fname={'First Name'} ftype={'text'} fplaceholder={'Anubhav'}/>
                <Field onChange={(e)=>{setlname(e.target.value)}} fname={'Last Name'} ftype={'text'} fplaceholder={'Dixit'}/>
                <Field onChange={(e)=>{setusername(e.target.value)}} fname={'Email'} ftype={'text'} fplaceholder={'anubhav@xyzmail.com'}/>
                <Field onChange={(e)=>{setpass(e.target.value)}} fname={'Password'} ftype={'password'} fplaceholder={'P@s$w0rD'}/>
                <Button onClick={async()=>{
                   const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    navigate('/dashboard')
                }} name={'Sign Up'}/>
                <Warning description={'Already have an account '} topage={'Login'} onClick={()=>{navigate('/signin')}}/>
        </div>
        </div>
        </div>
    )
}

 