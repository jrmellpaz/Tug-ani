"use client";

import useArticles from "@/lib/firebase/article/read";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Edit2Icon, Search, TrashIcon } from "lucide-react";
import useCategories from "@/lib/firebase/category/read";
import useAuthors from "@/lib/firebase/author/read";

export default function ArticlesListView() {
    const [inputSearchValue, setInputSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data,
        error,
        isLoading,
        totalCount,
        hasMore,
        fetchArticles,
    } = useArticles(searchQuery);
    const { data: categories } = useCategories();
    const { data: authors } = useAuthors();

    const observer = useRef();
    const lastArticleElementRef = useRef();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchArticles(true);
            }
        });

        if (lastArticleElementRef.current) {
            observer.current.observe(lastArticleElementRef.current);
        }
    }, [isLoading, hasMore]);

    useEffect(() => {
        fetchArticles();
    }, [searchQuery]);

    if (isLoading && data.length === 0) {
        return <span className="loading loading-spinner loading-lg text-tugAni-red mt-20 block mx-auto"></span>
    }
    if (error) {
        return <ErrorMessage header="Something went wrong (ó﹏ò｡)" message={error} />
    }
    if (!data || data.length === 0) {
        return <ErrorMessage header="No data found (ó﹏ò｡)" message="Refresh to return." />
    }

    return (
        <section className="w-full flex flex-col items-center gap-4 mb-12">
            <div
                className="w-full flex justify-start items-center"
            >
                <div
                    className="w-full flex md:w-[440px]"
                >
                    <input
                        type="text"
                        placeholder="Search title..."
                        value={inputSearchValue}
                        onChange={(e) => setInputSearchValue(e.target.value)}
                        className="w-full font-openSansRegular text-tugAni-black p-3 pl-4 rounded-l-badge shadow border focus-visible:border-tugAni-red outline-none"
                    />
                    <button
                        onClick={() => setSearchQuery(inputSearchValue)}
                        className="py-2 pl-4 pr-5  flex items-center justify-center bg-base-200 hover:bg-base-300 rounded-r-badge shadow active:bg-gray-300"
                    >
                        <Search className="text-tugAni-black" />
                    </button>
                </div>
            </div>
            {data?.map((item, index) => {
                if (data.length === index + 1) {
                    return <div key={item?.id} className="w-full flex flex-row rounded-box card-side bg-base-100 shadow h-36">
                        <figure className="hidden md:block transition-all">
                            <img
                                src={item?.imageURL}
                                alt={item?.slug}
                                className="object-cover aspect-video h-full"
                            />
                        </figure>
                        <div className="flex flex-row justify-between w-full">
                            <div className="pl-4 flex flex-col text-tugAni-black grow pt-3m w-[80%] justify-center">
                                <div className="w-full overflow-hidden">
                                    <Link href={`/admin/dashboard/articles/form?id=${item?.id}`}>
                                        <h2 className="font-gotham text-xl title tracking-tighter m-0 p-0 hover:text-tugAni-red hover:underline hover:underline-offset-3 hover:decoration-3 cursor-pointer">
                                            {item?.title}
                                        </h2>
                                    </Link>
                                </div>
                                <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
                                    {`Published on ${String(new Date(item.publishedTimestamp.seconds * 1000)).replace(/^\w+\s(.*)\sGMT\+\d+\s\(.+\)$/, '$1 PHT')}`}
                                    {item.editedTimestamp && ` • Updated on ${String(new Date(item.editedTimestamp.seconds * 1000)).replace(/^\w+\s(.*)\sGMT\+\d+\s\(.+\)$/, '$1 PHT')}`}
                                </span>
                                <div className="flex flex-row gap-2 items-center shrink text-ellipsis whitespace-nowrap overflow-hidden">
                                    {item?.categoryId && categories && <span className="text-base-100 text-xs bg-tugAni-red rounded-badge px-2 py-1 whitespace-nowrap">
                                        {categories.find(category => category.id === item?.categoryId).title} 
                                    </span>}
                                    {item?. subcategory && <span className="text-tugAni-red text-xs border border-tugAni-red bg-base-100 rounded-badge px-2 py-1 whitespace-nowrap">
                                        {item?.subcategory} 
                                    </span>}
                                </div>
                                <div className="flex flex-row gap-4 items-center mt-3 overflow-clip text-clip w-full">
                                    {(item?.authorId).map(authorId => {
                                        return <div key={authorId} className="flex flex-row gap-2 items-center">
                                            <div className="avatar w-6 h-6 shrink-0">
                                                <img 
                                                    src={authors && authors.find(author => author.id === authorId)?.photoURL}
                                                    className="rounded-full w-full h-full object-cover aspect-square"
                                                />
                                            </div>
                                            <p className="font-openSansBold text-sm whitespace-nowrap">
                                                {authorId && authors && authors.find(author => author.id === authorId)?.name}
                                            </p>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-row justify-center items-center pr-4 shrink-0">
                                <Link href={`/admin/dashboard/articles/form?id=${item?.id}`}>
                                    <button title="Edit article" tabIndex={0} role="button" className="p-3 rounded-full bg-base-100 border-none shadow-none hover:bg-gray-200">
                                        <Edit2Icon alt="Options" width="18px" height="18px" className="text-tugAni-black" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
                else {
                    return <div 
                        ref={lastArticleElementRef} 
                        key={item?.id} 
                        className="w-full flex flex-row rounded-box card-side bg-base-100 shadow h-36"
                    >
                        <figure className="hidden md:block transition-all">
                            <img
                                src={item?.imageURL}
                                alt={item?.slug}
                                className="object-cover aspect-video h-full"
                            />
                        </figure>
                        <div className="flex flex-row justify-between w-full">
                            <div className="pl-4 flex flex-col text-tugAni-black grow pt-3m w-[80%] justify-center">
                                <div className="w-full overflow-hidden">
                                    <Link href={`/admin/dashboard/articles/form?id=${item?.id}`}>
                                        <h2 className="font-gotham text-xl title tracking-tighter m-0 p-0 hover:text-tugAni-red hover:underline hover:underline-offset-3 hover:decoration-3 cursor-pointer">
                                            {item?.title}
                                        </h2>
                                    </Link>
                                </div>
                                <span className="font-openSansRegular text-xs my-1 text-gray-500 title">
                                    {`Published on ${String(new Date(item.publishedTimestamp.seconds * 1000)).replace(/^\w+\s(.*)\sGMT\+\d+\s\(.+\)$/, '$1 PHT')}`}
                                    {item.editedTimestamp && ` • Updated on ${String(new Date(item.editedTimestamp.seconds * 1000)).replace(/^\w+\s(.*)\sGMT\+\d+\s\(.+\)$/, '$1 PHT')}`}
                                </span>
                                <div className="flex flex-row gap-2 items-center shrink text-ellipsis whitespace-nowrap overflow-hidden">
                                    {item?.categoryId && categories && <span className="text-base-100 text-xs bg-tugAni-red rounded-badge px-2 py-1 whitespace-nowrap">
                                        {categories.find(category => category.id === item?.categoryId).title} 
                                    </span>}
                                    {item?.subcategory && <span className="text-tugAni-red text-xs border border-tugAni-red bg-base-100 rounded-badge px-2 py-1 whitespace-nowrap">
                                        {item?.subcategory} 
                                    </span>}
                                </div>
                                <div className="flex flex-row gap-4 items-center mt-3 overflow-clip text-clip w-full">
                                    {(item?.authorId).map(authorId => {
                                        return <div key={authorId} className="flex flex-row gap-2 items-center">
                                            <div className="avatar w-6 h-6 shrink-0">
                                                <img 
                                                    src={authors && authors.find(author => author.id === authorId)?.photoURL}
                                                    className="rounded-full w-full h-full object-cover aspect-square"
                                                />
                                            </div>
                                            <p className="font-openSansBold text-sm whitespace-nowrap">
                                                {authorId && authors && authors.find(author => author.id === authorId)?.name}
                                            </p>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-row justify-center items-center pr-4 shrink-0">
                                <Link href={`/admin/dashboard/articles/form?id=${item?.id}`}>
                                    <button title="Edit article" tabIndex={0} role="button" className="p-3 rounded-full bg-base-100 border-none shadow-none hover:bg-gray-200">
                                        <Edit2Icon alt="Options" width="18px" height="18px" className="text-tugAni-black" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                } 
            })}
            {isLoading && <span className="loading loading-spinner loading-md text-tugAni-red mt-4"></span>}
        </section>
    );
}