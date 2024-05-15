import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "~/components/ui/form";
import DialogForm from "~/components/form/dialog-form";
import FormInput from "~/components/form/form-input";
import { AssignmentCommitment } from "~/types/db";
import { useSession } from "next-auth/react";

export default function DialogAssignmentCommitment({
  assignmentId,
  assignmentCommitment,
}: {
  assignmentId: string;
  assignmentCommitment?: AssignmentCommitment;
}) {
  const ctx = api.useUtils();
  const { update: updateSession } = useSession()

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: create, isLoading: isLoadingCreate } =
    api.assignmentCommitment.create.useMutation({
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Successfully committed to Assignment");
        void ctx.assignmentCommitment.getLearnerCommitments.invalidate();
        void ctx.assignmentCommitment.getAssignmentCommitments.invalidate();
        void updateSession()
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Error committing to Assignment");
        }
      },
    });

  const { mutate: updateEvidence, isLoading: isLoadingUpdate } =
    api.assignmentCommitment.addEvidence.useMutation({
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Successfully added evidence to Assignment");
        void ctx.assignmentCommitment.getLearnerCommitments.invalidate();
        void ctx.assignmentCommitment.getAssignmentCommitments.invalidate();
        void updateSession()
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error(JSON.stringify(errorMessage));
        } else {
          toast.error("Error updating the Assignment");
        }
      },
    });

  const FormSchema = z.object({
    evidenceString: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      evidenceString: assignmentCommitment?.evidenceString ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Check701", assignmentCommitment);

    if (assignmentCommitment) {
      updateEvidence({
        assignmentCommitmentId: assignmentCommitment.assignmentCommitmentId,
        evidenceString: data.evidenceString ?? "",
      });
    } else {
      create({
        assignmentId: assignmentId,
        evidenceString: data.evidenceString ?? "",
      });
    }
  }

  useEffect(() => {
    if (assignmentId) {
      form.reset({
        evidenceString: assignmentCommitment?.evidenceString ?? "",
      });
    }
  }, [assignmentId]);

  return (
    <Form {...form}>
      <DialogForm
        openButton={
          assignmentCommitment ? "Update Commitment" : "Commit Off-Chain"
        }
        openButtonIntent="dialog"
        title={
          assignmentCommitment ? "Update Evidence" : "Commit to Assignment"
        }
        description={
          assignmentCommitment
            ? "Evidence can be a text string. Refer to the Assignment for details."
            : `Commit to Assignment ${assignmentId}. You can add evidence now or come back and update it later.`
        }
        buttonLabel={
          assignmentCommitment ? "Update Evidence" : "Commit to Assignment"
        }
        buttonLoading={isLoadingCreate || isLoadingUpdate}
        buttonDisabled={isLoadingCreate || isLoadingUpdate}
        handleSubmit={form.handleSubmit(onSubmit)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="mt-4 grid grid-cols-1 gap-4">
          <FormInput
            name="evidenceString"
            label="Assignment Evidence String"
            placeholder={assignmentCommitment?.evidenceString}
            form={form}
          />
        </div>
      </DialogForm>
    </Form>
  );
}
