import { useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import ConnectWalletCard from "../course/components/assignments/cards/ConnectWalletCard";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import AccessTokenSection from "./AccessTokenSection";
import AssignmentCommitmentsSection from "./AssignmentCommitmentsSection";
import CompletedCourses from "./CompletedCourses";
import MyCoursesSection from "./MyCoursesSection";

export default function OnchainAssignmentsSection() {
  const { connected } = useWallet();
  const { accessTokenAlias, accessTokenAsset, accessTokenCourses } =
    useAccessToken();
  return (
    <>
      {!connected ? (
        <div className="">
          <ConnectWalletCard />
        </div>
      ) : (
        <>
          <Card
            className="flex w-full items-center justify-center bg-indigo-800 text-xl font-bold text-white"
            size="md"
          >
            Andamio Learner
          </Card>
          {accessTokenAsset ? (
            <>
              <Card className="">
                <AccessTokenSection alias={accessTokenAlias ?? ""} />
              </Card>
              <div className="">
                <AssignmentCommitmentsSection
                  accessToken={accessTokenAsset}
                  alias={accessTokenAlias ?? ""}
                  courses={accessTokenCourses}
                />
              </div>
              <div className="">
                <MyCoursesSection
                  accessToken={accessTokenAsset}
                  alias={accessTokenAlias ?? ""}
                  courses={accessTokenCourses}
                />
              </div>

              <Card className="">
                <CardHeader>
                  <h1 className="text-2xl font-bold"> Completed Courses</h1>
                </CardHeader>
                <CardContent>
                  <div className="text-xs">
                    {accessTokenAlias && (
                      <CompletedCourses alias={accessTokenAlias} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="my-5">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      No access token found in your connected wallet
                    </CardTitle>
                    <CardDescription>
                      Join the Andamio Network by minting an Andamio Access
                      Token.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>Get Token</Button>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm">
                      By connecting to the andamio network you will unlock
                      Andamio&apos;s state-of-the-art on-chain credential
                      features.{" "}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
