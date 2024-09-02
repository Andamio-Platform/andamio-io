import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import GoalsComponent from "./goals/GoalsComponent";

export default function MyGoalsPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <GoalsComponent />
    </ProfileLayout>
  );
}
