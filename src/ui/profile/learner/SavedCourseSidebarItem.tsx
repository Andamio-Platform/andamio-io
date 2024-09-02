import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "~/components/ui/card";
import { type LearnerSavedCourse } from "~/types/db";
export default function SavedCourseSidebarItem({
  savedCourse,
  key,
}: {
  savedCourse: LearnerSavedCourse;
  key: number;
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
    <Link href={`/dashboard/learner/${savedCourse.courseCode}`}>
      <Card key={key} intent="sideNav" className={`bg-${color}`}>
        <h2 className="text-sm font-semibold">{savedCourse?.title}</h2>
      </Card>
    </Link>
  );
}
