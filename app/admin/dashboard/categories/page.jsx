import AddButton from "@/app/components/Admin/AddButton"; 
import CategoriesListView from "@/app/components/Admin/CategoriesListView";

export default function AdminCategories() { 
    return ( 
        <main className="p-8 pl-12 pr-12 w-dvw overflow-hidden"> 
            <section className="flex flex-row justify-between items"> 
                <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red">Categories</h1> 
                <AddButton href="/admin/dashboard/categories/form" name="category" /> 
            </section>
            <section className="mt-8">
                <CategoriesListView />
            </section>
        </main> 
    ); 
}