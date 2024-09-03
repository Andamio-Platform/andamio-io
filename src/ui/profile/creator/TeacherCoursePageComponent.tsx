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
    <div>
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
