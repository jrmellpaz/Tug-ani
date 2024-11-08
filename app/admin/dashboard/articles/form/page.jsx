"use client";

import ArticlesForm from "@/app/components/Admin/ArticlesForm";
import { Suspense } from "react";
import GridSkeleton from "../../../../components/Admin/GridSkeleton";

export default function Page() {
    return (
        <Suspense fallback={<GridSkeleton />}>
            <ArticlesForm />
        </Suspense>
    );
}