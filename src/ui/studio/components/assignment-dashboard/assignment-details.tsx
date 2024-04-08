import { Assignment, Course, Module } from "~/types/db";

export default function AssignmentDetails({
  course,
  module,
  assignment,
}: {
  course: Course;
  module: Module;
  assignment: Assignment;
}) {
  if (!course) return

  return (
    <div className="col-span-4 rounded-md border border-secondary-foreground p-3">
      <p><span className="uppercase text-xs font-mono">Course:</span> {course.title}</p>
      <p><span className="uppercase text-xs font-mono">Module:</span> {module.title}</p>
      <p><span className="uppercase text-xs font-mono">Assignment:</span> {assignment?.title}</p>
      <p><span className="uppercase text-xs font-mono">Code:</span> {assignment?.assignmentCode}</p>
    </div>
  );
}
