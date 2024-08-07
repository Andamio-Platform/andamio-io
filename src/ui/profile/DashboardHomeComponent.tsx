import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import DashboardDataComponent from "./dashboard-home/DashboardDataComponent";

export default function DashboardHomeComponent() {
  const { accessTokenAlias } = useAccessToken();
  return (
    <div className="grid w-full grid-cols-4 gap-5">
      {accessTokenAlias && (
        <DashboardDataComponent
          title="Andamio Access Token"
          data={accessTokenAlias}
          label="Your Unique Alias"
        />
      )}
      <DashboardDataComponent
        title="Courses Completed"
        data="5"
        label="courses"
      />
      <DashboardDataComponent
        title="Courses Owned"
        data="5"
        label="your courses"
      />
      <DashboardDataComponent
        title="Your Goals"
        data="5"
        label="goals achieved"
      />
      <div className="col-span-4 my-5 flex w-full items-center justify-center bg-secondary py-10">
        <div className="mx-auto flex w-2/3 flex-col">
          <h2 className="text-center font-beckman text-4xl">
            your current work
          </h2>
          <p className="py-10 text-center">
            If the holder of the connected Access token already has work in
            progress, this component will appear.
          </p>
        </div>
      </div>
      <div className="col-span-4 bg-primary p-5 text-primary-foreground">
        <h1>How to get started...</h1>
        <p>
          For the newcomer, there is a getting started component that starts an
          integrated tour through Andamio.
        </p>
      </div>
    </div>
  );
}
