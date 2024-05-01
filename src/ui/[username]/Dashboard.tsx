import MenuBar from "../landing/MenuBar";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function DashboardPage({ username }: { username: string }) {
  const { setTheme } = useTheme();
  const { connected } = useWallet();

  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <>
      <MenuBar />
      {!connected ? (
        <NotConnectedCardano />
      ) : (
        <div className="mx-auto mt-32 min-h-[50vh] max-w-7xl px-6 sm:mt-56 lg:px-8">
          <p>start with fetching access token from connected wallet</p>

          <h1>My courses</h1>
          <p>list of courses by querying local states</p>
        </div>
      )}
    </>
  );
}

function NotConnectedCardano() {
  return (
    <div className="mx-auto mt-32 min-h-[50vh] max-w-7xl px-6 sm:mt-56 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Connect to cardano</CardTitle>
          <CardDescription>
            You need to connect to cardano to view your Dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <CardanoWallet />
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm">Info in your Dashboard are on-chain</p>
        </CardFooter>
      </Card>
    </div>
  );
}
