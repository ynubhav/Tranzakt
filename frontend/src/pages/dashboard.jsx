import { useEffect, useRef, useState } from "react";
import Navbar from "../components/dashnavbar";
import axios from "axios";
import Searchedusers from "../components/results";
import { data, useNavigate } from "react-router-dom";
import Homenav from "../components/homenavbar";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard(){
    const [filter,setfilter]=useState('');
    const [balance,setbalance]=useState(0);
    const [firstname,setfirstname]=useState('User');
    const navigate=useNavigate();
    const [filteredusers,setfilteredusers]=useState([]);
    const [friendarr,setfriendarr]=useState([]);
    const dbdfilter=useDebounce(filter);
    const [reload,setreload]=useState(true);

    useEffect(()=>{
        try {
            const x=localStorage.getItem('token');
            axios.get('http://localhost:3000/api/v1/user/me',{
            headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{setfirstname(response.data.firstname);setbalance(response.data.balance)})
            .catch((err) => {
            navigate('/signin')});
        } catch (error) {
            navigate('/signin');
        }
    },[])

    useEffect(()=>{
        try {
            const x=localStorage.getItem('token');
            axios.post('http://localhost:3000/api/v1/user/friends?action=find',{},{
            headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            .then((response)=>{setfriendarr(response.data.friends);toast.success('fetched friends')})
        } catch (error) {
            toast.error("couldn't fetch friends");
        }
    },[reload])

    useEffect(()=>{
       axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
       .then((response)=>{setfilteredusers(response.data.users)})
    },[dbdfilter]);

    return(
        <div className="bg-gray-800 min-h-screen">
        <Homenav pfplink={'johnpork.jpeg'} />
        <div className="p-2 text-xl font-bold text-gray-400">BALANCE: $ <span className="text-white">{(Math.floor(balance*100))/100}</span></div>
        <div className="p-2 text-xl font-bold  text-gray-400">Search Users</div>
        <div className="mx-4"><input onChange={(e)=>{setfilter(e.target.value)}} type="text" placeholder="Search Users ... " className="w-1/1 rounded-xl border-2 text-gray-400 border-slate-500 p-2"/></div>
        {
            filteredusers.map((data,index)=>{
                const firstname=data.firstname;
                const lastname=data.lastname;
                const username=data.username;
                const friendid=data._id;
                if(index>9)
                    return;
                return(<Searchedusers 
                    key={index}
                    firstname={firstname} 
                    lastname={lastname} 
                    username={username} 
                    button1={'Add'}
                    onClick1={()=>{navigate('/send?userid='+data._id+'&firstname='+firstname+'&username='+username)}}
                    onClick2={()=>{
                        
                        try{axios.post('http://localhost:3000/api/v1/user/friends?action=add',{userId:friendid,firstname:firstname},{headers:{Authorization:localStorage.getItem('token')}})
                        .then((response)=>{
                            toast.success(`added ${firstname} to friends`)
                            setreload(c=>!c);
                        })}
                        catch(err){
                            toast.error("couldn't add friend");
                        }
                    }}
                    />)
            })
        }
        {filteredusers.length===0&&filter&&<div className="text-center text-xl mt-10 font-bold  text-gray-400">No Matches Found {':('} try using User email</div>}
        <div className="p-2 text-xl font-bold  text-gray-400">Friends</div>
            {
            friendarr.map((data,index)=>{
                const firstname=data.firstname;
                const lastname=data.lastname;
                const username=data.username;
                const id=data._id;
                return(<Searchedusers 
                    key={index}
                    firstname={firstname} 
                    lastname={lastname} 
                    username={username} 
                    button1={'Remove'}
                    onClick1={()=>{navigate('/send?userid='+data._id+'&firstname='+firstname+'&username='+username)}}
                    onClick2={()=>{handleremovefriend({firstname,id,setreload})}}
                    />)
            })
        }
        {friendarr.length===0&&<div className="text-center text-xl mt-10 font-bold  text-gray-400">No Friends {':('}</div>}
        </div>
    )
}

//=========== ==useDebounce==============//
function useDebounce(value){

    const [dbdvalue,setdbdvalue]=useState(value);
    const ref=useRef(null);
    useEffect(()=>{
      clearTimeout(ref.current);
      ref.current=setTimeout(() => {
            setdbdvalue(value);
        }, 500)

        return()=>{clearTimeout(ref.current)}//clears previous effects

    },[value])

    return dbdvalue;
}
//============================================//
function handleremovefriend({firstname,id,setreload}) {
  toast("Are you sure you want to remove?", {
    action: {
      label: "Yes",
      onClick: () => {
        // 🔥 Real logout logic here
        toast.dismiss();
        try{axios.post('http://localhost:3000/api/v1/user/friends?action=remove',{userId:id,firstname:firstname},{headers:{Authorization:localStorage.getItem('token')}})
                        .then((response)=>{
                            toast.success(`removed ${firstname} from friends`)
                            setreload(c=>!c);
                        })}
                        catch(err){
                            toast.error("couldn't remove friend");
                        }
        
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