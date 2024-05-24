import { api } from "~/utils/api";
import useLesson from "../../../hooks/useLesson";
import { useEditor } from "@tiptap/react";
import { ExtensionKit } from "~/components/Editor/extension-kit";

export default function useLessonEditor(
  courseCode: string,
  moduleCode: string,
  moduleIndex: number,
) {
  const ctx = api.useUtils();
  const { lesson, refetchLesson, isLoadingLesson } = useLesson(
    courseCode,
    moduleCode,
    moduleIndex,
  );
  const editor = useEditor({
    extensions: [...ExtensionKit()],
    content: "Write lesson content here...",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full bg-background text-foreground prose-headings:text-foreground",
      },
    },
  });

  return { editor, lesson, refetchLesson, isLoadingLesson, ctx };
}
