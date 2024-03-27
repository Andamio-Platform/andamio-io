import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import DialogBox from "~/components/dialog";
import { Course, CourseOnChainInstance } from "~/types/db";
import { Network } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "~/components/form/form-input";
import { Form } from "~/components/ui/form";

export default function DialogCourseOnChain({
  dialogOpen,
  setDialogOpen,
  course,
  courseOnchain,
  selectedNetwork,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  course: Course;
  courseOnchain?: CourseOnChainInstance;
  selectedNetwork: Network;
}) {
  if (!course) return
  const ctx = api.useUtils();

  const { mutate: create, isLoading: isLoadingCreate } =
    api.courseOnChainInstance.create.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        toast.success("New on-chain configs added!");
        void ctx.courseOnChainInstance.getCourseOnchainInstances.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Course On-Chain Instance error. Please try again.");
        }
      },
    });

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.courseOnChainInstance.update.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        toast.success("Course updated!");
        void ctx.courseOnChainInstance.getCourseOnchainInstances.invalidate();
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

  // Todo: Add validation for CS, Addr, and UTxO types
  const FormSchema = z.object({
    network: z.nativeEnum(Network),
    courseRefAddress: z.string().optional(),
    assignmentAddress: z.string().optional(),
    creatorCS: z.string().optional(),
    facilitatorCS: z.string().optional(),
    learnerCS: z.string().optional(),
    moduleCS: z.string().optional(),
    courseRefUTxO: z.string().optional(),
    assignmentRefUTxO: z.string().optional(),
    moduleMintingRefUTxO: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      network: "PREPROD",
      courseRefAddress: "",
      assignmentAddress: "",
      creatorCS: "",
      facilitatorCS: "",
      learnerCS: "",
      moduleCS: "",
      courseRefUTxO: "",
      assignmentRefUTxO: "",
      moduleMintingRefUTxO: "",
    },
  });

  function onSubmit(data: FieldValues) {
    console.log(data);

    if(!course) return

    if (courseOnchain && courseOnchain.id) {
      update({
        id: courseOnchain.id,
        courseId: course.id,
        network: data.network,
        courseRefAddress: data.courseRefAddress,
        assignmentAddress: data.assignmentAddress,
        creatorCS: data.creatorCS,
        facilitatorCS: data.facilitatorCS,
        learnerCS: data.learnerCS,
        moduleCS: data.moduleCS,
        courseRefUTxO: data.courseRefUTxO,
        assignmentRefUTxO: data.assignmentRefUTxO,
        moduleMintingRefUTxO: data.moduleMintingRefUTxO,
      });
    } else {
      const _data = {
        courseId: course.id,
        network: selectedNetwork,
        courseRefAddress: data.courseRefAddress,
        assignmentAddress: data.assignmentAddress,
        creatorCS: data.creatorCS,
        facilitatorCS: data.facilitatorCS,
        learnerCS: data.learnerCS,
        moduleCS: data.moduleCS,
        courseRefUTxO: data.courseRefUTxO,
        assignmentRefUTxO: data.assignmentRefUTxO,
        moduleMintingRefUTxO: data.moduleMintingRefUTxO,
      };
      create(_data);
    }
  }

  useEffect(() => {
    if (dialogOpen && courseOnchain) {
      form.reset({
        network: courseOnchain.network ?? "PREPROD",
        courseRefAddress: courseOnchain.courseRefAddress ?? "",
        assignmentAddress: courseOnchain.assignmentAddress ?? "",
        creatorCS: courseOnchain.creatorCS ?? "",
        facilitatorCS: courseOnchain.facilitatorCS ?? "",
        learnerCS: courseOnchain.learnerCS ?? "",
        moduleCS: courseOnchain.moduleCS ?? "",
        courseRefUTxO: courseOnchain.courseRefUTxO ?? "",
        assignmentRefUTxO: courseOnchain.assignmentRefUTxO ?? "",
        moduleMintingRefUTxO: courseOnchain.moduleMintingRefUTxO ?? "",
      });
    }
  }, [dialogOpen]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogBox
          title={
            courseOnchain
              ? `Editing On-Chain Course Config ${courseOnchain.course.courseCode} ${courseOnchain.network} (${courseOnchain?.id})`
              : "On-Chain Course Config"
          }
          isForm={{
            buttonLabel: courseOnchain ? "Save" : "Create",
            buttonLoading: isLoadingCreate || isLoadingUpdate,
            buttonDisabled: isLoadingCreate || isLoadingUpdate,
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        >
          {courseOnchain && courseOnchain ? (
            <div className="mt-4 grid grid-cols-1 gap-y-4">
              <p className="text-xl font-bold">Network: {selectedNetwork}</p>
              <FormInput
                name="courseRefAddress"
                label="Course Reference Address"
                form={form}
              />
              <FormInput
                name="assignmentAddress"
                label="Assignment Address"
                form={form}
              />
              <FormInput
                name="creatorCS"
                label="Creator Currency Symbol"
                form={form}
              />
              <FormInput
                name="facilitatorCS"
                label="Facilitator Currency Symbol"
                form={form}
              />
              <FormInput
                name="learnerCS"
                label="Learning Currency Symbol"
                form={form}
              />
              <FormInput
                name="moduleCS"
                label="Module Currency Symbol"
                form={form}
              />
              <FormInput
                name="courseRefUTxO"
                label="Course Reference Reference UTxO"
                form={form}
              />
              <FormInput
                name="assignmentRefUTxO"
                label="Assignment Reference UTxO"
                form={form}
              />
              <FormInput
                name="moduleMintingRefUTxO"
                label="Module Minting Reference UTxO"
                form={form}
              />
              <p>Onchain Instance Id: {courseOnchain.id}</p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-y-4">
              <p className="text-xl font-bold">Network: {selectedNetwork}</p>
              <FormInput
                name="courseRefAddress"
                label="Course Reference Address"
                form={form}
              />
              <FormInput
                name="assignmentAddress"
                label="Assignment Address"
                form={form}
              />
              <FormInput
                name="creatorCS"
                label="Creator Currency Symbol"
                form={form}
              />
              <FormInput
                name="facilitatorCS"
                label="Facilitator Currency Symbol"
                form={form}
              />
              <FormInput
                name="learnerCS"
                label="Learning Currency Symbol"
                form={form}
              />
              <FormInput
                name="moduleCS"
                label="Module Currency Symbol"
                form={form}
              />
              <FormInput
                name="courseRefUTxO"
                label="Course Reference Reference UTxO"
                form={form}
              />
              <FormInput
                name="assignmentRefUTxO"
                label="Assignment Reference UTxO"
                form={form}
              />
              <FormInput
                name="moduleMintingRefUTxO"
                label="Module Minting Reference UTxO"
                form={form}
              />
            </div>
          )}
        </DialogBox>
      </form>
    </Form>
  );
}
