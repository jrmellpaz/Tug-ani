"use client";

import { useState, useEffect } from "react";
import ErrorMessage from "@/app/components/ErrorMessage";
import SuccessMessage from "@/app/components/SuccessMessage";
import { Plus, Trash2, UserCircle2Icon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useAboutForm } from "./AboutContext";

export default function AdminAbout() {
    const [message, setMessage] = useState("");
    const { fetchData, isLoading } = useAboutForm();

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateSuccess = (message = "Update successful!") => {
        setMessage(message);
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loading text-tugAni-red loading-lg" />
            </div>
        );
    }

    return (
        <>
            <main className="w-full py-8 px-4 md:px-20 box-border flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-bebas text-4xl text-tugAni-red">
                        About us
                    </h1>
                    {!isLoading && <SaveButton onSuccess={handleUpdateSuccess} />}
                    
                </div>
                {message && <SuccessMessage message={message} />}
                <StatusMessages />
                <section className="shadow p-8 rounded-box bg-base-100">
                    <Banner />
                </section>
                <section className="shadow p-8 rounded-box bg-base-100">
                    <TextInput 
                        title="intro"
                        sectionTitle="Introduction" 
                        placeholder="Enter organization description"
                    />
                </section>
                <section className="shadow p-8 rounded-box bg-base-100">
                    <TextInput
                        title="boardTitle"
                        sectionTitle="Profile Gallery Introduction"
                        placeholder="Enter editorial board description"
                    />
                </section>
                <section className="shadow p-8 rounded-box bg-base-100">
                    <ProfileGallery />
                </section>
            </main>
        </>
    );
}

function StatusMessages() {
    const { error } = useAboutForm();

    return (
        error && <ErrorMessage message={error.message} />
    );
}

function TextInput({ title, placeholder, sectionTitle }) {
    const { data, handleData } = useAboutForm();

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="font-bebas text-2xl mb-4">
                {sectionTitle}
            </h1>
            <input
                required
                onChange={(e) => handleData(title, e.target.value)}
                value={data[title]}
                type="text"
                className="w-full p-2 bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 border-0 border-b-2 focus-visible:border-b-tugAni-red outline-none font-gotham text-3xl"
            />
            <TextAreaAutosize
                required
                onChange={(e) => handleData(`${title}Text`, e.target.value)}
                value={data[`${title}Text`]}
                placeholder={placeholder}
                minRows={3}
                className="w-full p-2 bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 border-0 border-b-2 focus-visible:border-b-tugAni-red outline-none font-openSansRegular text-sm resize-none"
            />
            <span className="text-gray-500 text-xs w-fit font-openSansRegular">
                Use "\n" to render new lines
            </span>
        </div>
    );
}

function Banner() {
    const { banner, setBanner, data } = useAboutForm();
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (banner) {
            setPreview(URL.createObjectURL(banner));
        } else if (data.bannerURL) {
            setPreview(data.bannerURL);
        } else {
            setPreview(null);
        }
    }, [banner, data.bannerURL]);

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setBanner(file);
        } else {
            alert("Please select a valid image file.");
        }
    };

    return (
        <div className="banner-upload flex flex-col">
            <label className="font-bebas text-2xl mb-4">Banner</label>
            <input
                type="file"
                accept="image/*"
                className="w-full p-2 border-2 rounded-full font-openSansRegular"
                onChange={handleBannerChange}
            />
            {preview && <img 
                src={preview} 
                alt="Banner Preview" 
                className="aspect-video object-cover rounded-box mt-4 max-w-[800px] w-full h-auto self-center" 
            />}
        </div>
    );
}

function ProfileGallery() {
    const { profiles, setProfiles, data } = useAboutForm();

    useEffect(() => {
        if (!profiles.length) {
            setProfiles(data.profiles || []);
        }
    }, [data]);

    const handleAddProfile = () => {
        setProfiles([...profiles, { id: Date.now(), name: "", description: "", image: null, imageURL: null }]);
    };

    const handleProfileChange = (index, key, value) => {
        const updatedProfiles = profiles.map((profile, i) =>
            i === index ? { ...profile, [key]: value, } : profile
        );
        setProfiles(updatedProfiles);
    };

    const handleProfileImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            handleProfileChange(index, "image", file);
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleDeleteProfile = (id) => {
        setProfiles(profiles.filter((profile) => profile.id !== id));
    };

    return (
        <div className="profile-gallery">
            <h2 className="font-bebas text-2xl mb-4">
                Profile Gallery
            </h2>
            {profiles.map((profile, index) => (
                <div key={index} className="profile-item flex flex-col gap-4 mb-4 border-2 p-8 md:p-12 rounded-box">
                    <h2 className="font-openSansBold text-lg mb-4 flex gap-2 items-center">
                        <UserCircle2Icon size={28} />
                        {`Profile ${index + 1}`}
                    </h2>
                    <input
                        required
                        value={profile.name}
                        onChange={(e) => handleProfileChange(index, "name", e.target.value)}
                        type="text"
                        placeholder="Enter profile name"
                        className="w-full p-2 bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 border-0 border-b-2 focus-visible:border-b-tugAni-red outline-none font-gotham text-3xl tracking-tighter"
                    />
                    <input
                        required
                        value={profile.role}
                        onChange={(e) => handleProfileChange(index, "role", e.target.value)}
                        type="text"
                        placeholder="Enter position/role"
                        className="w-full p-2 bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 border-0 border-b-2 focus-visible:border-b-tugAni-red outline-none font-openSansRegular text-sm"
                    />
                    <TextAreaAutosize
                        required
                        value={profile.description}
                        onChange={(e) => handleProfileChange(index, "description", e.target.value)}
                        placeholder="Enter profile description"
                        minRows={2}
                        className="w-full p-2 bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 border-0 border-b-2 focus-visible:border-b-tugAni-red outline-none font-openSansRegular text-sm resize-none"
                    />
                    <div className="profile-image-upload flex flex-col">
                        <label className="font-openSansRegular text-gray-500">Upload profile photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full p-2 border-2 rounded-full font-openSansRegular"
                            onChange={(e) => handleProfileImageChange(index, e)}
                        />
                        {profile.image ? (
                            <img 
                                src={URL.createObjectURL(profile.image)} 
                                alt="Profile Preview" 
                                className="mt-4 aspect-square object-cover max-w-[200px] w-full h-auto rounded-full self-center" 
                            />
                        ) : (
                            profile.imageURL && <img 
                                src={profile.imageURL} 
                                alt="Profile Image" 
                                className="mt-4 aspect-square object-cover max-w-[200px] w-full h-auto rounded-full self-center"  
                            />
                        )}
                    </div>
                    <button
                        className="btn bg-red-100 hover:bg-red-200 flex items-center gap-2 text-red-600 mt-8"
                        onClick={() => handleDeleteProfile(profile.id)}
                    >
                        <Trash2 size={16} />
                        Delete Profile
                    </button>
                </div>
            ))}
            <button 
                className="btn flex items-center gap-2 bg-tugAni-red hover:bg-[#4e0d20] font-openSansRegular text-tugAni-white" 
                onClick={handleAddProfile}
            >
                <Plus size={24} />
                Add Profile
            </button>
        </div>
    );
}

function SaveButton({ onSuccess }) {
    const { handleUpdate } = useAboutForm();

    const handleClick = async () => {
        try {
            console.log("here22")
            await handleUpdate();
        } catch (error) {
            onSuccess(error?.message);
        }
    };

    return (
        <button 
        onClick={handleClick}
            className="btn w-fit bg-tugAni-red hover:bg-[#4e0d20] font-openSansRegular text-tugAni-white rounded-badge" 
        >
            Save changes
        </button>
    );
}