import { api } from "~/utils/api";
import { useEditor } from "@tiptap/react";
import { ExtensionKit } from "~/components/Editor/extension-kit";
import useIntroduction from "~/hooks/useIntroduction";

export default function useIntroEditor(
  courseModuleId: string,
) {
  const ctx = api.useUtils();
  const { introduction, refetchIntro, isLoadingIntro } = useIntroduction(
    courseModuleId
  );
  const editor = useEditor({
    extensions: [...ExtensionKit()],
    content: "Write an introduction to the module here...",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full bg-background text-foreground prose-headings:text-foreground",
      },
    },
  });

  return { editor, introduction, refetchIntro, isLoadingIntro, ctx };
}
