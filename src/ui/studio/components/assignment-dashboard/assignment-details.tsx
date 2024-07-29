import { type Assignment, type Course, type Module } from "~/types/db";

export default function AssignmentDetails({
  course,
  module,
  assignment,
}: {
  course: Course;
  module: Module;
  assignment: Assignment;
}) {
  if (!course) return;

  return (
    <div className="col-span-4 rounded-md border border-secondary-foreground p-3">
      <p>
        <span className="font-mono text-xs uppercase">Course:</span>{" "}
        {course.title}
      </p>
      <p>
        <span className="font-mono text-xs uppercase">Module:</span>{" "}
        {module.title}
      </p>
      <p>
        <span className="font-mono text-xs uppercase">Assignment:</span>{" "}
        {assignment?.title}
      </p>
      <p>
        <span className="font-mono text-xs uppercase">Code:</span>{" "}
        {assignment?.assignmentCode}
      </p>
    </div>
  );
}
