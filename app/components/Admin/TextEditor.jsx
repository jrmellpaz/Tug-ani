"use client";

import { cn } from '@/lib/utils';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor} from '@tiptap/react';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, HighlighterIcon, ImageIcon, ItalicIcon, LinkIcon, PilcrowIcon, StrikethroughIcon, SubscriptIcon, SuperscriptIcon, UnderlineIcon } from 'lucide-react';
import '@/styles.scss'
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
// import { uploadContentImage } from '@/lib/firebase/article/write';
import { useCallback } from 'react';
import Link from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';

export default function TextEditor() {
    const extensions = [
        StarterKit,
        Underline.configure({ HTMLAttributes: { class: "editor-link" } }),
        Heading.configure({ levels: [1, 2, 3] }),
        Document,
        Paragraph,
        Text,
        Placeholder.configure({placeholder: "Write here..."}),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Dropcursor,
        Image,
        Link.configure({ defaultProtocol: "https", HTMLAttributes: { class: "editor-link" }, }),
        Typography,
        Highlight.configure({ HTMLAttributes: {class: "editor-highlight"} }),
        Superscript,
        Subscript,
    ];
    const editor = useEditor({
        extensions,
    })

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent 
                editor={editor}
                className="box-border my-8 mx-auto w-[700px] max-[700px]:w-dvw max-[732px]:px-8 text-tugAni-black bg-red-400"
            />
        </>
    );
}

function MenuBar({ editor }) {
    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL');
    
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
    
        // cancelled
        if (url === null) {
            return
        }
    
        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor]);

    return (
        <>
        <div className="flex mt-40 bg-base-100 rounded-badge px-6 py-2 shadow-lg sticky top-20 z-10 max-w-fit mx-auto">
        <div className="flex flex-row overflow-x-auto w-fit">
            <div className="flex flex-row gap-1 border border-transparent border-r-gray-200 px-2">
                <button
                    title="Heading 1"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("heading", { level: 1 }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <Heading1Icon height="16px" width="16px" />
                </button>
                <button
                    title="Heading 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("heading", { level: 2 }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <Heading2Icon height="16px" width="16px" />
                </button>
                <button
                    title="Heading 3"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("heading", { level: 3 }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <Heading3Icon height="16px" width="16px" />
                </button>
                <button
                    title="Paragraph"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("paragraph") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <PilcrowIcon height="16px" width="16px" />
                </button>
            </div>
            <div className="flex flex-row gap-1 border border-transparent border-r-gray-200 px-2">
                <button
                    title="Bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("bold") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <BoldIcon height="16px" width="16px" />
                </button>
                <button
                    title="Italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("italic") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <ItalicIcon height="16px" width="16px" />
                </button>
                <button
                    title="Underline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("underline") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <UnderlineIcon height="16px" width="16px" />
                </button>
                <button
                    title="Strikethrough"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("strike") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <StrikethroughIcon height="16px" width="16px" />
                </button>
                <button
                    title="Subscript"
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("subscript") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <SubscriptIcon height="16px" width="16px" />
                </button>
                <button
                    title="Superscript"
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("superscript") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <SuperscriptIcon height="16px" width="16px" />
                </button>
                <button
                    title="Link"
                    onClick={setLink}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("link") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <LinkIcon height="16px" width="16px" />
                </button>
                <button
                    title="Highlight"
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive("highlight") ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <HighlighterIcon height="16px" width="16px" />
                </button>
            </div>
            <div className="flex flex-row gap-1 border border-transparent border-r-gray-200 px-2">
                <button
                    title="Align left"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive({ textAlign: "left" }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <AlignLeftIcon height="16px" width="16px" />
                </button>
                <button
                    title="Align center"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive({ textAlign: "center" }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <AlignCenterIcon height="16px" width="16px" />
                </button>
                <button
                    title="Align right"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive({ textAlign: "right" }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <AlignRightIcon height="16px" width="16px" />
                </button>
                <button
                    title="Justify"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={cn(
                        "flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200", editor.isActive({ textAlign: "justify" }) ? "bg-tugAni-red text-tugAni-white hover:bg-tugAni-red" : ""
                    )}
                >
                    <AlignJustifyIcon height="16px" width="16px" />
                </button>
            </div>
            <div className="flex flex-row gap-1 border border-transparent px-2">
                <button
                    title="Insert image"
                    onClick={addImage}
                    className="flex gap-2 items-center justify-center p-2 rounded-btn hover:bg-gray-200 active:bg-tugAni-red active:text-tugAni-white"
                >
                    <ImageIcon height="16px" width="16px" />
                </button>
            </div>
        </div>
        </div>
        {/* <dialog>
            <form>
                <input type="file" />
            </form>
        </dialog> */}
        </>
    );
}