import Button from "~/components/button";
import H1 from "~/components/typography/h1";

export default function StudioHeader({
  setCourseDialogOpen,
}: {
  setCourseDialogOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex">
      <div className="flex-grow">
        <H1>Your Courses</H1>
      </div>
      <div>
        <Button
          onClick={() => {
            setCourseDialogOpen(true);
          }}
        >
          New course
        </Button>
      </div>
    </div>
  );
}
