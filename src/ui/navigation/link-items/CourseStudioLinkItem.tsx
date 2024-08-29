import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function CourseStudioLinkItem({ current }: { current: boolean }) {
  return (
    <li key="studio">
      <Link
        href="/studio"
        className={classNames(
          current
            ? "bg-accent text-accent-foreground"
            : "text-foreground hover:bg-accent hover:text-accent-foreground",
          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
        )}
      >
        <PencilSquareIcon
          className={classNames(
            current
              ? "text-foreground"
              : "text-foreground group-hover:text-accent-foreground",
            "h-6 w-6 shrink-0",
          )}
          aria-hidden="true"
        />
        Course Studio
      </Link>
    </li>
  );
}
