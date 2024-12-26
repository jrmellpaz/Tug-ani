import { getCategories } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default async function Menu({ params }) {
    const categories = await getCategories();
    // const { category } = await params;

    return (
        <ul className="justify-center flex flex-col md:flex-row gap-1 pb-1 md:gap-2">
            {console.log("params", params)}
            {categories.map((category, key) => {
                return (
                    <Link key={key} href={`/category/${category.id}`}>
                        <li
                            className="font-openSansBold text-sm uppercase hover:bg-[#ed1f3a10] hover:text-tugAni-red py-2 px-3 rounded-btn cursor-pointer transition-all"
                        >
                            {category.title}
                        </li>
                    </Link>
                )
            })}
        </ul>
    );
}