import { Card } from "~/components/ui/card";

export default function LoadingCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card size="loading">
      <div className="flex animate-pulse items-center justify-center rounded-xl bg-secondary text-secondary-foreground opacity-50 sm:mx-auto sm:w-[630px] md:w-[750px] lg:w-[800px] xl:w-[950px] 2xl:w-[1100px]">
        {children}
      </div>
    </Card>
  );
}
