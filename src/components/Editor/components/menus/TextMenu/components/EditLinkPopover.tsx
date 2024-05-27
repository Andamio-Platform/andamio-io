import { Link1Icon } from "@radix-ui/react-icons";
import { Toolbar } from "../../../ui/Toolbar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { BubbleMenu, Editor } from "@tiptap/react";
import { LinkEditorPanel } from "../../../panels";

export const EditLinkPopover = ({
  editor,
  isOpen,
  onClose,
}: {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Link1Icon className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-row">
        <LinkEditorPanel editor={editor} />
      </PopoverContent>
    </Popover>
  );
};
