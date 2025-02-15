"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import SuccessMessage from "@/app/components/SuccessMessage";
import {useRouter, useSearchParams} from "next/navigation";
import WarnMessage from "@/app/components/WarnMessage";
import {useEffect, useRef, useState} from "react";
import useCategories from "@/lib/firebase/category/read";
import useAuthors from "@/lib/firebase/author/read";
import { Editor } from "@/app/components/Admin/DynamicEditor";
import TextAreaAutosize from "react-textarea-autosize";
import { CircleHelpIcon, Ellipsis, LucideTrash2 } from "lucide-react";
import { useArticleForm } from "@/app/admin/dashboard/articles/form/contexts/ArticleFormContext";
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';

export default function ArticlesForm() {
    const searchParams = useSearchParams();
    const updateArticleId = searchParams.get("id");

    const [deleteId, setDeleteId] = useState(null);
    const router = useRouter();
    const deleteDialogRef = useRef(null);

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
        fetchData(updateArticleId);
    }, []);

    const handleGenerateSlug = () => {
        const generatedSlug = data.title
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        handleData("slug", generatedSlug);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        deleteDialogRef.current.showModal();
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteId);
        router.push("/admin/dashboard/articles");
    };

    const handleCancelDelete = () => {
        deleteDialogRef.current.close();
    }

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg text-tugAni-red mt-20 block mx-auto"></span>
    }
    
    return(
        <section className="px-8 max-[600px]:px-4 w-dvw flex flex-col items-center overflow-x-hidden">
            {/* <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red mb-8 text-center">{updateArticleId ? `Updating "${data?.title}"`: "Add an article" }</h1>  */}
            {updateArticleId &&
                <div className="p-8 pt-0 pb-0 w-5/6">
                    <WarnMessage header={`You are currently updating the article: "${data?.title}" ╰[ ⁰ ᐞ ⁰ ]╯`}/>
                </div>
            }
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (updateArticleId) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className="w-11/12 max-[500px]:w-full box-border"
            >
                {error &&
                    <ErrorMessage header="An error has occured ૮(˶ㅠ︿ㅠ)ა" message={error}/>
                }
                {isDone &&
                    <SuccessMessage
                        header={`Article ${updateArticleId ? "updated" : "published"} successfully ٩( ᐖ )人( ᐛ )و`}
                        message={updateArticleId ? "Feel free to do another changes to the article" : "Clear the current inputs to create a new article."}/>
                }
                {!isDone && <div className="flex justify-end items-center gap-2 my-4">
                    {updateArticleId && <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button"
                             className="p-2 rounded-full bg-tugAni-white border-none shadow-none hover:bg-gray-200">
                            <Ellipsis size={20} strokeWidth={3} />
                        </div>
                        <ul tabIndex={0}
                            className="dropdown-content rounded-xl z-[1] w-36 shadow-md font-openSansRegular pt-3 pb-3 bg-tugAni-white">
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleDeleteClick(updateArticleId);
                                }}
                                className="flex flex-row items-center w-full p-3 pl-5 gap-4 hover:bg-gray-200"
                            >
                                <LucideTrash2 size={24} className="text-red-500" />
                                <span className="text-red-500 text-sm">Delete</span>
                            </button>
                        </ul>
                    </div>}

                    <button
                        disabled={isLoading || isDone}
                        type="submit"
                        title={`${updateArticleId ? "Update" : "Publish"} article`}
                        className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full hover:shadow-md"
                    >
                        {isLoading ? "Loading..." : updateArticleId ? "Update article" : "Publish article"}
                    </button>
                </div>}
                <TextAreaAutosize required autoFocus
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
                <div
                    className="flex flex-row justify-between items-center border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold flex flex-row items-center box-border">
                        <label
                            htmlFor="articleSlug"
                            className="text-tugAni-black text-sm"
                        >
                            Slug
                        </label>
                        <span className="text-red-400 text-sm">*&nbsp;</span>
                        <div
                            className="tooltip tooltip-right"
                            data-tip="Slug must not have spaces. Use dashes instead."
                        >
                            <CircleHelpIcon width="16px" height="16px" className="text-gray-500"/>
                        </div>
                    </div>
                    <div className="flex box-border w-full bg-gray-200 items-center">
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
                        <button
                            type="button"
                            title="Generate from title"
                            onClick={handleGenerateSlug}
                            disabled={!data?.title}
                            className="bg-tugAni-red disabled:bg-gray-400 text-tugAni-white font-openSansRegular text-sm pointer px-[0.75em] py-[0.25em] mr-2 h-fit rounded-badge pointer"
                        >
                            Generate
                        </button>
                    </div>
                </div>
                <div
                    className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
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
                        <SelectCategoryField/>
                    </div>
                </div>
                <div
                    className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold box-border">
                        <label
                            htmlFor="articleSubcategory"
                            className="text-sm text-tugAni-black"
                        >
                            Subcategory
                        </label>
                    </div>
                    <div className="box-border w-full border-none">
                        <SelectSubcategoryField/>
                    </div>
                </div>
                <div
                    className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
                    <div className="w-60 font-openSansBold box-border">
                        <label
                            htmlFor="articleAuthor"
                            className="text-sm text-tugAni-black"
                        >
                            Author
                        </label>
                        <span className="text-sm text-red-400">*</span>
                    </div>
                    <div className="box-border w-full border-none bg-gray-200">
                        <SelectAuthorField/>
                    </div>
                </div>
                <div
                    className="flex flex-row justify-between items-center  border border-solid border-slate-200 border-b-0 pl-2 box-border">
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
                <div
                    className="flex flex-row justify-between items-center border border-solid border-slate-200 pl-2 box-border">
                    <div className="w-60 font-openSansBold flex flex-row items-center box-border">
                        <label
                            htmlFor="articleImage"
                            className="text-sm text-tugAni-black"
                        >
                            Cover image
                        </label>
                        <span className="text-sm text-red-400">*&nbsp;</span>
                        <div
                            className="tooltip tooltip-right box-border"
                            data-tip="For best results, it is recommended that the image is in the 16:9 aspect ratio."
                        >
                            <CircleHelpIcon width="16px" height="16px" className="text-gray-500"/>
                        </div>
                    </div>
                    <div className="flex flex-col w-full box-border">
                        {data?.imageURL && !image && <div className="h-full md:h-96 w-full mt-1">
                            <img src={data?.imageURL} alt="Article image"
                                 className="w-full h-auto md:h-full md:w-auto border border-solid border-slate-300 rounded-xl"/>
                        </div>}
                        {image && <div className="w-full mt-1">
                            <img src={URL.createObjectURL(image)} alt="Article image"
                                 className="w-full h-auto md:h-full md:w-auto border border-solid border-slate-300 rounded-xl"/>
                        </div>}
                        <input
                            type="file"
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
                    <Editor/>
                </div>
            </form>
            <dialog ref={deleteDialogRef} className="modal">
                <div className="modal-box box-border overflow-hidden">
                    <ErrorMessage header="This action can't be undone"/>
                    <p className="pl-4 m-8 ml-10 font-openSansRegular text-tugAni-black">Do you wish to proceed?</p>
                    <form method="dialog" className="flex flex-row justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleCancelDelete}
                            className="text-tugAni-red font-openSansBold text-sm p-3 pl-6 pr-6 hover:bg-red-100 rounded-badge"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirmDelete}
                            className="bg-tugAni-red text-tugAni-white font-openSansBold text-sm p-3 pl-6 pr-6 rounded-badge"
                        >
                            Proceed
                        </button>
                    </form>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleCancelDelete}>close</button>
                </form>
            </dialog>
        </section>
    );
}

function SelectCategoryField() {
    const {
        data,
        handleData,
    } = useArticleForm();

    const {data: categories} = useCategories();

    return (
        <select
            required
            value={data?.categoryId}
            defaultValue="disabled"
            onChange={event => {
                handleData("categoryId", event.target.value === "disabled" ? "" : event.target.value);
            }}
            name="articleCategory"
            id="articleCategory"
            className="p-2 bg-gray-200 font-openSansRegular border-solid border-r-[16px] border-r-transparent outline-none text-tugAni-black text-sm"
        >
            <option value="disabled" disabled className="text-gray-500 p-2">Choose a category</option>
            {categories && categories?.sort((a, b) => a.order - b.order).map((category) => {
                return <option
                    key={category?.id}
                    value={category?.id}
                    className="p-2 hover:bg-tugAni-red hover:text-tugAni-white"
                >
                    {category?.title}
                </option>
            })}
        </select>
    );
}

function SelectSubcategoryField() {
    const {
        data,
        handleData,
    } = useArticleForm();

    const {data: categories} = useCategories();

    return (
        <select
            required
            value={data?.subcategory}
            onChange={event => {
                handleData("subcategory", event.target.value === "disabled" ? "" : event.target.value);
            }}
            name="articleSubcategory"
            id="articleSubcategory"
            className="p-2 bg-gray-200 font-openSansRegular border-solid border-r-[16px] border-r-transparent outline-none text-tugAni-black text-sm"
        >
            <option value="disabled" disabled selected className="text-gray-500 p-2">Choose a subcategory</option>
            {data?.categoryId && categories && (categories.find(category => category.id === data?.categoryId).subcategories).filter(subcategory => subcategory !== "").map((subcategory) => {
                return <option
                    key={subcategory}
                    value={subcategory}
                    className="p-2 hover:bg-tugAni-red hover:text-tugAni-white"
                >
                    {subcategory}
                </option>
            })
            }
        </select>
    );
}

function SelectAuthorField() {
    const {
        data,
        handleData,
    } = useArticleForm();

    const { data: authors } = useAuthors();

    if (!authors) {
        return <div className="skeleton "></div>
    }

    return (
        <mdui-select 
            multiple
            required="true" 
            class="example-multiple"
            placeholder="Select author(s)"
            value={data?.authorId ? data?.authorId.map(id => {
                const author = authors.find(author => {
                    author.id === id
                });
                return author ? author.name : id;
            }) : []}
            onChange={event => {
                handleData("authorId", event.target.value);
            }}
        >
            {authors && authors?.map((author) => {
                return <mdui-menu-item 
                    key={author?.id} 
                    value={author?.id}
                    className="hover:bg-gray-300"
                >
                    <div className="flex flex-row gap-2">
                        <img
                            src={author?.photoURL}
                            className="rounded-full w-6 h-6 object-cover aspect-square"
                        />
                        <span>
                            {author?.name}
                        </span>
                    </div>
                </mdui-menu-item>
            })}
        </mdui-select>
    );
}