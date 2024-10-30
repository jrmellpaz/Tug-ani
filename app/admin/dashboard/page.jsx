"use client";

import { logout } from "@/lib/actions";
import Button from "../../components/Admin/Button";

export default function AdminHome() {

    return (
        <main className="mt-20 bg-white">
            <div className="h-96 w-dvw">
                <Button />
                <Button />
                <Button />
            </div>
            <button onClick={() => logout() }>
                Logout
            </button>
        </main>
    );
}