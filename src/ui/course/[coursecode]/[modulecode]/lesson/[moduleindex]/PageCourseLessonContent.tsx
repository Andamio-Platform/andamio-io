import { Lesson, Slt } from "@prisma/client";
import { AlertTriangle, Leaf } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import RenderEditor from "~/components/Editor/components/render/RenderEditor";
import { ChatContainer } from "~/components/chat/chat-container";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import Metatags from "~/components/site/metatags";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useLesson from "~/hooks/useLesson";
import useSLT from "~/hooks/useSLT";
import useValidateCreator from "~/hooks/useValidateCreator";
import { Module } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import ModuleLayout from "~/ui/course/components/layout/ModuleLayout";
import CourseNavigation from "~/ui/course/components/ui/CourseNavigation";
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

  const learnerId = sessionData?.user.learnerId;
  const learnerLessons = sessionData?.user.lessonIds;

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
        // Handle error
      },
    });

  useEffect(() => {
    if (learnerId && lesson && !learnerLessons?.includes(lesson.id)) {
      addLessonToLearner({
        learnerId: learnerId,
        lessonId: lesson.id,
      });
    }
  }, [learnerId, lesson, learnerLessons, addLessonToLearner]);

  const { isCreator } = useValidateCreator(sessionData, courseCode);

  const { slt, isLoadingSLT } = useSLT(
    courseCode,
    courseModule.moduleCode,
    parseInt(moduleIndex),
  );

  return (
    <CourseLayout>
      <ModuleLayout courseCode={courseCode} courseModule={courseModule}>
        <Metatags title={lesson?.title ?? undefined} />
        {lesson && lesson.live ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
            <Page
              slt={slt}
              lesson={lesson}
              moduleCode={courseModule.moduleCode}
            />
            <CourseNavigation
              courseCode={courseCode}
              courseModule={courseModule}
              moduleIndex={moduleIndex}
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
  // Next Step:
  // Use this pattern in all Course and Studio Routes
  if (lesson && lesson.contentJson && typeof lesson.contentJson === "object") {
    const editor = RenderEditor({
      editable: false,
      initialContent: lesson?.contentJson,
      index: lesson?.sltId,
    });

    return (
      <>
        <div>
          <p className="text-base font-semibold leading-7 text-accent-foreground">
            {moduleCode}.{slt?.moduleIndex}: {slt?.sltText}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {lesson.title}
          </h1>
          {/* <p className="text-xl leading-8">{lesson.description}</p> */}
        </div>
        {lesson.videoUrl && <VideoPlayer videoId={lesson.videoUrl} />}
        <div className="my-5">{editor}</div>
        <div className="my-5">
          <ChatContainer roomId={lesson.id} />
        </div>
      </>
    );
  }
}
