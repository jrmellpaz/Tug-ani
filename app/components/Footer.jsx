import { getCategories } from "@/lib/firebase/category/read_server";
import { Facebook, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export async function Footer() {
    const categories = await getCategories();

    return (
        <footer className="w-full bg-tugAni-red rounded-t-box flex flex-col md:flex-row justify-around gap-4 py-8 px-4 selection:bg-[#ED1F3A]">
            <section className="flex flex-col gap-2 py-4 justify-center" >
                <div className="h-16 w-fit flex flex-row justify-center items-center gap-1">
                    <img className="h-4/5" src="/logo-alt.svg" alt="Tug-ani logo" />
                    <h1 className="font-bebas text-4xl text-tugAni-white">Tug-ani</h1>
                </div>
                <h3 className="font-openSansRegular text-tugAni-white text-sm">
                    Since 1974. Tug-ani is the official student publication of the University of the Philippines Cebu.
                </h3>
                <div className="flex flex-col mt-4 gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <MapPin className="h-4 w-4 text-tugAni-white" />
                        <span className="font-openSansRegular text-tugAni-white select-all text-xs">Gorordo Avenue, Cebu City, Cebu 6000</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Mail className="h-4 w-4 text-tugAni-white" />
                        <span className="font-openSansRegular text-tugAni-white select-all text-xs">tugani.upcebu@up.edu.ph</span>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <h2 className="font-openSansBold uppercase text-sm text-tugAni-white">Follow Tug-ani</h2>
                    <div className="flex flex-row gap-2 items-center">
                        <Link 
                            href="https://www.facebook.com/upcebutugani/"
                            target="_blank"
                            title="Go to Facebook"
                        >
                            <img className="h-8 w-8" src="/facebook.svg" alt="Facebook logo" />
                        </Link>
                        <Link
                            href="https://x.com/upcebutugani"
                            target="_blank"
                            title="Go to X"
                        >
                            <img className="h-8 w-8" src="/x.svg" alt="X (formerly Twitter) logo" />
                        </Link>
                        <Link
                            href="https://www.instagram.com/upcebutugani/"
                            target="_blank"
                            title="Go to Instagram"
                        >
                            <img className="h-10 w-10" src="/instagram.svg" alt="Instagram logo" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-2 py-4">
                <h2 className="font-bebas text-tugAni-white text-2xl">
                    Sections
                </h2>
                <ul className="justify-start flex flex-col gap-2 text-tugAni-white">
                    <Link
                        href="/"
                        className="flex"
                    >
                        <li
                            className="font-openSansBold w-full text-sm uppercase cursor-pointer transition-all hover:text-[#ED1F3A]"
                        >
                            Home
                        </li>
                    </Link>
                    {categories.map((category, key) => {
                        return (
                            <Link
                                key={key}
                                href={`/category/${category.id}`}
                                className="flex"
                            >
                                <li
                                    className="font-openSansBold w-full text-sm uppercase cursor-pointer transition-all hover:text-[#ED1F3A]"
                                >
                                    {category.title}
                                </li>
                            </Link>
                        )
                    })}
                    <Link
                        href="/about-us"
                        className="flex"
                    >
                        <li
                            className="font-openSansBold w-full text-sm uppercase cursor-pointer transition-all hover:text-[#ED1F3A]"
                        >
                            About Us
                        </li>
                    </Link>
                </ul>
            </section>
        </footer>
    );
}