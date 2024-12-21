import AddButton from "@/app/components/Admin/AddButton";
import AdminHeader from "@/app/components/Admin/AdminHeader";
import ArticlesListView from "@/app/components/Admin/ArticlesListView";

export default function AdminCategories() { 
    return ( 
        <>
            <AdminHeader href="/admin/dashboard" />
            <main className="py-8 px-2 md:px-12 w-dvw overflow-hidden"> 
                <section className="flex flex-row justify-between items mx-4"> 
                    <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red">Articles</h1> 
                    <AddButton href="/admin/dashboard/articles/form" name="article" prefetch="false" /> 
                </section>
                <section className="mt-8">
                    <ArticlesListView />
                </section>
            </main> 
        </>
    ); 
}