import { getArticlesByAuthor } from "@/lib/firebase/article/read_server";
import { getAuthors } from "@/lib/firebase/author/read_server";

export default function Page({ params }) {
    const { authorId } = params;
    const author = getAuthors(authorId);
    const articles = getArticlesByAuthor(authorId);

    return (
        <div>
            
        </div>
    );
}