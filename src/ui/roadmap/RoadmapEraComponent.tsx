import type { Epic, Roadmap } from "~/roadmap";
import RoadmapEpicComponent from "./RoadmapEpicComponent";

// replace green dot with some kind of icon
export default function RoadmapEraComponent(roadmap: Roadmap) {
  return (
    <div className="mb-8 flex items-start">
      <div className="mt-8 grid w-full grid-cols-6 border-t border-black pt-8">
        <div>
          <h3 className="mb-1 text-center font-beckman text-4xl font-semibold ">
            {roadmap.year}
          </h3>
        </div>

        <div className="col-span-5 mx-auto flex w-full flex-col">
          <h3 className="mb-1 font-beckman text-4xl font-semibold ">
            {roadmap.era}
          </h3>
        </div>
        {roadmap.epics.map((epic: Epic, i) => (
          <RoadmapEpicComponent epic={epic} key={i} />
        ))}
      </div>
    </div>
  );
}
