import StatusDot from "~/components/ui/status-dot";
import { Assignment, Module } from "~/types/db";

export default function SltList({
  module,
  assignment,
}: {
  module: Module;
  assignment: Assignment;
}) {
  if(!assignment) return

  const statuses:any = [];

  const sortedSlts = module.slts.slice().sort((a, b) => a.moduleIndex - b.moduleIndex);

  sortedSlts.forEach((s) => {
    const assessed = assignment.slts.find((t) => t.id == s.id)
    statuses.push({...s, assessed})
  })

  return (
    <div className="col-span-4 rounded-md border border-secondary-foreground text-sm">
      <div className="flex w-full flex-row justify-between rounded-t-md bg-primary px-3 py-1 text-primary-foreground">
        <p>Learning Targets (Module {module.moduleCode})</p>
      </div>
      <div className="px-2 py-1">

      {statuses.map((s: any) => (
        <p key={s.id} className="">
          <StatusDot status={s.assessed ? "ASSESS" : "SUPPORT"} /> {module.moduleCode}.{s.moduleIndex}:{" "}
          {s.sltText}
        </p>
      ))}

      {/* {assignment.slts.map((s) => (
        <p key={s.id} className="">
          <StatusDot status="SUPPORT" /> {module.moduleCode}.{s.moduleIndex}:{" "}
          {s.sltText}
        </p>
      ))} */}
      </div>
      <div className="flex w-full flex-col xl:flex-row justify-between rounded-b-md bg-primary px-5 py-1 text-primary-foreground">
        <p className="text-xs uppercase">
          <StatusDot status="ASSESS" /> Assigment SLT
        </p>
        <p className="text-xs uppercase">
          <StatusDot status="SUPPORT" /> Supporting SLT
        </p>
      </div>
    </div>
  );
}
