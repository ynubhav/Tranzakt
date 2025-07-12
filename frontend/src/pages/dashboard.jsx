import { useEffect, useRef, useState } from "react";
import Navbar from "../components/dashnavbar";
import axios from "axios";
import Searchedusers from "../components/results";
import { useNavigate } from "react-router-dom";
import Homenav from "../components/homenavbar";
import { motion } from "framer-motion";

export default function Dashboard(){
    const [filter,setfilter]=useState('');
    const [balance,setbalance]=useState(0);
    const [firstname,setfirstname]=useState('User');
    const navigate=useNavigate();
    const [filteredusers,setfilteredusers]=useState([]);
    const dbdfilter=useDebounce(filter);

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
       axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
       .then((response)=>{setfilteredusers(response.data.users)})
    },[dbdfilter]);
    //get signed in user info

    //get signed in user data using useeffect

    return(
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
        <div className="bg-gray-50">
        <Homenav pfplink={'johnpork.jpeg'} />
        <div className="p-2 text-xl font-bold">BALANCE: $ <span className="text-gray-500">{(Math.floor(balance*100))/100}</span></div>
        <div className="p-2 text-xl font-bold">Search Users</div>
        <div className="mx-4"><input onChange={(e)=>{setfilter(e.target.value)}} type="text" placeholder="Search Users ... " className="w-1/1 rounded-xl border-2 border-slate-500 p-2"/></div>
        {
            filteredusers.map((data,index)=>{
                const firstname=data.firstname;
                const lastname=data.lastname;
                const username=data.username;
                console.log(username);
                if(index>9)
                    return;
                return(<Searchedusers key={index} firstname={firstname} lastname={lastname} username={username} onClick={()=>{navigate('/send?userid='+data._id+'&firstname='+firstname)}}/>)
            })
        }
        </div>
        </motion.div>
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