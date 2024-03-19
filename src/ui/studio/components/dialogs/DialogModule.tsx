import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Textarea from "~/components/form/textarea";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, CourseVariant, Module, ModuleVariant } from "~/types/db";
import { Button } from "~/components/ui/button";
import FormLabel from "~/components/form/form-label";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Tabs from "~/components/tabs";
import useCourseVariants from "~/hooks/useCourseVariants";

export default function DialogModule({
  moduleDialogOpen,
  setModuleDialogOpen,
  module,
  course,
}: {
  moduleDialogOpen: boolean;
  setModuleDialogOpen: (open: boolean) => void;
  module?: Module;
  course: Course;
}) {
  const ctx = api.useUtils();

  const { register, handleSubmit, reset } = useForm();

  const [currentCourseVariant, setCurrentCourseVariant] = useState<
    CourseVariant | undefined
  >(undefined);
  const [currentModuleVariant, setCurrentModuleVariant] = useState<
    ModuleVariant | undefined
  >(undefined);

  const { data: courseVariants } = api.courseVariant.getCourseVariants.useQuery(
    {
      courseId: course ? course.id : "",
    },
    {
      enabled: course ? true : false,
    },
  );

  const { listCourseVariant, selectedVariantName, setSelectedVariantName } =
    useCourseVariants(course?.id);

  const { data: moduleVariants } = api.moduleVariant.getmoduleVariants.useQuery(
    {
      moduleId: module ? module.id : "",
    },
    {
      enabled: module ? true : false,
    },
  );

  const { mutate: moduleCreate, isLoading: isLoadingCreate } =
    api.module.create.useMutation({
      onSuccess: () => {
        setModuleDialogOpen(false);
        toast.success("Module created!");
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Module Code taken. Please try again.");
        }
      },
    });

  const { mutate: moduleUpdate, isLoading: isLoadingUpdate } =
    api.module.update.useMutation({
      onSuccess: () => {
        setModuleDialogOpen(false);
        toast.success("Module updated!");
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });

  const { mutate: moduleDelete, isLoading: isLoadingDelete } =
    api.module.delete.useMutation({
      onSuccess: () => {
        setModuleDialogOpen(false);
        toast.success("Module created!");
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Module Code taken. Please try again.");
        }
      },
    });

  const { mutate: moduleVariantUpsert, isLoading: isLoadingVariantUpsert } =
    api.moduleVariant.upsert.useMutation({
      onSuccess: () => {
        setModuleDialogOpen(false);
        toast.success("Module variant updated!");
        void ctx.moduleVariant.getmoduleVariants.invalidate({
          moduleId: module ? module.id : "",
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Please try again.");
        }
      },
    });

  function onSubmit(data: FieldValues) {
    if (course) {
      if (module) {
        if (selectedVariantName != "main" && currentCourseVariant) {
          moduleVariantUpsert({
            courseVariantId: currentCourseVariant.id,
            moduleId: module.id,
            moduleVariantId: currentModuleVariant
              ? currentModuleVariant.id
              : "",
            title: data.title,
            description: data.description,
          });
        } else {
          moduleUpdate({
            moduleId: module.id,
            courseCode: course.courseCode,
            moduleCode: data.moduleCode,
            title: data.title,
            description: data.description,
          });
        }
      } else {
        moduleCreate({
          courseId: course.id,
          moduleCode: data.moduleCode,
          title: data.title,
          description: data.description,
        });
      }
    }
  }

  function clearForm(moduleCode = "") {
    reset({
      moduleCode: moduleCode,
      title: "",
      description: "",
    });
  }

  useEffect(() => {
    if (moduleDialogOpen) {
      if (selectedVariantName != "main") {
        let found = false;

        if (courseVariants) {
          courseVariants.find((x: CourseVariant) => {
            if (x.variantCode === selectedVariantName) {
              setCurrentCourseVariant(x);
            }
          });
        }

        if (moduleVariants) {
          const _moduleVariant = moduleVariants.find(
            (x: ModuleVariant) =>
              x.courseVariant.variantCode == selectedVariantName,
          );
          if (_moduleVariant) {
            reset(_moduleVariant);
            setCurrentModuleVariant(_moduleVariant);
            found = true;
          }
        }

        if (!found) {
          if (module) {
            clearForm(module.moduleCode);
          } else {
            clearForm();
          }
        }
      } else {
        if (module) {
          reset(module);
        }
      }
    } else {
      clearForm();
    }
  }, [moduleDialogOpen, selectedVariantName]);

  return (
    <DialogBox
      title={module ? `Editing ${module.title}` : "Create a new module"}
      isForm={{
        buttonLabel: module ? "Save" : "Create",
        buttonLoading:
          isLoadingCreate || isLoadingUpdate || isLoadingVariantUpsert,
        buttonDisabled:
          isLoadingCreate || isLoadingUpdate || isLoadingVariantUpsert,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={moduleDialogOpen}
      setOpen={setModuleDialogOpen}
    >
      <DialogParagraph>
        {module
          ? "You are editing a module. Make changes and click 'Save'."
          : "Create a new module by filling in the details below."}
      </DialogParagraph>

      <Tabs
        tabs={listCourseVariant}
        current={selectedVariantName}
        onChange={setSelectedVariantName}
      />

      <div className="mt-4 grid grid-cols-1 gap-y-4">
        <FormFieldset label="Module title">
          <Input name="title" register={register} />
        </FormFieldset>

        <FormFieldset label="Module description">
          <Textarea name="description" register={register} rows={8} />
        </FormFieldset>

        <FormFieldset label="Module code">
          <Input
            name="moduleCode"
            register={register}
            disabled={selectedVariantName != "main"}
          />
        </FormFieldset>

        {module && (
          <div className="flex items-center gap-2">
            <FormLabel>Delete this module</FormLabel>
            <div className="grow"></div>
            <Button
              type="button"
              disabled={isLoadingDelete}
              color="red"
              onClick={() =>
                // todo: change this is are you sure
                moduleDelete({
                  moduleId: module.id,
                })
              }
            >
              {isLoadingDelete ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>Delete</>
              )}
            </Button>
          </div>
        )}
      </div>
    </DialogBox>
  );
}
