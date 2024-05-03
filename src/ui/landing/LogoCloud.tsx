import Link from "~/components/link";

export default function LogoCloud() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:px-8">
        <img
          className="col-span-2 max-h-24 max-w-24 rounded-full object-cover lg:col-span-1"
          src="/images/logos/mesh-square.svg"
          alt="Transistor"
        />
        <img
          className="col-span-2 max-h-24 max-w-24 rounded-full object-contain lg:col-span-1"
          src="/images/logos/Gimbalabs-sq.svg"
          alt="Reform"
        />
        <img
          className="col-span-2 max-h-24 max-w-24 rounded-full object-contain lg:col-span-1"
          src="/images/logos/Edify-sq.svg"
          alt="Tuple"
        />
        <img
          className="col-span-2 max-h-24 max-w-24 rounded-full object-contain sm:col-start-2 lg:col-span-1"
          src="/images/logos/sidan-sq.svg"
          alt="SavvyCal"
        />
        <img
          className="col-span-2 col-start-2 max-h-24 max-w-24 rounded-full object-contain sm:col-start-auto lg:col-span-1"
          src="/images/logos/singularity-sq.svg"
          alt="Statamic"
        />
      </div>
      <div className="mt-16 flex justify-center">
        <p className="ring-forground hover:ring-forground relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset">
          <span className="hidden md:inline">
            Gimbalabs used the Andamio Content Management System to create a
            Plutus Project-Based Learning course to onboard developers to the
            Cardano ecosystem.
          </span>
          <Link href={`#`}>
            <span className="font-semibold text-primary">
              <span className="absolute inset-0" aria-hidden="true" /> Read our
              case study <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
