"use client";

import { logout } from "@/lib/actions";

export default function AdminLogoutButton() {
    return (
        <button onClick={() => logout() }
            className="box-border h-60 border border-solid border-slate-300 rounded-xl hover:shadow-md flex justify-center items-center font-openSansBold"
        >
                Logout
        </button>
    );
}