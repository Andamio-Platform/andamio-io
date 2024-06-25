import { Editor, EditorContent } from "@tiptap/react";
import { RedoIcon, UndoIcon } from "lucide-react";
import { AndamioBubbleMenu } from "~/components/Editor/components/menus/AndamioBubbleMenus";
import { Button } from "~/components/ui/button";

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
        <div className="m-5 mx-auto flex min-h-[90vh] w-11/12 flex-col bg-background pb-5 shadow-xl">
          <div className="flex flex-row gap-5 items-end justify-end mb-5 bg-gray-300 px-3 py-1">
            <Button intent="ghost" size="icon" onClick={() => editor.commands.undo()} asChild>
              <UndoIcon />
            </Button>
            <Button intent="ghost" size="icon" onClick={() => editor.commands.redo()} asChild>
              <RedoIcon />
            </Button>
          </div>
          <div className="flex w-full px-5">
            <AndamioBubbleMenu editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
