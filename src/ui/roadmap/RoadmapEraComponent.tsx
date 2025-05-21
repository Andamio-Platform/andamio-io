import type { Epic, Roadmap } from "~/roadmap";
import RoadmapEpicComponent from "./RoadmapEpicComponent";

interface RoadmapEraProps extends Roadmap {
  position: "left" | "right";
}

export default function RoadmapEraComponent({
  category,
  epics,
  position,
}: RoadmapEraProps) {
  // Get the year from the first epic for display purposes
  const year = epics.length > 0 ? epics[0]?.year ?? "" : "";
  return (
    <div className="mb-20">
      {/* Era header */}
      <div className="relative mb-12 flex items-center justify-center">
        <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-primary/20"></div>
        <div className="relative z-10 flex items-center justify-center space-x-4 bg-background px-6">
          <div className="bg-white px-8 py-4 text-center shadow-md border-b-2 border-primary">
            <h3 className="font-beckman text-3xl font-bold tracking-tight">
              {category}
            </h3>
            <p className="text-md text-muted-foreground">{year}</p>
          </div>
        </div>
      </div>

      {/* Epics with alternating sides - quarters in reverse order */}
      <div className="relative">
        {/* Sort epics by quarter in descending order (Q4 to Q1) */}
        {[...epics]
          .sort((a, b) => b.quarter - a.quarter)
          .map((epic: Epic, i) => (
            <div
              key={i}
              className={`mb-12 flex ${position === "left" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`relative w-5/12 ${position === "right" ? "order-1" : "order-none"}`}
              >
                <div
                  className={`absolute top-3 z-10 h-px w-8 bg-primary/30 ${position === "left" ? "right-0 -mr-8" : "left-0 -ml-8"}`}
                ></div>
                <div
                  className={`relative ${position === "left" ? "pr-8" : "pl-8"}`}
                >
                  <RoadmapEpicComponent epic={epic} key={i} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
