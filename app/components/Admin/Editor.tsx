"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, lightDefaultTheme, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { uploadContentImage } from "@/lib/firebase/article/write";
import { useArticleForm } from "@/app/admin/dashboard/articles/form/contexts/ArticleFormContext";
import { useEffect, useMemo, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

async function handleUploadFile(file: File) {
    const imageURL = await uploadContentImage(file);
    return imageURL;
}

export default function Editor() {
    const { data, handleData, isLoading } = useArticleForm();
    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | "loading">("loading");

    useEffect(() => {
        const content = data?.content ? (JSON.parse(data?.content) as PartialBlock[]) : undefined;
        setInitialContent(content);
    }, []);

    const editor = useMemo(() => {
        if (initialContent === "loading") {
            return undefined
        }
        return BlockNoteEditor.create({ 
            initialContent, 
            uploadFile: handleUploadFile
        })
    }, [initialContent]);

    const customTheme = {
        ...lightDefaultTheme,
        colors: {
            ...lightDefaultTheme.colors,
            editor: {
                text: "#171413",
                background: "#f2f0ee"
            }
        },
        fontFamily: "openSansRegular",
    } satisfies Theme;

    const theme = {
        light: customTheme,
        dark: customTheme,
    }

    if (editor === undefined) {
        return "Loading content...";
    }

    return <BlockNoteView 
        editor={editor}
        theme={theme}
        onChange={() => handleData("content", JSON.stringify(editor.document))}
    />; 
}