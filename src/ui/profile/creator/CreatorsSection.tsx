import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import CommittedAssignments from "./CommittedAssignments";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function CreatorsSection({
  accessTokenAlias,
}: {
  accessTokenAlias: string;
}) {
  const { creatorCoursePolicies, isLoadingCreatorCoursePolicies } =
    useCreatorsCoursesPolicies(accessTokenAlias);

  if (isLoadingCreatorCoursePolicies) return <LoadingCircle />;
  return (
    <div className="flex flex-col gap-5">
      <pre>{JSON.stringify(creatorCoursePolicies, null, 2)}</pre>
      {creatorCoursePolicies &&
        creatorCoursePolicies.map((c, i) => (
          <CommittedAssignments key={i} courseNftPolicy={c} />
        ))}
    </div>
  );
}
