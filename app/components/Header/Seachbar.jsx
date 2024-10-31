export default function Searchbar() {
    return (
        <div className="h-16 w-full bg-tugAni-white flex items-center justify-center shadow-md transition-[height]">
            <input className="w-2/3 h-2/3 bg-gray-200 box-border pl-5 pr-5 rounded-full outline-none focus:border-black hover:shadow-sm focus:shadow-md focus:bg-slate-100 font-openSansRegular text-tugAni-black"
                type="search" 
                placeholder="Search" 
            />
        </div>
    );
}