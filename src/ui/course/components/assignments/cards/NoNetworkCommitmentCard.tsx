import { Card, CardHeader, CardContent } from "~/components/ui/card";

export default function NoNetworkCommitmentCard() {
  return (
    <Card className="">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <h2 className="text-xl font-bold">None</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-3">
          No public commitment needed
        </div>
      </CardContent>
    </Card>
  );
}
