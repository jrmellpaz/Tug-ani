"use client";

import React, { useEffect, useRef } from "react";
import Searchbar from "./Seachbar.jsx";
import Link from "next/link.js";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MenuIcon, X } from "lucide-react";

export default function Header({ children }) {
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [searchbarOpened, setSearchbarOpened] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();

        if (latest > previous && latest > 150) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    });

    function handleMenuClick() {
        setMenuOpened(!menuOpened);
    }

    function handleSearchbarClick() {
        setSearchbarOpened(!searchbarOpened);
    }

    return (
        <motion.nav 
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="box-border sticky top-0 w-full pt-4 px-[5%] z-50"
        >
            <div className="w-full px-4 lg:px-8 flex flex-row items-center drop-shadow rounded-2xl glass">
                <div className="w-full lg:w-fit h-16 flex items-center justify-between lg:justify-center shrink-0">
                    <button 
                        onClick={() => setMenuOpened(!menuOpened)} 
                        title="Menu"
                        className="flex justify-center items-center lg:hidden outline-none w-10 h-10 rounded-full hover:bg-[#ed1f3a10]"
                    > 
                        <MenuIcon size={20} className="hover:text-tugAni-red" />
                    </button>
                    <Link href={"/"} className="w-full flex justify-center items-center pr-8">
                        <div className="h-16 w-full flex flex-row justify-center items-center gap-3">
                            <img className="h-2/3" src="/logo.svg" alt="Tug-ani logo" />
                            <h1 className="font-bebas text-2xl text-tugAni-blac">Tug-ani</h1>
                        </div>
                    </Link>
                    <div></div>
                </div>
                <div className={`w-full lg:flex ${searchbarOpened ? "justify-end" : "justify-between"} gap-4 h-10 hidden`}>
                    <div className={`${searchbarOpened ? "hidden" : "flex"} justify-center items-center transition-all`}>
                        {children}
                    </div>
                    <Searchbar
                        searchbarOpened={searchbarOpened}
                        setSearchbarOpened={setSearchbarOpened} 
                    />
                </div>
            </div> 
            <SideDrawer isOpen={menuOpened} setIsOpen={setMenuOpened}>
                {children}
            </SideDrawer>
        </motion.nav>
    );
}

function SideDrawer({ isOpen, setIsOpen, children }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);

    const [animation, setAnimation] = React.useState(false);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
            setAnimation(false);
        } else {
            setAnimation(true);
        }
    }, [isOpen]);

    const handleClose = (event) => {
        if (event.target === dialogRef.current) {
            setAnimation(true);
        }
    }

    const handleAnimationEnd = () => {
        if (animation) {
            dialogRef.current.close();
            setIsOpen(false);
        }
    }

    return (
        <dialog
            id="side-drawer"
            ref={dialogRef}
            className={`sidebar bg-base-100 p-0 ${animation ? "sidebar-close" : ""}`}
            onClick={handleClose}
            onAnimationEnd={handleAnimationEnd}
        >
            <div className="flex flex-col gap-4 p-4 h-full w-full">
                <div className={"flex flex-row items-center gap-4"}>
                    <button
                        ref={closeRef}
                        onClick={() => setAnimation(true)}
                        title="Close menu"
                        className="flex justify-center items-center outline-none w-10 h-10 rounded-full hover:bg-[#ed1f3a10] shrink-0"
                    >
                        <X size={20} className="hover:text-tugAni-red" />
                    </button>
                    <Link href={"/"} className="w-full flex justify-center items-center pr-8">
                        <div className="h-16 w-full flex items-center gap-3">
                            <img className="h-2/3" src="/logo.svg" alt="Tug-ani logo" />
                            <h1 className="font-bebas text-2xl text-tugAni-black">Tug-ani</h1>
                        </div>
                    </Link>
                </div>
                <div className="w-full my-4">
                    <Searchbar type="sidebar" />
                </div>
                {children}
            </div>
        </dialog>
    );
}