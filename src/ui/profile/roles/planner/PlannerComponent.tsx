import PlaceholderComponent from "~/ui/prototype/PlaceholderComponent";
import PlannerDashboardMenu from "~/ui/profile/components/dashboard-menus/PlannerDashboardMenu";

export default function PlannerComponent() {
  return (
    <div>
      <PlannerDashboardMenu />
      <PlaceholderComponent name="Planner Page" />;
    </div>
  );
}
