import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

const navigation = [
  { name: "Studio", href: "/studio", icon: HomeIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideMenu() {
  const { data: sessionData } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: ownerCourses, isLoading } =
    api.course.getCoursesByOwner.useQuery(undefined, {
      enabled: sessionData != null,
    });

  const router = useRouter();

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/andamio.png"
                      alt="Andamio"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-accent text-indigo-600"
                                    : "text-gray-700 hover:bg-accent hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-indigo-600"
                                      : "text-gray-400 group-hover:text-indigo-600",
                                    "h-6 w-6 shrink-0",
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                          Your courses
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {ownerCourses?.map((course) => (
                            <li key={course.courseCode}>
                              <Link
                                href={`/studio/${course.courseCode}`}
                                className={classNames(
                                  router.query.coursecode == course.courseCode
                                    ? "bg-accent text-indigo-600"
                                    : "text-gray-700 hover:bg-accent hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                )}
                              >
                                <span
                                  className={classNames(
                                    router.query.coursecode == course.courseCode
                                      ? "border-indigo-600 text-indigo-600"
                                      : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-secondary text-[0.625rem] font-medium",
                                  )}
                                >
                                  {course.title.substring(0, 1)}
                                </span>
                                <span className="truncate">{course.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-secondary px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-8 w-auto" src="/andamio.png" alt="Andamio" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-accent text-indigo-600"
                            : "text-gray-700 hover:bg-accent hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "h-6 w-6 shrink-0",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your courses
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {ownerCourses?.map((course) => (
                    <li key={course.courseCode}>
                      <Link
                        href={`/studio/${course.courseCode}`}
                        className={classNames(
                          router.query.coursecode == course.courseCode
                            ? "bg-accent text-indigo-600"
                            : "text-gray-700 hover:bg-accent hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                      >
                        <span
                          className={classNames(
                            router.query.coursecode == course.courseCode
                              ? "border-indigo-600 text-indigo-600"
                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-secondary text-[0.625rem] font-medium",
                          )}
                        >
                          {course.title.substring(0, 1)}
                        </span>
                        <span className="truncate">{course.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {sessionData && (
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
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-secondary px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Studio
        </div>
        <span className="sr-only">Your profile</span>
        <img
          className="h-8 w-8 rounded-full bg-accent"
          src={sessionData?.user?.image ?? ""}
          alt=""
        />
      </div>
    </div>
  );
}
