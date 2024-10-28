import { useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import CreatorsSection from "./CreatorsSection";
import CreatorConnectWalletCard from "./CreatorConnectWalletCard";

export default function TeacherCoursePageComponent({
  courseCode,
}: {
  courseCode: string;
}) {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  return (
    <div className="mx-auto mt-12 flex w-5/6 items-center justify-center">
      {connected ? (
        <CreatorsSection
          accessTokenAlias={accessTokenAlias ?? ""}
          courseCode={courseCode}
        />
      ) : (
        <CreatorConnectWalletCard />
      )}
    </div>
  );
}
