import { useState } from "react"
import More from "./moreinfo";

export default function Searchedusers({firstname,lastname,username,button1,onClick1,onClick2,onMore}){
    const [rendermore,setmore]=useState(false);
return(<><div className="mx-2">
        <span onClick={()=>{setmore(!rendermore)}} className="w-1/1 p-2 border-2 border-gray-300 flex justify-between my-2 rounded-2xl bg-blue-500">
        <div className="inline-flex justify-between align-middle">
                <div><img className="w-[30px] h-[30px] rounded-full border-2 mx-2 border-pink-600" src='johnpork.jpeg' alt="pfp"/></div>
                <div className="font-bold text-xl text-gray-900 text-center m-2 hover:cursor-pointer">{firstname}</div>
        </div>
        {rendermore&&<More username={username} lastname={lastname}/>}
            <div className="flex gap-1">
                {<button onClick={onClick2} className="bg-black  text-white font-medium py-2 px-4 rounded-md hover:bg-gray-500 hover:cursor-pointer">{button1} friend</button>}
                <button onClick={onClick1} className="bg-black  text-white font-medium py-2 px-4 rounded-md hover:bg-gray-500 hover:cursor-pointer">Send Money</button>
            </div>
        </span>
        </div>
</>
        
)
}