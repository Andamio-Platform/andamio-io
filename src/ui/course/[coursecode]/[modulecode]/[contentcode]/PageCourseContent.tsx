import { api } from "~/utils/api";
import VideoPlayer from "~/components/media/VideoPlayer";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import Loading from "~/components/loading";
import Editor from "~/components/Editor";
import { useEffect, useState } from "react";
import { useCourseStore } from "~/lib/zustand/course";
import useContentVarient from "~/hooks/useContentVarient";
import mergeObjects from "~/utils/mergeObjects";
import useModule from "~/hooks/useModule";

export default function PageCourseContent({
  courseCode,
  moduleCode,
  contentCode,
}: {
  courseCode: string;
  moduleCode: string;
  contentCode: string;
}) {
  const [thisContent, setThisContent] = useState<any>();

  const { data: content, isLoading } = api.content.getContent.useQuery({
    courseCode,
    moduleCode,
    contentCode,
  });

  const courseVariant = useCourseStore((state) => state.courseVariant);

  const { contentVariant } = useContentVarient(content?.id, courseVariant?.id);

  const { module } = useModule(
    thisContent?.type == "OVERVIEW" && thisContent?.moduleId,
  );
  console.log(2, module);

  const editor = new Editor({
    editable: false,
    initialContent: "",
  });

  useEffect(() => {
    if (content) {
      const _content = contentVariant
        ? mergeObjects(contentVariant, content)
        : content;

      if (_content) {
        if (_content.contentJson) editor.setContent(_content.contentJson);

        setThisContent(_content);
      }
    }
  }, [content, contentVariant]);

  if (thisContent === undefined) return <></>;
  console.log(1, thisContent);

  return (
    <CourseLayout>
      <>
        {content === null && isLoading && <Loading />}
        {thisContent && (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
            <div>
              {thisContent.type != "OVERVIEW" && (
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  {thisContent.slt}
                </p>
              )}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {thisContent.title}
              </h1>
              <p className="text-xl leading-8">{thisContent.description}</p>
            </div>

            {thisContent.videoUrl && (
              <VideoPlayer videoId={thisContent.videoUrl} />
            )}

            {thisContent.contentJson && editor.render()}

            {/* todo styling, list of lessons */}
            {thisContent.type == "OVERVIEW" && module && (
              <>
                {module.contents
                  .filter((content) => content.type == "LESSON")
                  .map((content, i) => (
                    <div key={`content${i}`}>{content.slt}</div>
                  ))}
              </>
            )}
          </div>
        )}
      </>
    </CourseLayout>
  );
}
