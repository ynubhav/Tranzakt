export default function ProfButton({name,onClick}){
    return(
        <div className='grid grid-cols-1'>
            <button onClick={onClick} className= "rounded-xl py-2 pl-4 hover:bg-gray-700 hover:transition text-white text-left mx-5 mb-4 mt-2 cursor-pointer">
            {name}
        </button>
        </div>
    )
}