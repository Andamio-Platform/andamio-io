import PlaceholderComponent from "~/ui/prototype/PlaceholderComponent";
import ContributorDashboardMenu from "../dashboard-menus/ContributorDashboardMenu";

export default function ContributorComponent() {
  return (
    <div>
      <ContributorDashboardMenu />
      <PlaceholderComponent name="Contributor Page" />;
    </div>
  );
}
