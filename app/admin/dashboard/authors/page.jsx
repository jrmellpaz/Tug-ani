import AddButton from "@/app/components/Admin/AddButton"; 
import AuthorsListView from "@/app/components/Admin/AuthorsListView";

export default function AdminAuthors() { 
    return ( 
        <main className="p-8 pl-12 pr-12 w-dvw overflow-hidden"> 
            <section className="flex flex-row justify-between items"> 
                <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red">Authors</h1> 
                <AddButton href="/admin/dashboard/authors/form" name="author" /> 
            </section>
            <section className="mt-8">
                <AuthorsListView />
            </section>
        </main> 
    ); 
}