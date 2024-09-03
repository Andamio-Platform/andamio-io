import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TeacherCoursePage from "~/ui/profile/TeacherCoursePage";

export default function DashboardCreatorCoursePage() {
  const [courseCode, setCourseCode] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { coursecode } = router.query;

  useEffect(() => {
    if (!!coursecode && typeof coursecode === "string") {
      setCourseCode(coursecode);
    }
  }, [router, coursecode]);

  if (!courseCode) return <div>Invalid URL</div>;

  return <TeacherCoursePage courseCode={courseCode} />;
}
