"use client";

import useArticles from "@/lib/firebase/article/read";
import ErrorMessage from "./ErrorMessage";
import GridSkeleton from "./GridSkeleton";
import Link from "next/link";
import { useState } from "react";
import { useArticleForm } from "@/app/admin/dashboard/articles/form/contexts/ArticleFormContext";

export default function ArticlesListView() {
    const [deleteId, setDeleteId] = useState(null);

    const {
        data,
        error,
        isLoading
    } = useArticles();

    const {
        dataForm,
        isLoadingForm,
        errorForm,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        image,
        setImage,
        fetchData
    } = useArticleForm();

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
        <section className="w-full gap-4 items-center grid grid-cols-[repeat(auto-fill,_400px)] auto-rows-max gap-y-8 justify-center">
            {data?.map((item, key) => {
                return <div key={item?.id} className="card bg-base-100 w-96 shadow-xl h-full">
                    <figure>
                        <img
                            src={item?.imageURL}
                            alt={item?.slug}
                            className="aspect-video object-cover" 
                        />
                    </figure>
                    <div className="card-body text-tugAni-black">
                        <div className="flex flex-row justify-between w-full">
                            <h2 className="card-title font-openSansBold text-lg">
                                {item?.title}
                            </h2>
                            {item?.id !== "news" && <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="p-2 rounded-full bg-base-100 border-none shadow-none hover:bg-gray-200">
                                    <img src="/options.svg" alt="Options" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content rounded-xl z-[1] w-36 shadow-md font-openSansRegular pt-3 pb-3 bg-tugAni-white">
                                    <Link href={`/admin/dashboard/articles/form?id=${item?.id}`}>
                                        <button className="flex flex-row items-center w-full p-3 pl-5 gap-4 hover:bg-gray-200">
                                            <img src="/edit.svg" alt="Edit" />
                                            <span className="text-sm">Edit</span>
                                        </button>
                                    </Link>
                                        <button 
                                            onClick={(event) => {
                                                console.log(item.id);
                                                setDeleteId(item?.id);
                                                document.getElementById('my_modal_2').showModal(item?.id);
                                            }}
                                            className="flex flex-row items-center w-full p-3 pl-5 gap-4 hover:bg-gray-200"
                                        >
                                            <img src="/delete.svg" alt="Delete" />
                                            <span className="text-red-500 text-sm">Delete</span>
                                        </button>
                                </ul>
                            </div> }
                        </div>
                        <p className="font-openSansItalic text-sm">
                            {item?.slug}
                        </p>
                        <p className="font-openSansRegular desc">
                            {item?.description}
                        </p>
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