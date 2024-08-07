import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import MintAccessToken from "~/components/transactions/MintAccessToken";
import { Card } from "~/components/ui/card";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const testData: { policyId: string; courseTitle: string }[] = [
  {
    policyId: "a98573567562a18360d6710bcd5d7a9998fb733b15205d71afdfece3",
    courseTitle: "Andamio 201",
  },
  {
    policyId: "9a4f71d892761a4ecee3fb5f559bc41931a339fcf6467131af594930",
    courseTitle: "PPBL 2024 Private",
  },
  {
    policyId: "5679763f47a4ca0877dd774ef15db7558f29e2b753273e5613db2d9b",
    courseTitle: "Example Course",
  },
  {
    policyId: "8675b941c6aa7d59728e86920dc74834940a694d258a80fa2d1d546f",
    courseTitle: "PPBL 2024",
  },
  {
    policyId: "6e8614bcba95b8309d50af49a9c9fc5cafde41f5922011e815b2d908",
    courseTitle: "What is this",
  },
];
export default function LearnerComponent() {
  const { connected } = useWallet();
  const { accessTokenCourses, accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");

  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
    undefined,
  );
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1 border border-primary p-5">
          {!connected ? (
            <CardanoWallet />
          ) : (
            <>
              <h2>Do you need an access token?</h2>
              {connected && !accessTokenAlias ? (
                <div>
                  Yes you need one.
                  <MintAccessToken />
                </div>
              ) : (
                <>
                  <div>Access Token Name: {accessTokenAlias}</div>
                  <div>User Info: {globalStateDatum?.UserInfo}</div>
                </>
              )}
            </>
          )}
        </div>
        <div className="col-span-1 border border-primary p-5">
          {globalStateDatum?.TokenInfos.length} COURSES!
        </div>
        <div className="col-span-1 border border-primary p-5">
          6 GOALS COMPLETED link - view goals
        </div>
        <div className="col-span-1 row-span-9 bg-secondary">
          COURSES - can this animate in on wallet connected?
          <h2 className="py-5 font-beckman">Current Courses</h2>
          {globalStateDatum?.TokenInfos.map((ti, i) => (
            <Card key={i}>
              <h2>
                Make me a Current Course Card Component - at the core of the
                Learner Dashboard. With information about Assignments, status,
                etc.
              </h2>
              <p>{ti.LsCs}</p>
            </Card>
          ))}
          <h2 className="py-5 font-beckman">Completed Courses</h2>
          {testData.map((t, i) => (
            <Card key={i}>
              {t.courseTitle}
              <Button onClick={() => setSelectedCourse(t.courseTitle)}>
                View
              </Button>
            </Card>
          ))}
        </div>
        {/* Move these details to Course level view - this page should be a list of courses */}
        {/* <AssignmentsSection /> */}
        {/* <OnchainAssignmentsSection /> */}
        {selectedCourse ? (
          <div>{selectedCourse}</div>
        ) : (
          <>
            <div className="col-span-2 border border-primary p-5">
              <p>My Goals - Needed Prereqs or otherwise saved Courses</p>
            </div>
            <div className="col-span-2 border border-primary p-5">
              <h2>ACCESS TOKEN COURSES: Todo - finish that nice hook</h2>
              <pre>{JSON.stringify(accessTokenCourses, null, 2)}</pre>
            </div>
          </>
        )}
        <div className="col-span-3 border border-primary p-5">
          <p>CTA: Want to explore more? Browse all courses!</p>
        </div>
      </div>
    </div>
  );
}
