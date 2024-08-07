import { useSession } from "next-auth/react";
import PageSignin from "~/ui/auth/PageSignin";
import { useRouter } from "next/router";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import MenuBar from "~/ui/landing/MenuBar";

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
    <>
      <MenuBar />
      <main className="mt-[80px]">
        <div className="mx-auto w-full">{children}</div>
      </main>
      <LightDarkToggle />
    </>
  );
}
