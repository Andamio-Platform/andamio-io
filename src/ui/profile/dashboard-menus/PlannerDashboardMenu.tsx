import Link from "next/link";

export default function PlannerDashboardMenu() {
  return (
    <div className="grid min-h-28 w-full grid-cols-6 items-center gap-5 bg-primary text-primary-foreground">
      <div className="col-start-1 text-center">
        <Link href="/dashboard/planner">
          <div className={`cursor-pointer p-2 font-semibold`}>
            Planner Dashboard Home
          </div>
        </Link>
      </div>
      <div className="col-span-2 col-start-2 text-center">Manage Treasury</div>
      <div className="col-span-2 col-start-4 text-center">Manage Projects</div>
      <div className="col-start-6 text-center">Notes</div>
    </div>
  );
}
