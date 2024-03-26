import { ModuleSLT } from "~/types/db";

export default function SltList({ slts }: { slts: ModuleSLT[] }) {
  return (
    <div className="col-span-4 rounded-md border border-neutral-900 p-3">
      <p>SLTs - Color Coded!</p>
      {slts.map((s) => (
        <p key={s.id}>
          {s.sltText} is {s.assignmentId ? "included" : "not included"}
        </p>
      ))}
    </div>
  );
}
