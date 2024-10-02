import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "https://blog.andamio.io" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Contact", href: "/contact" },
];

export default function MenuBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 flex w-full bg-white">
      {/* Desktop Menu */}
      <div className="flex w-full items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/">
          <Image
            width={150}
            height={150}
            src="/andamio-logoV2.png"
            alt="Andamio Logo"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden space-x-8 lg:flex">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} passHref>
              <span className="cursor-pointer text-gray-700 hover:text-blue-600">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 lg:flex">
          <Link href="/auth/signin">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Log in
            </button>
          </Link>
          <Link href="/contact">
            <button className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800">
              Get in Touch
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                width={150}
                height={150}
                src="/andamio-logoV2.png"
                alt="Andamio Logo"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-100">
                  {item.name}
                </span>
              </Link>
            ))}
            <Link href="/auth/signin">
              <button className="w-full rounded bg-black px-4 py-2 text-white">
                Log in
              </button>
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
