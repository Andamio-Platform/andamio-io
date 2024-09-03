import Link from "next/link";
import { useRouter } from "next/router";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import CurrentCourseSidebarItem from "~/ui/profile/learner/CurrentCourseSidebarItem";

export default function TeacherDashboardMenu() {
  const { accessTokenAlias } = useAccessToken();
  const router = useRouter();

  const { creatorCoursePolicies, isLoadingCreatorCoursePolicies } =
    useCreatorsCoursesPolicies(accessTokenAlias ?? "");

  const isAssignmentRoute = router.asPath.includes(
    "dashboard/teacher/assignments",
  );

  const isDashboardRoute = router.asPath.includes("dashboard/teacher");

  return (
    <li>
      <Link href="/dashboard/teacher">
        <div
          className={`my-5 cursor-pointer p-2 font-semibold ${isDashboardRoute ? "bg-accent" : "bg-primary text-primary-foreground"}`}
        >
          My Teacher Dashboard
        </div>
      </Link>
      <div className="px-3">
        <div className="text-sm font-semibold leading-6 text-foreground">
          Your Courses:
        </div>
        <ul role="list" className="my-2 space-y-1">
          {creatorCoursePolicies?.map((p, i) => (
            <CurrentCourseSidebarItem lsCs={p} teacher={true} key={i} />
          ))}
        </ul>
        {/* TODO: */}
        <div className="text-sm font-semibold leading-6 text-foreground">
          Collaborator Courses:
        </div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          <li>Todo: get collabs</li>
        </ul>
      </div>
      <Link href="/dashboard/teacher/assignments">
        <h2
          className={`my-5 cursor-pointer p-2 font-semibold ${isAssignmentRoute ? "bg-accent" : "bg-primary text-primary-foreground"}`}
        >
          Review Assignments
        </h2>
      </Link>
    </li>
  );
}
