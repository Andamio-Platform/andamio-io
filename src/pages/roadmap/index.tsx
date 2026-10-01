import Metatags from "~/components/site/metatags";
import { roadmap } from "../../roadmap";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, containerCls, layout } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";
import RoadmapTrack from "~/ui/system/RoadmapTrack";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const LEGEND = [
  { label: "Shipped", dot: { background: color.ink, borderColor: color.ink } },
  {
    label: "In progress",
    dot: { background: color.cyan, borderColor: color.cyan },
  },
  {
    label: "Planned",
    dot: { background: color.paper, borderColor: color.inkFaint },
  },
];

export default function ProductRoadmap() {
  const products = roadmap.filter((r) => r.kind !== "history");
  const history = roadmap.filter((r) => r.kind === "history");

  return (
    <>
      <Metatags
        title="Roadmap"
        description="Every Andamio product and its releases — what has shipped, what's underway, and what's coming next."
      />

      <Page nav={{ items: nav.items }}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Product roadmap</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Roadmap
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Every Andamio product and its releases — what has shipped,
              what&apos;s underway, and what&apos;s coming next.
            </p>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGEND.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full border-2"
                    style={item.dot}
                  />
                  <span
                    className="text-[12px] font-medium tracking-[-0.01em]"
                    style={{ color: color.inkFaint }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Tracks */}
        <div className={containerCls} style={{ maxWidth: layout.maxWidth }}>
          <div className="space-y-20 py-16">
            {products.map((product) => (
              <div
                key={product.category}
                id={slug(product.category)}
                className="scroll-mt-28"
              >
                <RoadmapTrack product={product} />
              </div>
            ))}

            {history.length > 0 && (
              <div
                className="space-y-16 border-t pt-14"
                style={{ borderColor: color.rule }}
              >
                <div>
                  <h2
                    className="text-[13px] font-semibold tracking-[-0.01em]"
                    style={{ color: color.inkMuted }}
                  >
                    History &amp; Funding
                  </h2>
                  <p
                    className="mt-2 max-w-2xl text-sm"
                    style={{ color: color.inkMuted }}
                  >
                    Where Andamio came from, and the Project Catalyst proposals
                    that funded it.
                  </p>
                </div>
                {history.map((track) => (
                  <div
                    key={track.category}
                    id={slug(track.category)}
                    className="scroll-mt-28"
                  >
                    <RoadmapTrack product={track} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Roadmap"
        />
      </Page>
    </>
  );
}
