import { getArticlesByCategory } from "@/lib/firebase/article/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";

export default async function Page({ params }) {
    const { categoryId } = params;
    const category = await getCategory(categoryId);
    const articles = await getArticlesByCategory(categoryId);

    return (
        <div>
            
        </div>
    );
}