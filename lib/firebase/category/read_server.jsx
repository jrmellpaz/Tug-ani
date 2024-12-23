import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCategory = async (id) => {
    const result = await getDoc(doc(db, `categories/${id}`));
    return result.data();
}