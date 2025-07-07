import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import Searchedusers from "../components/results";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const [filter,setfilter]=useState('');
    const navigate=useNavigate();
    const [filteredusers,setfilteredusers]=useState([]);
    useEffect(()=>{
       axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
       .then((response)=>{setfilteredusers(response.data.users)})
    },[filter]);

    //get signed in user data using useeffect

    return(
        <div>
        <Navbar user={'Anubhav'} pfplink={'johnpork.jpeg'}/>
        <div className="p-2 text-xl font-bold">BALANCE: $ {1000}</div>
        <div className="p-2 text-xl font-bold">Search Users</div>
        <div className="mx-4"><input onChange={(e)=>{setfilter(e.target.value)}} type="text" placeholder="Search Users ... " className="w-1/1 rounded-xl border-2 border-slate-500 p-2"/></div>
        {
            filteredusers.map((data,index)=>{
                const firstname=data.firstname;
                return(<Searchedusers firstname={firstname} onClick={()=>{navigate('/send?userid='+data._id+'&firstname='+firstname)}}/>)
            })
        }
        </div>
    )
}