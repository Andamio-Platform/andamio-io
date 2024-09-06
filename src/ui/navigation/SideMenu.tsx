import { useRouter } from "next/router";
import useCoursesByOwner from "~/hooks/course/useCoursesByOwner";
import DesktopSideMenu from "./DesktopSideMenu";
import MobileSideMenu from "./MobileSideMenu";
import { useEffect, useState } from "react";

export default function SideMenu() {
  const { ownerCourses } = useCoursesByOwner();
  const [currentCourseCode, setCurrentCourseCode] = useState<
    string | undefined
  >(undefined);
  const router = useRouter();

  const { coursecode } = router.query;

  useEffect(() => {
    if (typeof coursecode === "string") {
      setCurrentCourseCode(coursecode);
    }
  }, [coursecode]);

  return (
    <div>
      <DesktopSideMenu
        ownerCourses={ownerCourses}
        currentCourseCode={currentCourseCode}
      />
      {ownerCourses && <MobileSideMenu ownerCourses={ownerCourses} />}
    </div>
  );
}
