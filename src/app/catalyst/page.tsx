export default function CatalystPage() {
  return (
    <div className="bg-primary text-primary-content p-5 w-full md:w-2/3 mx-auto my-5 shadow-lg">
      <h1 className="text-4xl py-5">Catalyst Fund 11 Proposals</h1>
      <h2 className="text-2xl font-bold py-5">Funded</h2>
      <div className="bg-secondary text-secondary-content p-3 rounded-lg border border-primary flex flex-col">
        <h2 className="text-xl pb-3 font-mono">Open-Source Cardano Go Libraries + Docs + Andamio CLI</h2>
        <p className="py-2 tx-sm border-t border-primary mt-2">PROBLEM STATEMENT:</p>
        <p className="py-2">
          It is hard for open-source development projects to achieve a sustainable level of contribution and financial
          support, even though many developers rely on open-source libraries.
        </p>
        <p className="py-2 tx-sm border-t border-primary mt-2">PROPOSAL:</p>
        <p className="py-2">
          Build the open-source Andamio CLI App in public. Along the way, contribute to the open source tooling the
          project depends on. Demonstrate innovative systems of incentives for open source contributors.
        </p>
        <div className="my-5 bottom-0 btn btn-info place-self-end">
          <a href="https://cardano.ideascale.com/c/idea/113455">Read the Proposal on Ideascale</a>
        </div>
      </div>
      <h2 className="text-2xl font-bold py-5">Not Funded</h2>
      <div className="bg-secondary text-secondary-content p-3 rounded-lg border border-primary flex flex-col">
        <h2 className="text-xl pb-3 font-mono">Andamio (Core Team): Learning & Contribution Platform</h2>
        <p className="py-2 tx-sm border-t border-primary mt-2">PROBLEM STATEMENT:</p>
        <p className="py-2">
          All organizations need skilled Contributors. Right now it is expensive and time consuming to onboard
          Contributors.
        </p>
        <p className="py-2 tx-sm border-t border-primary mt-2">PROPOSAL:</p>
        <p className="py-2">
          Andamio is an Education and Contribution Management Platform that helps organizations onboard skilled
          Contributors and reward them accordingly.
        </p>
        <div className="my-5 bottom-0 btn btn-info place-self-end">
          <a href="https://cardano.ideascale.com/c/idea/113692">Read the Proposal on Ideascale</a>
        </div>
      </div>
    </div>
  );
}
