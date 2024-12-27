"use client";

import { SearchIcon, X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Searchbar({ searchbarOpened, setSearchbarOpened, type="" }) {
    const searchbarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (type !== "sidebar" && searchbarRef.current && !searchbarRef.current.contains(event.target)) {
                setSearchbarOpened(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [searchbarRef, setSearchbarOpened]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    if (!searchbarOpened && type !== "sidebar") {
        return (
            <button
                title="Search an article"
                onClick={() => setSearchbarOpened(true)}
                className="outline-none p-3 rounded-full flex justify-center items-center hover:bg-[#ed1f3a10] group"
            >
                <SearchIcon className="h-4 w-4 group-hover:text-tugAni-red" strokeWidth={3} />
            </button>
        );
    }
    
    return (
        <div className="flex items-center gap-2 border-box">
            {type !== "sidebar" && <button 
                title="Close searchbar"
                className="outline-none p-3 rounded-full flex justify-center items-center hover:bg-[#ed1f3a10] group"
            >
                <X 
                    onClick={() => setSearchbarOpened(false)}
                    strokeWidth={3} 
                    className="h-4 w-4 group-hover:text-tugAni-red" 
                />
            </button>}
            <form
                ref={searchbarRef}
                className="flex items-center group w-full"
                onSubmit={handleSubmit}
            >
                <input
                    autoFocus={true}
                    type="text"
                    placeholder="What are you looking for?"
                    className={`font-openSansRegular text-tugAni-black text-sm ${type !== "sidebar" ? "w-80" : "w-full grow"} py-2 px-3 rounded-l-full outline-none group-hover:shadow group-focus:shadow border focus:border-tugAni-red border-tugAni-black bg-transparent`}
                />
                <button
                    className="bg-tugAni-red py-[8.5px] pl-3 pr-4 rounded-r-full group-hover:shadow group-focus:shadow-xl"
                >
                    <SearchIcon className="h-5 w-5 text-tugAni-white" />
                </button>
            </form>
        </div>
    );
}