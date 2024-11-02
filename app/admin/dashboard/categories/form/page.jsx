"use client";

import ErrorMessage from "@/app/components/Admin/ErrorMessage";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import SuccessMessage from "@/app/components/Admin/SuccessMessage";
import { useSearchParams } from "next/navigation";
import WarnMessage from "@/app/components/Admin/WarnMessage";
import { useEffect, useRef } from "react";

export default function CategoriesForm() {
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get("id");
    const imgInputRef = useRef();

    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        image,
        setImage,
        fetchData
    } = useCategoryForm();

    useEffect(() => {
        if (updateCategoryId) {
            fetchData(updateCategoryId);
            imgInputRef.current.required = false;
        }
    }, [updateCategoryId])

    return(
        <section className="p-8 max-[600px]:p-0 w-dvw flex flex-col items-center">
            <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red mb-8">{updateCategoryId ? `Updating "${updateCategoryId}"`: "Add a category" }</h1> 
            {updateCategoryId &&
                <div className="p-8 pt-0 pb-0 w-5/6">
                    <WarnMessage header={`You are currently updating the category: "${updateCategoryId}" ╰[ ⁰ ᐞ ⁰ ]╯`} />
                </div>
            }
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (updateCategoryId) {
                        handleUpdate();
                    }
                    else {
                        handleCreate();
                    }
                }}
                className="p-8 pt-0 w-5/6 max-[500px]:w-full"
            >
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="categoryTitle"
                            className="text-tugAni-black"
                        >
                            Category title
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <input required
                        type="text"
                        onChange={(event) => {
                            handleData("title", event.target.value);
                        }}
                        value={data?.title}
                        id="categoryTitle"
                        name="categoryTitle"
                        placeholder="Category title"
                        className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                    />
                </div>
                <div className="flex flex-row justify-between items-start mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="categorySlug"
                            className="text-tugAni-black"
                        >
                            Slug
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <div className="box-border w-full">
                        <span className="text-xs font-openSansItalic text-gray-500"> A slug serves as a unique identifier for the category. It must not contain any spaces. Use a dash (-) instead to separate words.</span>
                        <input required
                            type="text"
                            onChange={(event) => {
                                handleData("slug", event.target.value);
                            }}
                            value={data?.slug}
                            id="categorySlug"
                            name="categorySlug"
                            placeholder="Category slug"
                            className="mt-2 rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-start mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="categoryDescription"
                            className="text-tugAni-black"
                        >
                            Description
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <textarea required
                        type="text"
                        onChange={(event) => {
                            handleData("description", event.target.value);
                        }}
                        value={data?.description}
                        id="categoryDescription"
                        name="categoryDescription"
                        placeholder="Give a short description"
                        rows="5"
                        className="rounded-xl p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white resize-none"
                    ></textarea>
                </div>
                <div className="flex flex-row justify-between items-start mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="categoryImage"
                            className="text-tugAni-black"
                        >
                            Image
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <div className="flex flex-col w-full">
                        <span className="text-xs font-openSansItalic text-gray-500">For best results, it is recommended that the image is in the 16:9 aspect ratio.</span>
                        {data?.iconURL && !image && <div className="w-full mt-2">
                            <img src={data?.iconURL} alt="Category image" className="border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        {image && <div className="w-full mt-2">
                            <img src={URL.createObjectURL(image)} alt="Category image" className="border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        <input required
                            type="file"
                            ref={imgInputRef}
                            accept="image/*"
                            onChange={event => {
                                event.preventDefault();
                                setImage(event.target.files[0]);
                            }}
                            id="categoryImage"
                            name="categoryImage"
                            placeholder="Add image background of category"
                            className="mt-2 rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                        />
                    </div>
                </div>
                {error &&
                    <ErrorMessage header="An error has occured ૮(˶ㅠ︿ㅠ)ა" message={error} />
                }
                {isDone && 
                    <SuccessMessage header={`Category ${updateCategoryId ? "updated" : "created"} successfully ٩( ᐖ )人( ᐛ )و`} message="Clear the current inputs to create a new one." />
                }
                {!isDone && <div className="flex justify-end mt-12">
                    <button
                        disabled={isLoading || isDone} 
                        type="submit"
                        title={`${updateCategoryId ? "Update" : "Create"} category`}
                        className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full hover:shadow-md"
                    >
                        {isLoading ? "Loading..." : updateCategoryId ? "Update category" : "Create category"}
                    </button>
                </div>}
            </form>
        </section>
    );
}