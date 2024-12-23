"use client";

import ErrorMessage from "../ErrorMessage";
import GridSkeleton from "./GridSkeleton";
import Link from "next/link";
import { useState } from "react";
import useAuthors from "@/lib/firebase/author/read";
import { useAuthorForm } from "@/app/admin/dashboard/authors/form/contexts/AuthorFormContext";

export default function AuthorsListView() {
    const [deleteId, setDeleteId] = useState(null);

    const {
        data,
        error,
        isLoading
    } = useAuthors();

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
    } = useAuthorForm();

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
        <section className="w-full gap-4 items-center grid grid-cols-[repeat(auto-fill,_500px)] auto-rows-max gap-y-8 justify-center box-border">
            {data?.map((item, key) => {
            return <div key={item?.id} className="bg-base-100 h-full flex flex-row gap-4 shadow-xl p-8 rounded-xl items-center max-[600px]:flex-col max-[600px]:w-full  max-[600px]:p-8">
                <div className="avatar w-40 h-fit self-start max-[600px]:self-center">
                    <img 
                        src={item?.photoURL} 
                        className="rounded-full w-full h-full object-cover aspect-square bg-slate-500"
                    />
                </div>
                <div className="text-tugAni-black w-full h-full">
                    <div className="flex flex-row justify-between items-center w-full">
                        <h2 className="font-openSansBold text-lg m-0">
                            {item?.name}
                        </h2>
                        {item?.id !== "news" && <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="p-2 rounded-full bg-base-100 border-none shadow-none hover:bg-gray-200">
                                <img src="/options.svg" alt="Options" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content rounded-xl z-[1] w-36 shadow-md font-openSansRegular pt-3 pb-3 bg-tugAni-white">
                                <Link href={`/admin/dashboard/authors/form?id=${item?.id}`}>
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
                            </ul>
                        </div> }
                    </div>
                    {item?.email && <p className="font-openSansRegular text-sm flex flex-row items-center gap-2">
                        <img src="/mail.svg" alt="Contact" />
                        {item?.email}
                    </p> }
                    <p className="font-openSansRegular desc mt-4">
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
            </div> })}
        </section>
    );
}