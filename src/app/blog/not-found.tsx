import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-sm p-8 shadow-md">
        <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-8">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link href="/" className="hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
