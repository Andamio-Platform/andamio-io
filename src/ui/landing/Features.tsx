import { AcademicCapIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { LightbulbIcon, UsersIcon } from "lucide-react";

// const features = [
//   {
//     name: "Content Management System",
//     description:
//       "Build your course with a unique platform that enables skill and project-based learning.",
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: "Contribution Management System",
//     description:
//       "Connect your network to contribution opportunities and use your treasury to reward your contributors.",
//     icon: LockClosedIcon,
//   },
//   {
//     name: "Your active network",
//     description:
//       "Build and grow your network of trusted contributors by providing them with skill-based learning opportunities tailored to your needs.",
//     icon: ArrowPathIcon,
//   },
//   {
//     name: "??",
//     description:
//       "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
//     icon: FingerPrintIcon,
//   },
// ];

const features = [
  {
    name: "Continuous Learning",
    description:
      "Empower your contributors with skill building courses designed for the modern world. With Andamio, skill development is continuous, ensuring your organization always stays ahead of the curve.",
    icon: AcademicCapIcon,
  },
  {
    name: "Enhanced Collaboration",
    description:
      "Cultivate a deeply interconnected community where learning sparks collaboration and innovation. Strengthen the fabric of your organization through shared goals and collective achievements.",
    icon: UsersIcon,
  },
  {
    name: "Maximize Impact",
    description:
      "Connect your team’s newfound skills with real-world projects. Andamio pairs skill-based learning with contribution opportunities, enhancing your organizational impact.",
    icon: LightbulbIcon,
  },
  {
    name: "Unlock Potential",
    description:
      "Andamio provides a platform for contributors to showcase and expand their abilities beyond conventional boundaries, bringing hidden talents to the forefront and amplifying organizational capabilities.",
    icon: RocketLaunchIcon,
  },
];

export default function Features() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          For organizations
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Expand and enhance your network of contributors.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Empower your contributors with valuable knowledge and essential
          skills, and unlock doors to impactful opportunities for making a
          difference.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon
                    className="h-6 w-6 text-background"
                    aria-hidden="true"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
