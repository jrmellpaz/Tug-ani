import AddButton from "@/app/components/Admin/AddButton"; 
import CategoriesListView from "@/app/components/Admin/CategoriesListView";
import AdminHeader from "@/app/components/Admin/AdminHeader.jsx";

export default function AdminCategories() { 
    return ( 
        <>
            <AdminHeader href="/admin/dashboard" />
            <main className="px-12 py-8 w-dvw box-border overflow-hidden"> 
                <section className="flex flex-row justify-between items"> 
                    <h1 className="font-bebas text-4xl text-tugAni-red">Categories</h1> 
                    <AddButton href="/admin/dashboard/categories/form" name="category" /> 
                </section>
                <section className="mt-8 box-border overflow-hidden">
                    <CategoriesListView />
                </section>
            </main> 
        </>
    ); 
}