"use client";

import ErrorMessage from "@/app/components/Admin/ErrorMessage";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import SuccessMessage from "@/app/components/Admin/SuccessMessage";

export default function CategoriesForm() {
    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        image,
        setImage,
    } = useCategoryForm();

    return(
        <section className="p-8 max-[600px]:p-0 w-dvw flex flex-col items-center">
            <h1 className="font-gotham text-3xl tracking-tighter text-tugAni-red">Add a category</h1> 
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleCreate();
                }}
                className="p-8 w-5/6 max-[500px]:w-full"
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
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="w-60 font-openSansBold">
                        <label 
                            htmlFor="categorySlug"
                            className="text-tugAni-black"
                        >
                            Slug
                        </label>
                        <span className="text-red-400">*</span>
                    </div>
                    <input required
                        type="text"
                        onChange={(event) => {
                            handleData("slug", event.target.value);
                        }}
                        value={data?.slug}
                        id="categorySlug"
                        name="categorySlug"
                        placeholder="Category slug"
                        className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                    />
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
                        {image && <div className="w-full mb-2">
                            <img src={URL.createObjectURL(image)} alt="Category image" className="border border-solid border-slate-300 rounded-xl" />
                        </div>}
                        <input required
                            type="file"
                            accept="image/*"
                            onChange={event => {
                                event.preventDefault();
                                setImage(event.target.files[0]);
                            }}
                            id="categoryImage"
                            name="categoryImage"
                            placeholder="Add image background of category"
                            className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"
                        />
                    </div>
                </div>
                {error && 
                    <ErrorMessage header="An error has occured ૮(˶ㅠ︿ㅠ)ა" message={error} />
                }
                {isDone && 
                    <SuccessMessage header="Category created successfully ٩( ᐖ )人( ᐛ )و" message="Clear the current inputs to create a new one." />
                }
                {!isDone && <div className="flex justify-end mt-12">
                    <button
                        disabled={isLoading || isDone} 
                        type="submit"
                        title="Create category"
                        className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full hover:shadow-md"
                    >
                        {isLoading ? "Creating category..." : "Create category"}
                    </button>
                </div>}
            </form>
        </section>
    );
}