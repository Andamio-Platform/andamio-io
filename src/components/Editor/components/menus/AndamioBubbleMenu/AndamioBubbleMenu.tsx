import { useCallback, useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { EditLinkPopover } from "../TextMenu/components/EditLinkPopover";

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
          className="edit-menu flex flex-row gap-1 rounded-md bg-gray-200"
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
              <StrikethroughIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="text-red"
              aria-label="Toggle text-red"
              onClick={() => editor.chain().focus().setColor("#FF0000").run()}
              className={editor.isActive("text-red") ? "is-active" : ""}
            >
              <div className="h-4 w-4 bg-[#FF0000]" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="text-green"
              aria-label="Toggle text-green"
              onClick={() => editor.chain().focus().setColor("#00FF00").run()}
              className={editor.isActive("text-green") ? "is-active" : ""}
            >
              <div className="h-4 w-4 bg-[#00FF00]" />
            </ToggleGroupItem>
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

          {/* Next step - add Links! */}
          {/* Next step - fix bubble menu in dark mode */}
        </BubbleMenu>
      </div>
    );
  }
}
