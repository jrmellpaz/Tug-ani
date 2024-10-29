"use client";

import React from "react";
import Menu from "./Menu.jsx";
import Searchbar from "./Seachbar.jsx";

export default function Header() {
    const[menuOpened, setMenuOpened] = React.useState(false);
    const [searchbarOpened, setSearchbarOpened] = React.useState(false);

    function handleMenuClick() {
        setMenuOpened(!menuOpened);
    }

    function handleSearchbarClick() {
        setSearchbarOpened(!searchbarOpened);
    }

    return (
        <nav className="fixed w-dvw">
            <div className="w-full h-16 bg-white shadow-md flex items-center justify-between pl-3 pr-3">
                <button onClick={handleMenuClick} className="header-button" title="Menu"> 
                    <img src="/menu.svg" alt="Menu" />
                </button>
                <div className="h-16 w-fit flex flex-row justify-center items-center gap-3">
                    <img className="h-2/3" src="/logo.svg" alt="Tug-ani logo" />
                    <h1 className="font-bebas text-2xl">Tug-ani</h1>
                </div>
                <button onClick={handleSearchbarClick} className="header-button" title="Search">
                    <img src="/search.svg" alt="Search" />
                </button>
            </div>
            {searchbarOpened && <Searchbar />}
            {menuOpened && <Menu />}
        </nav>
    );
}