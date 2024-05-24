import { api } from "~/utils/api";
import { Content, useEditor } from "@tiptap/react";
import { ExtensionKit } from "~/components/Editor/extension-kit";
import { Assignment } from "~/types/db";

export default function useAssignmentEditor(assignment: Assignment) {
  const ctx = api.useUtils();
  // If needed:
  //  const {} = useAssignment

  if (
    assignment &&
    assignment.contentJson &&
    typeof assignment.contentJson === "object"
  ) {
    const editor = useEditor({
      extensions: [...ExtensionKit()],
      content: assignment?.contentJson,
      editorProps: {
        attributes: {
          class:
            "prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full bg-background text-foreground prose-headings:text-foreground",
        },
      },
    });
    return { editor, ctx };
  } else return { undefined, ctx };
}
