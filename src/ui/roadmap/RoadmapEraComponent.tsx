import { type Roadmap } from "~/roadmap";

// replace green dot with some kind of icon
export default function RoadmapEraComponent(roadmap: Roadmap) {
  return (
    <div className="mb-8 flex items-start">
      <div className="mr-4 mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-green-600"></div>
      <div className="flex-grow">
        <h3 className="mb-1 text-lg font-semibold text-green-800">
          {roadmap.era}
        </h3>
        <p className="mb-2 text-sm text-green-700">{roadmap.year}</p>
        <div className="flex justify-between text-xs text-green-600">
          <span>{roadmap.year}</span>
          <span className="rounded-full bg-green-100 px-2 py-1">
            Status Message - move to Epic Component along with epic data
          </span>
        </div>
        <pre className="font-mono text-xs">
          {JSON.stringify(roadmap.epics, null, 2)}
        </pre>
      </div>
    </div>
  );
}
