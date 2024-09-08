import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";
import SideMenu from "~/ui/navigation/SideMenu";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopOnlyLayout>
      <SideMenu />
      <main className="py-10 lg:pl-72">
        <div className="">{children}</div>
        <LightDarkToggle />
      </main>
    </DesktopOnlyLayout>
  );
}
