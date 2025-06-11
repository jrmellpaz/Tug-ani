"use client";

import { db } from '@/lib/firebase';
import { collection, getCountFromServer, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const getArticleCount = async (categoryId) => {
    const ref = collection(db, "articles");
    const q = query(ref, where("categoryId", "==", categoryId));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
}

export default function useCategoryArticles(categoryId) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const ref = collection(db, "articles");
    const ITEMS_PER_PAGE = 15;

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const count = await getArticleCount(categoryId);
                setTotalCount(count);
            }
            catch (error) {
                console.error("Failed to fetch article count:", error);
            }
        };

        fetchCount();
        setData([]);
        setLastVisible(null);
        setHasMore(true);
        fetchArticles();
    }, [categoryId]);

    const fetchArticles = async (nextPage = false) => {
        setLoading(true);

        try {
            let q;
            if (nextPage && lastVisible) {
                q = query(
                    ref,
                    where("categoryId", "==", categoryId),
                    orderBy("publishedTimestamp", "desc"),
                    startAfter(lastVisible),
                    limit(ITEMS_PER_PAGE)
                );
            } else {
                q = query(
                    ref,
                    where("categoryId", "==", categoryId),
                    orderBy("publishedTimestamp", "desc"),
                    limit(ITEMS_PER_PAGE)
                );
            }

            const snapshot = await getDocs(q);
            const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setData((prevData) => nextPage ? [...prevData, ...articles] : articles);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(articles.length < ITEMS_PER_PAGE? false : true);
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