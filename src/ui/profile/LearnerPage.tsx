import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import LearnerComponent from "./learner/LearnerComponent";

export default function LearnerPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <LearnerComponent />
    </ProfileLayout>
  );
}
