import { useEditor, EditorContent, Content } from "@tiptap/react";
import { ExtensionKit } from "./extension-kit";
import { useRef } from "react";
import { TextMenu } from "./components/menus";

export default class Editor {
  editor;
  menuContainerRef = useRef(null);

  constructor({
    editable = true,
    initialContent = "<p>start typing...</p>",
  }: {
    editable?: boolean;
    initialContent?: Content;
  }) {
    this.editor = useEditor({
      extensions: [...ExtensionKit()],
      content: initialContent,
      editorProps: {
        attributes: {
          class:
            // "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
            "prose prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
        },
      },
      editable: editable,
    });
  }

  getJSON() {
    if (this.editor) return this.editor.getJSON();
  }

  setContent(content: Content) {
    if (this.editor) this.editor.commands.setContent(content);
  }

  render() {
    if (this.editor) {
      return (
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <EditorContent editor={this.editor} />
          {/* <LinkMenu editor={this.editor} appendTo={this.menuContainerRef} /> */}
          {/* <TextMenu editor={this.editor} /> */}
        </div>
      );
    }
  }
}
