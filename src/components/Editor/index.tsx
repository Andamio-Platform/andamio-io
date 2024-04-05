import { useEditor, EditorContent, Content } from "@tiptap/react";
import { ExtensionKit } from "./extension-kit";
import { useRef } from "react";
import { TextMenu } from "./components/menus";

export default class Editor {
  editor;
  menuContainerRef = useRef(null);

  constructor({
    editable = true,
    initialContent = "Write your content here. Try pressing / on a new line!",
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
            "prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full bg-background text-foreground prose-headings:text-foreground",
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

  isFocused() {
    if (this.editor) return this.editor.isFocused.valueOf();
  }

  render() {
    if (this.editor) {
      return (
        <div className="flex w-full mx-auto h-full flex-col overflow-hidden bg-background text-foreground">
          <EditorContent editor={this.editor} />
          {/* <LinkMenu editor={this.editor} appendTo={this.menuContainerRef} /> */}
          {/* <TextMenu editor={this.editor} /> */}
        </div>
      );
    }
  }
}
