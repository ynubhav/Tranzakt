import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homenav({pfplink}){

    const navigate=useNavigate();
    const [islogged,setlogged]=useState(false);
    const [firstname,setfirstname]=useState('xxxxxxxx');
    
    const emoji=()=>{
        const arr=['😊','😘','😍','👽','🙃','🤣','😴','😎'];
        const ind=Math.floor(arr.length*Math.random());
        return arr[ind];
    }
    const emo=emoji();

    useEffect(()=>{
        try {
            const x=localStorage.getItem('token');
            axios.get('http://localhost:3000/api/v1/user/me',{
            headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{setfirstname(response.data.firstname);setlogged(true);})
            .catch((err) => {
            console.error("Token invalid or request failed");});
        } catch (error) {
            console.log('hello err');
        }
    },[])

    return(
        <div className="w-1/1 p-2 border-b-2 border-b-gray-500 flex justify-between bg-gray-950">
            <span onClick={()=>{navigate('/home')}} className="font-bold text-2xl text-orange-500 text-center cursor-pointer">Tranzakt.pay</span>
            <div className="inline-flex justify-between align-middle text-white">
             <span className="my-2 mx-4 p-2 hover:cursor-pointer hover:bg-orange-300 hover:rounded-2xl hover:text-gray-800 hover:font-bold">About</span>
             <span className="my-2 mx-4 p-2 hover:cursor-pointer hover:bg-orange-300 hover:rounded-2xl hover:text-gray-800 hover:font-bold">Features</span>
             <span className="my-2 mx-4 p-2 hover:cursor-pointer hover:bg-orange-300 hover:rounded-2xl hover:text-gray-800 hover:font-bold">Blogs</span>
             <span onClick={()=>{navigate('/dashboard')}} className="my-2 mx-4 p-2 hover:cursor-pointer hover:bg-orange-300 hover:rounded-2xl hover:text-gray-800 hover:font-bold">Dashboard</span>
             <span className="my-2 mx-4 p-2 hover:cursor-pointer hover:bg-orange-300 hover:rounded-2xl hover:text-gray-800 hover:font-bold">Plans</span>
             {islogged&&<span className="my-2 ml-4 p-2 font-bold">Hello{' '}{firstname}{emo}</span>}
             {!islogged&&<span onClick={()=>{navigate('/signin')}} className="my-2 mx-4 p-2 hover:cursor-pointer hover:bg-orange-300 hover:rounded-2xl hover:text-gray-800 hover:font-bold">Login</span>}
            <button onClick={()=>{navigate('/profile')}}><div><img className="w-[50px] h-[50px] rounded-full border-2 mx-2 border-pink-600 hover:border-4 hover:cursor-pointer" src={pfplink} alt="pfp"/></div></button>
            </div>
            </div>
    )
}