import Metatags from "~/components/site/metatags";
import PageCourses from "~/ui/courses/PageCourses";
import Footer from "~/ui/landing/Footer";

export default function Page() {
  return (
    <>
      <Metatags title="Courses" />
      <PageCourses />
      <Footer />
    </>
  );
}
