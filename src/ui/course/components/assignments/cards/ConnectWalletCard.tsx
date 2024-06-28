import { CardanoWallet } from "@meshsdk/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export default function ConnectWalletCard() {
  return (
    <Card className="">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <h2 className="text-xl font-bold">
          Connect a wallet to commit to this assignment
        </h2>
      </CardHeader>
      <CardContent>
        <CardanoWallet />
      </CardContent>
    </Card>
  );
}
