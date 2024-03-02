import { useSession } from "next-auth/react";
import SideMenu from "./SideMenu";
import PageSignin from "~/ui/auth/PageSignin";
import { useRouter } from "next/router";

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
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
