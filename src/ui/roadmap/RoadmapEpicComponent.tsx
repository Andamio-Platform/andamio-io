import { type Epic } from "~/roadmap";

export default function RoadmapEpicComponent({
  epic,
  category,
}: {
  epic: Epic;
  category?: string;
}) {
  let statusMessage = "";
  let borderColor = "";
  let bgColor = "";
  let textColor = "";

  switch (epic.status) {
    case "planned":
      statusMessage = "Planning";
      borderColor = "border-purple-300";
      bgColor = "bg-purple-100";
      textColor = "text-purple-800";
      break;
    case "inProgress":
      statusMessage = "Current";
      borderColor = "border-blue-300";
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
    case "proposed":
      statusMessage = "Proposal";
      borderColor = "border-orange-300";
      bgColor = "bg-orange-100";
      textColor = "text-orange-800";
      break;
    case "complete":
      statusMessage = "Complete";
      borderColor = "border-green-300";
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    default:
      statusMessage = "Unknown";
      borderColor = "border-gray-300";
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      break;
  }

  return (
    <div className="group w-full border border-primary/20 transition-all hover:border-primary hover:shadow-md">
      {/* Epic content */}
      <div className="flex w-full">
        <div className={`flex-grow border-l-4 bg-white ${borderColor}`}>
          <div className="p-5">
            {/* Category label if provided */}
            {category && (
              <div className="mb-2 text-sm font-medium text-primary">
                {category}
              </div>
            )}

            <div className="mb-3">
              <h3 className="text-xl font-bold tracking-tight">{epic.name}</h3>
            </div>

            <p className="max-w-2xl text-sm text-muted-foreground">
              {epic.description}
            </p>

            {epic.features && epic.features.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Features:</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {epic.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {epic.link && (
              <div className="mt-4 text-xs">
                <a
                  href={epic.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {epic.link.label}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Status and date sidebar */}
        <div className={`flex w-32 flex-col justify-center ${bgColor} p-4`}>
          <div className="flex flex-col items-end">
            <div className={`text-xl font-bold ${textColor}`}>{epic.year}</div>
            <div className={`text-xl font-bold ${textColor}`}>
              Q{epic.quarter}
            </div>
            <div className={`mt-6 text-xs font-medium ${textColor}`}>
              {statusMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
