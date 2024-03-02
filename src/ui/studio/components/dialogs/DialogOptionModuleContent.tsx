import Button from "~/components/button";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";

export default function DialogOptionModuleContent({
  optionDialogOpen,
  setOptionDialogOpen,
  setModuleDialogOpen,
  setContentDialogOpen,
}: {
  optionDialogOpen: boolean;
  setOptionDialogOpen: (open: boolean) => void;
  setModuleDialogOpen: (open: boolean) => void;
  setContentDialogOpen: (open: boolean) => void;
}) {
  return (
    <DialogBox
      title="New module or content"
      open={optionDialogOpen}
      setOpen={setOptionDialogOpen}
      buttons={
        <>
          <Button
            onClick={() => {
              setOptionDialogOpen(false);
              setModuleDialogOpen(true);
            }}
          >
            Create new Module
          </Button>
          <Button
            onClick={() => {
              setOptionDialogOpen(false);
              setContentDialogOpen(true);
            }}
          >
            Create new Content
          </Button>
          <Button
            color="white"
            onClick={() => {
              setOptionDialogOpen(false);
            }}
          >
            Close
          </Button>
        </>
      }
    >
      <DialogParagraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
        laudantium explicabo pariatur iste dolorem animi vitae error totam. At
        sapiente aliquam accusamus facere veritatis.
      </DialogParagraph>
    </DialogBox>
  );
}
