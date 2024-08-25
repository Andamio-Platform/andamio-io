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
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-1 row-span-2 bg-accent text-xs">
          <div className="my-5 font-beckman text-xl">Andamio Creator</div>
          {creatorCoursePolicies?.map((p, i) => (
            <CurrentCourseSidebarItem
              lsCs={p}
              key={i}
              selectedCourse={selectedCoursePolicyId}
              setSelectedCoursePolicyId={setSelectedCoursePolicyId}
            />
          ))}
        </div>
        {selectedCoursePolicyId ? (
          <div className="col-span-4 mx-auto w-11/12">
            <NetworkModuleManagement
              courseNftPolicyId={selectedCoursePolicyId ?? ""}
              key={selectedCoursePolicyId ?? 0}
            />
            <CommittedAssignments
              key={selectedCoursePolicyId + "assignments"}
              courseNftPolicy={selectedCoursePolicyId ?? ""}
            />
          </div>
        ) : (
          <div>COURSE CREATOR OVERVIEW</div>
        )}
      </div>
    </div>
  );
}
