import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";
import AdminPage from "~/ui/profile/AdminPage";

export default function DashboardAdminPage() {
  return (
    <DesktopOnlyLayout>
      <AdminPage />
    </DesktopOnlyLayout>
  );
}
