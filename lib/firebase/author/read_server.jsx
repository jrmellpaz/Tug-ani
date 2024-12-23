import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getAuthors = async (id) => {
    const result = await getDoc(doc(db, `authors/${id}`));
    return result.data();
}