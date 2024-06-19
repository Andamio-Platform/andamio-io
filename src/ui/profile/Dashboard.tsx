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
import CreatorsSection from "./creator/CreatorsSection";
import AssignmentsSection from "./AssignmentSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AssignmentCommitmentsSection from "./AssignmentCommitmentsSection";
import GlobalStateDatum from "./GlobalStateDatum";
import CourseStateDatum from "./CourseStateDatum";
import { DecodedTokenInfo } from "@andamiojs/datum-utils";
import AssignmentDatum from "./AssignmentDatum";

export default function DashboardPage() {
  const { setTheme } = useTheme();
  const { wallet, connected } = useWallet();
  const [accessToken, setAccessToken] = useState(null);
  const [alias, setAlias] = useState<string>("");
  const [courses, setCourses] = useState<DecodedTokenInfo[]>([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const userAssets = await wallet.getAssets();
      const accessToken = userAssets.find((asset) =>
        asset.unit.includes(ACCESS_TOKEN_POLICY_ID),
      );
      setAccessToken(accessToken);
      const alias = Buffer.from(
        accessToken.unit.substring(62),
        "hex",
      ).toString();
      setAlias(alias);
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
      <div className="mx-auto mt-[150px] flex w-full items-center justify-center">
        <Tabs defaultValue="andamioNetwork" className="w-2/3">
          <TabsList className="my-3 w-full rounded-md border border-secondary-foreground bg-indigo-800 text-white">
            <TabsTrigger
              value="andamioNetwork"
              className="mx-10 px-10 text-lg font-bold"
            >
              Network
            </TabsTrigger>
            <TabsTrigger
              value="learningJourney"
              className="mx-10 px-10 text-lg font-bold"
            >
              My Learning Journey
            </TabsTrigger>
            <TabsTrigger
              value="creator"
              className="mx-10 px-10 text-lg font-bold"
            >
              Creator Section
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="andamioNetwork"
            className="grid w-full grid-cols-9 gap-4"
          >
            {!connected ? (
              <div className="col-span-5 col-start-3 my-5">
                <NotConnectedCardano />
              </div>
            ) : (
              <>
                <Card
                  className="col-span-9 flex w-full items-center justify-center bg-indigo-800 text-xl font-bold text-white"
                  size="md"
                >
                  Andamio Learner
                </Card>
                {accessToken ? (
                  <>
                    <Card className="col-span-3">
                      <AccessTokenSection accessToken={accessToken} />
                    </Card>
                    <div className="col-span-6">
                      <AssignmentCommitmentsSection accessToken={accessToken} />
                    </div>
                    <div className="col-span-3">
                      <MyCoursesSection accessToken={accessToken} />
                    </div>

                    <Card className="col-span-6">
                      <CardHeader>
                        <h1 className="text-2xl font-bold">
                          {" "}
                          Completed Courses
                        </h1>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs">
                          <h1>Global State Datum</h1>
                          {alias && (
                            <GlobalStateDatum
                              alias={alias}
                              setCourses={setCourses}
                            />
                          )}
                          <h1>Course State Datum</h1>
                          {courses &&
                            courses.length > 0 &&
                            courses.map((course, i) => (
                              <CourseStateDatum
                                courseNftPolicy={course.LsCs}
                                alias={alias}
                                key={i}
                              />
                            ))}
                          <h1>Assignment Datum</h1>
                          {courses &&
                            courses.length > 0 &&
                            courses.map((course, i) => (
                              <AssignmentDatum
                                courseNftPolicy={course.LsCs}
                                alias={alias}
                                key={i}
                              />
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <div className="col-span-5 col-start-3 my-5">
                    <NoAccessTokenInWallet />
                  </div>
                )}

              </>
            )}
          </TabsContent>
          <TabsContent value="learningJourney" className="flex w-full">
            <AssignmentsSection />
          </TabsContent>
          <TabsContent value="creator" className="flex w-full items-center justify-center">
            {!connected ? (
              <div className="my-5">
                <NotConnectedCardano />
              </div>
            ) : (
              <CreatorsSection accessTokenAlias={alias} />
            )}
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
