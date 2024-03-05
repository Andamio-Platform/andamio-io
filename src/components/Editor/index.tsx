import { useEditor, EditorContent } from "@tiptap/react";
import { ExtensionKit } from "./extension-kit";

export default function Editor() {
  const editable = true;

  const editor = useEditor({
    extensions: [...ExtensionKit()],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    editable: editable,
  });

  function save() {
    if (editor) {
      const json = editor.getJSON();
      console.log("json", json);
      const html = editor.getHTML();
      console.log("html", html);
    }
  }

  function load() {
    if (editor) {
      editor.commands.setContent({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Hello World 123! 🌎️",
              },
            ],
          },
        ],
      });
    }
  }

  return (
    <>
      <EditorContent editor={editor} />

      <button onClick={save}>Save</button>
      <button onClick={load}>Load</button>
    </>
  );
}
