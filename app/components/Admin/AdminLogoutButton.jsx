"use client";

import { logout } from "@/lib/actions";
import { LogOutIcon } from "lucide-react";

export default function AdminLogoutButton() {
    return (
        <button onClick={() => logout() }
            className="box-border h-60 border border-solid border-slate-300 rounded-xl hover:bg-red-100 hover:text-tugAni-red hover:shadow-md flex flex-col gap-8 justify-center items-center font-openSansBold uppercase group"
        >
            <LogOutIcon size={56} className="text-tugAni-black group-hover:text-tugAni-red" />
            Logout
        </button>
    );
}