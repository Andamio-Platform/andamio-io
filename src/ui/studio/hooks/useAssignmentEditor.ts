import { api } from "~/utils/api";
import { useEditor } from "@tiptap/react";
import { ExtensionKit } from "~/components/Editor/extension-kit";
import { type Assignment } from "~/types/db";

export default function useAssignmentEditor(assignment: Assignment) {
  const ctx = api.useUtils();

  const editor = useEditor({
    extensions: [...ExtensionKit()],
    content: "Write assignment content here...",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full bg-background text-foreground prose-headings:text-foreground",
      },
    },
  });
  return { editor, ctx };
}
