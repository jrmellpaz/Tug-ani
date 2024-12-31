import { getArticle } from "@/lib/firebase/article/read_server"
import { AuthorCard } from "@/app/components/AuthorCard";
import { CategoryCard } from "@/app/components/CategoryCard";
import { getCategory } from "@/lib/firebase/category/read_server";
import {getAuthors} from "@/lib/firebase/author/read_server";

export async function generateMetadata({ params }) {
    const { articleId } = await params;
    const article = await getArticle(articleId);
    const category = await getCategory(article.categoryId);
    const authorPromises = article.authorId.map(id => getAuthors(id));
    const authors = await Promise.all(authorPromises);

    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    let formattedEditDate = '';
    if (article.editedTimestamp) {
        formattedEditDate = new Date(article.editedTimestamp.seconds * 1000).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    return {
        title: article.title,
        description: article.description,
        keywords: [
            category.title,
            article.subcategory,
        ],
        category: category.title,
        openGraph: {
            siteName: "Tug-ani",
            title: article.title,
            description: article.description,
            type: "article",
            publishedTime: formattedDate,
            modifiedTime: formattedEditDate,
            authors: authors.map((author) => author.name),
            section: category.title,
            tag: [article.subcategory],
            images: [
                {
                    url: article.imageURL,
                    alt: `${article.title} banner`,
                }
            ]
        },
        twitter: {
            title: article.title,
            description: article.description,
            image: {
                url: article.imageURL,
                alt: `${article.title} banner`,
            }
        }
    }
}

export default async function Page({ params }) {
    const { articleId } = await params;
    const article = await getArticle(articleId);
    console.log("article", article);
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    
    let formattedEditDate = '';
    if (article.editedTimestamp) {
        formattedEditDate = new Date(article.editedTimestamp.seconds * 1000).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
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
