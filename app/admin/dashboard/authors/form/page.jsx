"use client";

import ErrorMessage from "@/app/components/Admin/ErrorMessage";
import SuccessMessage from "@/app/components/Admin/SuccessMessage";
import { useSearchParams } from "next/navigation";
import WarnMessage from "@/app/components/Admin/WarnMessage";
import { useEffect, useRef } from "react";
import { useAuthorForm } from "./contexts/AuthorFormContext";

export default function AuthorsForm() {
    const searchParams = useSearchParams();
    const updateAuthorId = searchParams.get("id");
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
    } = useAuthorForm();

    useEffect(() => {
        if (updateAuthorId) {
            fetchData(updateAuthorId);
            imgInputRef.current.required = false;
        }
    }, [updateAuthorId])

    return(
        <section className="p-8 max-[600px]:p-0 w-dvw flex flex-col items-center">
            <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red mb-8 text-center">{updateAuthorId ? `Updating Author ID: "${updateAuthorId}"`: "Add an author" }</h1> 
            {updateAuthorId &&
                <div className="p-8 pt-0 pb-0 w-5/6">
                    <WarnMessage header={`You are currently updating the author with ID: "${updateAuthorId}" ╰[ ⁰ ᐞ ⁰ ]╯`} />
                </div>
            }
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    if (updateAuthorId) {
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
                            htmlFor="authorName"
                            className="text-tugAni-black"
                        >
                            Author name
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <input required
                        type="text"
                        onChange={(event) => {
                            handleData("name", event.target.value);
                        }}
                        value={data?.name}
                        id="authorName"
                        name="authorName"
                        placeholder="Author name"
                        className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                    />
                </div>
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="authorEmail"
                            className="text-tugAni-black"
                        >
                            Email
                        </label>
                        <span className="text-gray-500 font-openSansItalic">&nbsp;(Optional)</span>
                    </div>
                    <input
                        type="email"
                        onChange={(event) => {
                            handleData("email", event.target.value);
                        }}
                        value={data?.email}
                        id="authorEmail"
                        name="authorEmail"
                        placeholder="Author email"
                        className="mt-2 rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                    />
                </div>
                <div className="flex flex-row justify-between items-start mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="authorDescription"
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
                        id="authorDescription"
                        name="authorDescription"
                        placeholder="Give a short description"
                        rows="5"
                        className="rounded-xl p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white resize-none"
                    ></textarea>
                </div>
                <div className="flex flex-row justify-between items-start mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="authorImage"
                            className="text-tugAni-black"
                        >
                            Image
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <div className="flex flex-col w-full">
                        <span className="text-xs font-openSansItalic text-gray-500">For best results, it is recommended that the profile image is in the square (1:1) aspect ratio.</span>
                        {data?.iconURL && !image && <div className="w-full mt-2">
                            <img src={data?.iconURL} alt="Author image" className="border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        {image && <div className="w-full mt-2">
                            <img src={URL.createObjectURL(image)} alt="Author image" className="border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        <input required
                            type="file"
                            ref={imgInputRef}
                            accept="image/*"
                            onChange={event => {
                                event.preventDefault();
                                setImage(event.target.files[0]);
                            }}
                            id="authorImage"
                            name="authorImage"
                            placeholder="Add profile image of author"
                            className="mt-2 rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                        />
                    </div>
                </div>
                {error &&
                    <ErrorMessage header="An error has occured ૮(˶ㅠ︿ㅠ)ა" message={error} />
                }
                {isDone && 
                    <SuccessMessage header={`Author ${updateAuthorId ? "updated" : "created"} successfully ٩( ᐖ )人( ᐛ )و`} message="Clear the current inputs to create a new one." />
                }
                {!isDone && <div className="flex justify-end mt-12">
                    <button
                        disabled={isLoading || isDone} 
                        type="submit"
                        title={`${updateAuthorId ? "Update" : "Create"} author`}
                        className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full hover:shadow-md"
                    >
                        {isLoading ? "Loading..." : updateAuthorId ? "Update author" : "Create author"}
                    </button>
                </div>}
            </form>
        </section>
    );
}