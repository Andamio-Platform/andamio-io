// import { Editor, EditorInstance } from "novel";
// import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";

export default function ContentEditor({
  contentJson,
  setContentJson,
  setcontentHtml,
}: {
  contentJson: {} | null;
  setContentJson: (v: {}) => void;
  setcontentHtml: (v: string) => void;
}) {
  // const [content, setContent] = useState(null);

  return (
    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-3 sm:px-0">
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
        {/* <Editor
          className="h-full"
          extensions={[
            Placeholder.configure({
              placeholder: ({ node }) => {
                if (node.type.name === "heading") {
                  return `Heading ${node.attrs.level}`;
                }
                return "Press '/' for commands";
              },
              includeChildren: true,
            }),
          ]}
          debounceDuration={1000}
          defaultValue={contentJson || ""}
          onDebouncedUpdate={(value) => {
            if (value) {
              setContentJson(value.getJSON());
              setcontentHtml(value.getHTML());
            }
          }}
          disableLocalStorage
        /> */}

        <New
          contentJson={contentJson}
          setContentJson={setContentJson}
          setcontentHtml={setcontentHtml}
        />
      </dd>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  defaultEditorProps,
  EditorRoot,
  EditorBubble,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  Editor,
  type JSONContent,
} from "novel";
import { ImageResizer } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { Separator } from "../../../../components/ui/separator";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

const defaultEditorContent = { type: "doc", content: [] };
const extensions = [...defaultExtensions, slashCommand];

function New({
  contentJson,
  setContentJson,
  setcontentHtml,
}: {
  contentJson: {} | null;
  setContentJson: (v: {}) => void;
  setcontentHtml: (v: string) => void;
}) {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null,
  );
  // const [saveStatus, setSaveStatus] = useState("Saved");

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    // console.log("saving json", json);
    setContentJson(json);

    const html = editor.getHTML();
    // console.log("saving html", html);
    setcontentHtml(html);

    // setSaveStatus("Saved");
  }, 500);

  useEffect(() => {
    if (contentJson) setInitialContent(contentJson);
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      {/* <div className="bg-accent text-muted-foreground absolute right-5 top-5 z-10 mb-5 rounded-lg px-2 py-1 text-sm">
        {saveStatus}
      </div> */}
      <EditorRoot>
        <EditorContent
          initialContent={contentJson!}
          extensions={extensions}
          className=""
          editorProps={{
            ...defaultEditorProps,
            attributes: {
              class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }) => {
            void debouncedUpdates(editor);
            // setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="border-muted z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border bg-foreground px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="text-muted-foreground px-2">
              No results
            </EditorCommandEmpty>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => {
                  item.command && item.command(val);
                }}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-gray-100 aria-selected:bg-gray-100 `}
                key={item.title}
              >
                <div className="border-muted bg-background flex h-10 w-10 items-center justify-center rounded-md border">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommand>

          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="border-muted flex w-fit max-w-[90vw] overflow-hidden rounded border bg-foreground shadow-xl"
          >
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
