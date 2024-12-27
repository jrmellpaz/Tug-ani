import { getArticles } from "@/lib/firebase/article/read_server";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { CategoryCard } from "./CategoryCard";
import { AuthorCard } from "./AuthorCard";
import { getCategories } from "@/lib/firebase/category/read_server";
import { ArrowRight, TrendingUp } from "lucide-react";

export default async function LatestArticlesView({ title }) {
    const articles = await getArticles();

    if(!articles) {
        return <section>
            <h1>No posts</h1>
        </section>
    }

    return (
        <div className="flex flex-col items-center gap-4 mb-8">
            {articles.map((article, key) => {
                if (key === 0) {
                    return (
                        <>
                            <Banner key={key} article={article} />
                            <div className="w-full flex flex-row justify-start items-center gap-3 mt-8">
                                <TrendingUp className="w-12 h-12 text-tugAni-red" />
                                <h1 className="text-3xl font-bebas text-tugAni-red">
                                    {title}
                                </h1>
                            </div>
                        </>
                    );
                }
                else {
                    return (
                        <>
                            <ArticleCard key={key} article={article} />
                            <div className="divider m-0 last:hidden"></div>
                        </>
                    );
                }
            })}
        </div>
    )
}

export async function SectionView() {
    const categories = await getCategories();

    if(!categories) {
        return <section>
            <h1>No posts</h1>
        </section>
    }

    return (
        <section>
            <div className="flex flex-col gap-4">
                {categories.map((category, key) => {
                    return (
                        <div 
                            key={key}
                            className="flex flex-col gap-4 odd:bg-tugAni-white p-4 pt-8 rounded-box odd:shadow" 
                        >
                            <Link
                                href={`/app/(user)/category/${category.id}`}
                                className="flex items-center gap-2 cursor-pointer group w-fit"
                            >
                                <h1 className="text-3xl font-bebas text-tugAni-red ml-4">{category.title}</h1>
                                <ArrowRight className="text-tugAni-red group-hover:translate-x-1 transition-all mb-[2px]" />
                            </Link>
                            <Section key={key} category={category} />
                        </div>
                    )
                })}
            </div>
        </section>
    );
}

async function Section({ category }) {
    const articles = await getArticles(category.id);

    if(!articles) {
        return <section>
            <h1>No posts</h1>
        </section>
    }

    return (
        <section>
            <div className="flex flex-col gap-4">
                {articles.map((article, key) => {
                    return (
                        <>
                            <ArticleCard key={key} article={article} type="section" />
                            <div className="divider m-0 last:hidden"></div>
                        </>
                    );
                })}
            </div>
        </section>
    );
}

function Banner({ article }) {
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        <>
            <div
                className="aspect-video max-w-[800px] w-full border relative bg-tugAni-black rounded-box overflow-clip md:hidden"
            >
                <div
                    className="absolute top-0 w-full h-full flex flex-col justify-end p-8 z-10 group"
                >
                    <Link href={`/app/(user)/articles/${article?.id}`}>
                        <CategoryCard categoryId={article?.categoryId}
                                      className="text-tugAni-white uppercase font-openSansBold drop-shadow"/>
                        <h2 className="font-gotham text-4xl long-text tracking-tighter text-tugAni-white drop-shadow-2xl group-hover:underline">
                            {article?.title}
                        </h2>
                        <span className="font-openSansRegular text-xs my-1 text-tugAni-white title">
                            {formattedDate}
                        </span>
                    </Link>
                    <AuthorCard authorId={article?.authorId} className="mt-4 overflow-hidden text-tugAni-white flex-wrap shrink-0 drop-shadow-2xl"/>
                </div>
                <img
                    src={article.imageURL}
                    alt={article.slug}
                    className="object-cover aspect-video w-full opacity-50 rounded-box"
                />
            </div>
            <div
                className="hidden w-full md:h-96 md:flex md:flex-row h-auto justify-between items-center gap-6 md:gap-2 cursor-pointer articleCard box-border"
            >
                <div className="flex flex-col text-tugAni-black grow max-w-fit w-full justify-center shrink">
                    <Link href={`/app/(user)/articles/${article?.id}`}>
                        <CategoryCard categoryId={article?.categoryId} className="text-tugAni-red uppercase font-openSansBold"/>
                        <h2 className="font-gotham text-4xl long-text tracking-tighter">
                            {article?.title}
                        </h2>
                        <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
                                {formattedDate}
                        </span>
                        <p className="mt-4 long-text font-openSansRegular">
                            {article?.description}
                        </p>
                    </Link>
                    <AuthorCard authorId={article?.authorId} className="mt-4 overflow-hidden flex-wrap shrink-0"/>
                </div>
                <Link
                    href={`/app/(user)/articles/${article?.id}`}
                    className="w-full flex justify-end"
                >
                    <img
                        src={article?.imageURL}
                        alt={article?.slug}
                        className="object-cover aspect-video rounded-box transition-all md:h-96 md:w-auto shrink-0"
                    />
                </Link>
            </div>
        </>
    );
}