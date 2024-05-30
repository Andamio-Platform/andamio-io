import { useCallback, useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  DividerVerticalIcon,
} from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { EditLinkPopover } from "../TextMenu/components/EditLinkPopover";

const editorColors = [
  { name: "blue", colorVar: "hsl(var(--editor-blue))" },
  { name: "green", colorVar: "hsl(var(--editor-green))" },
  { name: "orange", colorVar: "hsl(var(--editor-orange))" },
  { name: "yellow", colorVar: "hsl(var(--editor-yellow))" },
];

export function AndamioBubbleMenu({ editor }: { editor: Editor }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        setIsPopoverOpen(true);
      }
    },
    [],
  );

  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  if (!!editor) {
    return (
      <div onKeyDown={handleKeyDown}>
        <BubbleMenu
          editor={editor}
          className="edit-menu flex flex-row min-w-[530px] gap-1 bg-accent rounded-md border border-gray-300"
          tippyOptions={{
            placement: "top-end",
          }}
        >
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <FontBoldIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <FontItalicIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strikethrough"
              aria-label="Toggle strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <div>
                <StrikethroughIcon className="h-4 w-4" />
              </div>
            </ToggleGroupItem>
            <DividerVerticalIcon className="h-8 text-gray-300" />
            <ToggleGroupItem
              value="text-default"
              aria-label="Toggle text-default"
              onClick={() => editor.chain().focus().setColor("hsl(var(--foreground))").run()}
              className={editor.isActive("text-default") ? "is-active" : ""}
            >
              <div className="h-4 w-4" style={{ backgroundColor: "hsl(var(--foreground))"}} />
            </ToggleGroupItem>
            {editorColors.map((c, index) => (
              <ToggleGroupItem
                value={`text-${c.name}`}
                aria-label={`Toggle text-${c.name}`}
                onClick={() =>
                  editor.chain().focus().setColor(c.colorVar).run()
                }
                className={editor.isActive(`text-${c.name}`) ? "is-active" : ""}
                key={index}
              >
                <div
                  className="h-4 w-4"
                  style={{ backgroundColor: c.colorVar }}
                />
              </ToggleGroupItem>
            ))}
            <DividerVerticalIcon className="h-8 text-gray-300" />


            <ToggleGroupItem
              value="href-link"
              aria-label="Toggle link"
              className={editor.isActive("href-link") ? "is-active" : ""}
            >
              <EditLinkPopover
                editor={editor}
                isOpen={isPopoverOpen}
                onClose={handleClosePopover}
              />
            </ToggleGroupItem>
          </ToggleGroup>

        </BubbleMenu>
      </div>
    );
  }
}
