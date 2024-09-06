import Link from "next/link";
import { type Course } from "~/types/db";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CreatorCourseListMenu({
  ownerCourses,
}: {
  ownerCourses: Course[];
}) {
  const router = useRouter();
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <h2 className="p-2 font-semibold">Your Courses</h2>
      </div>
      <li className="px-3 py-2">
        <ul role="list" className="">
          {ownerCourses?.map((course) => (
            <li key={course?.courseCode}>
              <Link
                href={`/studio/${course?.courseCode}`}
                className={classNames(
                  router.query.coursecode == course?.courseCode
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                )}
              >
                <span
                  className={classNames(
                    router.query.coursecode == course?.courseCode
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-accent-foreground text-accent-foreground group-hover:border-primary group-hover:text-accent-foreground",
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-secondary text-[0.625rem] font-medium",
                  )}
                >
                  {course?.title.substring(0, 1)}
                </span>
                <span className="truncate">{course?.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}
