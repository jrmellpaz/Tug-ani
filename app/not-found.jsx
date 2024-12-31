import Link from "next/link";
import Header from "@/app/components/Header/Header";
import Menu from "@/app/components/Header/Menu";

export default async function NotFound() {
    return (
        <main
            className="flex flex-col w-dvw h-dvh"
        >
            <Header>
                <Menu />
            </Header>
            <div
                className="flex flex-col w-full h-full justify-center items-center"
            >
                <h1
                    className="font-bebas text-5xl text-tugAni-black"
                >
                    This page is not available
                </h1>
                <p className="font-openSansRegular text-tugAni-black">
                    <strong className="uppercase">ERROR:</strong>
                    &nbsp;404
                </p>
                <Link
                    href={"/"}
                    className="mt-4"
                >
                    <button
                        type="button"
                        className="py-2 px-4 rounded-badge font-openSansBold text-tugAni-white bg-tugAni-red outline-none"
                    >
                        Return to home
                    </button>
                </Link>
            </div>
        </main>
    );
}