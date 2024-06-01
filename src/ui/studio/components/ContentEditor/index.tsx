import { Editor, EditorContent } from "@tiptap/react";
import { AndamioBubbleMenu } from "~/components/Editor/components/menus/AndamioBubbleMenus";

export default function ContentEditor({ editor }: { editor: Editor }) {
  const handleClick = () => {
    if (editor) {
      editor.chain().focus().run();
    }
  };

  return (
    <div
      className="mx-2 h-[calc(100vh-84px)] w-full overflow-y-auto border"
      onClick={handleClick}
    >
      <div className="mx-auto my-4">
        <div className="m-5 mx-auto flex min-h-[90vh] w-11/12 bg-background p-5 shadow-xl">
          <AndamioBubbleMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
