import { getCategories } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default async function Menu({ params }) {
    const categories = await getCategories();
    // const { category } = await params;

    return (
        <ul className="justify-center flex flex-col md:flex-row gap-2 pb-1 md:gap-1">
            {categories.map((category, key) => {
                return (
                    <Link
                        key={key}
                        href={`/app/(user)/category/${category.id}`}
                        className="flex items-center"
                    >
                        <li
                            className="font-openSansBold w-full text-sm uppercase hover:bg-[#ed1f3a10] hover:text-tugAni-red py-2 px-3 rounded-btn cursor-pointer transition-all md:text-center"
                        >
                            {category.title}
                        </li>
                    </Link>
                )
            })}
        </ul>
    );
}