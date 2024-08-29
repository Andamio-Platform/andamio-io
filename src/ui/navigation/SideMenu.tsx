import { useRouter } from "next/router";
import useCoursesByOwner from "~/hooks/course/useCoursesByOwner";
import LoadingCircle from "../studio/components/ContentEditor/ui/icons/loading-circle";
import DesktopSideMenu from "./DesktopSideMenu";
import MobileSideMenu from "./MobileSideMenu";

export default function SideMenu() {
  const { ownerCourses, isLoadingCourses } = useCoursesByOwner();

  const router = useRouter();

  if (isLoadingCourses) return <LoadingCircle />;

  return (
    <div>
      {ownerCourses && <DesktopSideMenu ownerCourses={ownerCourses} />}
      {ownerCourses && <MobileSideMenu ownerCourses={ownerCourses} />}
    </div>
  );
}
