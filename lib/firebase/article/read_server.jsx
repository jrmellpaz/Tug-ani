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
        limit(9)
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    return articlesSnapshot.docs.map(doc => doc.data());
}

export const getArticlesByAuthor = async (authorId) => {
    const articlesRef = collection(db, "articles");
    const articlesQuery = query(
        articlesRef,
        where("authorId", "array-contains", authorId),
        orderBy("publishedTimestamp", "desc")
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    return articlesSnapshot.docs.map(doc => doc.data());
}

export const getArticle = async (id) => {
    const res =  await getDoc(doc(db, `articles/${id}`));
    return res.data();
}

export const getArticlesBySubcategory = async (id) => {
    const articlesRef = collection(db, "articles");
    const articlesQuery = query(
        articlesRef,
        where("subcategory", "==", id),
        orderBy("publishedTimestamp", "desc"),
        limit(9)
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    return articlesSnapshot.docs.map(doc => doc.data());
}