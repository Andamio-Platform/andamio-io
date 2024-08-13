import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import CommittedAssignments from "./CommittedAssignments";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import NetworkModuleManagement from "./NetworkModuleManagement";

export default function CreatorsSection({
  accessTokenAlias,
}: {
  accessTokenAlias: string;
}) {
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
        </div>
        <div className="col-span-3 mx-auto w-11/12">
          {creatorCoursePolicies &&
            creatorCoursePolicies.map((c, i) => (
              <NetworkModuleManagement courseNftPolicyId={c} key={i} />
            ))}
        </div>
        <div className="col-span-3 mx-auto max-w-5xl">
          {creatorCoursePolicies &&
            creatorCoursePolicies.map((c, i) => (
              <CommittedAssignments key={i} courseNftPolicy={c} />
            ))}
        </div>
      </div>
    </div>
  );
}
