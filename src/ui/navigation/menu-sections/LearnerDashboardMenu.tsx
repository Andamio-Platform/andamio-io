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

  return (
    <li>
      <div className="col-span-1 row-span-9">
        <Link href="/dashboard/learner">
          <div className="my-5 cursor-pointer pl-2 font-beckman text-sm">
            YOUR LEARNER DASHBOARD
          </div>
        </Link>
        <div className="">
          <div className="text-xs font-semibold leading-6 text-foreground">
            Currently Enrolled:
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {globalStateDatum?.TokenInfos.map((ti, i) => {
              if (ti.Minted) {
                return <CurrentCourseSidebarItem lsCs={ti.LsCs} key={i} />;
              }
            })}
          </ul>
          <SavedCourses />
          {/* TODO: */}
          <h2 className="p-2 text-lg font-bold">Completed Courses</h2>
          <div className="text-xs font-semibold leading-6 text-foreground">
            Previous Courses
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {globalStateDatum?.TokenInfos.map((ti, i) => {
              if (!ti.Minted) {
                return <CurrentCourseSidebarItem lsCs={ti.LsCs} key={i} />;
              }
            })}
          </ul>
          <Link href="/dashboard/learner/assignments">
            <h2
              className={`my-5 cursor-pointer p-2 font-bold ${isAssignmentRoute && "bg-accent"}`}
            >
              My Assignment Notes
            </h2>
          </Link>
        </div>
      </div>
    </li>
  );
}
