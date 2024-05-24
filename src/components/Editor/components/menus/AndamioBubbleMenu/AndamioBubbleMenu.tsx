import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "~/components/ui/button";

export function AndamioBubbleMenu({ editor }: { editor: Editor }) {
  if (!!editor) {
    return (
      <>
        <BubbleMenu editor={editor} className="flex flex-row gap-1">
          <Button
            size="sm"
            intent="default"
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            bold
          </Button>
          <Button
            size="sm"
            intent="default"
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            italic
          </Button>
          <Button
            size="sm"
            intent="default"
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            strike
          </Button>
        </BubbleMenu>
      </>
    );
  }
}
