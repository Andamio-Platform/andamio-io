import Link from "~/components/link";

export default function LogoCloud() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <div className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-5">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src="/images/logos/mesh-square.svg"
          alt="Mesh Logo"
        />
        <img
          className="h-20 w-20 rounded-full object-cover"
          src="/images/logos/Gimbalabs-sq.svg"
          alt="Gimbalabs Logo"
        />
        <img
          className="h-20 w-20 rounded-full object-cover"
          src="/images/logos/Edify-sq.svg"
          alt="Edify Logo"
        />
        <img
          className="h-20 w-20 rounded-full object-cover"
          src="/images/logos/sidan-sq.svg"
          alt="SIDAN Labs Logo"
        />
        <img
          className="h-20 w-20 rounded-full object-cover"
          src="/images/logos/singularity-sq.svg"
          alt="SingularityNET Logo"
        />
      </div>
      <div className="mt-16 flex justify-center">
        <div className="rounded-md p-4 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-300 transition duration-300 hover:ring-gray-400">
          <p>
            Gimbalabs used the Andamio Content Management System to create a
            Plutus Project-Based Learning course to onboard developers to the
            Cardano ecosystem.
          </p>
          <Link href={`#`}>
            <span className="font-semibold text-primary hover:underline">
              Read our case study <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
