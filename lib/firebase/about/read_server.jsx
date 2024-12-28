import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getAbout = async () => {
    const res = await getDoc(doc(db, "about/aboutInfo"));
    return res.data();
}