import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AdminHeader({ href }) {
    return (
        <nav className="box-border fixed z-10 top-0 px-6 w-dvw h-16 flex justify-between items-center admin-header bg-tugAni-white shadow-md">
            {href && <Link href={href}>
                <button className="p-2 rounded-full hover:bg-gray-200 focus:bg-gray-300">
                    <ArrowLeftIcon className="text-tugAni-black" />
                </button>
            </Link>
            }
            <div className="h-full w-full">
                <Link href={"/admin"} className="h-full w-full flex flex-row justify-center items-center">
                    <img className="h-2/3 mr-3" src="/logo.svg" alt="Tug-ani logo" />
                    <h1 className="font-bebas text-2xl mr-1 text-tugAni-black">Tug-ani</h1>
                    <span className="admin-text">Admin</span>
                </Link>
            </div>
        </nav>
    );
}