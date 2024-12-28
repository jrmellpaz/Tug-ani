"use client";

import { createContext, useContext, useState } from "react";
import { updateAbout } from "@/lib/firebase/about/write";
import { getAbout } from "@/lib/firebase/about/read";

const AboutFormContext = createContext();

export default function AboutFormContextProvider({ children }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [banner, setBanner] = useState(null);
    const [profiles, setProfiles] = useState([]);

    const handleData = (key, value) => {
        setIsDone(false);
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleUpdate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);

        try {
            console.log("😭😭😭", profiles)
            await updateAbout({ data, banner, newProfiles: profiles });
            setIsDone(true);
        } catch (error) {
            setError(error?.message);
        }

        setIsLoading(false);
    };

    const handleDeleteProfile = (index) => {
        setProfiles(profiles.filter((_, i) => i !== index));
    };

    const fetchData = async () => {
        setError(null);
        setIsLoading(true);

        try {
            const about = await getAbout();
            setData(about);
            setIsLoading(false);
        } catch (error) {
            setError(error?.message);
            setIsLoading(false);
        }
    };

    return (
        <AboutFormContext.Provider
            value={{
                data,
                isLoading,
                error,
                isDone,
                banner,
                profiles,
                setProfiles,
                handleData,
                handleUpdate,
                handleDeleteProfile,
                fetchData,
                setBanner,
            }}
        >
            {children}
        </AboutFormContext.Provider>
    );
}

export const useAboutForm = () => useContext(AboutFormContext);