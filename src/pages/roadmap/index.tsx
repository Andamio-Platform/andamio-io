import { Card } from "~/components/ui/card";

const roadmapData = [
  {
    date: "June 2024",
    andamioPlatform: [
      "Course Platform Preprod Internal Release",
      "Contributor Platform Mainnet prototype currently testing at Gimbalabs",
    ],
    network: ["Tokenomics proposal forming"],
    valueProps: [
        "Learners can create accounts at andamio.io",
        "Learners can track progress off-chain",
        "Creators can create a course a write course content",
        "Creators can deploy a course on-chain",
        "Creators can manage a course",
        "Andamio team tests on-chain course enrollment",
        "Contributors can make treasury commitments"
    ],
    products: [
      "Early access to Andamio Studio for creators",
      "Train-the-trainer workshops",
    ],
  },
  {
    date: "July 2024",
    andamioPlatform: ["Course Platform Preprod Public Release"],
    network: [],
    valueProps: [
        "Learners can enroll in a course on Cardano Preprod",
        "Learners can Commit to an assignment on Cardano Preprod",
        "Learners can track learning progress: on-chain",
        "Creators can track learning progress: on-chain",
        "Creators can create a course",
        "Creators can deploy a course on-chain",
        "Creators can manage a course on-chain",
        "Creators can approve assignment commitments",
    ],
    products: [],
  },
  {
    date: "Q3 2024",
    andamioPlatform: ["Course Platform Mainnet Release", "Contributor Platform Documentation available to clients"],
    network: [],
    valueProps: [
        "Learners can sign up for a course on Cardano Mainnet",
        "Learners commit to an assignment on Cardano Mainnet",
        "Learners can track learning progress: on-chain",
        "Learners can complete a course and register the results to global state",
        "Creators can create a course on Mainnet",
        "Creators can approve assignment commitments on Mainnet",
    ],
    products: [],
  },
  {
    date: "November 2024",
    andamioPlatform: ["Andamio Platform: Full Public Release"],
    network: [],
    valueProps: [
        "Learners can sign up for a course on Cardano Mainnet",
        "Learners commit to an assignment on Cardano Mainnet",
        "Learners can track learning progress: on-chain",
        "Learners can complete a course and register the results to global state",
        "Creators can create a course on Mainnet",
        "Creators can approve assignment commitments on Mainnet",
        "Learners can become contributors to organizations",
        "Contributors can commit to projects",
        "Organizations can place funds in contribution treasury",
        "Organizations can approve projects for funding",
        "Reviewers can distribute funds for completed projects"
    ],
    products: [],
  },
];

export default function RoadmapPage() {
  return (
    <main
      className="items-center justify-center"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div className="mx-auto w-full">
        <h1 className="p-5 text-4xl font-bold">Andamio Roadmap</h1>
        <div className="relative z-10 p-5">
          <div
            className="absolute inset-0 z-20 grid w-full h-[4000px] grid-cols-12 font-mono bg-gradient-to-b from-indigo-300 to-orange-300"
            id="background-grid"
          >
            <div className="col-span-2 h-[4000px] border-r border-black/50">
              <p className="py-3 text-center text-xl font-bold">
                Andamio Platform
              </p>
            </div>
            <div className="col-span-2 h-[4000px] border-r border-black/50">
              <p className="py-3 text-center text-xl font-bold">
                Andamio Network
              </p>
            </div>
            <div className="col-span-2 h-[4000px] border-r border-black/50 ">
              <p className="py-3 text-center text-xl font-bold">Value Props</p>
            </div>
            <div className="col-span-2 h-[4000px] ">
              <p className="py-3 text-center text-xl font-bold">Products</p>
            </div>
            <div className="col-span-4 h-[4000px]"></div>
          </div>
          <div
            className="absolute inset-0 z-30 grid w-full grid-cols-12 gap-3 font-bold opacity-90"
            id="foreground-grid"
          >
            {roadmapData.map((rmp, i) => (
              <>
                <div
                  className="col-span-9 grid w-full grid-cols-9 py-24"
                  key={i}
                >
                  <div className="col-span-2 col-start-1 mx-2 my-1 flex flex-col items-center px-2">
                    {rmp.andamioPlatform.map((cp, j) => {
                        let col = "bg-purple-800"
                        if(cp.startsWith("Course")) {
                            col = "bg-green-800"
                        }
                        if(cp.startsWith("Andamio Platform")) {
                            col = "bg-gradient-to-r from-green-800 to-purple-800"
                        }
                      return (
                        <Card
                          size="md"
                          className={`mx-auto my-1 flex w-11/12 items-center p-3 ${col} text-white text-lg`}
                          key={cp + j}
                        >
                          {cp}
                        </Card>
                      );
                    })}
                  </div>

                  <div className="col-span-2 col-start-3 mx-2 my-1 flex flex-col items-center px-2 text-sm">
                    {rmp.network.map((network, j) => (
                      <Card
                        size="md"
                        className="mx-auto my-1 flex w-11/12 items-center px-2 bg-blue-800 text-white"
                        key={network + j}
                      >
                        {network}
                      </Card>
                    ))}
                  </div>
                  <div className="col-span-2 col-start-5 mx-2 my-1 flex flex-col items-center px-2 text-sm">
                    {rmp.valueProps.map((vp, j) => {
                      let col = "bg-gray-800";
                      if (vp.startsWith("Learners")) {
                        col = "bg-green-800";
                      }

                      if (vp.startsWith("Creators")) {
                        col = "bg-green-800";
                      }

                      if (vp.startsWith("Andamio")) {
                        col = "bg-pink-800";
                      }

                      if (vp.startsWith("Contributors") || vp.startsWith("Organizations") || vp.startsWith("Reviewers")) {
                        col = "bg-purple-800";
                      }



                      return (
                        <Card
                          size="md"
                          className={`mx-auto my-1 flex w-11/12 items-center px-2 ${col} text-white`}
                          key={vp + j}
                        >
                          {vp}
                        </Card>
                      );
                    })}
                  </div>
                  <div className="col-span-2 col-start-7 mx-2 my-1 flex flex-col items-center px-2 text-sm">
                    {rmp.products.map((pro, j) => (
                      <Card
                        size="md"
                        className="mx-auto my-1 flex w-11/12 items-center px-2 bg-orange-800 text-white"
                        key={pro + j}
                      >
                        {pro}
                      </Card>
                    ))}
                  </div>
                </div>
                <Card className="col-span-3 col-start-10 flex items-center rounded-none border-none bg-orange-800/70 text-4xl text-white">
                  {rmp.date}
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
