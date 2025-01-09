"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, lightDefaultTheme, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";


export default function ReadOnlyEditor({ content }: { content: string }) {
    const [parsedContent, setParsedContent] = useState<PartialBlock[] | undefined | "loading">("loading");

    useEffect(() => {
        const initialContent = content ? (JSON.parse(content) as PartialBlock[]) : undefined;
        setParsedContent(initialContent);
    }, [content]);

    const editor = useMemo(() => {
        if (parsedContent === "loading" || !parsedContent) {
            return undefined; 
        }
        return BlockNoteEditor.create({
            initialContent: parsedContent,
        });
    }, [parsedContent]);

    const customTheme = {
        ...lightDefaultTheme,
        colors: {
            ...lightDefaultTheme.colors,
            editor: {
                text: "#171413",
                background: "#f2f0ee",
            },
        },
        fontFamily: "openSansRegular",
    } satisfies Theme;

    const theme = {
        light: customTheme,
        dark: customTheme,
    };

    if (editor === undefined) {
        return <div>Loading content...</div>;
    }

    return (
        <BlockNoteView
            editor={editor}
            theme={theme}
            editable={false}
        />
    );
}
