import { db, storage } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Create new category
export const createNewCategory = async ({ data, image }) => {
    console.log(data);
    if (!data?.title) {
        throw new Error("Title is undefined.");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined.");
    }
    if (!data?.description) {
        throw new Error("Description is undefined.");
    }
    if (!image) {
        throw new Error("Image is not selected.");
    }

    const imageRef = ref(storage, `categories/${data?.slug}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    const firestoreRef = doc(db, `categories/${data?.slug}`);
    await setDoc(firestoreRef, {
        ...data,
        id: data?.slug,
        iconURL: imageURL,
        timestamp: Timestamp.now(),
    });
}