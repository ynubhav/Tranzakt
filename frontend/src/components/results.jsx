import { useState } from "react"
import More from "./moreinfo";

export default function Searchedusers({firstname,lastname,username,onClick,onMore}){
    const [rendermore,setmore]=useState(false);
return(<>
        <button onClick={()=>{setmore(!rendermore)}} className="w-1/1 p-2 border-2 border-gray-300 flex justify-between m-2">
        <div className="inline-flex justify-between align-middle">
                <div><img className="w-[30px] h-[30px] rounded-full border-2 mx-2 border-pink-600" src='johnpork.jpeg' alt="pfp"/></div>
                <div className="font-bold text-xl text-gray-800 text-center m-2">{firstname}</div>
        </div>
            <div ><button onClick={onClick} className="bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-500 hover:cursor-pointer">Send Money</button></div>
        </button>
        {rendermore&&<More username={username} lastname={lastname}/>}
</>
        
)
}