"use client"

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "~/components/link";
import Image from "next/image";
import { navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import React from "react";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Opportunities", href: "/opportunities" },
];

export default function MenuBar({
  setRole,
  role,
}: {
  setRole?: (role: "learner" | "organization") => void;
  role?: "learner" | "organization";
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden bg-white">
      {/* Desktop Menu */}
      <div className="hidden lg:flex">
        <Desktop
          setMobileMenuOpen={setMobileMenuOpen}
          role={role}
          setRole={setRole}
        />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Mobile
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          setRole={setRole}
          role={role}
        />
      </div>
    </header>
  );
}

function Desktop({
  setRole,
  role,
}: {
  setMobileMenuOpen: (open: boolean) => void;
  setRole?: (role: "learner" | "organization") => void;
  role?: "learner" | "organization";
}) {

  return (
    <div className="flex w-full items-center justify-between px-6 py-6 max-h-20">
      {/* Logo */}
      <Link href="/">
        <Image
          width={200}
          height={200}
          src="/andamio-logo.svg"
          alt="Andamio"
          className="h-auto"
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6 pl-20 pr-20">
        {navigation.map((item) => (
          <Link href={item.href} key={item.name} legacyBehavior passHref>
            <Button
              className={`${navigationMenuTriggerStyle()} cursor-pointer rounded bg-white font-montserrat text-primary shadow-none hover:text-white`}
            >
              {item.name}
            </Button>
          </Link>
        ))}

        <Link href="/contact" legacyBehavior passHref>
          <Button className="cursor-pointer rounded font-montserrat text-white shadow-none hover:bg-white">
            <span className="uppercase">Get in touch</span>
          </Button>
        </Link>
      </div>

      {/* Conditionally Render Learner and Organization Buttons */}
      {!!setRole && !!role && (
        <div className="flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          <Button
            onClick={() => setRole("learner")}
            className={`cursor-pointer rounded px-4 py-2 ${role === "learner"
              ? "cursor-auto bg-primary text-white hover:bg-primary hover:text-white"
              : "bg-white text-primary shadow-none hover:bg-primary hover:text-white"
              }`}
          >
            I am a&nbsp;
            <span className="font-montserrat font-semibold uppercase">
              learner
            </span>
          </Button>
          <Button
            onClick={() => setRole("organization")}
            className={`cursor-pointer rounded px-4 py-2 ${role === "organization"
              ? "cursor-auto bg-primary text-white hover:bg-primary hover:text-white"
              : "bg-white text-primary shadow-none hover:bg-primary hover:text-white"
              }`}
          >
            I am an&nbsp;
            <span className="font-montserrat font-semibold uppercase">
              organization
            </span>
          </Button>
        </div>
      )}

      {/* User Login/Profile */}
      <div>
        <Link href={`https://app.andamio.io`}>
          <Button className="text-md rounded border-2 border-primary bg-primary py-2 font-montserrat font-semibold  uppercase text-white transition-all duration-300 hover:border-primary hover:bg-white hover:text-primary md:px-6">
            Enter App
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Mobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  setRole,
  role,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setRole?: (role: "learner" | "organization") => void;
  role?: "learner" | "organization";
}) {
  return (
    <>
      {/* Mobile Hamburger Icon */}
      <div className="flex w-full items-start justify-between px-4 py-4 lg:hidden">
        <Link href="/">
          <Image
            src="/andamio-logo.svg"
            width={200}
            height={200}
            alt="Andamio Logo"
          />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-gray-700 focus:outline-none"
        >
          <Bars3Icon className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50 overflow-hidden bg-black opacity-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full bg-white p-6 sm:max-w-xs">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/">
              <Image
                src="/andamio-logo.svg"
                width={40}
                height={40}
                className="h-10 w-auto"
                alt="Andamio logo"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 focus:outline-none"
            >
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="block items-start rounded-lg px-3 py-2 font-semibold text-foreground hover:bg-accent-foreground hover:text-white">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Learner and Organization Buttons */}
          {!!setRole && !!role && (
            <div className="mt-6 flex flex-col space-y-4">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRole("learner");
                }}
                className={`w-1/2 cursor-pointer rounded border-2 p-3 ${role === "learner"
                  ? "bg-white text-primary hover:bg-primary hover:text-white"
                  : "bg-primary text-white hover:bg-white hover:text-primary"
                  }`}
              >
                <span className="font-montserrat font-semibold uppercase">
                  Learners
                </span>
              </Button>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRole("organization");
                }}
                className={`w-1/2 cursor-pointer rounded border-2 p-3 ${role === "organization"
                  ? "bg-white text-primary hover:bg-primary hover:text-white"
                  : "bg-primary text-white hover:bg-white hover:text-primary"
                  }`}
              >
                <span className="font-montserrat font-semibold uppercase">
                  Organizations
                </span>
              </Button>
            </div>
          )}

        </Dialog.Panel>
      </Dialog>
    </>
  );
}
