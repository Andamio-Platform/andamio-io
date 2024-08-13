import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import CommittedAssignments from "./CommittedAssignments";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import NetworkModuleManagement from "./NetworkModuleManagement";
import { useState } from "react";
import CurrentCourseSidebarItem from "../learner/CurrentCourseSidebarItem";

export default function CreatorsSection({
  accessTokenAlias,
}: {
  accessTokenAlias: string;
}) {
  const [selectedCoursePolicyId, setSelectedCoursePolicyId] = useState<
    string | undefined
  >(undefined);

  const { creatorCoursePolicies, isLoadingCreatorCoursePolicies } =
    useCreatorsCoursesPolicies(accessTokenAlias);

  if (isLoadingCreatorCoursePolicies) return <LoadingCircle />;
  return (
    <div className="">
      <div className="my-5 w-full text-center font-beckman text-4xl">
        Andamio Dashboard: Creator
      </div>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 row-span-2 bg-accent text-xs">
          <pre>{JSON.stringify(creatorCoursePolicies, null, 2)}</pre>
          {creatorCoursePolicies?.map((p, i) => (
            <CurrentCourseSidebarItem
              lsCs={p}
              key={i}
              selectedCourse={selectedCoursePolicyId}
              setSelectedCoursePolicyId={setSelectedCoursePolicyId}
            />
          ))}
        </div>
        <div className="col-span-3 mx-auto w-11/12">
          <NetworkModuleManagement
            courseNftPolicyId={selectedCoursePolicyId ?? ""}
            key={selectedCoursePolicyId ?? 0}
          />
          <CommittedAssignments
            key={selectedCoursePolicyId + "assignments"}
            courseNftPolicy={selectedCoursePolicyId ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
