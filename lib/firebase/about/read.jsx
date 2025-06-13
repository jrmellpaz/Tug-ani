import { db } from "@/lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";

export const getAbout = async () => {
    const aboutDocRef = doc(db, "about", "aboutInfo");
    const aboutDoc = await getDoc(aboutDocRef);

    if (!aboutDoc.exists()) {
        throw new Error("About document does not exist.");
    }

    return aboutDoc.data();
};