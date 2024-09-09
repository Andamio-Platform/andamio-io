import { useSession } from "next-auth/react";
import RoleStatus from "~/ui/profile/dashboard-home/RoleStatus";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";

export default function AndamioRoleStatusMenu() {
  const { data: sessionData } = useSession();
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { creatorCoursePolicies } = useCreatorsCoursesPolicies(
    accessTokenAlias ?? "",
  );
  return (
    <li>
      <div className="grid w-full grid-cols-1 gap-1">
        <div className="mb-2 bg-primary text-primary-foreground">
          <h2 className="p-2 font-semibold">Andamio Platform Roles</h2>
        </div>
        <RoleStatus
          roleName="Discord Account"
          userHasRole={!!sessionData}
          roleDetail={sessionData?.user.name ?? undefined}
        />
        <RoleStatus
          roleName="Learner Role"
          userHasRole={!!sessionData?.user.learnerId}
          roleInfoUrl="/about"
        />
        {!!sessionData?.user.creatorId && (
          <RoleStatus
            roleName="Creator Role"
            userHasRole={!!sessionData?.user.creatorId}
            roleInfoUrl="/about"
          />
        )}
        <div className="mb-2 mt-3 bg-primary text-primary-foreground">
          <h2 className="p-2 font-semibold">Andamio Network Status</h2>
        </div>
        <RoleStatus
          roleName="Access Token"
          userHasRole={!!accessTokenAlias}
          roleDetail={accessTokenAlias}
          roleInfoUrl="/about"
        />
        <RoleStatus
          roleName="Enrolled in Courses"
          userHasRole={
            !!globalStateDatum && globalStateDatum.TokenInfos.length > 0
          }
          roleInfoUrl="/courses"
        />
        {!!sessionData?.user.creatorId && (
          <RoleStatus
            roleName="Course Creator"
            userHasRole={
              !!creatorCoursePolicies && creatorCoursePolicies.length > 0
            }
            roleInfoUrl="/about"
          />
        )}
        <RoleStatus roleName="Contributor: Coming Soon" userHasRole={false} />
      </div>
    </li>
  );
}
