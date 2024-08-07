import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import AccessTokenSection from "./dashboard-home/AccessTokenSection";

export default function DashboardHomeComponent() {
  const { accessTokenAlias } = useAccessToken();
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="bg-primary p-5 text-primary-foreground">
        Your Access Token
      </div>
      {accessTokenAlias && <AccessTokenSection alias={accessTokenAlias} />}
      <div className="bg-primary p-5 text-primary-foreground">
        Your Learner Status Summary
      </div>
      <div className="bg-primary p-5 text-primary-foreground">
        Your Course Creator Status
      </div>
      <div className="bg-primary p-5 text-primary-foreground">Your Goals</div>
      <div className="col-span-4 bg-primary p-5 text-primary-foreground">
        <h1>What we want you to understand</h1>
        <p>
          SOME KIND OF OVERVIEW - HOW TO NAVIGATE - HOW TO UNDERSTAND YOUR
          STATUS - WHERE TO LOOK NEXT
        </p>
      </div>
    </div>
  );
}
