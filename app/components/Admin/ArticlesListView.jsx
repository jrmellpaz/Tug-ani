"use client";

import useArticles from "@/lib/firebase/article/read";
import ErrorMessage from "./ErrorMessage";
import GridSkeleton from "./GridSkeleton";
import Link from "next/link";
import { useState } from "react";
import { useArticleForm } from "@/app/admin/dashboard/articles/form/contexts/ArticleFormContext";
import { Edit2Icon, EditIcon, EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import useCategories from "@/lib/firebase/category/read";
import useAuthors from "@/lib/firebase/author/read";

export default function ArticlesListView() {
    const [deleteId, setDeleteId] = useState(null);

    const {
        data,
        error,
        isLoading
    } = useArticles();

    const {
        handleDelete,
    } = useArticleForm();

    const { data: categories } = useCategories();
    const { data: authors } = useAuthors();

    if (isLoading) {
        return <GridSkeleton />
    }
    if (error) {
        return <ErrorMessage header="Something went wrong (ó﹏ò｡)" message={error} />
    }
    if (!data) {
        return <ErrorMessage header="No data found (ó﹏ò｡)" message="An error occurred. Refresh to fetch data." />
    }

    return (
        <section className="w-full flex flex-col items-center gap-4 mb-12">
            {data?.map((item, key) => { 
                return <div key={item?.id} className="w-full flex flex-row rounded-box card-side bg-base-100 shadow-xl h-28 ">
                <figure className="hidden md:block transition-all">
                    <img
                        src={item?.imageURL}
                        alt={item?.slug}
                        className="object-cover aspect-video h-full"
                    />
                </figure>
                <div className="flex flex-row justify-between w-full">
                <div className="pl-4 flex flex-col text-tugAni-black grow pt-3">
                    <div className="flex flex-row justify-between w-full items-center">
                        <h2 className="card-title font-gotham text-xl title tracking-tighter">
                            {item?.title}
                        </h2>
                    </div>
                    <div className="flex flex-row gap-2 items-center shrink text-ellipsis overflow-hidden whitespace-nowrap">
                        {item?.categoryId && categories && <span className="text-base-100 text-xs bg-tugAni-red rounded-badge px-2 py-1 whitespace-nowrap">
                            {categories.find(category => category.id === item?.categoryId).title} 
                        </span>}
                        <span className="text-tugAni-red text-xs border border-tugAni-red bg-base-100 rounded-badge px-2 py-1 whitespace-nowrap">
                            {item?.subcategory} 
                        </span>
                    </div>
                    <div className="flex flex-row gap-2 w-full items-center mt-2">
                        <div className="avatar w-6 h-6 shrink-0">
                            <img 
                                src={item?.authorId && authors && authors.find(author => author.id === item?.authorId)?.photoURL}
                                className="rounded-full w-full h-full object-cover aspect-square"
                            />
                        </div>
                        <p className="font-openSansBold text-sm title">
                            {item?.authorId && authors && authors.find(author => author.id === item?.authorId)?.name}
                            <span className="font-openSansRegular">
                                &nbsp;•&nbsp;Updated on {item?.authorId && authors && authors.find(author => author.id === item?.authorId)?.timestamp.toDate().toDateString()}
                            </span>
                        </p>
                    </div>
                    
                </div>
                <div className="dropdown dropdown-bottom dropdown-end flex flex-row justify-center items-center pr-4 w-fit">
                    <Link href={`/admin/dashboard/articles/form?id=${item?.id}`}>
                        <button tabIndex={0} role="button" className="p-3 rounded-full bg-base-100 border-none shadow-none hover:bg-gray-200">
                            <Edit2Icon alt="Options" width="18px" height="18px" className="text-tugAni-black" />
                        </button>
                    </Link>
                    <button 
                        tabIndex={0} 
                        onClick={() => {
                            setDeleteId(item?.id);
                            document.getElementById("my_modal_2").showModal();
                        }} 
                        className="p-3 rounded-full bg-base-100 border-none shadow-none hover:bg-red-200"
                    >
                        <TrashIcon alt="Delete forever" width="18px" height="18px" className="text-red-600" />
                    </button>
                </div>
                </div>

                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box box-border overflow-hidden">
                        <ErrorMessage header="This action can't be undone" />
                        <p className="pl-4 m-8 ml-10 font-openSansRegular text-tugAni-black">Do you wish to proceed?</p>
                        <form method="dialog" className="flex flex-row justify-end gap-2">
                            <button
                                className="text-tugAni-red font-openSansBold text-sm p-3 pl-6 pr-6 hover:bg-red-100 rounded-badge"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(event) => {
                                    // event.preventDefault();
                                    handleDelete(deleteId);
                                    console.log("delete", deleteId);
                                }}
                                className="bg-tugAni-red text-tugAni-white font-openSansBold text-sm p-3 pl-6 pr-6 rounded-badge"
                            > 
                                Proceed
                            </button>
                        </form>
                        
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div> 
            })}
        </section>
    );
}