import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const updateAbout = async ({ data, banner, newProfiles }) => {
    const aboutDocRef = doc(db, "about", "aboutInfo");
    const aboutDoc = await getDoc(aboutDocRef);

    if (!aboutDoc.exists()) {
        throw new Error("About document does not exist.");
    }

    const existingData = aboutDoc.data();

    if (!data?.intro) {
        throw new Error("Introduction is undefined.");
    }

    if (!data?.introText) {
        throw new Error("Introduction text is undefined.");
    }

    if (!data?.boardTitle) {
        throw new Error("Board title is undefined.");
    }

    if (!data?.boardTitleText) {
        throw new Error("Board text is undefined.");
    }

    if (!newProfiles?.length && !existingData?.profiles?.length) {
        throw new Error("Profile images are not selected.");
    }

    let bannerUrl = existingData.bannerURL;
    if (banner) {
        try {
            if (existingData?.bannerURL.length > 0) {
                const existingBannerRef = ref(storage, existingData.bannerURL);
                await deleteObject(existingBannerRef);
            }
            const bannerRef = ref(storage, `banners/banner`);
            const bannerSnapshot = await uploadBytes(bannerRef, banner);
            bannerUrl = await getDownloadURL(bannerRef);
        }
        catch (error) {
            throw new Error("Failed to upload banner image.", error.message);
        }
    }

    if (newProfiles?.length) {
        for (const profile of newProfiles) {
            if (profile.image) {
                const profileRef = ref(storage, `profiles/${Date.now()}.png`);
                const metadata = { contentType: 'image/png' };
                await uploadBytes(profileRef, profile.image, metadata);
                const profileUrl = await getDownloadURL(profileRef);
                profile.imageURL = profileUrl;
                delete profile.image;
            }
        }
    }

    const aboutData = {
        ...data,
        bannerURL: bannerUrl,
        profiles: newProfiles,
    };

    await setDoc(aboutDocRef, aboutData, { merge: true });
};