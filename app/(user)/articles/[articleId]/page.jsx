import { getArticle } from "@/lib/firebase/article/read_server"
import { AuthorCard } from "@/app/components/AuthorCard";
import { CategoryCard } from "@/app/components/CategoryCard";

export default async function Page({ params }) {
    const { articleId } = await params;
    const article = await getArticle(articleId);
    console.log("article", article);
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    
    let formattedEditDate = '';
    if (article.editedTimestamp) {
        formattedEditDate = new Date(article.editedTimestamp.seconds * 1000).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }

    return (
        <main className="p-10">
            <div>
                <img className="h-[400px] w-full object-cover" src={article?.imageURL} alt={article?.slug} />
                <CategoryCard categoryId={article?.categoryId} className="text-xs text-tugAni-red uppercase font-openSansBold" />
                <h1 className="font-gotham text-tugAni-red mb-1 text-4xl">
                    {article?.title}
                </h1>
                <div className="flex items-center">
                    <AuthorCard authorId={article?.authorId} className="mt-0 overflow-hidden" />
                    <span className="font-openSansRegular text-sm my-0 text-gray-500 ml-5">
                        Published on {formattedDate}
                    </span>
                    {formattedEditDate && (
                        <span className="font-openSansRegular text-sm my-0 text-gray-500 ml-5">
                            Edited on {formattedEditDate}
                        </span>
                    )}
                </div>
            </div>
        </main>
    );
}
