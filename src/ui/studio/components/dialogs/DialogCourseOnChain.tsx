import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useCallback, useEffect } from "react";
import { type Course, type CourseOnChainInstance } from "~/types/db";
import { Network } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "~/components/form/form-input";
import { Form } from "~/components/ui/form";
import DialogForm from "~/components/form/dialog-form";

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
    LocalStateValidatorAddress: z.string().optional(),
    CourseCreatorNFTPolicyID: z.string().optional(),
    LocalStatePolicyID: z.string().optional(),
    CourseInstanceUTxO: z.string().optional(),
    LocalStatePolicyRefUTxO: z.string().optional(),
    AssignmentValidatorAddress: z.string().optional(),
    ModuleValidatorAddress: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      network: "PREPROD",
      LocalStateValidatorAddress: "",
      CourseCreatorNFTPolicyID: "",
      LocalStatePolicyID: "",
      CourseInstanceUTxO: "",
      LocalStatePolicyRefUTxO: "",
      AssignmentValidatorAddress: "",
      ModuleValidatorAddress: "",
    },
  });

  function onSubmit(data: FieldValues) {
    console.log(data);

    if (!course) return;

    if (courseOnchain && courseOnchain.id) {
      update({
        id: courseOnchain.id,
        courseCode: course.courseCode,
        network: data.network,
        LocalStateValidatorAddress: data.LocalStateValidatorAddress,
        CourseCreatorNFTPolicyID: data.CourseCreatorNFTPolicyID,
        LocalStatePolicyID: data.LocalStatePolicyID,
        CourseInstanceUTxO: data.CourseInstanceUTxO,
        LocalStatePolicyRefUTxO: data.LocalStatePolicyRefUTxO,
        AssignmentValidatorAddress: data.AssignmentValidatorAddress,
        ModuleValidatorAddress: data.ModuleValidatorAddress,
      });
    } else {
      const _data = {
        courseCode: course.courseCode,
        network: selectedNetwork,
        LocalStateValidatorAddress: data.LocalStateValidatorAddress,
        CourseCreatorNFTPolicyID: data.CourseCreatorNFTPolicyID,
        LocalStatePolicyID: data.LocalStatePolicyID,
        CourseInstanceUTxO: data.CourseInstanceUTxO,
        LocalStatePolicyRefUTxO: data.LocalStatePolicyRefUTxO,
        AssignmentValidatorAddress: data.AssignmentValidatorAddress,
        ModuleValidatorAddress: data.ModuleValidatorAddress,
      };
      create(_data);
    }
  }

  const resetForm = useCallback(() => {
    form.reset({
      network: courseOnchain?.network ?? "PREPROD",
      LocalStateValidatorAddress:
        courseOnchain?.LocalStateValidatorAddress ?? "",
      CourseCreatorNFTPolicyID: courseOnchain?.CourseCreatorNFTPolicyID ?? "",
      LocalStatePolicyID: courseOnchain?.LocalStatePolicyID ?? "",
      CourseInstanceUTxO: courseOnchain?.CourseInstanceUTxO ?? "",
      LocalStatePolicyRefUTxO: courseOnchain?.LocalStatePolicyRefUTxO ?? "",
      AssignmentValidatorAddress:
        courseOnchain?.AssignmentValidatorAddress ?? "",
      ModuleValidatorAddress: courseOnchain?.ModuleValidatorAddress ?? "",
    });
  }, [form, courseOnchain]);

  useEffect(() => {
    if (dialogOpen && courseOnchain) {
      resetForm();
    }
  }, [dialogOpen, courseOnchain, resetForm]);

  return (
    <Form {...form}>
      <DialogForm
        openButton={
          courseOnchain ? "Update Network Config" : "Add Network Config"
        }
        openButtonIntent="dialog"
        title={
          courseOnchain
            ? `Editing On-Chain Course Config ${courseOnchain.course.courseCode} ${courseOnchain.network} (${courseOnchain?.id})`
            : "On-Chain Course Config"
        }
        buttonLabel={courseOnchain ? "Save" : "Create"}
        buttonLoading={isLoadingCreate || isLoadingUpdate}
        buttonDisabled={isLoadingCreate || isLoadingUpdate}
        handleSubmit={form.handleSubmit(onSubmit)}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      >
        {courseOnchain && courseOnchain ? (
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <p className="text-xl font-bold">Network: {selectedNetwork}</p>
            <FormInput
              name="LocalStateValidatorAddress"
              label="LocalStateValidatorAddress"
              form={form}
            />
            <FormInput
              name="CourseCreatorNFTPolicyID"
              label="CourseCreatorNFTPolicyID"
              form={form}
            />
            <FormInput
              name="LocalStatePolicyID"
              label="LocalStatePolicyID"
              form={form}
            />
            <FormInput
              name="CourseInstanceUTxO"
              label="CourseInstanceUTxO"
              form={form}
            />
            <FormInput
              name="LocalStatePolicyRefUTxO"
              label="LocalStatePolicyRefUTxO"
              form={form}
            />
            <FormInput
              name="AssignmentValidatorAddress"
              label="AssignmentValidatorAddress"
              form={form}
            />
            <FormInput
              name="ModuleValidatorAddress"
              label="ModuleValidatorAddress"
              form={form}
            />
            <p>Onchain Instance Id: {courseOnchain.id}</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <p className="text-xl font-bold">Network: {selectedNetwork}</p>
            <FormInput
              name="LocalStateValidatorAddress"
              label="LocalStateValidatorAddress"
              form={form}
            />
            <FormInput
              name="CourseCreatorNFTPolicyID"
              label="CourseCreatorNFTPolicyID"
              form={form}
            />
            <FormInput
              name="LocalStatePolicyID"
              label="LocalStatePolicyID"
              form={form}
            />
            <FormInput
              name="CourseInstanceUTxO"
              label="CourseInstanceUTxO"
              form={form}
            />
            <FormInput
              name="LocalStatePolicyRefUTxO"
              label="LocalStatePolicyRefUTxO"
              form={form}
            />
            <FormInput
              name="AssignmentValidatorAddress"
              label="AssignmentValidatorAddress"
              form={form}
            />
            <FormInput
              name="ModuleValidatorAddress"
              label="ModuleValidatorAddress"
              form={form}
            />
          </div>
        )}
      </DialogForm>
    </Form>
  );
}
