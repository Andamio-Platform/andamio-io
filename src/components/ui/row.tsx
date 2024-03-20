import { Fragment } from "react";


// pretty hackish? but it works
export default function Row({
  c1,
  c2,
  c3,
  c4,
}: {
  c1: React.ReactNode;
  c2?: React.ReactNode;
  c3?: React.ReactNode;
  c4?: React.ReactElement;
}) {
  return (
    <Fragment>
      <div className={`${c2 ? "col-span-2" : "col-span-10"} text-slate-500`}>
        {c1}
      </div>
      {c2 && <div className="col-span-6 items-start">{c2}</div>}
      {c3 && <div className="col-span-1">{c3}</div>}
      {c4 && <div className="col-span-1 justify-end">{c4}</div>}
    </Fragment>
  );
}
