import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import useCourseModuleOverviews from "~/hooks/course/useCourseModuleOverviews";
import { Button } from "~/components/ui/button";
import { Accordion } from "~/components/ui/accordion";
import CourseModuleAccordionItem from "./CourseModuleAccordionItem";

// Logic
// 1. If Module has at least 1 SLT and an Assignment, it can be minted on-chain
// 2. Show mint module button if (1) is true

export default function NetworkModuleManagement({
  courseNftPolicyId,
  key,
}: {
  courseNftPolicyId: string;
  key: number | string;
}) {
  const { courseInfo, assignmentStats } =
    useCourseByPolicyId(courseNftPolicyId);
  const { courseModuleOverviews } = useCourseModuleOverviews(
    courseInfo?.courseCode ?? "",
  );

  return (
    <div key={key} className="">
      <div className="mb-5 flex flex-row items-center justify-between">
        <h2 className="text-2xl">{courseInfo?.title}</h2>
        <p>{assignmentStats?.courseModules} modules</p>
        <p>
          {assignmentStats?.modulesWithAssignments} modules with assignments
        </p>
        <p>
          {assignmentStats?.networkPublishedModules} modules published on-chain
        </p>
        <Button>Edit in Course Studio</Button>
      </div>
      {courseInfo?.courseCode && (
        <Accordion type="multiple">
          {courseModuleOverviews?.map((cm, i) => (
            <CourseModuleAccordionItem
              courseCode={courseInfo.courseCode}
              courseNftPolicyId={courseNftPolicyId}
              cm={cm}
              key={i}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}
