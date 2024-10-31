import Link from "next/link";

export default function AdminHeader() {
    return (
        <nav className="box-border fixed z-10 top-0 w-dvw h-16 flex justify-center items-center admin-header bg-tugAni-white">
            <Link href={"/admin"}>
                <div className="h-16 w-dvw flex flex-row justify-center items-center shadow-md">
                    <img className="h-2/3 mr-3" src="/logo.svg" alt="Tug-ani logo" />
                    <h1 className="font-bebas text-2xl mr-1 text-tugAni-black">Tug-ani</h1>
                    <span className="admin-text">Admin</span>
                </div>
            </Link>
        </nav>
    );
}