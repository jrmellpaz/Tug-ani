import { db } from "@/lib/firebase";
import { query, getDocs, collection, orderBy, Query, limit } from "firebase/firestore";

export const getArticles = async (type="all") => {
    const ref = collection(db, "articles");
    const queryLimit = 5;
    
    let q;
    if (type === "all") {
        q = query(ref, orderBy("publishedTimestamp", "desc"), limit(queryLimit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}