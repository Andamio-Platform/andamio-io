import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import CreatorComponent from "./creator/CreatorComponent";

export default function TeacherPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <CreatorComponent />
    </ProfileLayout>
  );
}
