"use client";

import ErrorMessage from "@/app/components/Admin/ErrorMessage";
import { useArticleForm } from "./contexts/ArticleFormContext";
import SuccessMessage from "@/app/components/Admin/SuccessMessage";
import { useSearchParams } from "next/navigation";
import WarnMessage from "@/app/components/Admin/WarnMessage";
import { useEffect, useRef } from "react";
import useCategories from "@/lib/firebase/category/read";
import useAuthors from "@/lib/firebase/author/read";
import TextEditor from "@/app/components/Admin/TextEditor";

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

    return(
        <TextEditor />
        // <section className="p-8 max-[600px]:p-0 w-dvw flex flex-col items-center">
        //     <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red mb-8 text-center">{updateArticleId ? `Updating "${data?.title}"`: "Add an article" }</h1> 
        //     {updateArticleId &&
        //         <div className="p-8 pt-0 pb-0 w-5/6">
        //             <WarnMessage header={`You are currently updating the article: "${data?.title}" ╰[ ⁰ ᐞ ⁰ ]╯`} />
        //         </div>
        //     }
        //     <form
        //         onSubmit={(event) => {
        //             event.preventDefault();

        //             if (updateArticleId) {
        //                 handleUpdate(); 
        //             }
        //             else {
        //                 handleCreate();
        //             }
        //         }}
        //         className="p-8 pt-0 w-5/6 max-[500px]:w-full"
        //     >
        //         <div className="flex flex-row justify-between items-center mb-4">
        //             <div className="w-60 font-openSansBold">
        //                 <label 
        //                     htmlFor="articleTitle"
        //                     className="text-tugAni-black"
        //                 >
        //                     Article title
        //                 </label>
        //                 <span className="text-red-400">*</span>
        //             </div>
        //             <input required
        //                 type="text"
        //                 onChange={(event) => {
        //                     handleData("title", event.target.value);
        //                 }}
        //                 value={data?.title}
        //                 id="articleTitle"
        //                 name="articleTitle"
        //                 placeholder="Article title"
        //                 className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
        //             />
        //         </div>
        //         <div className="flex flex-row justify-between items-start mb-4">
        //             <div className="w-60 font-openSansBold">
        //                 <label 
        //                     htmlFor="articleSlug"
        //                     className="text-tugAni-black"
        //                 >
        //                     Slug
        //                 </label>
        //                 <span className="text-red-400">*</span>
        //             </div>
        //             <div className="box-border w-full">
        //                 <span className="text-xs font-openSansItalic text-gray-500"> A slug serves as a unique identifier for the article. It must not contain any spaces. Use a dash (-) instead to separate words.</span>
        //                 <input required
        //                     disabled={updateArticleId}
        //                     type="text"
        //                     onChange={(event) => {
        //                         handleData("slug", event.target.value);
        //                     }}
        //                     value={data?.slug}
        //                     id="articleSlug"
        //                     name="articleSlug"
        //                     placeholder="Article slug"
        //                     className="mt-2 rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
        //                 />
        //             </div>
        //         </div>
        //         <div className="flex flex-row justify-between items-center mb-4">
        //             <div className="w-60 font-openSansBold">
        //                 <label 
        //                     htmlFor="articleCategory"
        //                     className="text-tugAni-black"
        //                 >
        //                     Category
        //                 </label>
        //                 <span className="text-red-400">*</span>
        //             </div>
        //             <div className="box-border w-full border-none">
        //                 <SelectCategoryField />
        //             </div>
        //         </div>
        //         <div className="flex flex-row justify-between items-center mb-4">
        //             <div className="w-60 font-openSansBold">
        //                 <label 
        //                     htmlFor="articleAuthor"
        //                     className="text-tugAni-black"
        //                 >
        //                     Author 
        //                 </label>
        //                 <span className="text-red-400">*</span>
        //             </div>
        //             <div className="box-border w-full border-none">
        //                 <SelectAuthorField />
        //             </div>
        //         </div>
        //         <div className="flex flex-row justify-between items-start mb-4">
        //             <div className="w-60 font-openSansBold">
        //                 <label 
        //                     htmlFor="articleDescription"
        //                     className="text-tugAni-black"
        //                 >
        //                     Description
        //                 </label>
        //                 <span className="text-red-400">*</span>
        //             </div>
        //             <textarea required
        //                 type="text"
        //                 onChange={(event) => {
        //                     handleData("description", event.target.value);
        //                 }}
        //                 value={data?.description}
        //                 id="articleDescription"
        //                 name="articleDescription"
        //                 placeholder="Give a short description"
        //                 rows="5"
        //                 className="rounded-xl p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white resize-none"
        //             ></textarea>
        //         </div>
        //         <div className="flex flex-row justify-between items-start mb-4">
        //             <div className="w-60 font-openSansBold">
        //                 <label 
        //                     htmlFor="articleImage"
        //                     className="text-tugAni-black"
        //                 >
        //                     Image
        //                 </label>
        //                 <span className="text-red-400">*</span>
        //             </div>
        //             <div className="flex flex-col w-full">
        //                 <span className="text-xs font-openSansItalic text-gray-500">For best results, it is recommended that the image is in the 16:9 aspect ratio.</span>
        //                 {data?.iconURL && !image && <div className="w-full mt-2">
        //                     <img src={data?.iconURL} alt="Article image" className="border border-solid border-slate-300 rounded-xl" />
        //                 </div>}
        //                 {image && <div className="w-full mt-2">
        //                     <img src={URL.createObjectURL(image)} alt="Article image" className="border border-solid border-slate-300 rounded-xl" />
        //                 </div>}
        //                 <input required
        //                     type="file"
        //                     ref={imgInputRef}
        //                     accept="image/*"
        //                     onChange={event => {
        //                         event.preventDefault();
        //                         setImage(event.target.files[0]);
        //                     }}
        //                     id="articleImage"
        //                     name="articleImage"
        //                     placeholder="Add image background of article."
        //                     className="mt-2 rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
        //                 />
        //             </div>
        //         </div>
        //         {error &&
        //             <ErrorMessage header="An error has occured ૮(˶ㅠ︿ㅠ)ა" message={error} />
        //         }
        //         {isDone && 
        //             <SuccessMessage header={`Article ${updateArticleId ? "updated" : "created"} successfully ٩( ᐖ )人( ᐛ )و`} message={updateArticleId ? "Feel free to do another changes to the article" : "Clear the current inputs to create a new one."} />
        //         }
        //         {!isDone && <div className="flex justify-end mt-12">
        //             <button
        //                 disabled={isLoading || isDone} 
        //                 type="submit"
        //                 title={`${updateArticleId ? "Update" : "Create"} article`}
        //                 className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full hover:shadow-md"
        //             >
        //                 {isLoading ? "Loading..." : updateArticleId ? "Update article" : "Create article"}
        //             </button>
        //         </div>}
        //     </form>
        // </section>
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
            className="outline-none p-2 pl-4 pr-4 bg-tugAni-white font-openSansRegular border-solid outline-1 outline outline-slate-300 border-r-[16px] border-r-transparent focus:outline-tugAni-red focus rounded-badge text-tugAni-black"
        >   
            <option value="News">News</option>
            {categories && categories?.filter(category => category.title !== "News").map((category) => {
                return <option 
                    key={category?.id} 
                    value={category?.title}
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
            className="outline-none p-2 pl-4 pr-4 bg-tugAni-white font-openSansRegular border-solid outline-1 outline outline-slate-300 border-r-[16px] border-r-transparent focus:outline-tugAni-red focus rounded-badge text-tugAni-black"
        >   
            {authors && authors?.map((author) => {
                return <option 
                    key={author?.id} 
                    value={author?.name}
                >
                    {author?.name}
                </option>
            })}
        </select>
    );
}