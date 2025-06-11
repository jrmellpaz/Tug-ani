"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import useCategoryArticles from "@/lib/firebase/article/category_articles";

export function LatestCategoryArticles({ categoryId }) {
    const {
        data,
        error,
        isLoading,
        totalCount,
        hasMore,
        fetchArticles
    } = useCategoryArticles(categoryId);

    console.log("LatestCategoryArticles data:", data);

    return (
        <div
            className="w-full grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] auto-rows-max justify-center gap-4 gap-y-8 py-12 px-8 sm:px-20"
        >
            {data ? (
                <>
                    <h1
                        className="text-3xl font-bebas text-tugAni-red col-span-row col-span-full"
                    >
                        Latest
                    </h1>
                    {data.map((article, key) => {
                        return (
                            <Card key={key} article={article} type={"latest"} />
                        )
                    })}
                    {hasMore && <button className="btn  bg-tugAni-red disabled:bg-gray-400 text-tugAni-white font-openSansRegular hover:bg-tugAni-red border-none col-span-full w-fit place-self-center" onClick={fetchArticles} disabled={isLoading}>
                        {isLoading ? <>
                            <LoaderCircle className="animate-spin" /> Loading articles
                        </>  : 'Show more articles'}
                    </button>
                    }
                </>
            ) : (
                <h1
                    className="text-3xl font-bebas text-tugAni-red col-span-row col-span-full"
                >
                    No articles found.
                </h1>
            )}
        </div>
    );
}

function Card({article, type}) {
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="w-full">
            <Link
                href={`/article/${article.id}`}
                className="flex flex-col gap-2 group"
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
                        className="mt-1 font-gotham text-tugAni-black text-2xl tracking-tight leading-5 group-hover:text-tugAni-red group-hover:underline category-card-title"
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