import { getArticles } from "@/lib/firebase/article/read_server";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { CategoryCard } from "./CategoryCard";
import { AuthorCard } from "./AuthorCard";
import { getCategories } from "@/lib/firebase/category/read_server";
import { ArrowRight } from "lucide-react";

export default async function LatestArticlesView({ title }) {
    const articles = await getArticles();

    if(!articles) {
        return <section>
            <h1>No posts</h1>
        </section>
    }

    return (
        <section>
            <div className="flex flex-col gap-4 mb-8">
                {articles.map((article, key) => {
                    if (key === 0) {
                        return (
                            <>
                                <Banner key={key} article={article} />
                                <h1 className="text-3xl font-bebas text-tugAni-red mt-8 mb-4">{title}</h1>
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
        </section>
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
                            className="flex flex-col gap-4 bg-base-100 p-4 pt-8 rounded-box shadow" 
                        >
                            <Link
                                href={`/category/${category.id}`}
                                className="flex items-center gap-2 cursor-pointer group w-fit"
                            >
                                <h1 className="text-3xl font-bebas text-tugAni-red ml-4">{category.title}</h1>
                                <ArrowRight className="text-tugAni-red group-hover:translate-x-1 transition-all" />
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
        <Link 
            href={`/articles/${article?.id}`}
            className="w-full md:h-96 flex flex-col-reverse md:flex-row h-auto items-center gap-6 md:gap-2 cursor-pointer articleCard box-border"
        >
            <div className="flex flex-col text-tugAni-black grow w-full justify-center shrink">
                <CategoryCard categoryId={article?.categoryId} className="text-tugAni-red uppercase font-openSansBold" />
                <h2 className="font-gotham text-4xl long-text tracking-tighter">
                    {article?.title}
                </h2>
                <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
                    {formattedDate}
                </span>
                <p className="mt-4 long-text font-openSansRegular">
                    {article?.description}
                </p>
                <AuthorCard authorId={article?.authorId} className="mt-4 overflow-hidden flex-wrap" />
            </div>
            <img
                src={article?.imageURL}
                alt={article?.slug}
                className="object-cover aspect-video rounded-box transition-all md:h-96 md:w-auto w-full h-auto shrink-0"
            />
        </Link>
    );
}