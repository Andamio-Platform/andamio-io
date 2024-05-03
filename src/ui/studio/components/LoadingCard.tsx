import { Card } from "~/components/ui/card";

export default function LoadingCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card size="wide">
      <div className="flex w-full animate-pulse items-center justify-center rounded-xl bg-secondary text-secondary-foreground opacity-50">
        {children}
      </div>
    </Card>
  );
}
