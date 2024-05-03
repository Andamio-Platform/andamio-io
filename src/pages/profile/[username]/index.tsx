import { useWallet } from "@meshsdk/react";
import { useRouter } from "next/router";
import DashboardPage from "~/ui/[username]/Dashboard";

export default function Dashboard() {
  const router = useRouter();
  const username = router.query.username;

  return (
    <div>
      <DashboardPage username={username as string} />
    </div>
  );
}
