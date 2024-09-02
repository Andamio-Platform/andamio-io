import Link from "next/link";
import { useRouter } from "next/router";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import CurrentCourseSidebarItem from "~/ui/profile/learner/CurrentCourseSidebarItem";
import SavedCourses from "~/ui/profile/learner/SavedCourses";

export default function LearnerDashboardMenu() {
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const router = useRouter();

  const isAssignmentRoute = router.asPath.includes(
    "dashboard/learner/assignments",
  );

  const isDashboardRoute = router.asPath.includes("dashboard/learner");

  return (
    <li>
      <Link href="/dashboard/learner">
        <div
          className={`my-5 cursor-pointer p-2 font-semibold ${isDashboardRoute ? "bg-accent" : "bg-primary text-primary-foreground"}`}
        >
          My Learner Dashboard
        </div>
      </Link>
      <div className="px-3">
        <div className="text-sm font-semibold leading-6 text-foreground">
          Currently Enrolled:
        </div>
        <ul role="list" className="my-2 space-y-1">
          {globalStateDatum?.TokenInfos.map((ti, i) => {
            if (ti.Minted) {
              return <CurrentCourseSidebarItem lsCs={ti.LsCs} key={i} />;
            }
          })}
        </ul>
        <SavedCourses />
        {/* TODO: */}
        <div className="text-sm font-semibold leading-6 text-foreground">
          Previous Courses:
        </div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {globalStateDatum?.TokenInfos.map((ti, i) => {
            if (!ti.Minted) {
              return <CurrentCourseSidebarItem lsCs={ti.LsCs} key={i} />;
            }
          })}
        </ul>
      </div>
      <Link href="/dashboard/learner/assignments">
        <h2
          className={`my-5 cursor-pointer p-2 font-semibold ${isAssignmentRoute ? "bg-accent" : "bg-primary text-primary-foreground"}`}
        >
          My Assignment Notes
        </h2>
      </Link>
    </li>
  );
}
