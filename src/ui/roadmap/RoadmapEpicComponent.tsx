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
      borderColor = "border-purple-500";
      bgColor = "bg-purple-900/30";
      textColor = "text-purple-300";
      break;
    case "inProgress":
      statusMessage = "Current";
      borderColor = "border-blue-500";
      bgColor = "bg-blue-900/30";
      textColor = "text-blue-300";
      break;
    case "proposed":
      statusMessage = "Proposal";
      borderColor = "border-orange-500";
      bgColor = "bg-orange-900/30";
      textColor = "text-orange-300";
      break;
    case "complete":
      statusMessage = "Complete";
      borderColor = "border-green-500";
      bgColor = "bg-green-900/30";
      textColor = "text-green-300";
      break;
    default:
      statusMessage = "Unknown";
      borderColor = "border-gray-500";
      bgColor = "bg-gray-800/50";
      textColor = "text-gray-300";
      break;
  }

  return (
    <div className="group w-full rounded-sm border border-white/20 bg-gray-800/50 shadow-xl backdrop-blur-sm transition-all hover:border-white/40 hover:shadow-2xl">
      {/* Epic content */}
      <div className="flex w-full">
        <div
          className={`flex-grow border-l-4 bg-gray-900/60 ${borderColor} rounded-l-lg`}
        >
          <div className="p-5">
            {/* Category label if provided */}
            {category && (
              <div className="mb-2 text-sm font-medium text-blue-400">
                {category}
              </div>
            )}

            <div className="mb-3">
              <h3 className="text-xl font-bold tracking-tight text-white">
                {epic.name}
              </h3>
            </div>

            <p className="max-w-2xl text-sm text-gray-300">
              {epic.description}
            </p>

            {epic.features && epic.features.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium text-white">
                  Features:
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
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
                  className="text-blue-400 transition-colors duration-200 hover:text-blue-300 hover:underline"
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
