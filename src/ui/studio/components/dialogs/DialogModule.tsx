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
import { useEffect, useState } from "react";
import DialogForm from "~/components/form/dialog-form";
import FormSelect from "~/components/form/form-select";
import useModule from "~/hooks/useModule";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import useCourseModules from "~/hooks/useCourseModules";

type ModuleOption = {
  value: string;
  label: string;
};

export default function DialogModule({
  moduleDialogOpen,
  setModuleDialogOpen,
  moduleCode,
  course,
}: {
  moduleDialogOpen: boolean;
  setModuleDialogOpen: (open: boolean) => void;
  moduleCode: string;
  course: Course;
}) {
  if (!course) return;
  const ctx = api.useUtils();

  // 2024-03-08
  // MUST FIX THIS TYPE
  const { courseModule, isLoadingModule } = useModuleByCourse(course.courseCode, moduleCode)
  const { courseModules } = useCourseModules(course.courseCode)
  const [newModuleCodeOptions, setNewModuleCodeOptions] = useState<ModuleOption[]>([])

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

  console.log("check902", module);

  const { mutate: moduleCreate, isLoading: isLoadingCreate } =
    api.module.create.useMutation({
      onSuccess: () => {
        setModuleDialogOpen(false);
        toast.success("Module created!");
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
        void ctx.course.getCourse.invalidate({
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

  // Given a list of currentModuleCodes like this:
  // currentModuleCodes = ["101", "102", "201", "301", "302"]
  // Create a set of options in a drop-down menu for moduleCode, in the format
  // newModuleCodeOptions: {value: string, label: string}[] = []
  // Options should be:
  // - the next 100-level module
  // - the next 200-level module
  // - the next 300-level module
  // - a custom choice
  //
  // Example:
  // If the current list of modules is ["101", "102", "201"], then the output should be:
  // [{value: "103", label: "103"}, {value: "202", label: "202"}, {value: "301", label: "301"}]

  useEffect(() => {
    if(courseModules) {
      const currentModuleCodes = courseModules.map((m) => m.moduleCode);
      const _newModuleCodeOptions = makeModuleOptions(currentModuleCodes);
      if(_newModuleCodeOptions) {
        setNewModuleCodeOptions(_newModuleCodeOptions)
      }
    }
  }, [moduleDialogOpen, courseModules, courseModule, course]);


  useEffect(() => {
    form.reset({
      moduleCode: courseModule?.moduleCode ?? "",
      title: courseModule?.title ?? "",
      description: courseModule?.description ?? "",
    });
  }, [moduleDialogOpen, courseModule, newModuleCodeOptions]);


  return (
    <Form {...form}>
      <DialogForm
        openButton={moduleCode ? "moduleSettings" : "Add Module"}
        openButtonIntent="dialog"
        title={courseModule ? `Editing ${courseModule?.title}` : "Create a new module"}
        buttonLabel={courseModule ? "Save" : "Create"}
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

          <FormSelect
            name="moduleCode"
            label="Select a suggested Module Code"
            form={form}
            options={newModuleCodeOptions}
          />
          <FormInput
            name="moduleCode"
            label="Or write your own custom code"
            info="The Module Code is a 3-character string that appears in the course URL"
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



function incrementCode(code: string): string {
  const lastChar = code.charAt(code.length - 1);
  let newLastChar;
  if (/\d/.test(lastChar)) {
    // If the last character is a digit
    newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
  } else if (/[A-Y]/.test(lastChar)) {
    // If the last character is a letter from A to Y
    newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
  } else {
    newLastChar = "H";
  }
  return code.substring(0, code.length - 1) + newLastChar;
}

function makeModuleOptions(currentModuleCodes: string[]): ModuleOption[] {

  if (currentModuleCodes.length === 0) {
    return [
      { value: "101", label: "101" },
      { value: "201", label: "201" },
      { value: "301", label: "301" },
    ];
  }

  const sortedCodes = currentModuleCodes.sort();
  const uniqueCategories = [
    ...new Set(sortedCodes.map((code) => code.substring(0, 2))),
  ];



  const newModuleCodeOptions: ModuleOption[] = uniqueCategories.map(
    (category) => {
      const codesInCategory = sortedCodes.filter((code) =>
        code.startsWith(category),
      );
      const lastCode = codesInCategory[codesInCategory.length - 1] ?? "";
      const nextCode = incrementCode(lastCode);
      return { value: nextCode, label: nextCode };
    },
  );

  const lastCode = sortedCodes[sortedCodes.length - 1];
  if (lastCode && lastCode.startsWith("1")) {
    newModuleCodeOptions.push({ value: "201", label: "201" }, { value: "301", label: "301" });
  } else if (lastCode && lastCode.startsWith("2")) {
    newModuleCodeOptions.push({ value: "301", label: "301" });
  }

  return newModuleCodeOptions;
}
