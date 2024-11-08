"use client";

import useArticles from "@/lib/firebase/article/read";
import ErrorMessage from "./ErrorMessage";
import GridSkeleton from "./GridSkeleton";
import Link from "next/link";
import { useState } from "react";
import { useArticleForm } from "@/app/admin/dashboard/articles/form/contexts/ArticleFormContext";
import { Edit2Icon, EditIcon, EllipsisVerticalIcon, TrashIcon } from "lucide-react";

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

    // gap-4 items-center grid grid-cols-[repeat(auto-fill,_400px)] auto-rows-max gap-y-8 justify-center

    return (
        <section className="w-full flex flex-col items-center gap-4">
            {data?.map((item, key) => { 
                return <div key={item?.id} className="w-full flex flex-row rounded-box card-side bg-base-100 shadow-xl h-20">
                <figure>
                    <img
                        src={item?.imageURL}
                        alt={item?.slug}
                        className="object-cover aspect-video h-full"
                    />
                </figure>
                <div className="pl-4 flex flex-col text-tugAni-black grow pt-1">
                    <div className="flex flex-row justify-between w-full items-center">
                        <h2 className="card-title font-openSansBold text-base title">
                            {item?.title}
                        </h2>
                    </div>
                    <div className="flex flex-row gap-2 w-full items-center">
                        <div className="avatar w-5 h-5">
                            <img 
                                src="/search.svg" 
                                className="rounded-full w-full h-full object-cover aspect-square bg-slate-500"
                            />
                            </div>
                        <p className="font-openSansRegular text-sm title">
                            {/* {item?.slug} */}
                            {item?.authorId}
                        </p>
                    </div>
                    {/* <p className="font-openSansRegular desc">
                        {item?.description}
                    </p> */}
                </div>
                <div className="dropdown dropdown-bottom dropdown-end flex flex-row justify-center items-center pr-4">
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
                    {/* <ul tabIndex={0} className="mt-[-12px] dropdown-content rounded-xl z-[15] w-36 shadow-md font-openSansRegular pt-3 pb-3 bg-tugAni-white">
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
                                document.getElementById('my_modal_2').showModal();
                            }}
                            className="flex flex-row items-center w-full p-3 pl-5 gap-4 hover:bg-gray-200"
                        >
                            <img src="/delete.svg" alt="Delete" />
                            <span className="text-red-500 text-sm">Delete</span>
                        </button>
                    </ul> */}
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