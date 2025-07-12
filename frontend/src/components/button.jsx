export default function Button({name,onClick}){
    return(
        <button onClick={onClick} className="bg-orange-500 rounded-xl py-2 hover:bg-gray-700 text-white text-center mx-5 mb-4 my-2 cursor-pointer">
            {name}
        </button>
    )
}