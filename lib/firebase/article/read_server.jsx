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

export const getArticlesByAuthor = async (authorId) => {
    const articlesRef = collection(db, "articles");
    const articlesQuery = query(
        articlesRef,
        where("authorId", "array-contains", authorId),
        orderBy("publishedTimestamp", "desc")
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    const articlesList = articlesSnapshot.docs.map(doc => doc.data());
    return articlesList;
}

export const getArticle = async (id) => {
    const res =  await getDoc(doc(db, `articles/${id}`));
    return res.data();
}