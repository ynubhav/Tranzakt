import { useNavigate } from "react-router-dom"

export default function Navbar({user,pfplink}){
const navigate=useNavigate();
    return(
        <div className="w-1/1 p-2 border-b-2 border-b-gray-500 flex justify-between">
            <div className="font-bold text-2xl text-gray-800 text-center">Payments App</div>
            <div className="inline-flex justify-between align-middle">
            <div className="font-bold text-2xl text-gray-800 text-center m-2">Hello {user} !</div>
            <button onClick={()=>{navigate('/profile')}}><div><img className="w-[50px] h-[50px] rounded-full border-2 mx-2 border-pink-600 hover:border-4 hover:cursor-pointer" src={pfplink} alt="pfp"/></div></button>
            </div>
            </div>
    )
}