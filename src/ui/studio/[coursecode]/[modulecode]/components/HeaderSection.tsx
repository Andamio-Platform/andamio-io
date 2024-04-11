import {
  Assignment,
  Course,
  Introduction,
  Lesson,
  Module,
  ModuleSLT,
} from "~/types/db";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "~/components/ui/menubar";

import { useForm, FieldValues } from "react-hook-form";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import CardSLT from "~/ui/studio/components/slt/CardSLT";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import VideoLink from "~/ui/studio/components/form-sections/VideoLink";
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
  intent
}: {
  form: FieldValues;
  course: Course;
  courseModule: Module;
  editContent: boolean;
  setEditContent: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingUpdate: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  slt?: ModuleSLT;
  courseContent: CourseContent
  intent: "lesson" | "assignment" | "introduction"
}) {
  if (!course || !courseContent) return;

  let liveContentPath = ""
  // add logic here
  if(intent === "lesson" && slt) {
    liveContentPath = `lesson/${slt.moduleIndex.toString()}`
  }

  // Fix this one
  if(intent === "assignment") {
    liveContentPath = `assignment`
  }

  if(intent === "introduction") {
    liveContentPath = ""
  }

  return (
    <div className="flex flex-col">
      <div className="flex min-h-[40px] flex-row items-center justify-between bg-card p-5">
        <div className="flex items-center">
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
      </div>
      <div className="flex flex-row items-center justify-between bg-primary text-primary-foreground">
        <ContentEditorMenuBar
          form={form}
          course={course}
          courseModule={courseModule}
          onSubmit={onSubmit}
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
