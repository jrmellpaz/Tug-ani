"use client";

import { getAuthor } from "@/lib/firebase/author/read";
import { createNewAuthor, deleteAuthor, updateAuthor } from "@/lib/firebase/author/write";
import { createContext, useContext, useState } from"react";

const AuthorFormContext = createContext();

export default function AuthorFormContextProvider({ children }) {
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
            await createNewAuthor({data: data, image: image});
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
            await updateAuthor({data: data, image: image});
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
            if(id === "news") {
                throw new Error("News category cannot be erased.");
            }
            
            await deleteAuthor(id);
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
            const res = await getAuthor(id);

            if (res.exists()) {
                setData(res.data());
            }
            else {
                throw new Error(`No category with id ${id} exists (?_?)`);
            }
        }
        catch (error) {
            setError(error?.message);
        }

        setIsLoading(false);
    }

    return (
        <AuthorFormContext.Provider
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
        </AuthorFormContext.Provider>
    );
}

export const useAuthorForm = () => useContext(AuthorFormContext);