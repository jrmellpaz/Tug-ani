import { getAuthors } from "@/lib/firebase/author/read_server";
import { cn } from "@/lib/utils";

export async function AuthorCard({ authorId, className="" }) {
    const authorIds = JSON.parse(authorId);
    const authorPromises = authorIds.map(id => getAuthors(id));
    const authors = await Promise.all(authorPromises);
        
    if (!authors || authors.length === 0) {
        return <div className={cn("h-4 w-32 skeleton", className)}></div>
    }

    return (
        <div className={cn("flex gap-4", className)}>
            {authors.map(author => (
                <div key={author.id} className="flex items-center gap-2 shrink-0">
                    <img 
                        src={author.photoURL} 
                        alt={author.name}
                        className="aspect-square rounded-full w-6 h-6 object-cover"
                    />
                    <p className="font-openSansBold text-sm whitespace-nowrap">{author.name}</p>
                </div>
            ))}
        </div>
    );
}