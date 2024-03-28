export default function StatusDot({
  status,
}: {
  status: "ASSESS" | "SUPPORT";
}) {
  switch (status) {
    case "ASSESS":
      return <span className="h-[8px] w-[8px] mx-1 inline-block rounded-full bg-green-600" />;
    case "SUPPORT":
      return <span className="h-[8px] w-[8px] mx-1 inline-block rounded-full bg-orange-600" />;
    default:
      return <span className="h-[8px] w-[8px] mx-1 inline-block rounded-full bg-neutral-600" />;
  }
}
