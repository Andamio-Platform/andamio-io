import { Card, CardHeader, CardContent } from "~/components/ui/card";

// todo 2024-06-27

export default function NoOnchainAssignmentCard() {
  return (
    <Card className="">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <h2 className="text-xl font-bold">No on chain</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-3">
          No public commitment needed
        </div>
      </CardContent>
    </Card>
  );
}
