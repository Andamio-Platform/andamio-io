import Link from "next/link";

export default function GetStartedButton() {
  return (
    <Link href={`/auth/signin`}>
      <span className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Get started
      </span>
    </Link>
  );
}
