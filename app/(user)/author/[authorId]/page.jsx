import { getAuthors } from "@/lib/firebase/author/read_server";
import { Mail } from "lucide-react";
import { LatestAuthorArticles } from "@/app/components/LatestAuthorArticles";

export async function generateMetadata({ params }) {
    const { authorId } = await params;
    const author = await getAuthors(authorId);

    return {
        title: author.name,
        description: author.description,
        keywords: [
            author.name,
            "author",
            "Tug-ani",
            "UP Cebu",
            "University of the Philippines Cebu",
        ],
        category: "news",
        openGraph: {
            siteName: "Tug-ani",
            title: author.name,
            description: author.description,
            type: "profile",
            images: [
                {
                    url: author.photoURL,
                    alt: `${author.name} profile photo`,
                }
            ]
        },
        twitter: {
            title: author.name,
            description: author.description,
            image: {
                url: author.photoURL,
                alt: `${author.name} profile photo`,
            }
        }
    }
}

export default async function Page({ params }) {
    const { authorId } = await params;
    const author = await getAuthors(authorId);

    return (
        <section>
            <section className="w-full lg:px-20">
                <AuthorDetails author={author} />
            </section>
            <section
                className="flex flex-col my-12 mx-8 md:mx-20 gap-2"
            >
                {/* {articles.map((article, key) => {
                    return (
                        <div key={key} className={"flex flex-col w-full gap-2 [&:last-child_hr]:hidden"}>
                            <ArticleCard article={article} />
                            <hr className={"border-t-gray-300"} />
                        </div>
                    )
                })} */}
                <LatestAuthorArticles authorId={authorId} />
            </section>
        </section>
    );
}

function AuthorDetails({ author }) {
    return (
        <div
            className="flex flex-col gap-8 bg-tugAni-red py-12 px-8 md:px-20 text-tugAni-white w-full selection:bg-[#ED1F3A] rounded-b-box"
        >
            <div
                className="flex flex-col md:flex-row items-center gap-8 w-full"
            >
                <img 
                    src={author.photoURL} 
                    alt={author.name}
                    className="aspect-square w-32 md:w-48 rounded-full object-cover"
                />
                <div className="w-full">
                    <h3
                        className="uppercase font-bebas text-center md:text-left text-2xl"
                    >
                        ALL STORIES BY:
                    </h3>
                    <h1
                        className="font-gotham tracking-tighter text-center md:text-left text-3xl sm:text-4xl md:text-5xl"
                    >
                        {author.name}
                    </h1>
                    {author.email && <div
                        className="flex items-center gap-2 mt-4 justify-self-center md:justify-self-start"
                    >
                        <Mail size={22} />
                        <span 
                            className="font-openSansRegular text-sm select-all"
                        >
                            {author.email}
                        </span>
                    </div>}
                </div>
            </div>
            <div 
                className="flex flex-col gap-4"
            >
                
                <p
                    className="font-openSansRegular text-sm md:text-base"
                >
                    {author.description}
                </p>
            </div>
        </div>
    );
}