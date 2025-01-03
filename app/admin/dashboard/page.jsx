import AdminLogoutButton from "@/app/components/Admin/AdminLogoutButton.jsx";
import DashboardLink from "../../components/Admin/DashboardLink.jsx";
import AdminHeader from "@/app/components/Admin/AdminHeader.jsx";
import { BadgeInfoIcon, GroupIcon, NewspaperIcon, UsersRoundIcon } from "lucide-react";

export default function AdminDashboard() {

    return (
        <>
            <AdminHeader />
            <h1 className="font-bebas mt-8 ml-8 sm:ml-20 text-4xl text-tugAni-red">
                Dashboard
            </h1>
            <main className="box-border p-8 sm:px-20 pb-16 h-fit w-dvw bg-tugAni-white grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-4">
                <DashboardLink href="/admin/dashboard/articles">
                    <NewspaperIcon size={56} className="text-tugAni-black" />
                    <span className="text-tugAni-black">
                        Articles
                    </span>
                </DashboardLink>
                <DashboardLink href="/admin/dashboard/authors">
                    <UsersRoundIcon size={56} className="text-tugAni-black" />
                    <span className="text-tugAni-black">
                        Authors
                    </span>
                </DashboardLink>
                <DashboardLink href="/admin/dashboard/categories">
                    <GroupIcon size={56} className="text-tugAni-black" />
                    <span className="text-tugAni-black">
                        Categories
                    </span>
                </DashboardLink>
                <DashboardLink href="/admin/dashboard/about">
                    <BadgeInfoIcon size={56} className="text-tugAni-black" />
                    <span className="text-tugAni-black">
                        About us
                    </span>
                </DashboardLink>
                <AdminLogoutButton />
            </main>
        </>
    );
}