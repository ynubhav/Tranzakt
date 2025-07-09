import { useState } from "react";
import Button from "../components/button";
import Field from "../components/fields";
import Pheader from "../components/pageheader";
import Warning from "../components/warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signin(){
    const [username,setusername]=useState("");
    const [password,setpass]=useState("");
    const navigate=useNavigate();
    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500">
                <div className="flex justify-center mt-10">
                <div className="w-[350px] bg-white rounded-2xl grid grid-cols-1 shadow-2xl shadow-amber-50">
                        <Pheader hname={'Sign In'} hdescription={'Enter your Credentials to access your account'}/>
                        <Field onChange={(e)=>{setusername(e.target.value)}} fname={'Email'} ftype={'text'} fplaceholder={'anubhav@xyzmail.com'}/>
                        <Field onChange={(e)=>{setpass(e.target.value)}} fname={'Password'} ftype={'password'} fplaceholder={'P@s$w0rD'}/>
                        <Button onClick={async()=>{
                           try{const response=await axios.post('http://localhost:3000/api/v1/user/signin',{
                                username,
                                password
                            })
                            toast.success(`welcome`);
                            localStorage.setItem("token",response.data.token);
                            navigate('/dashboard')
                        }
                        catch(err){
                                toast.error('Invalid Account');
                            }
                        }} name={'Sign In'}/>
                        <Warning description={"Don't have an account "} topage={'Sign Up'} onClick={()=>{navigate('/signup')}}/>
                </div>
                </div>
                </div>
        
    )
}
