import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import CommittedAssignments from "./CommittedAssignments";

export default function CreatorsSection({
  accessTokenAlias,
}: {
  accessTokenAlias: string;
}) {
  const { creatorCoursePolicies } =
    useCreatorsCoursesPolicies(accessTokenAlias);

  return (
    <>
      {creatorCoursePolicies &&
        creatorCoursePolicies.map((c, i) => (
          <CommittedAssignments key={i} courseNftPolicy={c} />
        ))}
    </>
  );
}
