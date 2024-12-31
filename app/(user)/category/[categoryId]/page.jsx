import {getArticlesByCategory, getArticlesBySubcategory} from "@/lib/firebase/article/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import Link from "next/link";
import {CategoryCard, SubcategoryCard} from "@/app/components/CategoryCard";

export default async function Page({ params }) {
    const { categoryId } = await params;
    const category = await getCategory(categoryId);
    const articles = await getArticlesByCategory(categoryId);

    return (
        <main className="flex flex-col w-full">
            <section className="w-full flex justify-center md:px-20">
                <Banner category={category} />
            </section>
            <section>
                <Latest articles={articles} />
            </section>
            <section>
                {category.subcategories.map((subcategory) => {
                    return (
                        <Subcategory subcategory={subcategory} key={subcategory.id} />
                    )
                })}
            </section>
        </main>
    );
}

function Banner({ category }) {
    console.log(category);

    return (
        <div
            className="w-full h-[400px] border relative bg-tugAni-black overflow-clip rounded-b-box"
        >
            <div
                className="absolute top-0 w-full h-full flex flex-col justify-between p-8 md:px-20 z-10 group text-tugAni-white"
            >
                <div>
                    <h3
                        className="uppercase font-bebas text-2xl"
                    >
                        ALL STORIES TAGGED:
                    </h3>
                    <h1
                        className="font-gotham tracking-tighter text-7xl drop-shadow-lg"
                    >
                        {category.title}
                    </h1>
                    <div className="flex gap-2 mt-2">
                        {category.subcategories.map((subcategory) => {
                            return (
                                <SubcategoryCard subcategory={subcategory} key={subcategory} className="px-2 py-1 bg-tugAni-white rounded-badge text-tugAni-red font-openSansBold text-xs uppercase" />
                            );
                        })}
                    </div>
                </div>
                <p className="font-openSansRegular text-sm drop-shadow-lg mt-4">
                    {category.description}
                </p>
            </div>
            <img
                src={category.iconURL}
                alt={category.slug}
                className="w-full h-full object-cover opacity-50 rounded-b-box"
            />
        </div>
    );
}

function Latest({ articles }) {
    return (
        <div
            className="grid grid-cols-[repeat(auto-fill,_400px)] auto-rows-max justify-center gap-8 py-12 px-8"
        >
            <h1
                className="text-3xl font-bebas text-tugAni-red col-span-row col-span-full"
            >
                Latest
            </h1>
            {articles.map((article, key) => {
                return (
                    <Card key={key} article={article} type={"latest"} />
                )
            })}
        </div>
    );
}

function Card({article, type}) {
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="min-w-96">
            <Link
                href={`/article/${article.id}`}
                className="flex flex-col gap-4 group"
            >
                <img
                    src={article.imageURL}
                    alt={article.slug}
                    className="aspect-video w-full h-auto object-cover rounded-box"
                />
                <div className="flex flex-col">
                    {type === "latest" && <span
                        className="font-openSansBold text-xs text-tugAni-red uppercase"
                    >
                        {article.subcategory}
                    </span>}
                    <h1
                        className="mt-1 font-gotham text-tugAni-black text-2xl leading-5 group-hover:text-tugAni-red group-hover:underline"
                    >
                        {article.title}
                    </h1>
                    <span
                        className="mt-2 font-openSansRegular text-xs text-gray-600"
                    >
                        {formattedDate}
                    </span>
                </div>
            </Link>
        </div>
    )
}

async function Subcategory({ subcategory }) {
    const articles = await getArticlesBySubcategory(subcategory);

    return (
        <div
            className="grid grid-cols-[repeat(auto-fill,_400px)] auto-rows-max justify-center gap-8 py-12 px-8 odd:bg-white"
        >
            <h1
                className="text-3xl font-bebas text-tugAni-red col-span-full"
            >
                {subcategory}
            </h1>
            {articles.map((article) => {
                return (
                    <Card key={article.id} article={article} />
                )
            })}
        </div>
    );
}