import { Lesson, Slt } from "@prisma/client";
import { AlertTriangle, Leaf } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useLesson from "~/hooks/useLesson";
import useSLT from "~/hooks/useSLT";
import useValidateCreator from "~/hooks/useValidateCreator";
import { Module } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import ModuleLayout from "~/ui/course/components/layout/ModuleLayout";
import { api } from "~/utils/api";

export default function PageCourseContent({
  courseCode,
  courseModule,
  moduleIndex,
}: {
  courseCode: string;
  courseModule: Module;
  moduleIndex: string;
}) {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSessionData } = useSession();

  // Next step:
  // I want the Learner's list of Lessons in my Session Data
  const learnerId = sessionData?.user.learnerId;
  const learnerLessons = sessionData?.user.lessonIds

  console.log("Learner Lessons", learnerLessons);

  const { lesson, isLoadingLesson } = useLesson(
    courseCode,
    courseModule.moduleCode,
    parseInt(moduleIndex),
  );

  const { mutate: addLessonToLearner } =
    api.learner.addLessonToLearner.useMutation({
      onSuccess: () => {
        void ctx.learner.getLearnerLessons.invalidate();
        void updateSessionData();
      },
      onError: (e) => {
        // const errorMessage = e.data?.zodError?.fieldErrors;
        // console.error(errorMessage);
        // toast.error("Something went wrong. Please try again.");
      },
    });

  console.log(learnerId);
  console.log(lesson?.id);

  useEffect(() => {
    if (learnerId && lesson && !learnerLessons?.includes(lesson.id)) {
      addLessonToLearner({
        learnerId: learnerId,
        lessonId: lesson.id,
      });
    }
  }, [learnerId, lesson]);

  const { isCreator } = useValidateCreator(sessionData, courseCode);

  const { slt, isLoadingSLT } = useSLT(
    courseCode,
    courseModule.moduleCode,
    parseInt(moduleIndex),
  );

  return (
    <CourseLayout>
      <ModuleLayout courseCode={courseCode} courseModule={courseModule}>
        {lesson && lesson.live ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Page
              slt={slt}
              lesson={lesson}
              moduleCode={courseModule.moduleCode}
            />
          </div>
        ) : lesson && !lesson.live ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Lesson is not Live!</AlertTitle>
              <AlertDescription>
                Learners will not be able to see this lesson.
              </AlertDescription>
            </Alert>
            {isCreator && (
              <Page
                slt={slt}
                lesson={lesson}
                moduleCode={courseModule.moduleCode}
              />
            )}
          </div>
        ) : isLoadingLesson || isLoadingSLT ? (
          <Loading />
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Alert variant="success">
              <Leaf className="h-4 w-4" />
              <AlertTitle>
                This is a supporting Student Learning Target
              </AlertTitle>
              <AlertDescription>
                Supporting Student Learning Targets does not have a
                corresponding lesson.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </ModuleLayout>
    </CourseLayout>
  );
}

function Page({
  slt,
  lesson,
  moduleCode,
}: {
  slt: Slt | null | undefined;
  lesson: Lesson;
  moduleCode: string;
}) {
  const editor = new Editor({
    editable: false,
  });

  if (lesson && lesson.contentJson && typeof lesson.contentJson === "object") {
    editor.setContent(lesson.contentJson);
  }

  return (
    <>
      <div>
        <p className="text-base font-semibold leading-7 text-accent-foreground">
          {moduleCode}.{slt?.moduleIndex}: {slt?.sltText}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="text-xl leading-8">{lesson.description}</p>
      </div>
      {lesson.videoUrl && <VideoPlayer videoId={lesson.videoUrl} />}
      <div className="my-5">{lesson.contentJson && editor.render()}</div>
    </>
  );
}
