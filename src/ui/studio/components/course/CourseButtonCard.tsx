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
      <Card className="min-h-[200px] border border-foreground bg-background px-5 py-3 text-foreground hover:bg-secondary hover:text-secondary-foreground">
        <p className="text-sm font-medium">{course?.title}</p>
        <p className="mt-1 text-sm">{course?.description}</p>
      </Card>
    </Link>
  );
}
