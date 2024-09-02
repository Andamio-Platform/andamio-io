import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import DashboardHomeComponent from "./dashboard-home/DashboardHomeComponent";

export default function DashboardPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <DashboardHomeComponent />
    </ProfileLayout>
  );
}
