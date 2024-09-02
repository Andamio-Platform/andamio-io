import { useSession } from "next-auth/react";
import PageSignin from "~/ui/auth/PageSignin";
import { useRouter } from "next/router";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import SideMenu from "~/ui/navigation/SideMenu";
import DashboardNavigationMenu from "../DashboardNavigationMenu";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData } = useSession();
  const route = useRouter();

  if (sessionData === null) {
    return <PageSignin redirectUrl={route.asPath} />;
  }

  return (
    <div>
      <SideMenu />
      <main className="py-10 lg:pl-72">
        <DashboardNavigationMenu />
        <div className="mx-auto w-full lg:w-11/12">{children}</div>
      </main>
      <LightDarkToggle />
    </div>
  );
}
