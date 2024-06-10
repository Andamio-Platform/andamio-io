import { useSession } from "next-auth/react";
import Navigation from "./Navigation";
import SideMenuSessionProfile from "~/ui/auth/SideMenuSessionProfile";
import Link from "next/link";

export default function DesktopMenu() {
  const { data: sessionData } = useSession();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-foreground px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/">
            <img className="h-8 w-auto" src="/andamio-logo.svg" alt="Andamio" />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <Navigation />
            {sessionData && <SideMenuSessionProfile />}
          </ul>
        </nav>
      </div>
    </div>
  );
}
