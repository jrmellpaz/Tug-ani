import AddButton from "@/app/components/Admin/AddButton"; 

export default function AdminCategories() { 
    return ( 
        <section className="p-8 w-dvw"> 
            <div className="flex flex-row justify-between items"> 
                <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red">Categories</h1> 
                <AddButton href="/admin/dashboard/categories/form" name="category" /> 
            </div> 
        </section> 
    ); 
}