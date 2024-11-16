import { cookies } from "next/headers";
import { decrypt } from "./lib/sessions";
import { NextResponse } from "next/server";
import { auth } from "./lib/firebase";

// const protectedRoutes = ["/admin/dashboard/", "/admin/dashboard/articles"];
const protectedRoutes = new RegExp("^/admin/dashboard")

const publicRoutes = ["/admin/login"];

export const config = {
    matcher: [
        "/admin/:path*"
    ]
}

export default async function middleware(req) {
    const path = req.nextUrl.pathname;

    if (path == "/admin") {
        return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }

    // const isProtectedRoute = protectedRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.test(path);
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