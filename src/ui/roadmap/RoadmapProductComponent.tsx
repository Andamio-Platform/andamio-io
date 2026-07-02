import { type Epic, type Roadmap } from "~/roadmap";

// Chronological sort: by first year, then quarter (undefined quarter sorts last within a year).
function sortByDate(a: Epic, b: Epic): number {
  const ay = parseInt(a.years[0] ?? "0") || 0;
  const by = parseInt(b.years[0] ?? "0") || 0;
  if (ay !== by) return ay - by;
  const aq = a.quarter ?? 5;
  const bq = b.quarter ?? 5;
  return aq - bq;
}

function yearLabel(epic: Epic): string {
  if (epic.years.length > 1) {
    const nums = epic.years.map(Number);
    return `${Math.min(...nums)}–${Math.max(...nums)}`;
  }
  return epic.years[0] ?? "";
}

const statusMeta: Record<
  Epic["status"],
  { node: string; badge: string; label: string }
> = {
  complete: {
    node: "border-success bg-success",
    badge: "border-success/30 bg-success/10 text-success",
    label: "Shipped",
  },
  inProgress: {
    node: "border-primary bg-primary",
    badge: "border-primary/30 bg-primary/10 text-primary",
    label: "In progress",
  },
  planned: {
    node: "border-secondary bg-card",
    badge: "border-secondary/30 bg-secondary/10 text-secondary",
    label: "Planned",
  },
  proposed: {
    node: "border-border bg-card",
    badge: "border-border bg-muted text-muted-foreground",
    label: "Proposed",
  },
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

export default function RoadmapProductComponent({ product }: { product: Roadmap }) {
  const releases = [...product.epics].sort(sortByDate);

  return (
    <section className="scroll-mt-24">
      {/* Product header */}
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {product.category}
        </h2>
        {product.tagline && (
          <p className="mt-1 text-base text-muted-foreground">{product.tagline}</p>
        )}
      </div>

      {/* Release timeline */}
      <ol className="relative">
        {releases.map((epic, i) => {
          const isLast = i === releases.length - 1;
          const isLaunch = i === 0;
          const meta = statusMeta[epic.status];
          const quarter = epic.quarter ? `Q${epic.quarter}` : "TBD";

          return (
            <li key={i} className="relative flex gap-4 sm:gap-6">
              {/* Date column */}
              <div className="w-16 shrink-0 pt-0.5 text-right sm:w-20">
                <div className="text-sm font-semibold text-foreground">
                  {yearLabel(epic)}
                </div>
                <div className="text-xs text-muted-foreground">{quarter}</div>
              </div>

              {/* Rail + node */}
              <div className="relative flex w-4 shrink-0 justify-center">
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-border"
                  />
                )}
                <span
                  className={`relative z-10 mt-[3px] h-3.5 w-3.5 shrink-0 rounded-full border-2 ${meta.node}`}
                />
              </div>

              {/* Content */}
              <div className={`flex-1 ${isLast ? "pb-2" : "pb-9"}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {epic.name}
                  </h3>
                  {isLaunch && (
                    <Badge className="border-transparent bg-primary text-primary-foreground">
                      Launch
                    </Badge>
                  )}
                  {(epic.status === "inProgress" ||
                    epic.status === "planned" ||
                    epic.status === "proposed") && (
                    <Badge className={meta.badge}>{meta.label}</Badge>
                  )}
                </div>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {epic.description}
                </p>
                {epic.link && (
                  <a
                    href={epic.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                  >
                    {epic.link.label}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
