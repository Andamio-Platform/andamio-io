import { useEditor, EditorContent, Content } from "@tiptap/react";
import { useEffect } from "react";
import { ExtensionKit } from "../../extension-kit";

interface EditorProps {
  editable?: boolean;
  initialContent?: Content;
}

export default function RenderEditor({
  editable = true,
  initialContent = "This content is not yet available.",
}: EditorProps) {
  const editor = useEditor({
    extensions: [...ExtensionKit()],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full bg-background text-foreground prose-headings:text-foreground",
      },
    },
    editable: editable,
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div className="mx-auto flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <EditorContent editor={editor} />
    </div>
  );
}
