import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import classNames from "~/utils/classnames";

export default function CurrentCourseSidebarItem({
  lsCs,
  teacher,
}: {
  lsCs: string;
  teacher?: boolean;
}) {
  const { courseInfo, isLoadingCourseInfo } = useCourseByPolicyId(lsCs);
  const [color, setColor] = useState<string>("background");
  const [linkUrl, setLinkUrl] = useState<string | undefined>(undefined);

  const router = useRouter();
  const { coursecode } = router.query;

  useEffect(() => {
    if (!!coursecode && coursecode === courseInfo?.courseCode) {
      setColor("accent");
    } else {
      setColor("background");
    }

    if (!!courseInfo?.courseCode) {
      if (teacher) {
        setLinkUrl(`/dashboard/teacher/${courseInfo?.courseCode}`);
      } else {
        setLinkUrl(`/dashboard/learner/${courseInfo?.courseCode}`);
      }
    }
  }, [coursecode, courseInfo, lsCs, teacher]);

  if (isLoadingCourseInfo) return <LoadingCircle />;

  if (!linkUrl) return null;

  return (
    <li
      key={courseInfo?.courseCode}
      className={`flex cursor-pointer bg-${color} rounded-sm p-2`}
    >
      <Link href={linkUrl} className="flex flex-row gap-2">
        <span
          className={classNames(
            router.query.coursecode == courseInfo?.courseCode
              ? "border-primary bg-accent text-accent-foreground"
              : "border-accent-foreground text-accent-foreground group-hover:border-primary group-hover:text-accent-foreground",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-secondary text-[0.625rem] font-medium",
          )}
        >
          {courseInfo?.title.substring(0, 1)}
        </span>
        <span className="truncate">{courseInfo?.title}</span>
      </Link>
    </li>
  );
}
