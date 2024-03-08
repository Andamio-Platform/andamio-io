import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import Textarea from "~/components/form/textarea";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, CourseVariant } from "~/types/db";

export default function DialogCourseOnChain({
  dialogOpen,
  setDialogOpen,
  course,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  course: Course;
}) {
  const ctx = api.useUtils();

  const { register, handleSubmit, reset } = useForm();

  // const { mutate: create, isLoading: isLoadingCreate } =
  //   api.courseOnChainInstance.create.useMutation({
  //     onSuccess: () => {
  //       setDialogOpen(false);
  //       toast.success("New course variant created!");
  //       void ctx.courseOnChainInstance.getcourseOnChainInstances.invalidate();
  //     },
  //     onError: (e) => {
  //       const errorMessage = e.data?.zodError?.fieldErrors;
  //       if (errorMessage) {
  //         toast.error("Some inputs are missing or invalid");
  //       } else {
  //         toast.error("Course variant code taken. Please try again.");
  //       }
  //     },
  //   });

  // const { mutate: update, isLoading: isLoadingUpdate } =
  //   api.courseOnChainInstance.update.useMutation({
  //     onSuccess: () => {
  //       setDialogOpen(false);
  //       toast.success("Course updated!");
  //       void ctx.courseOnChainInstance.getcourseOnChainInstances.invalidate();
  //     },
  //     onError: (e) => {
  //       const errorMessage = e.data?.zodError?.fieldErrors;
  //       if (errorMessage) {
  //         toast.error("Some inputs are missing or invalid");
  //       } else {
  //         toast.error("Something went wrong. Please try again.");
  //       }
  //     },
  //   });

  // function onSubmit(data: FieldValues) {
  //   if (courseOnChainInstance) {
  //     update({
  //       courseRefAddress: data.courseRefAddress,
  //       assignmentAddress: data.assignmentAddress,
  //       creatorCS: data.creatorCS,
  //       facilitatorCS: data.facilitatorCS,
  //       learnerCS: data.learnerCS,
  //       courseRefUTxO: data.courseRefUTxO,
  //       assignmentRefUTxO: data.assignmentRefUTxO,
  //     });
  //   } else {
  //     const _data = {
  //       courseRefAddress: data.courseRefAddress,
  //       assignmentAddress: data.assignmentAddress,
  //       creatorCS: data.creatorCS,
  //       facilitatorCS: data.facilitatorCS,
  //       learnerCS: data.learnerCS,
  //       courseRefUTxO: data.courseRefUTxO,
  //       assignmentRefUTxO: data.assignmentRefUTxO,
  //     };
  //     create(_data);
  //   }
  // }

  function onSubmit(data: FieldValues) {
    alert("test ok")
  }

  // useEffect(() => {
  //   if (dialogOpen && courseOnChainInstance) {
  //     reset(courseOnChainInstance);
  //   }
  // }, [dialogOpen]);

  return (
    // <DialogBox
    //   title={
    //     courseOnChainInstance
    //       ? `Editing ${courseOnChainInstance.variantCode}`
    //       : "Create a new course variant"
    //   }
    //   isForm={{
    //     buttonLabel: courseOnChainInstance ? "Save" : "Create",
    //     buttonLoading: isLoadingCreate || isLoadingUpdate,
    //     buttonDisabled: isLoadingCreate || isLoadingUpdate,
    //     handleSubmit: handleSubmit((data) => onSubmit(data)),
    //   }}
    //   open={dialogOpen}
    //   setOpen={setDialogOpen}
    // >
    <DialogBox
      title="testing dialog box for onchain instance"
      isForm={{
        buttonLabel: "Create",
        buttonLoading: false,
        buttonDisabled: false,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={dialogOpen}
      setOpen={setDialogOpen}
    >
      {/* <DialogParagraph>
        {courseOnChainInstance
          ? "You are editing an existing variant. Make changes and click 'Save'."
          : "Creating a new variant is easy. lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur molestias numquam amet blanditiis voluptate sunt illo inventore atque hic, asperiores recusandae, reiciendis quae nostrum sit quis accusamus possimus quisquam?"}
      </DialogParagraph> */}

      <div className="mt-4 grid grid-cols-1 gap-y-4">
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
        <FormFieldset label="Course Reference UTxO">
          <Input name="courseRefUTxO" register={register} />
        </FormFieldset>
        <FormFieldset label="Assignment Reference UTxO">
          <Input name="assignmentRefUTxO" register={register} />
        </FormFieldset>
      </div>
    </DialogBox>
  );
}
