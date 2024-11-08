"use client";

import ErrorMessage from "@/app/components/Admin/ErrorMessage";
import SuccessMessage from "@/app/components/Admin/SuccessMessage";
import { useSearchParams } from "next/navigation";
import WarnMessage from "@/app/components/Admin/WarnMessage";
import { useEffect, useRef } from "react";
import useCategories from "@/lib/firebase/category/read";
import useAuthors from "@/lib/firebase/author/read";
import { Editor } from "@/app/components/Admin/DynamicEditor";
import TextAreaAutosize from "react-textarea-autosize";
import { CircleHelpIcon } from "lucide-react";
import { useArticleForm } from "@/app/admin/dashboard/articles/form/contexts/ArticleFormContext";
import GridSkeleton from "./GridSkeleton";

export default function ArticlesForm() {
    const searchParams = useSearchParams();
    const updateArticleId = searchParams.get("id");
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
    } = useArticleForm();

    useEffect(() => {
        if (updateArticleId) {
            fetchData(updateArticleId);
            imgInputRef.current.required = false;
        }
    }, [updateArticleId])

    if (isLoading) {
        return <GridSkeleton />;
    }

    return(
        <section className="px-8 max-[600px]:px-4 w-dvw flex flex-col items-center overflow-x-hidden">
            {/* <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red mb-8 text-center">{updateArticleId ? `Updating "${data?.title}"`: "Add an article" }</h1>  */}
            {updateArticleId &&
                <div className="p-8 pt-0 pb-0 w-5/6">
                    <WarnMessage header={`You are currently updating the article: "${data?.title}" ╰[ ⁰ ᐞ ⁰ ]╯`} />
                </div>
            }
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (updateArticleId) {
                        handleUpdate(); 
                    }
                    else {
                        console.log("data", data);
                        handleCreate();
                    }
                }}
                className="w-11/12 max-[500px]:w-full box-border"
            >
                {error &&
                    <ErrorMessage header="An error has occured ૮(˶ㅠ︿ㅠ)ა" message={error} />
                }
                {isDone && 
                    <SuccessMessage header={`Article ${updateArticleId ? "updated" : "created"} successfully ٩( ᐖ )人( ᐛ )و`} message={updateArticleId ? "Feel free to do another changes to the article" : "Clear the current inputs to create a new one."} />
                }
                {!isDone && <div className="flex justify-end my-4">
                    <button
                        disabled={isLoading || isDone} 
                        type="submit"
                        title={`${updateArticleId ? "Update" : "Create"} article`}
                        className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full hover:shadow-md"
                    >
                        {isLoading ? "Loading..." : updateArticleId ? "Update article" : "Create article"}
                    </button>
                </div>}
                <TextAreaAutosize required
                    onChange={(event) => {
                        handleData("title", event.target.value);
                    }}
                    value={data?.title}
                    id="articleTitle"
                    name="articleTitle"
                    placeholder="Untitled"
                    minRows={1}
                    className="outline-none font-gotham tracking-tighter text-5xl box-border w-full resize-none bg-tugAni-white mb-2"
                />
                <div className="flex flex-row justify-between items-center border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold flex flex-row items-center box-border">
                        <label 
                            htmlFor="articleSlug"
                            className="text-tugAni-black text-sm"
                        >
                            Slug
                        </label>
                        <span className="text-red-400 text-sm">*&nbsp;</span>
                        <div
                            className="tooltip"
                            data-tip="Slug must not have spaces. Use dashes instead."
                        >
                            <CircleHelpIcon width="16px" height="16px" className="text-gray-500" />
                        </div>
                    </div>
                    <TextAreaAutosize required
                        disabled={updateArticleId}
                        type="text"
                        onChange={(event) => {
                            handleData("slug", event.target.value);
                        }}
                        value={data?.slug}
                        id="articleSlug"
                        name="articleSlug"
                        placeholder="Article slug"
                        minRows={1}
                        className="box-border text-sm resize-none p-2 ml-[1px] outline-none font-openSansRegular w-full bg-gray-200"
                    />
                </div>
                <div className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold box-border">
                        <label 
                            htmlFor="articleCategory"
                            className="text-sm text-tugAni-black"
                        >
                            Category
                        </label>
                        <span className="text-sm text-red-400">*</span>
                    </div>
                    <div className="box-border w-full border-none">
                        <SelectCategoryField />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold box-border">
                        <label 
                            htmlFor="articleAuthor"
                            className="text-sm text-tugAni-black"
                        >
                            Author 
                        </label>
                        <span className="text-sm text-red-400">*</span>
                    </div>
                    <div className="box-border w-full border-none">
                        <SelectAuthorField />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold flex flex-row items-center box-border">
                        <label 
                            htmlFor="articleDescription"
                            className="text-sm text-tugAni-black"
                        >
                            Deck
                        </label>
                    </div>
                    <TextAreaAutosize
                        type="text"
                        onChange={(event) => {
                            handleData("description", event.target.value);
                        }}
                        value={data?.description}
                        id="articleDescription"
                        name="articleDescription"
                        placeholder="Article deck"
                        minRows={1}
                        className="text-sm resize-none p-2 outline-none ml-[1px] font-openSansRegular box-border w-full bg-gray-200"
                    />
                </div>
                <div className="flex flex-row justify-between items-center border border-solid border-slate-200 pl-2 box-border">
                    <div className="w-60 font-openSansBold flex flex-row items-center box-border">
                        <label 
                            htmlFor="articleImage"
                            className="text-sm text-tugAni-black"
                        >
                            Cover image
                        </label>
                        <span className="text-sm text-red-400">*&nbsp;</span>
                        <div
                            className="tooltip box-border"
                            data-tip="For best results, it is recommended that the image is in the 16:9 aspect ratio."
                        >
                            <CircleHelpIcon width="16px" height="16px" className="text-gray-500" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full box-border">
                        {data?.imageURL && !image && <div className="h-96 w-full mt-1">
                            <img src={data?.imageURL} alt="Article image" className="h-full border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        {image && <div className="w-full mt-1">
                            <img src={URL.createObjectURL(image)} alt="Article image" className="border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        <input required
                            type="file"
                            ref={imgInputRef}
                            accept="image/*"
                            onChange={event => {
                                event.preventDefault();
                                setImage(event.target.files[0]);
                            }}
                            id="articleImage"
                            name="articleImage"
                            placeholder="Add image banner of article."
                            className="text-sm resize-none p-2 outline-none font-openSansRegular box-border w-full bg-gray-200"
                        />
                    </div>
                </div> 
                <div className="box-border w-full pt-6 pb-20">
                    <Editor />
                </div>
            </form>
        </section>
    );
}

function SelectCategoryField() {
    const {
        data,
        handleData,
    } = useArticleForm()
    const { data: categories } = useCategories();

    return (
        <select
            value={data?.categoryId}
            onChange={event => {
                handleData("categoryId", event.target.value);
            }} 
            name="articleCategory" 
            id="articleCategory"
            className="p-2 bg-gray-200 font-openSansRegular border-solid border-r-[16px] border-r-transparent outline-none text-tugAni-black text-sm"
        >   
            <option value="News" selected className="p-2 hover:bg-tugAni-red hover:text-tugAni-white">News</option>
            {categories && categories?.filter(category => category.title !== "News").map((category) => {
                return <option 
                    key={category?.id} 
                    value={category?.title}
                    className="p-2 hover:bg-tugAni-red hover:text-tugAni-white"
                >
                    {category?.title}
                </option>
            })}
        </select>
    );
}

function SelectAuthorField() {
    const {
        data,
        handleData,
    } = useArticleForm()
    const { data: authors } = useAuthors();

    return (
        <select
            value={data?.authorId}
            onChange={event => {
                handleData("authorId", event.target.value);
            }} 
            name="articleCategory" 
            id="articleCategory"
            className="p-2 bg-gray-200 font-openSansRegular border-solid border-r-[16px] border-r-transparent outline-none text-tugAni-black text-sm"
        >   
            {authors && authors?.map((author) => {
                return <option 
                    key={author?.id} 
                    value={author?.id}
                    className="p-2 hover:bg-tugAni-red hover:text-tugAni-white"
                >
                    {author?.name}
                </option>
            })}
        </select>
    );
}