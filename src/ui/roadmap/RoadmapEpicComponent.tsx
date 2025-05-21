import { Badge } from "~/components/ui/badge";
import { type Epic } from "~/roadmap";

export default function RoadmapEpicComponent({ epic }: { epic: Epic }) {
  let statusMessage = "";
  let accentColor = "";
  let borderColor = "";

  switch (epic.status) {
    case "planned":
      statusMessage = "Planning";
      accentColor = "text-blue-600";
      borderColor = "border-blue-500";
      break;
    case "inProgress":
      statusMessage = "Current";
      accentColor = "text-orange-600";
      borderColor = "border-orange-500";
      break;
    case "proposed":
      statusMessage = "Proposal";
      accentColor = "text-purple-600";
      borderColor = "border-purple-500";
      break;
    case "complete":
      statusMessage = "Complete";
      accentColor = "text-green-600";
      borderColor = "border-green-500";
      break;
    default:
      accentColor = "text-gray-600";
      borderColor = "border-gray-500";
      break;
  }

  return (
    <div className="group w-full">
      {/* Quarter indicator */}
      <div className="mb-2 flex">
        <Badge variant="outline" className="text-xs font-medium">
          Q{epic.quarter}
        </Badge>
      </div>

      {/* Epic content */}
      <div
        className={`border-l-4 bg-white p-5 shadow-md transition-all duration-200 hover:shadow-xl ${borderColor}`}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="font-beckman text-xl font-bold tracking-tight">
            {epic.name}
          </h3>
          <Badge
            variant="outline"
            className={`shrink-0 ${accentColor || ""} text-xs font-medium`}
          >
            {statusMessage}
          </Badge>
        </div>

        <p className="text-base text-muted-foreground">{epic.description}</p>

        {epic.features && epic.features.length > 0 && (
          <div className="mt-4 border-t border-gray-100 pt-3">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {epic.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-xs font-bold text-primary">→</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
