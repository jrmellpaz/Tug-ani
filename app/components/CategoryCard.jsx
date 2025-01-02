import { getCategory } from "@/lib/firebase/category/read_server";
import { cn } from "@/lib/utils";

export async function CategoryCard({ categoryId, className }) {
    const category = await getCategory(categoryId);
    return (
        <span className={cn(className)}>{category.title}</span>
    );
}

export function SubcategoryCard({ subcategory, className }) {
    return (
        <span className={cn(className, "w-fit")}>{subcategory}</span>
    );
}