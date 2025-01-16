import { searchArticles } from "@/lib/firebase/article/read_server";
import ArticleCard from "@/app/components/ArticleCard";

export default async function SearchResultsPage({ params }) {
    const { query } = await params;

    let searchResults = [];
    if (query) {
        try {
            searchResults = await searchArticles(decodeURIComponent(query));
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    return (
        <div className="border-box w-full md:px-20 overflow-hidden mb-8 mt-8">
            <h1 className="text-2xl font-bold mb-4 font-openSansRegular text-tugAni-black sm:px-4">Search results for "{decodeURIComponent(query)}"</h1>
            {searchResults.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {searchResults.map((article, key) => (
                        <div key={key} className="w-full flex flex-col gap-2 px-4 [&:last-child_hr]:hidden">
                            <ArticleCard article={article} type="search" />
                            <hr className={"border-t-gray-300"} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mb-4 font-openSansRegular text-tugAni-black sm:px-4">No results found for "{decodeURIComponent(query)}".</p>
            )}
        </div>
    );
}
