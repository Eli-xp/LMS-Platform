import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEditorState, type Editor } from "@tiptap/react";

interface MenubarProps {
  editor: Editor | null;
}
const Menubar = ({ editor }: MenubarProps) => {
  // Allow to re-render on RTE change
  const editorState = useEditorState({
    editor,
    selector: ({ editor }: MenubarProps) => ({
      isBold: editor?.isActive("bold"),
      isItalic: editor?.isActive("italic"),
      isStrike: editor?.isActive("strike"),
      isH1: editor?.isActive("heading", { level: 1 }),
      isH2: editor?.isActive("heading", { level: 2 }),
      isH3: editor?.isActive("heading", { level: 3 }),
      isBulletList: editor?.isActive("bulletList"),
      isOrderList: editor?.isActive("orderedList"),
      isTextAlignLeft: editor?.isActive({ textAlign: "left" }),
      isTextAlignCenter: editor?.isActive({ textAlign: "center" }),
      isTextAlignRight: editor?.isActive({ textAlign: "right" }),
    }),
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-input rounded-t-lg p-2 bg-card flex flex-wrap">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                  }
                  className={cn(
                    editorState?.isBold && "bg-muted text-muted-foreground",
                  )}
                >
                  <Bold />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                  }
                  className={cn(
                    editorState?.isItalic && "bg-muted text-muted-foreground",
                  )}
                >
                  <Italic />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                  }
                  className={cn(
                    editorState?.isStrike && "bg-muted text-muted-foreground",
                  )}
                >
                  <Strikethrough />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 1 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={cn(
                    editorState?.isH1 && "bg-muted text-muted-foreground",
                  )}
                >
                  <Heading1Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 2 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={cn(
                    editorState?.isH2 && "bg-muted text-muted-foreground",
                  )}
                >
                  <Heading2Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 3 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={cn(
                    editorState?.isH3 && "bg-muted text-muted-foreground",
                  )}
                >
                  <Heading3Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={cn(
                    editorState?.isBulletList &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  <ListIcon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={cn(
                    editorState?.isOrderList &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  <ListOrdered />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={cn(
                    editorState?.isTextAlignLeft &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  <AlignLeft />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={cn(
                    editorState?.isTextAlignCenter &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  <AlignCenter />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={cn(
                    editorState?.isTextAlignRight &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  <AlignRight />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  size="sm"
                  variant={"ghost"}
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo />
                </Button>
              }
            ></TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  size="sm"
                  variant={"ghost"}
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo />
                </Button>
              }
            ></TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
