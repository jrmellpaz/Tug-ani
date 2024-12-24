import { db } from "@/lib/firebase";
import { query, getDocs, collection, orderBy, Query, limit, where, doc, getDoc,} from "firebase/firestore";

export const getArticles = async (type="all") => {
    const ref = collection(db, "articles");
    const queryLimit = 6;
    
    let q;
    if (type === "all") {
        q = query(ref, orderBy("publishedTimestamp", "desc"), limit(queryLimit));
    }
    else {
        q = query(ref, where("categoryId", "==", type), orderBy("publishedTimestamp", "desc"), limit(queryLimit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}

export const getArticle = async (id) => {
    console.log("getArticle called with id:", id);
    return await getDoc(doc(db, `articles/${id}`)).then((snap) => snap.data());
}