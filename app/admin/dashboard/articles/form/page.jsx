"use client";

import ArticlesForm from "@/app/components/Admin/ArticlesForm";
import { Suspense, useEffect } from "react";
import GridSkeleton from "../../../../components/Admin/GridSkeleton";
import AdminHeader from "../../../../components/Admin/AdminHeader";
import { useRouter } from "next/navigation";

export default function Page() {
    return (
        <>
            <AdminHeader href="/admin/dashboard/articles" />
            <div className="overflow-x-hidden mb-60">
                <Suspense fallback={<GridSkeleton />}>
                    <ArticlesForm />
                </Suspense>
            </div>
        </>
    );
}