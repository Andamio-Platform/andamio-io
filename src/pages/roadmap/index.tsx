import { roadmap } from "../../roadmap";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import RoadmapProductComponent from "~/ui/roadmap/RoadmapProductComponent";

// TODO (next week): per-roadmap-item feedback mechanism. Replaces the old
// single Notion "Give Feedback" link (removed — Notion is no longer used).

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const LEGEND = [
  { label: "Shipped", dot: "border-success bg-success" },
  { label: "In progress", dot: "border-primary bg-primary" },
  { label: "Planned", dot: "border-secondary bg-card" },
];

const ProductRoadmap = () => {
  const products = roadmap.filter((r) => r.kind !== "history");
  const history = roadmap.filter((r) => r.kind === "history");

  return (
    <ModernPageLayout
      title="Roadmap"
      description="Every Andamio product and its releases — what has shipped, what's underway, and what's coming next."
      currentPage="roadmap"
    >
      <div className="flex flex-col gap-10 pb-20 lg:flex-row lg:gap-12">
        {/* Sticky product navigation */}
        <aside className="lg:w-56 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <nav className="flex flex-col gap-1">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Products
              </p>
              {products.map((product) => (
                <a
                  key={product.category}
                  href={`#${slug(product.category)}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {product.category}
                </a>
              ))}

              {history.length > 0 && (
                <>
                  <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    History &amp; Funding
                  </p>
                  {history.map((track) => (
                    <a
                      key={track.category}
                      href={`#${slug(track.category)}`}
                      className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {track.category}
                    </a>
                  ))}
                </>
              )}
            </nav>

            {/* Legend */}
            <div className="mt-6 space-y-2 border-t border-border px-3 pt-4">
              {LEGEND.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full border-2 ${item.dot}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product timelines */}
        <div className="min-w-0 flex-1 space-y-16">
          {products.map((product) => (
            <div key={product.category} id={slug(product.category)} className="scroll-mt-24">
              <RoadmapProductComponent product={product} />
            </div>
          ))}

          {history.length > 0 && (
            <div className="space-y-12 border-t border-border pt-12">
              <div>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-muted-foreground">
                  History &amp; Funding
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Where Andamio came from, and the Project Catalyst proposals
                  that funded it.
                </p>
              </div>
              {history.map((track) => (
                <div key={track.category} id={slug(track.category)} className="scroll-mt-24">
                  <RoadmapProductComponent product={track} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModernPageLayout>
  );
};

export default ProductRoadmap;
