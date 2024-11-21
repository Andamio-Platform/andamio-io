import PlaceholderComponent from "~/ui/prototype/PlaceholderComponent";
import ContributorDashboardMenu from "~/ui/profile/components/dashboard-menus/ContributorDashboardMenu";

export default function ContributorComponent() {
  return (
    <div>
      <ContributorDashboardMenu />
      <PlaceholderComponent name="Contributor Page" />;
    </div>
  );
}
