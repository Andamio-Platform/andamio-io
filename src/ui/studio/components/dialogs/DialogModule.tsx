import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { Course, Module } from "~/types/db";
import { Button } from "~/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/form-input";
import { useEffect } from "react";
import DialogForm from "~/components/form/dialog-form";

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
  if (!course) return;
  const ctx = api.useUtils();

  // Todo: Implement Course Variants
  // const [currentCourseVariant, setCurrentCourseVariant] = useState<
  //   CourseVariant | undefined
  // >(undefined);
  // const [currentModuleVariant, setCurrentModuleVariant] = useState<
  //   ModuleVariant | undefined
  // >(undefined);

  // const { data: courseVariants } = api.courseVariant.getCourseVariants.useQuery(
  //   {
  //     courseId: course ? course.id : "",
  //   },
  //   {
  //     enabled: course ? true : false,
  //   },
  // );

  // const { listCourseVariant, selectedVariantName, setSelectedVariantName } =
  //   useCourseVariants(course?.id);

  console.log("check902", module)

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

  // Implement Module Variants
  // const { mutate: moduleVariantUpsert, isLoading: isLoadingVariantUpsert } =
  //   api.moduleVariant.upsert.useMutation({
  //     onSuccess: () => {
  //       setModuleDialogOpen(false);
  //       toast.success("Module variant updated!");
  //       void ctx.moduleVariant.getModuleVariants.invalidate({
  //         moduleId: module ? module.id : "",
  //       });
  //     },
  //     onError: (e) => {
  //       const errorMessage = e.data?.zodError?.fieldErrors;
  //       if (errorMessage) {
  //         toast.error("Some inputs are missing or invalid");
  //       } else {
  //         toast.error("Please try again.");
  //       }
  //     },
  //   });

  const FormSchema = z.object({
    moduleCode: z.string().min(3).max(3),
    title: z.string().min(8),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      moduleCode: "",
      title: "",
      description: "",
    },
  });

  function onSubmit(data: FieldValues) {
    if (course) {
      if (module) {
        moduleUpdate({
          moduleId: module.id,
          courseCode: course.courseCode,
          moduleCode: data.moduleCode,
          title: data.title,
          description: data.description,
        });
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

  useEffect(() => {
    console.log("check901")
    form.reset({
      moduleCode: module?.moduleCode ?? "",
      title: module?.title ?? "",
      description: module?.description ?? "",
    });
  }, [moduleDialogOpen, module]);

  return (
    <Form {...form}>
      <DialogForm
        openButton={module ? "moduleSettings" : "Add Module"}
        openButtonIntent="dialog"
        title={module ? `Editing ${module.title}` : "Create a new module"}
        buttonLabel={module ? "Save" : "Create"}
        buttonLoading={isLoadingCreate || isLoadingUpdate}
        buttonDisabled={isLoadingCreate || isLoadingUpdate}
        handleSubmit={form.handleSubmit(onSubmit)}
        isOpen={moduleDialogOpen}
        setIsOpen={setModuleDialogOpen}
      >
        <p>
          {module
            ? "You are editing a module. Make changes and click 'Save'."
            : "Create a new module by filling in the details below."}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <FormInput name="title" label="Module Title" form={form} />

          <FormInput
            name="description"
            label="Module Description"
            form={form}
          />

          <FormInput
            name="moduleCode"
            label="Module Code"
            form={form}
            disabled={false}
          />

          {module && (
            <div className="flex items-center gap-2">
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
      </DialogForm>
    </Form>
  );
}
