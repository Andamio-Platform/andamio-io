import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function ViewCoursesButton() {
  return (
    <Link href="/courses">
      <Button>Browse All Courses</Button>
    </Link>
  );
}
