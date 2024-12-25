import { db } from "@/lib/firebase";
import { query, getDocs, collection, orderBy, Query, limit, where, doc, getDoc,} from "firebase/firestore";

export const getArticles = async (type) => {
    const ref = collection(db, "articles");
    const queryLimit = 6;
    
    let q;
    if (type) {
        q = query(ref, where("categoryId", "==", type), orderBy("publishedTimestamp", "desc"), limit(queryLimit));
    }
    else {
        q = query(ref, orderBy("publishedTimestamp", "desc"), limit(queryLimit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}

export const getArticlesByCategory = async (categoryId) => {
    const articlesRef = collection(db, "articles");
    const articlesQuery = query(
        articlesRef,
        where("categoryId", "==", categoryId),
        orderBy("publishedTimestamp", "desc"),
        limit(20)
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    const articlesList = articlesSnapshot.docs.map(doc => doc.data());
    return articlesList;
}

const getArticleCount = async (searchQuery = "") => {
    const ref = collection(db, "articles");
    let q;
    if (searchQuery) {
        q = query(ref, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
    } else {
        q = ref;
    }
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
}