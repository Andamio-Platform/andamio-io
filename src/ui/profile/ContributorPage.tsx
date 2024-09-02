import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import ContributionComponent from "./contribution/ContributionComponent";

export default function ContributorPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <ContributionComponent />
    </ProfileLayout>
  );
}
