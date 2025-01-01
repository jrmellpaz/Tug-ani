import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Create a new article
export const createNewArticle = async ({ data, image }) => {
    if (!data?.title) {
        throw new Error("Title is undefined.");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined.");
    }
    else if(data?.slug.indexOf(" ") >= 0) {
        throw new Error("Slug must not contain any spaces. Instead, use a dash (-) to separate words.");
    }

    if(!data?.categoryId) {
        throw new Error("Category is undefined.")
    }

    if(!data?.authorId) {
        throw new Error("Author is undefined.")
    }

    if (!image && !data?.imageURL) {
        throw new Error("Image is not selected.");
    }

    if (!data?.content) {
        throw new Error("Content is empty.");
    }

    const id = doc(collection(db, "ids")).id;

    const imageRef = ref(storage, `articles/${id}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    const firestoreRef = doc(db, `articles/${id}`);

    await setDoc(firestoreRef, {
        ...data,
        id: id,
        imageURL: imageURL,
        publishedTimestamp: Timestamp.now(),
    });

    return id;
}

export const uploadContentImage = async (image) => {
    const id = doc(collection(db, "ids")).id;
    const imageRef = ref(storage, `contentImages/${id}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);
    return imageURL;
}

// Update an existing article
export const updateArticle = async ({ data, image }) => {
    if (!data?.title) {
        throw new Error("Title is undefined.");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined.");
    }
    else if(data?.slug.indexOf(" ") >= 0) {
        throw new Error("Slug must not contain any spaces. Instead, use a dash (-) to separate words.");
    }

    if(!data?.categoryId) {
        throw new Error("Category is undefined.")
    }

    if(!data?.authorId) {
        throw new Error("Author is undefined.")
    }

    if (!data?.content && data?.content.length === 0) {
        throw new Error("Content is empty.");
    }

    let imageURL = data?.imageURL;
    if (image) {
        const imageRef = ref(storage, `articles/${data?.id}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }

    const firestoreRef = doc(db, `articles/${data?.id}`);
    await updateDoc(firestoreRef, {
        ...data,
        imageURL: imageURL,
        editedTimestamp: Timestamp.now(),
    });
}

// Delete an article
export const deleteArticle = async (id) => {
    if (!id) {
        throw new Error("ID is required.");
    }

    await deleteDoc(doc(db, `articles/${id}`));
}