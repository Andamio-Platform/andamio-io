import ProfileLayout from "./layout/ProfileLayout";
import ContributorComponent from "./roles/contributor/ContributorComponent";

export default function ContributorPage() {
  return (
    <ProfileLayout>
      <ContributorComponent />
    </ProfileLayout>
  );
}
