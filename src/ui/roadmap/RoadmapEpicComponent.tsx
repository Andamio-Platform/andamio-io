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
      borderColor = "border-secondary";
      bgColor = "bg-secondary/10";
      textColor = "text-secondary";
      break;
    case "inProgress":
      statusMessage = "Current";
      borderColor = "border-primary";
      bgColor = "bg-primary/10";
      textColor = "text-primary";
      break;
    case "proposed":
      statusMessage = "Proposal";
      borderColor = "border-accent";
      bgColor = "bg-accent/10";
      textColor = "text-accent";
      break;
    case "complete":
      statusMessage = "Complete";
      borderColor = "border-success";
      bgColor = "bg-success/10";
      textColor = "text-success";
      break;
    default:
      statusMessage = "Unknown";
      borderColor = "border-border";
      bgColor = "bg-muted";
      textColor = "text-muted-foreground";
      break;
  }

  return (
    <div className="group w-full rounded-lg border border-border bg-card shadow-lg transition-all hover:border-primary/50 hover:shadow-xl">
      {/* Epic content */}
      <div className="flex w-full">
        <div
          className={`flex-grow border-l-4 bg-card ${borderColor} rounded-l-lg`}
        >
          <div className="p-5">
            {/* Category label if provided */}
            {category && (
              <div className="mb-2 text-sm font-medium text-primary">
                {category}
              </div>
            )}

            <div className="mb-3">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {epic.name}
              </h3>
            </div>

            <p className="max-w-2xl text-sm text-muted-foreground">
              {epic.description}
            </p>

            {epic.features && epic.features.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  Features:
                </h4>
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
                  className="text-primary transition-colors duration-200 hover:text-primary/80 hover:underline"
                >
                  {epic.link.label}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Status and date sidebar */}
        <div
          className={`flex w-32 flex-col justify-center ${bgColor} rounded-r-lg p-4`}
        >
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
