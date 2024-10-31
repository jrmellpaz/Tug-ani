import Link from "next/link";

export default function AddButton({ href, name }) { 
    return( 
        <Link href={href}>
            <button 
                title={`Add ${name}`} 
                className="bg-tugAni-red p-2 pl-4 pr-4 w-fit flex flex-row justify-around items-center rounded-full gap-1 hover:shadow-sm hover:shadow-slate-400" 
            > 
                <img src="/add-thick.svg" alt="Add" /> 
                <span className="font-openSansBold text-lg text-tugAni-white">Add</span> 
            </button> 
        </Link>
    ); 
} 