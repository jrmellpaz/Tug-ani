import { getAuthors } from "@/lib/firebase/author/read_server";
import { cn } from "@/lib/utils";
import Link from "next/link";

export async function AuthorCard({ authorId, className="" }) {
    const authorPromises = authorId.map(id => getAuthors(id));
    const authors = await Promise.all(authorPromises);
        
    if (!authors || authors.length === 0) {
        return <div className={cn("h-4 w-32 skeleton", className)}></div>
    }

    return (
        <div className={cn("flex gap-4 w-full text-sm overflow-x-auto", className)}>
            {authors.map(author => (
                <Link 
                    key={author.id}
                    href={`/author/${author.id}`}
                    className="cursor-pointer flex gap-4 shrink-0"
                >
                    <div className="flex items-center gap-2 shrink-0">
                        <img 
                            src={author.photoURL} 
                            alt={author.name}
                            className="aspect-square rounded-full w-6 h-6 object-cover"
                        />
                        <p className="font-openSansBold whitespace-nowrap hover:text-tugAni-red">{author.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}