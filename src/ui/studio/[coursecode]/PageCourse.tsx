import { useState } from "react";
import Tabs from "~/components/tabs";
import Loading from "~/components/loading";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import CourseTitle from "~/ui/studio/components/CourseTitle";
import ListModules from "~/ui/studio/components/ListModules";
import ListCourseManagers from "~/ui/studio/components/ListCourseManagers";
import ListCourseVariants from "../components/ListCourseVariants";
import useCourseByOwner from "~/hooks/useCourseByOwner";

export default function PageCourse({ courseCode }: { courseCode: string }) {
  
  const { course, isLoading } = useCourseByOwner(courseCode);
  const [currentTab, setCurrentTab] = useState<string>("modules");

  const tabs = [
    { name: "Modules", value: "modules" },
    { name: "Managers", value: "managers" },
    { name: "Variants", value: "variants" },
  ];

  return (
    <StudioLayout>
      <>
        {course ? (
          <>
            <div className="flex flex-col gap-4">
              <CourseTitle course={course} />
              <Tabs tabs={tabs} current={currentTab} onChange={setCurrentTab} />
              {currentTab === "modules" && <ListModules course={course} />}
              {currentTab === "managers" && (
                <ListCourseManagers course={course} />
              )}
              {currentTab === "variants" && (
                <ListCourseVariants course={course} />
              )}
            </div>
          </>
        ) : (
          isLoading && <Loading />
        )}
      </>
    </StudioLayout>
  );
}
