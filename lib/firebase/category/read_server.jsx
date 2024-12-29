import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

export const getCategories = async () => {
    const categoriesRef = collection(db, "categories");
    const categoriesQuery = query(categoriesRef, orderBy("order"));
    const categoriesSnapshot = await getDocs(categoriesQuery);
    return categoriesSnapshot.docs.map(doc => doc.data());
}

export const getCategory = async (id) => {
    const result = await getDoc(doc(db, `categories/${id}`));
    return result.data();
}