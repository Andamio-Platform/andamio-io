import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import DialogBox from "~/components/dialog";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, CourseOnChainInstance } from "~/types/db";

export default function DialogCourseOnChain({
  dialogOpen,
  setDialogOpen,
  course,
  courseOnchain,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  course: Course;
  courseOnchain?: CourseOnChainInstance;
}) {
  const ctx = api.useUtils();

  const { register, handleSubmit, reset } = useForm();

  const [onchainInstanceId, setOnchainInstanceId] = useState<
    string | undefined
  >(undefined);
  const [network, setNetwork] = useState<string | undefined>(undefined);
  const [courseRefAddress, setCourseRefAddress] = useState<string | undefined>(
    undefined,
  );
  const [assignmentAddress, setAssignmentAddress] = useState<
    string | undefined
  >(undefined);
  const [creatorCS, setCreatorCS] = useState<string | undefined>(undefined);
  const [facilitatorCS, setFacilitatorCS] = useState<string | undefined>(
    undefined,
  );
  const [learnerCS, setLearnerCS] = useState<string | undefined>(undefined);
  const [moduleCS, setModuleCS] = useState<string | undefined>(undefined);
  const [courseRefUTxO, setCourseRefUTxO] = useState<string | undefined>(
    undefined,
  );
  const [assignmentRefUTxO, setAssignmentRefUTxO] = useState<
    string | undefined
  >(undefined);
  const [moduleMintingRefUTxO, setModuleMintingRefUTxO] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (courseOnchain) {
      setOnchainInstanceId(courseOnchain[0]?.onchainInstanceId);
      if (courseOnchain[0]?.network)
        setNetwork(courseOnchain[0]?.network);
      if (courseOnchain[0]?.courseRefAddress)
        setCourseRefAddress(courseOnchain[0]?.courseRefAddress);
      if (courseOnchain[0]?.assignmentAddress)
        setAssignmentAddress(courseOnchain[0]?.assignmentAddress);
      if (courseOnchain[0]?.creatorCS)
        setCreatorCS(courseOnchain[0]?.creatorCS);
      if (courseOnchain[0]?.facilitatorCS)
        setFacilitatorCS(courseOnchain[0]?.facilitatorCS);
      if (courseOnchain[0]?.learnerCS)
        setLearnerCS(courseOnchain[0]?.learnerCS);
      if (courseOnchain[0]?.moduleCS) setModuleCS(courseOnchain[0]?.moduleCS);
      if (courseOnchain[0]?.courseRefUTxO)
        setCourseRefUTxO(courseOnchain[0]?.courseRefUTxO);
      if (courseOnchain[0]?.assignmentRefUTxO)
        setAssignmentRefUTxO(courseOnchain[0]?.assignmentRefUTxO);
      if (courseOnchain[0]?.moduleMintingRefUTxO)
        setAssignmentRefUTxO(courseOnchain[0]?.moduleMintingRefUTxO);
    }
  }, [courseOnchain]);

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
    if (courseOnchain && onchainInstanceId) {
      update({
        onchainInstanceId: onchainInstanceId,
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
      };
      create(_data);
    }
  }

  useEffect(() => {
    if (dialogOpen && courseOnchain) {
      reset(courseOnchain);
    }
  }, [dialogOpen]);

  return (
    <DialogBox
      title={
        courseOnchain
          ? `Editing ${courseOnchain[0]?.onchainInstanceId}`
          : "Create a new course variant"
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
      {courseOnchain && courseOnchain[0] ? (
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <FormFieldset label="Network">
            <Input
              name="network"
              register={register}
              placeholder={network}
            />
          </FormFieldset>
          <FormFieldset label="Course Validator Address">
            <Input
              name="courseRefAddress"
              register={register}
              placeholder={courseRefAddress}
            />
          </FormFieldset>
          <FormFieldset label="Assignment Validator Address">
            <Input
              name="assignmentAddress"
              register={register}
              placeholder={assignmentAddress}
            />
          </FormFieldset>
          <FormFieldset label="Course Creator CS">
            <Input
              name="creatorCS"
              register={register}
              placeholder={creatorCS}
            />
          </FormFieldset>
          <FormFieldset label="Course Facilitator CS">
            <Input
              name="facilitatorCS"
              register={register}
              placeholder={facilitatorCS}
            />
          </FormFieldset>
          <FormFieldset label="Learner CS">
            <Input
              name="learnerCS"
              register={register}
              placeholder={learnerCS}
            />
          </FormFieldset>
          <FormFieldset label="Module CS">
            <Input name="moduleCS" register={register} placeholder={moduleCS} />
          </FormFieldset>
          <FormFieldset label="Course Reference UTxO">
            <Input
              name="courseRefUTxO"
              register={register}
              placeholder={courseRefUTxO}
            />
          </FormFieldset>
          <FormFieldset label="Assignment Reference UTxO">
            <Input
              name="assignmentRefUTxO"
              register={register}
              placeholder={assignmentRefUTxO}
            />
          </FormFieldset>
          <FormFieldset label="Module Minting Reference UTxO">
            <Input
              name="moduleMintingRefUTxO"
              register={register}
              placeholder={moduleMintingRefUTxO}
            />
          </FormFieldset>
          <p>Onchain Instance Id: {onchainInstanceId}</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <FormFieldset label="Network">
            <Input name="network" register={register} />
          </FormFieldset>
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
          <FormFieldset label="Learner CS">
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
