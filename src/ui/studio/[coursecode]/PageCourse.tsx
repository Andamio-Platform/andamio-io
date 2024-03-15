import { useState } from "react";
import Tabs from "~/components/tabs";
import Loading from "~/components/loading";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import CourseTitle from "~/ui/studio/components/CourseTitle";
import ListModules from "~/ui/studio/components/ListModules";
import ListCourseManagers from "~/ui/studio/components/ListCourseManagers";
import ListCourseVariants from "../components/ListCourseVariants";

import useCourseByOwner from "~/hooks/useCourseByOwner";
import { useSession } from "next-auth/react";
import ShowCourseOnchain from "../components/ShowCourseOnchain";
import { Network } from "@prisma/client";
import FormFieldset from "~/components/form/form-fieldset";
import SelectNetwork from "~/components/select-network";

export default function PageCourse({ courseCode }: { courseCode: string }) {
  
  const { course, isLoading } = useCourseByOwner(courseCode);
  const [currentTab, setCurrentTab] = useState<string>("modules");
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("PREPROD");

  const tabs = [
    { name: "Modules", value: "modules" },
    { name: "Managers", value: "managers" },
    { name: "Variants", value: "variants" },
    { name: "On-Chain Info", value: "onchain" },
  ];

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const _network = event.target.value as Network;
    setSelectedNetwork(_network);
  };

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
              {selectedNetwork && currentTab === "onchain" && (
                <ShowCourseOnchain key={selectedNetwork+course.id} course={course} network={selectedNetwork} />
              )}
            </div>
          </>
        ) : (
          isLoading && <Loading />
        )}
      </>
      <div className="flex w-full justify-end mt-10">
        <FormFieldset label="Network">
          <SelectNetwork
            name="network"
            onChange={handleSelectionChange}
            options={Object.keys(Network).map((type) => ({
              value: type,
              label: type,
            }))}
          />
        </FormFieldset>
      </div>
    </StudioLayout>
  );
}
