import { getArticles } from "@/lib/firebase/article/read_server";
import ArticleCard from "./ArticleCard";

export default async function ArticleListView({ title }) {
    const articles = await getArticles();

    if(!articles) {
        return <section>
            <h1>No posts</h1>
        </section>
    }

    return (
        <section>
            <h1 className="font-openSansBold text-tugAni-red mb-4">{title}</h1>
            <div className="flex flex-col gap-4">
                {articles.map((article, key) => {
                    return <ArticleCard key={key} article={article} />
                })}
            </div>
        </section>
    )
}