import { Link1Icon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Editor } from "@tiptap/react";
import { LinkEditorPanel } from "../../../panels";

export const EditLinkPopover = ({ editor }: { editor: Editor }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link1Icon className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-row">
        <LinkEditorPanel editor={editor} />
      </PopoverContent>
    </Popover>
  );
};
