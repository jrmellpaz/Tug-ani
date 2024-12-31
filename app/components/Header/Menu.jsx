import { getCategories } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default async function Menu() {
    const categories = await getCategories();

    return (
        <ul className="justify-start flex flex-col lg:flex-row pb-1 lg:gap-1">
            <Link
                href="/"
                className="flex items-center"
            >
                <li
                    className="font-openSansBold w-full text-sm uppercase hover:bg-[#ed1f3a10] hover:text-tugAni-red py-2 px-3 rounded-btn cursor-pointer transition-all lg:text-center"
                >
                    Home
                </li>
            </Link>
            {categories.map((category, key) => {
                return (
                    <Link
                        key={key}
                        href={`/category/${category.id}`}
                        className="flex items-center"
                    >
                        <li
                            className="font-openSansBold w-full text-sm uppercase hover:bg-[#ed1f3a10] hover:text-tugAni-red py-2 px-3 rounded-btn cursor-pointer transition-all lg:text-center"
                        >
                            {category.title}
                        </li>
                    </Link>
                )
            })}
            <Link
                href="/about-us"
                className="flex items-center"
            >
                <li
                    className="font-openSansBold w-full text-sm uppercase hover:bg-[#ed1f3a10] hover:text-tugAni-red py-2 px-3 rounded-btn cursor-pointer transition-all lg:text-center"
                >
                    About Us
                </li>
            </Link>
        </ul>
    );
}