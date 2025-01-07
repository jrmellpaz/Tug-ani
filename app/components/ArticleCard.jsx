import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorCard } from "./AuthorCard";
import { CategoryCard, SubcategoryCard } from "./CategoryCard";

export default function ArticleCard({ article, className, type }) {
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <div
            className={cn("w-full flex flex-col gap-2 sm:gap-4 sm:flex-row h-auto items-start sm:items-center articleCard cursor-pointer transition-all p-3 rounded-box overflow-hidden hover:bg-[#ed1f3a10]", className)}
        >
            <Link 
                href={`/article/${article?.id}`}
                className="w-full sm:max-w-fit shrink-0"
            >
                <img
                    src={article?.imageURL}
                    alt={article?.slug}
                    className="object-cover aspect-video w-full sm:w-auto sm:h-32 rounded-box transition-all"
                />
            </Link>
            <div className="flex flex-col text-tugAni-black grow pt-1 w-full sm:w-[80%] justify-center">
                <Link href={`/article/${article?.id}`} className="w-full">
                    {type === "section"
                        ? <SubcategoryCard subcategory={article?.subcategory} className="text-xs text-tugAni-red uppercase font-openSansBold" />
                        : <CategoryCard categoryId={article?.categoryId} className="text-xs text-tugAni-red uppercase font-openSansBold" />
                    }
                    <h2 className="font-gotham text-xl long-text leading-5 lg:title tracking-tight m-0 p-0">
                        {article?.title}
                    </h2>
                    <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
                        {formattedDate}
                    </span>
                </Link>
                <AuthorCard authorId={article?.authorId} className="mt-2 overflow-hidden shrink-0" />
                {/* <div className="flex flex-row gap-2 articles-center shrink text-ellipsis whitespace-nowrap overflow-hidden">
                    {article?.categoryId && categories && <span className="text-base-100 text-xs bg-tugAni-red rounded-badge px-2 py-1 whitespace-nowrap">
                        {categories.find(category => category.id === article?.categoryId).title} 
                    </span>}
                    <span className="text-tugAni-red text-xs border border-tugAni-red bg-base-100 rounded-badge px-2 py-1 whitespace-nowrap">
                        {article?.subcategory} 
                    </span>
                </div>*/}
            </div>
        </div>
    );
}
