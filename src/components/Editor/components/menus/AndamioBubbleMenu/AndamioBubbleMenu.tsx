import { useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  DividerVerticalIcon,
  Link1Icon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { LinkEditorPanel } from "../../panels";

const editorColors = [
  { name: "blue", colorVar: "hsl(var(--editor-blue))" },
  { name: "green", colorVar: "hsl(var(--editor-green))" },
  { name: "orange", colorVar: "hsl(var(--editor-orange))" },
  { name: "yellow", colorVar: "hsl(var(--editor-yellow))" },
];

export function AndamioBubbleMenu({ editor }: { editor: Editor }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleToggleLink = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handleOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
  };

  if (!!editor) {
    return (
      <div>
        <BubbleMenu
          editor={editor}
          className="edit-menu flex min-w-[530px] flex-row gap-1 rounded-md border border-gray-300 bg-accent"
          tippyOptions={{
            placement: "top-end",
          }}
        >
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-state={editor.isActive("bold") ? "on" : "off"}
            >
              <FontBoldIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-state={editor.isActive("italic") ? "on" : "off"}
            >
              <FontItalicIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              data-state={editor.isActive("underline") ? "on" : "off"}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strikethrough"
              aria-label="Toggle strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-state={editor.isActive("strike") ? "on" : "off"}
            >
              <div>
                <StrikethroughIcon className="h-4 w-4" />
              </div>
            </ToggleGroupItem>
            <DividerVerticalIcon className="h-8 text-gray-300" />
            <ToggleGroupItem
              value="text-default"
              aria-label="Toggle text-default"
              onClick={() =>
                editor.chain().focus().setColor("hsl(var(--foreground))").run()
              }
              data-state={
                editor.isActive("textStyle", {
                  color: "hsl(var(--foreground))",
                })
                  ? "on"
                  : "off"
              }
            >
              <div
                className="h-4 w-4"
                style={{ backgroundColor: "hsl(var(--foreground))" }}
              />
            </ToggleGroupItem>
            {editorColors.map((c, index) => (
              <ToggleGroupItem
                value={`text-${c.name}`}
                aria-label={`Toggle text-${c.name}`}
                onClick={() =>
                  editor.chain().focus().setColor(c.colorVar).run()
                }
                data-state={
                  editor.isActive("textStyle", { color: c.colorVar })
                    ? "on"
                    : "off"
                }
                key={index}
              >
                <div
                  className="h-4 w-4"
                  style={{ backgroundColor: c.colorVar }}
                />
              </ToggleGroupItem>
            ))}
            <DividerVerticalIcon className="h-8 text-gray-300" />
            <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <button onClick={handleToggleLink}>
                  <Link1Icon className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-row" asChild>
                <LinkEditorPanel editor={editor} />
              </PopoverContent>
            </Popover>
          </ToggleGroup>
        </BubbleMenu>
      </div>
    );
  }
}
