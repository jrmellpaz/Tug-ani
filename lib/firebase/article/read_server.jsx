import { db } from "@/lib/firebase";
import { query, getDocs, collection, orderBy, Query, limit, doc, getDoc, where } from "firebase/firestore";
// import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

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


export const getAllArticles = async () => {
    return await getDocs(collection(db, 'articles')).then((snaps) => snaps.docs.map((d) => d.data()))
}

export const getAllArticlesWithCategory = async (categoryId) => {
    const q = query(collection(db, 'articles'), where('categoryId', '==', categoryId))
    return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()))
}


export const getArticle = async (id) => {
    console.log("getArticle called with id:", id);
    return await getDoc(doc(db, `articles/${id}`)).then((snap) => snap.data());
}