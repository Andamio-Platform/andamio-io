import { LightDarkToggle } from "~/ui/site/LightDarkToggle";

export default function ColorsPage() {
  const colorVariables = [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "border",
    "input",
    "ring",
    "radius",
    "warning",
    "warning-foreground",
    "success",
    "success-foreground",
  ];

  return (
    <div className="mx-auto my-10 grid w-11/12 grid-cols-6 gap-10">
      {colorVariables.map((c) => (
        <div>
          <div className={`flex h-[100px] w-full bg-${c}`} />
          <div>{c}</div>
        </div>
      ))}
      <LightDarkToggle />
    </div>
  );
}
