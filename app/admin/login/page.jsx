"use client";

import { AdminLogin } from "@/app/components/Admin/AdminLogin";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation.js";
import { auth } from "@/lib/firebase";

export default function Login() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem("user");

    if (user && userSession) {
        router.push("/admin");
    }

    return (
        <AdminLogin />
    );
}