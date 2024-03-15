import { api } from "~/utils/api";

export default function useContent(
  courseCode: string,
  moduleCode: string,
  contentCode: string,
) {
  const { data: contents, isLoading } = api.content.getModuleContents.useQuery({
    courseCode,
    moduleCode,
  });
  const content = contents?.find((c) => c.contentCode === contentCode);

  return { content, isLoading };
}
