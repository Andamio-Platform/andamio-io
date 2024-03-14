import { useSession, signOut } from "next-auth/react";
import Navigation from "./Navigation";
import { useState } from "react";

export default function DesktopMenu() {
  const { data: sessionData } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <img className="h-8 w-auto" src="/andamio.png" alt="Andamio" />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <Navigation />
            {sessionData && (
              <li className="-mx-6 mt-auto">
                {isProfileMenuOpen && (
                  <button
                    onClick={() => void signOut({ callbackUrl: "/" })}
                    className="block w-full px-6 py-3 text-left text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 focus:outline-none"
                  >
                    Sign Out
                  </button>
                )}
                <a
                  onClick={() =>
                    setIsProfileMenuOpen((prevState) => !prevState)
                  }
                  className="flex cursor-pointer items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src={sessionData.user?.image ?? ""}
                    alt=""
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{sessionData.user?.name}</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
