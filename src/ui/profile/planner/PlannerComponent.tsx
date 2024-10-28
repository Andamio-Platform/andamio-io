import PlaceholderComponent from "~/ui/prototype/PlaceholderComponent";
import PlannerDashboardMenu from "../dashboard-menus/PlannerDashboardMenu";

export default function PlannerComponent() {
  return (
    <div>
      <PlannerDashboardMenu />
      <PlaceholderComponent name="Planner Page" />;
    </div>
  );
}
