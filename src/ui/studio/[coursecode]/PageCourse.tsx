import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import CourseTitle from "~/ui/studio/components/CourseTitle";
import ListCourseManagers from "~/ui/studio/components/ListCourseManagers";
import ListCourseVariants from "../components/ListCourseVariants";

import useCourseByOwner from "~/hooks/useCourseByOwner";
import { useSession } from "next-auth/react";
import ShowCourseOnchain from "../components/ShowCourseOnchain";
import { Network } from "@prisma/client";
import FormFieldset from "~/components/form/form-fieldset";
import SelectNetwork from "~/components/select-network";
import { CourseVariant } from "~/types/db";
import ModuleComponent from "../components/ModuleComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function PageCourse({ courseCode }: { courseCode: string }) {
  const { course, isLoadingCourse } = useCourseByOwner(courseCode);
  const [currentTab, setCurrentTab] = useState<string>("modules");
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("PREPROD");
  const [selectedVariant, setSelectedVariant] = useState<
    CourseVariant | undefined
  >(undefined);

  const tabs = [
    { name: "Modules", value: "modules" },
    { name: "Managers", value: "managers" },
    { name: "Variants", value: "variants" },
    { name: "On-Chain Info", value: "onchain" },
  ];

  const handleNetworkSelectionChange = (
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
              <Tabs defaultValue="modules">
                <TabsList>
                  <TabsTrigger value="modules" className="px-10">Modules</TabsTrigger>
                  <TabsTrigger value="managers" className="px-10">Course Creators</TabsTrigger>
                  <TabsTrigger value="variants" className="px-10">Variants</TabsTrigger>
                  <TabsTrigger value="onchain" className="px-10">
                    On-Chain Configuration
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="modules">
                  <ModuleComponent course={course} />
                </TabsContent>
                <TabsContent value="managers">
                  <ListCourseManagers course={course} />
                </TabsContent>
                <TabsContent value="variants">
                  <ListCourseVariants course={course} />
                </TabsContent>
                <TabsContent value="onchain">
                  <ShowCourseOnchain
                    key={selectedNetwork + course.id}
                    course={course}
                    network={selectedNetwork}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          isLoadingCourse && <Loading />
        )}
      </>
      <div className="mt-10 flex w-full flex-row justify-between">
        <FormFieldset label="Network">
          <SelectNetwork
            name="network"
            onChange={handleNetworkSelectionChange}
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
