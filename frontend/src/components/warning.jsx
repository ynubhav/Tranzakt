import { useState } from "react"

export default function Warning({description,topage,onClick}){
    
    return(
        <div className="mx-5 mt-2 mb-4 flex"> 
        <div className="font-medium">{description}{'? '}</div>
        <button onClick={onClick} className="font-medium underline hover:cursor-pointer pl-0.5">{topage}</button>
        </div>
    )

}