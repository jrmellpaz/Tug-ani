"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase.jsx";
import { useRouter } from "next/navigation.js";
import Button from "../components/Admin/Button";

export default function AdminHome() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem("user");

    if (!user && !userSession) {
        router.push("/admin/login");
    }

    return (
        <main className="mt-20 bg-white">
            <div className="h-96 w-dvw">
                <Button />
                <Button />
                <Button />
            </div>
            <button onClick={() => {
                signOut(auth);
                sessionStorage.removeItem("user");
             }}>
                Logout
            </button>
        </main>
    );
}