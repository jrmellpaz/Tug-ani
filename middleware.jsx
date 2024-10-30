import { cookies } from "next/headers";
import { decrypt } from "./lib/sessions";
import { NextResponse } from "next/server";

const protectedRoutes = ["/admin/dashboard"];
const publicRoutes = ["/admin/login"];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }

    return NextResponse.next();
};