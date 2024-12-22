"use client";

import { db } from '@/lib/firebase';
import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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

export default function useArticles(searchQuery = "") {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const ref = collection(db, "articles");
    const ITEMS_PER_PAGE = 20;

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const count = await getArticleCount(searchQuery);
                setTotalCount(count);
            }
            catch (error) {
                console.error("Failed to fetch article count:", error);
            }
        };

        fetchCount();
        // Reset states when searchQuery changes
        setData([]);
        setLastVisible(null);
        setHasMore(true);
        fetchArticles();
    }, [searchQuery]);

    useEffect(() => {
        console.log("Data length:", data.length);
        console.log("Total count:", totalCount);
    }, [data, totalCount]);

    const fetchArticles = async (nextPage = false) => {
        setLoading(true);

        try {
            let q;
            if (nextPage && lastVisible) {
                q = query(ref, orderBy("publishedTimestamp"), startAfter(lastVisible), limit(ITEMS_PER_PAGE));
            } else {
                q = query(ref, orderBy("publishedTimestamp"), limit(ITEMS_PER_PAGE));
            }

            if (searchQuery) {
                q = query(ref, orderBy("publishedTimestamp"), where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"), limit(ITEMS_PER_PAGE));  
            }

            const snapshot = await getDocs(q);
            const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setData((prevData) => nextPage ? [...prevData, ...articles] : articles);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return {
        data,
        error,
        isLoading: loading,
        totalCount,
        hasMore,
        fetchArticles,
    }
}

export const getArticle = async (id) => {
    return await getDoc(doc(db, `articles/${id}`));
}