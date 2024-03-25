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
        <div className="w-full lg:w-11/12 xl:w-11/12 mx-auto">{children}</div>
      </main>
    </div>
  );
}


// mx-auto grid w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1600px]