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
import CreatorsSection from "./CreatorsSection";
import AssignmentsSection from "./AssignmentSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function DashboardPage() {
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
      void fetchAccessToken();
    }
  }, [wallet]);

  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <>
      <MenuBar />
      <div className="flex w-full mx-auto mt-[150px] items-center justify-center">
        <Tabs defaultValue="andamioNetwork" className="w-2/3">
          <TabsList className="my-3 w-full rounded-md border border-secondary-foreground">
            <TabsTrigger value="andamioNetwork">Network</TabsTrigger>
            <TabsTrigger value="learningJourney">
              My Learning Journey
            </TabsTrigger>
          </TabsList>
          <TabsContent value="andamioNetwork" className="flex w-full">
            {!connected ? (
              <NotConnectedCardano />
            ) : (
              <>
                {accessToken ? (
                  <>
                    <AccessTokenSection accessToken={accessToken} />

                    <MyCoursesSection accessToken={accessToken} />
                  </>
                ) : (
                  <NoAccessTokenInWallet />
                )}
                <CreatorsSection />
              </>
            )}
          </TabsContent>
          <TabsContent value="learningJourney" className="flex w-full">
            <AssignmentsSection />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function NotConnectedCardano() {
  return (
    <div className="flex w-full">
      <Card className="mx-auto">
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
          <p className="text-sm">
            Info in your Dashboard are real-time data directly from the cardano
            blockchain.
          </p>
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
            By connecting to the andamio network you will unlock Andamio&apos;s
            state-of-the-art on-chain credential features.{" "}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
