import { getArticle, getArticlesBySubcategory } from "@/lib/firebase/article/read_server";
import { AuthorCard } from "@/app/components/AuthorCard";
import { CategoryCard, SubcategoryCard } from "@/app/components/CategoryCard";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAuthors } from "@/lib/firebase/author/read_server";
import { Mail } from "lucide-react";
import Link from "next/link";
import ReadOnlyEditor from "@/app/components/ReadOnlyEditor"

export async function generateMetadata({ params }) {
    const { articleId } = await params;
    const article = await getArticle(articleId);
    const category = await getCategory(article.categoryId);
    const authorPromises = article.authorId.map(id => getAuthors(id));
    const authors = await Promise.all(authorPromises);

    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    let formattedEditDate = '';
    if (article.editedTimestamp) {
        formattedEditDate = new Date(article.editedTimestamp.seconds * 1000).toLocaleString("en-US", {
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
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    
    let formattedEditDate = '';
    if (article.editedTimestamp) {
        formattedEditDate = new Date(article.editedTimestamp.seconds * 1000).toLocaleString("en-US", {
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
    let relatedArticles = await getArticlesBySubcategory(article.subcategory);

    if (relatedArticles.length === 0) {
        relatedArticles = (await getArticlesByCategory(article.category)).filter((related) => related.id !== articleId);
    } else {
        relatedArticles = relatedArticles.filter((related) => related.id !== articleId);
    }
    relatedArticles = relatedArticles.slice(0, 3);
    console.log(relatedArticles.categoryId)
    return (
        <main className="p-2 pt-0 md:p-10 w-full max-w-[1200px] mx-auto md:pt-0">
            <div className="flex flex-col">
                <img className="object-cover aspect-video w-full rounded-box transition-all" src={article?.imageURL} alt={article?.slug} />
                <div className="flex items-center gap-1 mt-4 self-center">
                    <Link href={`/category/${article?.categoryId}`} className="flex items-center gap-1 cursor-pointer group w-fit"> 
                        <CategoryCard categoryId={article?.categoryId} className="group text-2xl text-tugAni-red uppercase font-bebas group-hover:text-tugAni-black"/>
                        {article?.subcategory && (
                            <>
                            <span className="text-2xl text-tugAni-red font-bebas group-hover:text-tugAni-black">/</span> 
                            <SubcategoryCard subcategory={article?.subcategory} className="group text-2xl text-tugAni-red uppercase font-bebas group-hover:text-tugAni-black"/>
                            </>
                        )}
                    </Link>
                </div>

                <h1 className="font-gotham text-tugAni-black mb-1 text-4xl md:text-5xl tracking-tight md:tracking-tighter self-center text-center leading-none">
                    {article?.title}
                </h1>
                <h3 className="font-openSansRegular text-gray-700 self-center text-center my-4">
                    {article?.description}
                </h3>
                <div className="mt-2 self-center flex flex-col">
                    <AuthorCard authorId={article?.authorId} className="mt-0 overflow-hidden self-center justify-center" />
                    <div className="mt-1 flex flex-col md:flex-row justify-center items-center text-center">
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
                <div className="mt-6">
                    <ReadOnlyEditor content={article?.content} />
                </div>
            </div>
            <div className="flex flex-col gap-4 bg-white p-4 md:p-8 rounded-box shadow">
                <h3 className="uppercase font-bebas text-center md:text-left text-2xl text-tugAni-red"> 
                    {authors.length === 1 ? "ABOUT THE AUTHOR:" : "ABOUT THE AUTHORS:"} 
                </h3>
                {authors.map((author, index) => (
                    <div key={author.id} className="flex flex-col">
                        <AuthorDetails author={author} />
                        {index < authors.length - 1 && <hr className="border-t-gray-300 mt-4" />}
                    </div>
                ))}
            </div>
            {relatedArticles.length > 0 && (
                <div className="mt-5">
                    <h3 className="uppercase font-bebas text-center md:text-left py-4 text-2xl text-tugAni-red">
                        More from {article?.subcategory}
                    </h3>
                    <div className="w-full grid grid-cols-3 auto-rows-max justify-center gap-4 gap-y-8 py-4">
                        {relatedArticles.map((related) => (
                            <Card key={related.id} article={related} />
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

function AuthorDetails({ author }) {
    return (
        <main>
            <Link href={`/author/${author.id}`} >
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 w-full">
                <img src={author.photoURL} alt={author.name} className="aspect-square w-16 md:w-24 rounded-full object-cover"/>
                <div className="w-full">
                    <h1 className="font-gotham tracking-tighter text-center md:text-left text-3xl sm:text-4xl md:text-2xl hover:text-tugAni-red">
                        {author.name}
                    </h1>
                    {author.email && (
                        <div className="flex items-center gap-1 mt-0 justify-self-center md:justify-self-start">
                            <Mail size={20} />
                            <span className="font-openSansRegular text-sm select-all">{author.email}</span>
                        </div>
                    )}
                    <div className="flex flex-col mt-2">
                        <p className="font-openSansRegular text-sm md:text-base">{author.description}</p>
                    </div>
                </div>
            </div>
            </Link>
        </main>
    );
}

function Card({article}) {
    const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="w-full">
            <Link href={`/article/${article.id}`} className="flex flex-col gap-2 group">
                <img src={article.imageURL} alt={article.slug} className="aspect-video w-full h-auto object-cover rounded-box"/>
                <div className="flex flex-col">
                    <h1 className="mt-1 font-gotham text-tugAni-black text-2xl tracking-tight leading-5 group-hover:text-tugAni-red group-hover:underline category-card-title">
                        {article.title}
                    </h1>
                </div>
            </Link>
            <span className="mt-2 font-openSansRegular text-xs text-gray-600">
                {formattedDate}
            </span>
            <AuthorCard authorId={article.authorId} className="mt-2 overflow-hidden shrink-0" />
        </div>
    )
}