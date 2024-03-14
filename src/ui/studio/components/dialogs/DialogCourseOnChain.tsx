import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import DialogBox from "~/components/dialog";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, CourseOnChainInstance } from "~/types/db";
import { Network } from "@prisma/client";
import Select from "~/components/form/select";

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

  const { register, handleSubmit, reset } = useForm();

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

  function onSubmit(data: FieldValues) {
    console.log(data);

    if (courseOnchain && courseOnchain.onchainInstanceId) {
      update({
        onchainInstanceId: selectedNetwork,
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
        onchainInstanceId: data.onchainInstanceId,
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
      console.log("check1", courseOnchain);
      reset(courseOnchain);
    }
  }, [dialogOpen]);

  return (
    <DialogBox
      title={
        courseOnchain
          ? `Editing On-Chain Course Config ${courseOnchain?.onchainInstanceId}`
          : "On-Chain Course Config"
      }
      isForm={{
        buttonLabel: courseOnchain ? "Save" : "Create",
        buttonLoading: isLoadingCreate || isLoadingUpdate,
        buttonDisabled: isLoadingCreate || isLoadingUpdate,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={dialogOpen}
      setOpen={setDialogOpen}
    >
      {courseOnchain && courseOnchain ? (
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <p className="text-xl font-bold">Network: {selectedNetwork}</p>
          <FormFieldset label="Course Validator Address">
            <Input name="courseRefAddress" register={register} />
          </FormFieldset>
          <FormFieldset label="Assignment Validator Address">
            <Input name="assignmentAddress" register={register} />
          </FormFieldset>
          <FormFieldset label="Course Creator CS">
            <Input name="creatorCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Course Facilitator CS">
            <Input name="facilitatorCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Learner CS">
            <Input name="learnerCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Module CS">
            <Input name="moduleCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Course Reference UTxO">
            <Input name="courseRefUTxO" register={register} />
          </FormFieldset>
          <FormFieldset label="Assignment Reference UTxO">
            <Input name="assignmentRefUTxO" register={register} />
          </FormFieldset>
          <FormFieldset label="Module Minting Reference UTxO">
            <Input name="moduleMintingRefUTxO" register={register} />
          </FormFieldset>
          <p>Onchain Instance Id: {courseOnchain.onchainInstanceId}</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <p className="text-xl font-bold">Network: {selectedNetwork}</p>
          <FormFieldset label="Course Validator Address">
            <Input name="courseRefAddress" register={register} />
          </FormFieldset>
          <FormFieldset label="Assignment Validator Address">
            <Input name="assignmentAddress" register={register} />
          </FormFieldset>
          <FormFieldset label="Course Creator CS">
            <Input name="creatorCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Course Facilitator CS">
            <Input name="facilitatorCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Learner CS">
            <Input name="learnerCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Module CS">
            <Input name="moduleCS" register={register} />
          </FormFieldset>
          <FormFieldset label="Course Reference UTxO">
            <Input name="courseRefUTxO" register={register} />
          </FormFieldset>
          <FormFieldset label="Assignment Reference UTxO">
            <Input name="assignmentRefUTxO" register={register} />
          </FormFieldset>
          <FormFieldset label="Module Minting Reference UTxO">
            <Input name="moduleMintingRefUTxO" register={register} />
          </FormFieldset>
          <FormFieldset label="Onchain Instance ID">
            <Input name="onchainInstanceId" register={register} />
          </FormFieldset>
        </div>
      )}
    </DialogBox>
  );
}
