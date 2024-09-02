import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type LearnerSavedCourse } from "~/types/db";
import classNames from "~/utils/classnames";
export default function SavedCourseSidebarItem({
  savedCourse,
}: {
  savedCourse: LearnerSavedCourse;
}) {
  const [color, setColor] = useState<string>("background");

  const router = useRouter();
  const { coursecode } = router.query;

  useEffect(() => {
    if (!!coursecode && coursecode === savedCourse.courseCode) {
      setColor("accent");
    } else {
      setColor("background");
    }
  }, [coursecode, savedCourse]);

  return (
    <li
      key={savedCourse?.courseCode}
      className={`flex cursor-pointer bg-${color} rounded-sm p-2`}
    >
      <Link
        href={`/dashboard/learner/${savedCourse.courseCode}`}
        className="flex flex-row gap-2"
      >
        <span
          className={classNames(
            router.query.coursecode == savedCourse?.courseCode
              ? "border-primary bg-accent text-accent-foreground"
              : "border-accent-foreground text-accent-foreground group-hover:border-primary group-hover:text-accent-foreground",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-secondary text-[0.625rem] font-medium",
          )}
        >
          {savedCourse?.title.substring(0, 1)}
        </span>
        <span className="truncate">{savedCourse?.title}</span>
      </Link>
    </li>
  );
}
