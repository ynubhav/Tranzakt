export default function Pheader({hname,hdescription}){
    return(
        <div className="mx-5 my-2">
            <div className="text-2xl font-bold p-2 text-center">{hname}</div>
            <div className="text-md font-medium p-2 text-slate-50 text-center">{hdescription}</div>
        </div>
    )
}