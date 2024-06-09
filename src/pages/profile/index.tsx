import { useWallet } from "@meshsdk/react";
import { useRouter } from "next/router";
import DashboardPage from "~/ui/profile/Dashboard";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <DashboardPage />
    </div>
  );
}
