import { Badge } from "~/components/ui/badge";
import { type Epic } from "~/roadmap";

export default function RoadmapEpicComponent({
  epic,
}: {
  epic: Epic;
}) {
  let statusMessage = "";
  let accentColor = "";
  let bgColor = "";
  
  switch (epic.status) {
    case "planned":
      statusMessage = "Planning";
      accentColor = "text-blue-600";
      bgColor = "bg-blue-50/30";
      break;
    case "inProgress":
      statusMessage = "Current";
      accentColor = "text-orange-600";
      bgColor = "bg-orange-50/30";
      break;
    case "proposed":
      statusMessage = "Proposal";
      accentColor = "text-purple-600";
      bgColor = "bg-purple-50/30";
      break;
    case "complete":
      statusMessage = "Complete";
      accentColor = "text-green-600";
      bgColor = "bg-green-50/30";
      break;
    default:
      accentColor = "text-gray-600";
      bgColor = "bg-gray-50/30";
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
      <div className={`rounded-lg ${bgColor} p-4 shadow-sm transition-all duration-200 hover:shadow-md`}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-beckman text-lg font-medium tracking-tight">{epic.name}</h3>
          <Badge variant="outline" className={`shrink-0 ${accentColor || ''} text-xs font-medium`}>
            {statusMessage}
          </Badge>
        </div>
        
        <p className="text-muted-foreground">{epic.description}</p>
        
        {epic.features && epic.features.length > 0 && (
          <div className="mt-3">
            <ul className="space-y-1 text-sm text-muted-foreground">
              {epic.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-xs">→</span>
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
