import { getArticle } from "@/lib/firebase/article/read_server";
import { AuthorCard } from "@/app/components/AuthorCard";
import { CategoryCard, SubcategoryCard } from "@/app/components/CategoryCard";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAuthors } from "@/lib/firebase/author/read_server";
import { Mail } from "lucide-react";
import Link from "next/link";

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

    const authorPromises = article.authorId.map((id) => getAuthors(id));
    const authors = await Promise.all(authorPromises);

    return (
        <main className="p-10">
            <div>
                <img className="h-[400px] w-full object-cover" src={article?.imageURL} alt={article?.slug} />
                <div className="flex items-center space-x-2 mt-2"> 
                <CategoryCard categoryId={article?.categoryId} className="text-xs text-tugAni-red uppercase font-openSansBold"/>
                {article?.subcategory && (
                    <>
                    <span className="text-xs text-tugAni-red font-openSansBold">/</span>
                    <SubcategoryCard subcategory={article?.subcategory} className="text-xs text-tugAni-red uppercase font-openSansBold"/>
                    </>
                )}
        </div>

                <h1 className="font-gotham text-tugAni-red mb-1 text-4xl">
                    {article?.title}
                </h1>
                <h3 className="long-text font-openSansRegular text-gray-70">
                    {article?.description}
                </h3>
                <div className="mt-2">
                    <AuthorCard authorId={article?.authorId} className="mt-0 overflow-hidden" />
                    <div className="mt-2">
                        <span className="font-openSansRegular text-sm my-0 text-gray-500">
                            Published on {formattedDate}
                        </span>
                        {formattedEditDate && (
                            <span className="font-openSansRegular text-sm my-0 text-gray-500 ml-5">
                                Edited on {formattedEditDate}
                            </span>
                        )}
                    </div>
                </div>
                {/* <div className="mt-6">
                    <ReadOnlyEditor content={article.content} />
                </div> */}
            </div>
            <div className="flex flex-col gap-4 bg-white p-4 rounded-box shadow">
            <h3 className="uppercase font-bebas text-center md:text-left text-2xl text-tugAni-red"> {authors.length === 1 ? "ABOUT THE AUTHOR" : "ABOUT THE AUTHORS"} </h3>
                {authors.map((author, index) => (
                    <div key={author.id} className="flex flex-col">
                        <AuthorDetails author={author} />
                        {index < authors.length - 1 && <hr className="border-t-gray-300 mt-2" />}
                    </div>
                ))}
            </div>
        </main>
    );
}

function AuthorDetails({ author }) {
    return (
        <main>
            <Link href={`/author/${author.id}`} >
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                <img src={author.photoURL} alt={author.name} className="aspect-square w-16 md:w-24 rounded-full object-cover"/>
                <div className="w-full">
                    <h1 className="font-gotham tracking-tighter text-center md:text-left text-3xl sm:text-4xl md:text-2xl hover:text-tugAni-red">
                        {author.name}
                    </h1>
                    {author.email && (
                        <div className="flex items-center gap-2 mt-0 justify-self-center md:justify-self-start">
                            <Mail size={22} />
                            <span className="font-openSansRegular text-sm select-all">{author.email}</span>
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <p className="font-openSansRegular text-sm md:text-base">{author.description}</p>
                    </div>
                </div>
            </div>
            </Link>
        </main>
    );
}
