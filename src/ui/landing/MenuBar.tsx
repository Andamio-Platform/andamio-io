import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "~/components/link";
import { useSession } from "next-auth/react";
import MenuBarSessionProfile from "../auth/MenuBarSessionProfile";
import UnconfirmedTx from "../transaction/UnconfirmedTx";

const navigation = [
  { name: "Courses", href: "/courses" },
  // { name: "Contributions", href: "#" },
  // { name: "Network", href: "#" },
  { name: "About", href: "/about" },
  { name: "Calendar", href: "/calendar" },
  { name: "Blog", href: "https://blog.andamio.io" },
  { name: "Roadmap", href: "/roadmap" },
];

export default function LandingMenuBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Desktop setMobileMenuOpen={setMobileMenuOpen} />
      <Mobile
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
}

function Desktop({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const { data: sessionData } = useSession();
  return (
    <nav
      className="flex items-center justify-between bg-white p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <span className="-m-1.5 p-1.5">
          <Link href="/">
            <span className="sr-only">Andamio</span>
            <img
              className="h-8 w-auto"
              src="/andamio-logo-w-typography.jpg"
              alt="Andamio"
            />
          </Link>
        </span>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <span className="text-sm font-semibold leading-6 text-foreground">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {/* TO-DO: Implement transaction confirmation manager */}
        {/* Paused due to Maestro's transaction manager for preprod is not working */}
        {/* <UnconfirmedTx unconfirmedTxHash={sessionData?.user.unconfirmedTx} />  */}
        {!sessionData && (
          <Link href={`/auth/signin`}>
            <span className="text-sm font-semibold leading-6 text-foreground">
              Log in <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        )}
        <MenuBarSessionProfile />
      </div>
    </nav>
  );
}

function Mobile({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="sm:ring-forground fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1">
        <div className="flex items-center justify-between">
          <span className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="/andamio-logo.svg"
              alt="Andamio logo"
            />
          </span>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent-foreground hover:text-white">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="py-6">
              <Link href={`/auth/signin`}>
                <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-accent-foreground hover:text-white">
                  Log in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
