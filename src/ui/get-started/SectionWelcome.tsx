const pageCopy = [
  "The Andamio Platform is preparing to launch on Cardano's Preproduction Testnet. In collaboration with partners from across the Cardano ecosystem, we are preparing a set of high-impact courses. Andamio will launch on Mainnet Q3 2024.",
  'You can start exploring the Andamio Course Platform by viewing the courses listed below. In "Getting Started With Andamio", you can jump right into the Andamio Platform. Gimbalabs and Mesh are currently releasing "Plutus PBL" and "Mesh PBL" courses.',
];

export default function SectionWelcome() {
  return (
    <div className="mx-auto min-h-[50vh] max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary-foreground">
          from learning to contribution
        </h2>
        <h2 className="my-5 text-3xl font-bold tracking-tight  sm:text-4xl">
          Welcome to Andamio
        </h2>
        {pageCopy.map((pc, i) => (
          <p
            key={i}
            className="prose mx-auto mt-6 w-5/6 text-left text-lg leading-8 text-primary-foreground"
          >
            {pc}
          </p>
        ))}
      </div>
    </div>
  );
}
