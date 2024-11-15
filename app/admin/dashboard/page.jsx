import AdminLogoutButton from "@/app/components/Admin/AdminLogoutButton.jsx";
import DashboardLink from "../../components/Admin/DashboardLink.jsx";
import AdminHeader from "@/app/components/Admin/AdminHeader.jsx";

export default function AdminDashboard() {

    return (
        <>
            <AdminHeader />
            <main className="box-border p-8 pb-16 h-fit w-dvw bg-tugAni-white grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-4">
                <DashboardLink href="/admin/dashboard/articles">Articles</DashboardLink>
                <DashboardLink href="/admin/dashboard/authors">Authors</DashboardLink>
                <DashboardLink href="/admin/dashboard/categories">Categories</DashboardLink>
                <DashboardLink href="/admin/dashboard/multimedia">Multimedia</DashboardLink>
                <DashboardLink href="/admin/dashboard/tags">Tags</DashboardLink>
                <DashboardLink href="/admin/dashboard/about">About us</DashboardLink>
                <AdminLogoutButton />
            </main>
        </>
    );
}