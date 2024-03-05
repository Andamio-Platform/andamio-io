import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function useCourseVariantTabs(courseId: string | undefined) {
  const [tabs, setTabs] = useState([{ name: "Main", value: "main" }]);
  const [currentVariantTab, setCurrentVariantTab] = useState<string>("main");

  const { data: courseVariants } = api.courseVariant.getCourseVariants.useQuery(
    {
      courseId: courseId ?? "",
    },
    {
      enabled: courseId != undefined,
    },
  );

  useEffect(() => {
    if (courseVariants) {
      const _tabs = [{ name: "Main", value: "main" }];
      courseVariants.map((variant) => {
        _tabs.push({ name: variant.variantCode, value: variant.variantCode });
      });
      setTabs(_tabs);
    }
  }, [courseVariants]);

  return { tabs, currentVariantTab, setCurrentVariantTab };
}
