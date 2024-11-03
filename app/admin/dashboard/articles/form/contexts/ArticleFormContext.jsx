"use client";

import { getArticle } from "@/lib/firebase/article/read";
import { createNewArticle, deleteArticle, updateArticle } from "@/lib/firebase/article/write";
import { createContext, useContext, useState } from"react";

const ArticleFormContext = createContext();

export default function ArticleFormContextProvider({ children }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setIsDone(false);
        
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);

        try {
            await createNewArticle({data: data, image: image});
            setIsDone(true);
        }
        catch (error) {
            setError(error?.message);
        }

        setIsLoading(false);
    };

    const handleUpdate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);

        try {
            await updateArticle({data: data, image: image});
            setIsDone(true);
        }
        catch (error) {
            setError(error?.message);
        }

        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);

        try {
            // if(id === "news") {
            //     throw new Error("News category cannot be erased.");
            // }
            
            await deleteArticle(id);
            setIsDone(true);
        }
        catch (error) {
            setError(error?.message);
        }

        setIsLoading(false);
    };

    const fetchData = async (id) => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);

        try {
            const res = await getArticle(id);

            if (res.exists()) {
                setData(res.data());
            }
            else {
                throw new Error(`No article with id ${id} exists (?_?)`);
            }
        }
        catch (error) {
            setError(error?.message);
        }

        setIsLoading(false);
    }

    return (
        <ArticleFormContext.Provider
            value={{
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
            }}
        >
            {children}
        </ArticleFormContext.Provider>
    );
}

export const useArticleForm = () => useContext(ArticleFormContext);