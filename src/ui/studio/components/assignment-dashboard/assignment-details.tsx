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
    <div className="col-span-4 rounded-md border border-neutral-900 p-3">
      <p>Course: {course.title}</p>
      <p>Module: {module.title}</p>
      <p>Assignment: {assignment.title}</p>
      <p>{assignment.assignmentCode}</p>
    </div>
  );
}
