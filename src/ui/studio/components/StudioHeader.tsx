import { Button } from "~/components/ui/button";

export default function StudioHeader({
  setCourseDialogOpen,
}: {
  setCourseDialogOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex">
      <div className="flex-grow">
        <h1>Your Courses</h1>
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
