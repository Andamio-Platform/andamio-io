import { type Dispatch, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "~/components/link";
import { useSession } from "next-auth/react";
import MenuBarSessionProfile from "../auth/MenuBarSessionProfile";
import Image from "next/image";
import { navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";

const navigation = [
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Calendar", href: "/calendar" },
  { name: "Blog", href: "https://blog.andamio.io" },
  { name: "Roadmap", href: "/roadmap" },
];

export default function MenuBar({}: {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex w-full flex-col md:flex-row">
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
    <div className="z-20 hidden w-full items-center p-2 lg:flex">
      <div className="flex w-full items-center justify-between">
        <div>
          <Link href="/">
            <Image
              width={400}
              height={400}
              className="h-20 w-auto"
              src="/andamio-logo-w-typography.jpg"
              alt="Andamio"
            />
          </Link>
        </div>

        <div className="flex space-x-12 pr-20">
          <div>
            <Link href="/#why-andamio" legacyBehavior passHref>
              <div className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                Why&nbsp;<text className="font-extrabold">ANDAMIO</text>?
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://blog.andamio.io" legacyBehavior passHref>
              <div className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                Blog
              </div>
            </Link>
          </div>
          <div>
            <Link href="/roadmap" legacyBehavior passHref>
              <div className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                Roadmap
              </div>
            </Link>
          </div>
          <div>
            <Link href="/contact" legacyBehavior passHref>
              <div
                className={`${navigationMenuTriggerStyle()} cursor-pointer bg-black`}
              >
                <text className="font-extrabold text-white">GET IN TOUCH</text>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <div className="hidden lg:mr-5 lg:flex lg:flex-1 lg:justify-end">
            {!sessionData && (
              <Link href={`/auth/signin`}>
                <span className="text-sm font-semibold leading-6 text-foreground">
                  Log in <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            )}
            <MenuBarSessionProfile />
          </div>
        </div>
      </div>
    </div>
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
      <Dialog.Panel className="sm:ring-forground fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background sm:max-w-sm sm:ring-1">
        <div className="flex items-center justify-between">
          <span className="-m-1.5 p-1.5">
            <span className="sr-only">Andamio</span>
            <Image
              width={40}
              height={40}
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
