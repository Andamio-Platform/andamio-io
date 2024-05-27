import { Editor, EditorContent } from "@tiptap/react";
import { AndamioBubbleMenu } from "~/components/Editor/components/menus/AndamioBubbleMenu";

export default function ContentEditor({ editor }: { editor: Editor }) {


  return (
    <div
      className="mx-2 h-[calc(100vh-84px)] w-full overflow-y-auto border"

    >
      <div className="mx-auto my-4">
        <div className="m-5 flex min-h-[90vh] w-full bg-background p-5 shadow-xl">
          <AndamioBubbleMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
