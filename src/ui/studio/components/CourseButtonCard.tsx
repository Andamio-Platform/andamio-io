import Link from "next/link";
import Card from "~/components/card";
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
      <Card>
        <p className="text-sm font-medium text-gray-900">{course.title}</p>
        <p className="mt-1 text-sm text-gray-500">{course.description}</p>
      </Card>
    </Link>
  );
}
