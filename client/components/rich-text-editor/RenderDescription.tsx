"use client";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import parse from "html-react-parser";

const RenderDescription = ({ json }: { json: string }) => {
  // Parse backend string to js object
  const content: JSONContent = JSON.parse(json);
  console.log(content);

  // useMemo - cache the results
  const output = useMemo(() => {
    // convert to html to display
    return generateHTML(content, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [content]);

  console.log(output);

  return (
    <div className="prose prose-invert prose-li:marker:text-primary">
      {parse(output)}
    </div>
  );
};

export default RenderDescription;
