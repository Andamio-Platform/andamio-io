import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import SideMenu from "./SideMenu";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SideMenu />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        <LightDarkToggle />
      </main>
    </div>
  );
}
