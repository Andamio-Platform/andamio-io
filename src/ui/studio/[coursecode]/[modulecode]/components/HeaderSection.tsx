import {
  type Assignment,
  type Course,
  type Introduction,
  type Lesson,
  type CourseModuleOverview,
  type ModuleSLT,
} from "~/types/db";

import { type FieldValues } from "react-hook-form";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import CardSLT from "~/ui/studio/components/slt/CardSLT";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";
import ContentEditorMenuBar from "./ContentEditorMenuBar";

type CourseContent = Lesson | Assignment | Introduction;

export default function HeaderSection({
  form,
  course,
  courseModule,
  editContent,
  setEditContent,
  isLoadingUpdate,
  onCancel,
  onSubmit,
  slt,
  courseContent,
  intent,
  setGetLessonPlanDialogOpen,
}: {
  form: FieldValues;
  course: Course;
  courseModule: CourseModuleOverview;
  editContent: boolean;
  setEditContent: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingUpdate: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  slt?: ModuleSLT;
  courseContent: CourseContent;
  intent: "lesson" | "assignment" | "introduction";
  setGetLessonPlanDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!course || !courseContent) return;

  let liveContentPath = "";
  // add logic here
  if (intent === "lesson" && slt) {
    liveContentPath = `lesson/${slt.moduleIndex.toString()}`;
  }

  // Fix this one
  if (intent === "assignment") {
    liveContentPath = `assignment/${courseModule.assignments[0]?.assignmentCode}`;
  }

  if (intent === "introduction") {
    liveContentPath = "";
  }

  return (
    <div className="flex flex-col">
      <div className="flex min-h-[40px] flex-row items-center justify-between bg-card p-5">
        <div className="flex items-center gap-5">
          <ToggleEditableField
            name="title"
            form={form}
            intent="title"
            formTextSize="lg"
            editText={editContent}
            setEditText={setEditContent}
            text={courseContent.title ?? "Edit this lesson title"}
            hasForm={true}
            placeholder="Lesson Title"
          />
        </div>
        {slt && (
          <CardSLT
            moduleCode={courseModule.moduleCode}
            moduleIndex={slt.moduleIndex}
            sltText={slt.sltText}
          />
        )}
        {intent === "assignment" && (
          <h2 className="text-xl font-semibold">
            Assignment for Module {courseModule.moduleCode}
          </h2>
        )}
        {intent === "introduction" && (
          <h2 className="text-xl font-semibold">
            Introduction for Module {courseModule.moduleCode}
          </h2>
        )}
      </div>
      <div className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
        <ContentEditorMenuBar
          form={form}
          course={course}
          courseModule={courseModule}
          contentPath={liveContentPath}
          onSubmit={onSubmit}
          setGetLessonPlanDialogOpen={setGetLessonPlanDialogOpen}
        />
        <ControlPanel
          editContent={editContent}
          isLoadingUpdate={isLoadingUpdate}
          onCancel={onCancel}
          courseCode={course.courseCode}
          moduleCode={courseModule.moduleCode}
          contentPath={liveContentPath}
          live={courseContent.live}
        />
      </div>
    </div>
  );
}
