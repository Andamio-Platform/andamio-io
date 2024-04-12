import { Assignment, Slt } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Card } from "~/components/ui/card";
import useAssignment from "~/hooks/useAssignmentByCourseModule";
import useIntroduction from "~/hooks/useIntroduction";
import useSLT from "~/hooks/useSLT";
import useValidateCreator from "~/hooks/useValidateCreator";
import { Introduction, Module, ModuleSLT } from "~/types/db";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function PageCourseIntroductionContent({
  courseCode,
  courseModule,
}: {
  courseCode: string;
  courseModule: Module;
}) {
  const { data: sessionData } = useSession();

  const { introduction, isLoadingIntro } = useIntroduction(courseModule.id);

  const { isCreator } = useValidateCreator(sessionData, courseCode);

  if (isLoadingIntro) {
    return <LoadingCircle />;
  }

  return (
    <CourseLayout>
      {introduction && introduction.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
          <Page
            slts={courseModule.slts}
            introduction={introduction}
            moduleCode={courseModule.moduleCode}
          />
        </div>
      ) : introduction && !introduction.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-foreground">
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>introduction is not Live!</AlertTitle>
            <AlertDescription>
              Learners will not be able to see this introduction.
            </AlertDescription>
          </Alert>
          {isCreator && (
            <Page
              slts={courseModule.slts}
              introduction={introduction}
              moduleCode={courseModule.moduleCode}
            />
          )}
        </div>
      ) : isLoadingIntro ? (
        <Loading />
      ) : null}
    </CourseLayout>
  );
}

function Page({
  introduction,
  slts,
  moduleCode,
}: {
  introduction: Introduction;
  slts: ModuleSLT[];
  moduleCode: string;
}) {
  const editor = new Editor({
    editable: false,
  });

  if (
    introduction &&
    introduction.contentJson &&
    typeof introduction.contentJson === "object"
  ) {
    editor.setContent(introduction.contentJson);
  }

  if (!!introduction) {
    return (
      <>
        <div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {introduction.title}
          </h1>
          <p className="pb-10 text-xl leading-8">
            {introduction.description}
          </p>
          {introduction.videoUrl && <VideoPlayer videoId={introduction.videoUrl} />}
          <div className="bg-accent px-3 pb-1 pt-2">
            <h2>Student Learning Targets</h2>
            {slts.map((slt) => (
              <Card intent="slt" size="md" key={slt.id}>
                <p>
                  {moduleCode}.{slt.moduleIndex}{" "}
                </p>
                <div key={slt.moduleIndex} className="col-span-5">
                  {slt.sltText}
                </div>
              </Card>
            ))}
          </div>
        </div>
        {introduction.contentJson && editor.render()}
      </>
    );
  }
}
