"use client";

import ArticlesForm from "@/app/components/Admin/ArticlesForm";
import { Suspense } from "react";
import GridSkeleton from "../../../../components/Admin/GridSkeleton";
import AdminHeader from "../../../../components/Admin/AdminHeader";

export default function Page() {
    return (
        <>
            <AdminHeader href="/admin/dashboard/articles" />
            <Suspense fallback={<GridSkeleton />}>
                <ArticlesForm />
            </Suspense>
        </>
    );
}