import { api } from "~/utils/api";
import ReactHtmlParser from "react-html-parser";
import VideoPlayer from "~/components/media/VideoPlayer";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import Loading from "~/components/loading";
import Editor from "~/components/Editor";
import { useEffect } from "react";

export default function PageCourseContent({
  courseCode,
  moduleCode,
  contentCode,
}: {
  courseCode: string;
  moduleCode: string;
  contentCode: string;
}) {
  const { data: content, isLoading } = api.content.getContent.useQuery({
    courseCode,
    moduleCode,
    contentCode,
  });

  const editor = new Editor({
    editable: false,
    initialContent: "",
  });

  useEffect(() => {
    if (content) {
      if (content.contentJson) {
        //@ts-expect-error todo fix this
        editor.setContent(content.contentJson);
      }
    }
  }, [content]);

  return (
    <CourseLayout>
      <>
        {content === null && isLoading && <Loading />}
        {content && (
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
            <div>
              <p className="text-base font-semibold leading-7 text-indigo-600">
                {content.slt}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {content.title}
              </h1>
              <p className="text-xl leading-8">{content.description}</p>
            </div>

            {content.videoUrl && <VideoPlayer videoId={content.videoUrl} />}

            {content.contentHtml &&
              // <div className="prose max-w-2xl lg:prose-xl">
              //   {ReactHtmlParser(content.contentHtml)}
              // </div>
              editor.render()}
          </div>
        )}
      </>
    </CourseLayout>
  );
}
