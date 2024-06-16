import { useSession } from "next-auth/react";
import Link from "~/components/link";

const pageCopy = [
  "The Andamio Platform is currently in closed preproduction testing. Open preproduction testing will launch in July 2024. Andamio will launch on Mainnet Q3 2024.",
  "You can start exploring the Andamio Course Platform by viewing the courses listed below. In \"Getting Started With Andamio\", you can jump right into the Andamio Platform. Gimbalabs and Mesh are currently releasing \"Plutus PBL\" and \"Mesh PBL\" courses. In the next few months, additional courses will go live.",
]

export default function SectionWelcome() {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-auto mt-32 min-h-[50vh] max-w-7xl px-6 sm:mt-56 sm:mb-32 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          from learning to contribution
        </h2>
        <h2 className="my-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome to Andamio
        </h2>
        {pageCopy.map((pc, i) => (
          <p key={i} className="prose mx-auto w-5/6 mt-6 text-lg leading-8 text-left">{pc}</p>
        ))}
        </div>
    </div>
  );
}
