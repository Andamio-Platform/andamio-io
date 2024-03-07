import { ContentVariant } from "@prisma/client";
import { api } from "~/utils/api";

export default function useContentVarient(
  contentId: string | undefined,
  courseVariantId: string | undefined,
) {
  const { data: contentVariants } =
    api.contentVariant.getContentVariants.useQuery(
      {
        contentId: contentId ?? "",
      },
      {
        enabled: contentId != undefined && courseVariantId != undefined,
      },
    );

  const contentVariant = contentVariants?.find(
    (x: ContentVariant) => x.courseVariantId == courseVariantId,
  );

  return { contentVariant };
}
