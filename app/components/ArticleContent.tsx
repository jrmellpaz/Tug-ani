"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
 
export default function ArticleContent({ content }) {
  // Stores the editor's contents as HTML.
  const [html, setHTML] = useState<string>("");
 
  // Creates a new editor instance with some initial content.
  const editor = useCreateBlockNote(content);
 
  const onChange = async () => {
    // Converts the editor's contents from Block objects to HTML and store to state.
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHTML(html);
  };
 
  useEffect(() => {
    // on mount, trigger initial conversion of the initial content to html
    onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  // Renders the editor instance, and its contents as HTML below.
  return (
    <div className="wrapper">
      <div>Output (HTML):</div>
      <div className="item bordered">
        <pre>
          <code>{html}</code>
        </pre>
      </div>
    </div>
  );
}
 