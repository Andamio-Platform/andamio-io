import MenuBar from "../landing/MenuBar";
import { useEffect, useState } from "react";
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
import AccessTokenSection from "./AccessTokenSection";
import MyCoursesSection from "./MyCoursesSection";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function DashboardPage({ username }: { username: string }) {
  const { setTheme } = useTheme();
  const { wallet, connected } = useWallet();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const userAssets = await wallet.getAssets();
      const accessToken = userAssets.find((asset) =>
        asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
      );
      setAccessToken(accessToken);
    };

    if (connected) {
      fetchAccessToken();
    }
  }, [wallet]);

  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <>
      <MenuBar />
      {!connected ? (
        <NotConnectedCardano />
      ) : (
        <div className="mx-auto mt-32 flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-10 px-6 sm:mt-56 lg:px-8">
          {accessToken ? (
            <>
              <AccessTokenSection />

              <MyCoursesSection />
            </>
          ) : (
            <NoAccessTokenInWallet />
          )}
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
          <p className="text-sm">Info in your Dashboard are real-time data directly from the cardano blockchain.</p>
        </CardFooter>
      </Card>
    </div>
  );
}

function NoAccessTokenInWallet() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>No access token found in your connected wallet</CardTitle>
          <CardDescription>
            Join the Andamio Network by minting an Andamio Access Token.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Link href={"/auth/join-andamio-network"}>Get Token</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            By connecting to the andamio network you will unlock Andamio's
            state-of-the-art on-chain credential features.{" "}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
