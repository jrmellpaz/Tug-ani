import { db, storage } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Create new category
export const createNewCategory = async ({ data, image }) => {
    const whiteSpace = new RegExp("/^\s+$/");

    if (!data?.title) {
        throw new Error("Title is undefined.");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined.");
    }
    else if(data?.slug.indexOf(" ") >= 0) {
        throw new Error("Slug must not contain any spaces. Instead, use a dash (-) to separate words.");
    }

    if (!data?.description) {
        throw new Error("Description is undefined.");
    }

    if (!image && !data?.iconURL) {
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

// Update existing category
export const updateCategory = async ({ data, image }) => {
    const whiteSpace = new RegExp("/^\s+$/");

    if (!data?.title) {
        throw new Error("Title is undefined.");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined.");
    }
    else if(data?.slug.indexOf(" ") >= 0) {
        throw new Error("Slug must not contain any spaces. Instead, use a dash (-) to separate words.");
    }

    if (!data?.description) {
        throw new Error("Description is undefined.");
    }

    let imageURL = data?.iconURL;
    if (image) {
        const imageRef = ref(storage, `categories/${data?.slug}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }

    const firestoreRef = doc(db, `categories/${data?.id}`);
    await updateDoc(firestoreRef, {
        ...data,
        iconURL: imageURL,
        timestamp: Timestamp.now(),
    });
}

// Delete a category
export const deleteCategory = async (id) => {
    if (!id) {
        throw new Error("ID is required.");
    }

    await deleteDoc(doc(db, `categories/${id}`));
}