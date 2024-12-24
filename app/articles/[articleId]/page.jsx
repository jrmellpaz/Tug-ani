// import { getAuthors } from "@/lib/firebase/author/read_server";
// import { getCategory } from "@/lib/firebase/category/read_server";
// import { getArticle } from "@/lib/firebase/article/read_server";

import { getArticle } from "@/lib/firebase/article/read_server"
import { AuthorCard } from "@/app/components/AuthorCard";
import { CategoryCard } from "@/app/components/ArticleCard";

// export async function generateMetadata({ params }) {
//     const { articleId } = params;
//     const article = await getArticle(articleId)

//     return {
//         title: article?.title,
//         openGraph: {
//             images: [article?.imageURL],
//         },
//     }
// }

// export default async function Page({ params }) {
//     const { articleId } = params;
//     const article = await getArticle(articleId)
//     return <main className="flex justify-center">
//         <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
//             <CategoryCard categoryId={article?.categoryId} />
//             <h1 className="text-2xl font-bold">{article?.title}</h1>
//             <img className="w-full object-cover" src={article?.imageURL} alt="" />
//             <div className="flex justify-between items-center">
//                 <AuthorCard authorId={article?.authorId} />
//                 <h5 className="text-xs text-gray-500">{article?.timestamp?.toDate()?.toLocaleDateString()}</h5>
//             </div>
//             <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
//         </section>
//     </main>
// }

// async function AuthorCard({ authorId }) {
//     const author = await getAuthors(authorId);
//     return <div className="flex gap-2 items-center">
//         <img className="h-6 w-6 rounded-full object-cover" src={author?.photoURL} alt="" />
//         <h4 className="text-sm text-gray-500">{author?.name}</h4>
//     </div>
// }

// async function CategoryCard({ categoryId }) {
//     const category = await getCategory(categoryId);
//     return <div className="flex">
//         <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
//             <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
//             <h4 className="text-xs text-gray-500">{category?.name}</h4>
//         </div>
//     </div>
// }

// export default async function Page({params}){
//     const {articleId} = await params
//     const article = await getArticle(articleId)
//     const formattedDate = new Date(article.publishedTimestamp.seconds * 1000).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric"
//     });
//     return <main className = "p-10">
//         <div className="flex flex-col text-tugAni-black grow pt-1 w-[80%] justify-center">
//                 <CategoryCard categoryId={article?.categoryId} className="text-xs text-tugAni-red uppercase font-openSansBold" />
//                 <h2 className="font-gotham text-xl title tracking-tighter m-0 p-0">
//                     {article?.title}
//                 </h2>
//                 <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
//                     {formattedDate}
//                 </span>
//                 <AuthorCard authorId={article?.authorId} className="mt-2 overflow-hidden" />
//             </div>
//         <div>
//             <img className="h-[400px] w-full object-cover" src={article?.imageURL} alt={article?.slug} />
//             <CategoryCard categoryId={article?.categoryId} className="text-xs text-tugAni-red uppercase font-openSansBold" />
//             <h1 className="font-openSansBold text-tugAni-red mb-4 ">{article?.title}</h1>
//             <AuthorCard authorId={article?.authorId} className="mt-2 overflow-hidden" />
//             <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
//                 {formattedDate}
//             </span>
//         </div>
//     </main>
// }

export default async function Page({params}) {
    const { articleId } = await params;
    const article = await getArticle(articleId);
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
                <h1 className="font-gotham text-tugAni-red mb-1">
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
