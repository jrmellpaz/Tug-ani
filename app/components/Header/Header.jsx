"use client";

import React from "react";
import Menu from "./Menu.jsx";
import Searchbar from "./Seachbar.jsx";
import Link from "next/link.js";

export default function Header() {
    const[menuOpened, setMenuOpened] = React.useState(false);
    const [searchbarOpened, setSearchbarOpened] = React.useState(false);

    function handleMenuClick() {
        setMenuOpened(!menuOpened);
    }

    function handleSearchbarClick() {
        setSearchbarOpened(!searchbarOpened);
    }

    const inactive = "outline-none w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-200 focus:bg-gray-300";
    const active = "outline-none w-10 h-10 rounded-full flex justify-center items-center bg-tugAni-red";

    return (
        <>
            <div className="w-full h-16 bg-tugAni-white flex items-center justify-between">
                <button 
                    onClick={handleMenuClick} className={menuOpened ? active : inactive} 
                    title="Menu"
                > 
                    <img src={menuOpened ? "/close.svg" : "/menu.svg"} alt="Menu" />
                </button>
                <Link href={"/"}>
                    <div className="h-16 w-fit flex flex-row justify-center items-center gap-3">
                        <img className="h-2/3" src="/logo.svg" alt="Tug-ani logo" />
                        <h1 className="font-bebas text-2xl text-tugAni-black">Tug-ani</h1>
                    </div>
                </Link>
                <button 
                    onClick={handleSearchbarClick} className={searchbarOpened ? active : inactive} 
                    title="Search"
                >
                    <img src={searchbarOpened ? "/search-active.svg" : "/search.svg"} alt="Search" />
                </button>
            </div>
            {searchbarOpened && <Searchbar />}
            {menuOpened && <Menu />}
        </>
    );
}