import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "~/components/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const navigation = [
  { name: "My Profile", href: "/profile" },
  { name: "Learn", href: "/profile/learn" },
  // { name: "Contributions", href: "#" },
  // { name: "Network", href: "#" },
  { name: "Course Creators", href: "/profile/create" },
  { name: "My Goals", href: "/profile/goals" },
  { name: "Contribution", href: "/profile/contribution" },
];

export default function ProfileMenuBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="">
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
      className="flex items-center justify-between bg-secondary px-6 text-primary-foreground lg:px-8"
      aria-label="Global"
    >
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
        <span className="text leading-6 text-foreground">
          Your Profile &gt;
        </span>
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <span className="text leading-6 text-foreground">{item.name}</span>
          </Link>
        ))}
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
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
