import { useNavigate } from "react-router-dom";

export default function Homenav({pfplink}){

    const navigate=useNavigate();
    return(
        <div className="w-1/1 p-2 border-b-2 border-b-gray-500 flex justify-between bg-gray-950">
            <span onClick={()=>{navigate('/home')}} className="font-bold text-2xl text-orange-500 text-center cursor-pointer">Tranzakt.pay</span>
            <div className="inline-flex justify-between align-middle text-white">
             <span className="my-2 mx-4 p-2 hover:underline hover:cursor-pointer">About</span>
             <span className="my-2 mx-4 p-2 hover:underline hover:cursor-pointer">Features</span>
             <span className="my-2 mx-4 p-2 hover:underline hover:cursor-pointer">Blogs</span>
            <button onClick={()=>{navigate('/profile')}}><div><img className="w-[50px] h-[50px] rounded-full border-2 mx-2 border-pink-600 hover:border-4 hover:cursor-pointer" src={pfplink} alt="pfp"/></div></button>
            </div>
            </div>
    )
}