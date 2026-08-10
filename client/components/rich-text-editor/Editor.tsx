"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Menubar from "./Menubar";
import { FieldLabel } from "../ui/field";

const RichTextEditor = ({ field,filedLabel }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,

    // Style EditorContent
    editorProps: {
      attributes: {
        id: "description",
        class:
          "min-h-75 p-4 focus:outline-none prose sm:prose-sm md:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },

    // validation - connect to react-hook-form
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    // check field value(in case of course edit)
    content: field.value ? JSON.parse(field.value) : "Hello World🚀",
  });

  return (
    <>
      <FieldLabel onClick={() => editor?.commands.focus()}>
        {filedLabel}<span className="text-destructive">*</span>
      </FieldLabel>
      <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
        <Menubar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default RichTextEditor;
