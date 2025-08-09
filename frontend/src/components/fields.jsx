
export default function Field({fname,fplaceholder,ftype,onChange}){
    return(
        <div className="mx-5 my-2">
        <div className="py-1 font-medium">{fname}</div>
        <input onChange={onChange} type={ftype} placeholder={fplaceholder} className="text-gray-500 text-left border-1 border-gray-500 rounded-xl py-2 px-4 w-1/1 focus:text-white"/>
        </div>
    )
}