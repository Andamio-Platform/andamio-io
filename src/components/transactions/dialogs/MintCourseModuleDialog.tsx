import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { type CourseModuleOverview } from "~/types/db";
import MintCourseModule from "../course/creator/mintCourseModule/MintCourseModule";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import { useState } from "react";

export default function MintCourseModuleDialog({
  courseModuleOverview,
  courseNftPolicyId,
}: {
  courseModuleOverview: CourseModuleOverview;
  courseNftPolicyId: string;
}) {
  const { accessTokenAsset } = useAccessToken();

  const [confirmedSlts, setConfirmedSlts] = useState<boolean[]>(
    courseModuleOverview.slts.map(() => false),
  );

  const toggleSlt = (i: number) => {
    const updatedSlts = [...confirmedSlts];
    updatedSlts[i] = !updatedSlts[i];
    setConfirmedSlts(updatedSlts);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Mint Course Module</Button>
      </DialogTrigger>
      <DialogContent>
        {/* About this Module */}
        <h2>Module Details</h2>
        {courseModuleOverview.slts.map((slt, j) => (
          <div
            key={j}
            onClick={() => toggleSlt(j)}
            className={`${confirmedSlts[j] ? "bg-success" : "bg-warning"} w-full cursor-pointer rounded-md p-2 font-bold`}
          >
            <p>
              {courseModuleOverview.moduleCode}.{slt.moduleIndex}: {slt.sltText}
            </p>
          </div>
        ))}
        {courseModuleOverview.assignments?.length > 0 && (
          <p>Assignment: {courseModuleOverview.assignments[0]?.title}</p>
        )}
        {/* What it means to mint a Module */}
        <h2>What it means to mint a Module</h2>
        <p>
          By minting this module you are making a promise and setting the rules
          for an on-chain credential that you will issue. Are you sure that
          Module {courseModuleOverview.moduleCode} covers these SLTs? Are you
          sure that this Assignment provides sufficient evidence of learner
          progress?
        </p>
        <p>If yes, then you can put this module on-chain!</p>
        {/* Confirm Tx Button */}
        {accessTokenAsset && confirmedSlts.every((s) => s === true) && (
          <MintCourseModule
            accessTokenAssetId={accessTokenAsset.unit}
            courseNftPolicyId={courseNftPolicyId}
            courseModuleOverview={courseModuleOverview}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
