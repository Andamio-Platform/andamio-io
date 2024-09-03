import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { type CoursePublic } from "~/types/db";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import Markdown from "react-markdown";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import MintCourseEnrollmentDialog from "~/components/transactions/dialogs/MintCourseEnrollmentDialog";

export default function CourseCard({
  course,
  savedCourse,
}: {
  course: CoursePublic;
  savedCourse: boolean;
}) {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSessionData } = useSession();

  const { mutate: saveCourseForLearner } =
    api.learner.saveCourseForLearner.useMutation({
      onSuccess: () => {
        void ctx.learner.getSavedCoursesByLearner.invalidate();
        void updateSessionData();
        toast.success("Course saved");
      },
    });

  const handleSaveCourse = () => {
    if (sessionData) {
      saveCourseForLearner({
        learnerId: sessionData.user.learnerId,
        courseId: course.id,
      });
    }
  };

  if (!course) return;
  return (
    <Card
      key={course.id}
      className="border-none bg-secondary shadow-xl"
      size="md"
    >
      <CardHeader className="relative m-0 p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={600}
          height={400}
          className="aspect-[3/2] w-full rounded-t-md object-cover"
          src={
            course.imageUrl ? course.imageUrl : "/images/sample-covers/1.jpg"
          }
          alt=""
        />
        <div className="absolute bottom-2 right-2">
          {course.accessTier == "FREE" && <Badge variant="free">Free</Badge>}
          {/* {course.accessTier == "FEATURED" && (
            <Badge variant="free">Featured</Badge>
          )} */}
          {course.accessTier == "PREMIUM" && (
            <Badge variant="premium">Premium</Badge>
          )}
          {course.accessTier == "NETWORK" && (
            <Badge variant="network">Network Only</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-5">
        <h3 className="text-lg font-semibold leading-8 tracking-tight text-foreground">
          {course.title}
        </h3>
        <p className="prose max-h-16 overflow-hidden text-sm">
          {course.description && <Markdown>{course.description}</Markdown>}
        </p>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <Link href={`/course/${course.courseCode}`}>
          <Button>View</Button>
        </Link>
        {savedCourse ? (
          <Button className="bg-success text-green-900">Saved</Button>
        ) : (
          <Button onClick={handleSaveCourse}>Save</Button>
        )}
        {!!course.onchainInstance[0] && (
          <MintCourseEnrollmentDialog course={course} />
        )}
      </CardFooter>
    </Card>
  );
}
