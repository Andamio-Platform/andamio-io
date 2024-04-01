import { useSession } from "next-auth/react";
import SideMenu from "./SideMenu";
import PageSignin from "~/ui/auth/PageSignin";
import { useRouter } from "next/router";
import { ThemeProvider } from "~/components/theme-provider";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";

export default function StudioLayout({
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
        <div className="mx-auto w-full lg:w-11/12 xl:w-11/12">{children}</div>
      </main>
      <LightDarkToggle />
    </div>
  );
}
