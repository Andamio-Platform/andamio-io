import Metatags from "~/components/site/metatags";
import PageCourses from "~/ui/courses/PageCourses";

export default function Page() {
  return (
    <>
      <Metatags title="Courses" />
      <PageCourses />
    </>
  );
}
