import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Create new author
export const createNewAuthor = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined.");
    }

    if (!data?.description) {
        throw new Error("Description is undefined.");
    }

    if (!image && !data?.photoURL) {
        throw new Error("Image is not selected.");
    }

    const id = doc(collection(db, "ids")).id;

    const imageRef = ref(storage, `authors/${id}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    const firestoreRef = doc(db, `authors/${id}`);
    await setDoc(firestoreRef, {
        ...data,
        id: id,
        photoURL: imageURL,
        timestamp: Timestamp.now(),
    });
}

// Update existing author
export const updateAuthor = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined.");
    }

    if (!data?.description) {
        throw new Error("Description is undefined.");
    }

    let imageURL = data?.photoURL;
    if (image) {
        const imageRef = ref(storage, `authors/${data?.id}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }

    const firestoreRef = doc(db, `authors/${data?.id}`);
    await updateDoc(firestoreRef, {
        ...data,
        photoURL: imageURL,
        timestamp: Timestamp.now(),
    });
}

// Delete an author
export const deleteAuthor = async (id) => {
    if (!id) {
        throw new Error("ID is required.");
    }

    await deleteDoc(doc(db, `authors/${id}`));
}