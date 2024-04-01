import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function SessionProfile() {
  const { data: sessionData } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  if (!sessionData) {
    return null;
  }

  return (
    <li className="-mx-6 mt-auto">
      {isProfileMenuOpen && (
        <button
          onClick={() => void signOut({ callbackUrl: "/" })}
          className="block w-full px-6 py-3 text-left text-sm font-semibold leading-6 text-gray-900 hover:bg-accent focus:outline-none"
        >
          Sign Out
        </button>
      )}
      <a
        onClick={() =>
          setIsProfileMenuOpen((prevState) => !prevState)
        }
        className="flex cursor-pointer items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-accent"
      >
        <img
          className="h-8 w-8 rounded-full bg-accent"
          src={sessionData.user?.image ?? ""}
          alt=""
        />
        <span className="sr-only">Your profile</span>
        <span aria-hidden="true">{sessionData.user?.name}</span>
      </a>
    </li>
  )
}