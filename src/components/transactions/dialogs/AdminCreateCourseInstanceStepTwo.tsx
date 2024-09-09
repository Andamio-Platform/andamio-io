import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress } from "@meshsdk/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "~/components/form/form-input";
import { Form } from "~/components/ui/form";
import SuccessTxModalContent from "../SuccessTxComponent";
import FormLabel from "~/components/form/form-label";
import StepTwoDeployReferenceScripts from "../admin/StepTwoDeployReferenceScripts";

export default function AdminCreateCourseInstanceStepOne() {
  const address = useAddress();
  const [courseNftPolicyId, setCourseNftPolicyId] = useState<
    string | undefined
  >(undefined);

  const [successTxHash, setSuccessTxHash] = useState<string | undefined>(
    undefined,
  );

  const FormSchema = z.object({
    courseNftPolicy: z.string().min(56, {
      message: "Policy Id should be 56 characters",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      courseNftPolicy: "",
    },
  });

  const { register, watch } = form;

  const policyId = watch("courseNftPolicy");

  function onSubmit() {
    if (policyId.length > 1) {
      setCourseNftPolicyId(policyId);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex w-full cursor-pointer flex-row items-center gap-8 rounded-md border border-foreground bg-primary px-8 py-2 text-primary-foreground">
          Step 2: Deploy Reference Scripts
        </Button>
      </DialogTrigger>
      <DialogContent>
        {successTxHash ? (
          <SuccessTxModalContent
            txName="Deploy Scripts (Step 2)"
            nextStepLinks={[]}
            txHash={successTxHash}
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold">
              Step 2: Deploy reference scripts
            </h2>
            {/* About this Module */}
            <h2 className="mt-5 text-xl font-semibold">About</h2>
            <p className="mb-5">Feature: Tell what is happening at this step</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormLabel>Course Policy Id:</FormLabel>
                <FormInput
                  {...register("courseNftPolicy")}
                  name="courseNftPolicy"
                  placeholder="Nft Policy Id from Step 1"
                  form={form}
                />
                <Button>Submit</Button>
              </form>
            </Form>
            {address && courseNftPolicyId && (
              <>
                <pre>{address}</pre>
                <pre>{courseNftPolicyId}</pre>
                <StepTwoDeployReferenceScripts
                  policy={courseNftPolicyId}
                  setSuccessTxHash={setSuccessTxHash}
                />
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
