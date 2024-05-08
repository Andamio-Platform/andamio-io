import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Course, CoursePublic } from "~/types/db";

export default function CourseCard({
  course,
  enabled,
}: {
  course: CoursePublic;
  enabled: boolean;
}) {
  if (!course) return;
  return (
    <li key={course.id} className="rounded-2xl shadow-xl">
      {enabled ? (
        <Link href={`/course/${course.courseCode}`}>
          <CourseDetails course={course} />
        </Link>
      ) : (
        <div className="opacity-50">
          <CourseDetails course={course} />
        </div>
      )}
    </li>
  );
}

function CourseDetails({ course }: { course: CoursePublic }) {
  return (
    <>
      <div className="relative">
        <img
          className="aspect-[3/2] w-full rounded-t-2xl object-cover"
          src={
            course.imageUrl ? course.imageUrl : "/images/sample-covers/1.jpg"
          }
          alt=""
        />
        <div className="absolute bottom-2 right-2">
          {course.accessTier == "FREE" && <Badge variant="free">Free</Badge>}
          {course.accessTier == "PREMIUM" && (
            <Badge variant="premium">Premium</Badge>
          )}
          {course.accessTier == "NETWORK" && (
            <Badge variant="network">Network Only</Badge>
          )}
        </div>
      </div>
      <div className="flex min-h-[130px] flex-col justify-between rounded-b-2xl bg-indigo-200 px-2 py-2">
        <div>
          <h3 className="text-lg font-semibold leading-8 tracking-tight text-foreground">
            {course.title}
          </h3>
          <p className="prose text-sm">
            {course.description && truncateString(course.description, 100)}
          </p>
        </div>
      </div>
    </>
  );
}

function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}