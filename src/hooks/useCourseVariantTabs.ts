import { use, useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function useCourseVariantTabs(courseId: string | undefined) {
  const [tabs, setTabs] = useState([{ name: "Main", value: "main" }]);
  const [selectedVariantTab, setSelectedVariantTab] = useState<string>("main");
  const [selectedCourseVariantId, setSelectedCourseVariantId] = useState<
    string | undefined
  >(undefined);

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

  useEffect(() => {
    if (courseVariants) {
      const _courseVariant = courseVariants.find(
        (x) => x.variantCode == selectedVariantTab,
      );
      if (_courseVariant) {
        setSelectedCourseVariantId(_courseVariant.id);
      } else {
        setSelectedCourseVariantId(undefined);
      }
    }
  }, [selectedVariantTab]);

  return {
    tabs,
    selectedVariantTab,
    setSelectedVariantTab,
    selectedCourseVariantId,
  };
}
