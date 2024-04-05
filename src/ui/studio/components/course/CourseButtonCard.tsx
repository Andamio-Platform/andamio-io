import Link from "next/link";
import { Card } from "~/components/ui/card";
import type { Course } from "~/types/db";

export default function CourseButtonCard({
  course,
  link,
}: {
  course: Course;
  link: string;
}) {
  return (
    <Link href={link}>
      <Card className="" intent="course">
        <p className="text-sm font-medium">{course?.title}</p>
        <p className="mt-1 text-sm">{course?.description}</p>
      </Card>
    </Link>
  );
}
