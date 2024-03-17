import Button from "~/components/button";
import Row from "./Row";
import { Course, Module, ModuleSLT } from "~/types/db";
import DialogSLTDelete from "../dialogs/DialogSLTDelete";
import { useEffect, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import Input from "~/components/form/input";
import Link from "next/link";

export default function RowSLT({
  course,
  module,
  slt,
}: {
  course: Course;
  module: Module;
  slt: ModuleSLT;
}) {
  const ctx = api.useUtils();
  const { register, handleSubmit, reset } = useForm();
  const [sltDeleteDialogOpen, setSltDeleteDialogOpen] =
    useState<boolean>(false);
  const [editSltText, setEditSltText] = useState<boolean>(false);
  //   const [sltText, setSltText] = useState("");

  const lessonCode = module.moduleCode + slt.moduleIndex

  const { mutate: sltTextUpdate, isLoading: isLoadingUpdate } =
    api.slt.update.useMutation({
      onSuccess: (data) => {
        toast.success("Student Learning Target updated!");
        setEditSltText(false);
        void ctx.slt.getModuleSLTs.invalidate({
          moduleCode: module.moduleCode,
        });
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some SLT inputs are missing or invalid");
        } else {
          toast.error("SLT ID taken. Please try again.");
        }
      },
    });

  // Bring back Field Values from react-hook-form + clean this up
  function onSubmit(data: FieldValues) {
    sltTextUpdate({
      id: slt.id,
      moduleId: slt.moduleId,
      moduleIndex: slt.moduleIndex,
      sltText: data.sltText,
    });
  }

  useEffect(() => {
    const _currentSLT = {
      moduleIndex: slt.moduleIndex,
      moduleId: slt.moduleId,
      moduleCode: module.moduleCode,
      sltText: slt.sltText,
    };

    reset(_currentSLT);
  }, [editSltText]);

  return (
    <>
      <DialogSLTDelete
        sltDeleteDialogOpen={sltDeleteDialogOpen}
        setSltDeleteDialogOpen={setSltDeleteDialogOpen}
        slt={slt}
        course={course}
        module={module}
      />
      {module && (
        <Row
          key={`${module.moduleCode}-${slt.moduleIndex}`}
          c1={
            <div className="flex flex-row gap-1">
              <button>up</button>
              <button>down</button>
              <p>
                SLT {module.moduleCode}.{slt.moduleIndex}
              </p>
            </div>
          }
          c2={
            <>
              <div className="flex flex-row gap-2">
                <Button onClick={() => setEditSltText(!editSltText)}>U</Button>
                {editSltText ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row gap-5">
                      <Input name="sltText" register={register} />
                      <Button type="submit">done</Button>
                    </div>
                  </form>
                ) : (
                  <p>{slt.sltText}</p>
                )}
              </div>
            </>
          }
          c3={<Link href={`/studio/${course.courseCode}/${module.moduleCode}/lesson/${lessonCode}`}><Button>Edit Lesson</Button></Link>}
          c4={
            <>
              <Button
                onClick={() => {
                  setSltDeleteDialogOpen(true);
                }}
              >
                Delete SLT
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
