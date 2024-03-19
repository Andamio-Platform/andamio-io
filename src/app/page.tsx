import { ChevronRightIcon, CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const features = [
  { name: "Education", description: "Andamio supports people to learn new skills." },
  {
    name: "Onboarding",
    description: "Andamio provides supports people to join impactful projects.",
  },
  {
    name: "Course Management",
    description: "Publish Lessons and Assignments, track progress of everyone participating in your course.",
  },
  {
    name: "Contribution Management",
    description:
      "When learners are ready to make valuable contributions, use an Andamio Treasury to approve projects and manage funds.",
  },
  {
    name: "Organization Development",
    description: "Gain insights into what's working best in your organization and where there is room to improve.",
  },
];

export default function HomePage() {
  return (
    <main>
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            
            <h1 className="text-4xl md:text-6xl my-5 md:my-10 font-bold md:leading-[5rem] text-secondary-content">
              Commit.
            </h1>
            <h1 className="text-4xl md:text-6xl my-5 md:my-10 font-bold md:leading-[5rem] text-secondary-content">
              Collaborate.
            </h1>
            <h1 className="text-4xl md:text-6xl my-5 md:my-10 font-bold md:leading-[5rem] text-secondary-content">
              Contribute.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-8 text-secondary-content">
              Andamio is a Learning and Contribution Management Platform built on Web3, and decentralized by design.
            </p>
            <div className="flex flex-row gap-5 my-5">
              <div className="btn btn-success btn-sm rounded-full">
                <Link href="/about" className="">
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none rounded-xl p-3 sm:max-w-5xl lg:max-w-none">
              <Link href="/course">
                <img
                  src="/andamio-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary pt-24 pb-6">
        <div className="mx-auto w-11/12 md:w-3/4 px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="row-span-3">
              <h2 className="text-base font-semibold leading-7 text-info">Project-Based Learning</h2>
              <p className="mt-2 text-xl md:text-3xl font-bold tracking-tight text-primary-content sm:text-4xl">
                For Contributors and Organizations
              </p>
              <p className="my-6 text-sm md:text-base leading-7 text-primary-content">
                Andamio is built to push power to the edges by supporting people to learn new things, by doing things.
              </p>
              <img className="h-32 md:h-80 rounded-xl shadow-xl" src="/andamio.png" alt="Andamio" />
            </div>
            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-primary-content sm:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="font-semibold text-primary-content">
                    <CheckIcon className="absolute left-0 top-1 h-5 w-5 text-success" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-2">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="text-4xl text-center pt-10 pb-5 md:pt-24 md:pb-12 text-primary font-bold">Who is Andamio Built For?</div>
      <div className="w-11/12 md:w-3/4 lg:w-2/3 mx-auto">
        <div className="">
          <div className="card bg-secondary text-secondary-content mx-auto my-10 shadow-xl px-1 md:px-5 py-10 grid grid-cols-1 md:grid-cols-3 border border-primary">
            <div className="col-span-2 px-2 md:px-10">
              <h2 className="text-3xl font-bold pb-5">Learners</h2>
              <p className="">
                Andamio is built for people who want to learn new skills and contribute to real projects. Learners can move between organizations, and can validate that organizations are teaching what they promised.
              </p>
            </div>
            <div className="col-span-1 flex justify-center w-1/3 md:w-full mx-auto">
              <Image src="/icons/global-2-primary.png" width={200} height={200} alt="global-network" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="card bg-secondary text-secondary-content mx-auto my-10 shadow-xl px-1 md:px-5 py-10 grid grid-cols-1 md:grid-cols-3 border border-primary">
            <div className="col-span-1 flex justify-center w-1/3 md:w-full mx-auto">
              <Image src="/icons/scaffolding-primary.png" width={200} height={200} alt="scaffolding" />
            </div>
            <div className="col-span-2 px-2 md:px-10">
              <h2 className="text-3xl font-bold pb-5">Contributors</h2>
              <p className="">
                When learners are ready to contribute, Andamio provides a robust set of tools for validating credentials and supporting new collaborations to take root.
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="card bg-secondary text-secondary-content mx-auto my-10 shadow-xl px-1 md:px-5 py-10 grid grid-cols-1 md:grid-cols-3 border border-primary">
            <div className="col-span-1 flex justify-center w-1/3 md:w-full mx-auto">
              <Image src="/icons/human-network-1-primary.png" width={200} height={200} alt="people-network" />
            </div>
            <div className="col-span-2 px-2 md:px-10">
              <h2 className="text-3xl font-bold pb-5">Organizations</h2>
              <p className="">
                Andamio supports organizations of all sizes to set clear intentions for onboarding and contributor engagement.
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="card bg-secondary text-secondary-content mx-auto my-10 shadow-xl px-1 md:px-5 py-10 grid grid-cols-1 md:grid-cols-3 border border-primary">
            <div className="col-span-2 px-2 md:px-10">
              <h2 className="text-3xl font-bold pb-5">Teachers</h2>
              <p className="">
                Do you have a skill to teach or an organization you want to build? Start <Link href="/course">the Andamio Project-Based Learning course</Link> to get a feel for how Andamio works.
              </p>
            </div>
            <div className="col-span-1 flex justify-center w-1/3 md:w-full mx-auto">
              <Image src="/icons/validate-primary.png" width={200} height={200} alt="validate" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Existing devs: your markdown looks great in Andaio
// Turn your documenation into a PBL course
// Build an on-chain record of contributions
// Turn your community into contributors
// Turn your community into collaborators
// Launch community collaborations
// Collaborate with other organizations - the andamio network
