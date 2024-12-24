import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorCard } from "./AuthorCard";
import { CategoryCard } from "./CategoryCard";

export default function ArticleCard({ article, className = "" }) {
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <Link href={`/articles/${article?.id}`} className={cn("w-full flex flex-col gap-2 md:gap-4 md:flex-row h-auto items-start articleCard cursor-pointer transition-all", className)}>
            <img
                src={article?.imageURL}
                alt={article?.slug}
                className="object-cover aspect-video w-full sm:w-auto sm:h-32 rounded-box transition-all"
            />
            <div className="flex flex-col text-tugAni-black grow pt-1 w-[80%] justify-center">
                <CategoryCard categoryId={article?.categoryId} className="text-xs text-tugAni-red uppercase font-openSansBold" />
                <h2 className="font-gotham text-xl title tracking-tighter m-0 p-0">
                    {article?.title}
                </h2>
                <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
                    {formattedDate}
                </span>
                <AuthorCard authorId={article?.authorId} className="mt-2 overflow-hidden" />
                {/* <div className="flex flex-row gap-2 articles-center shrink text-ellipsis whitespace-nowrap overflow-hidden">
                    {article?.categoryId && categories && <span className="text-base-100 text-xs bg-tugAni-red rounded-badge px-2 py-1 whitespace-nowrap">
                        {categories.find(category => category.id === article?.categoryId).title} 
                    </span>}
                    <span className="text-tugAni-red text-xs border border-tugAni-red bg-base-100 rounded-badge px-2 py-1 whitespace-nowrap">
                        {article?.subcategory} 
                    </span>
                </div>
                <div className="flex flex-row gap-4 articles-center mt-3 overflow-clip text-clip w-full">
                    {JSON.parse(article?.authorId).map(authorId => {
                        return <div key={authorId} className="flex flex-row gap-2 articles-center">
                            <div className="avatar w-6 h-6 shrink-0">
                                <img 
                                    src={authors && authors.find(author => author.id === authorId)?.photoURL}
                                    className="rounded-full w-full h-full object-cover aspect-square"
                                />
                            </div>
                            <p className="font-openSansBold text-sm whitespace-nowrap">
                                {authorId && authors && authors.find(author => author.id === authorId)?.name}
                            </p>
                        </div>
                    })}
                </div> */}
            </div>
        </Link>
    );
}

async function CategoryCard({ categoryId, className = "" }) {
    const category = await getCategory(categoryId);
    return (
        <span className={cn(className)}>{category.title}</span>
    );
}