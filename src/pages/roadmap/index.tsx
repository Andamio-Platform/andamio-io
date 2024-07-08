import MenuBar from "../../ui/landing/MenuBar";
import { Card } from "~/components/ui/card";

const roadmapData = [
  {
    date: "2023",
    andamioPlatform: [],
    features: [],
    products: [],
    community: [],
  },
  {
    date: "Q1 2024",
    andamioPlatform: [],
    features: [],
    products: [],
    community: [],
  },
  {
    date: "Q2 2024",
    andamioPlatform: [
      "Contributor Platform Mainnet prototype currently testing at Gimbalabs",
    ],
    features: [
      "Learners can create accounts at andamio.io",
      "Learners can track progress off-chain",
      "Creators can create a course a write course content",
      "Creators can deploy a course on-chain",
      "Creators can manage a course",
      // "Andamio team tests on-chain course enrollment",
      "Contributors can make treasury commitments",
    ],
    products: [
      "Early access to Andamio Studio for creators",
      "Train-the-trainer workshops",
    ],
    community: [],
  },
  {
    date: "July 2024",
    andamioPlatform: ["Course Platform Preprod Release"],
    features: [
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
    community: ["Andamio Public Discord", "Beta testing"],
  },
  {
    date: "Q3 2024",
    andamioPlatform: [
      "Course Platform Mainnet Release",

      "Contributor Platform Documentation available to clients",
    ],
    features: [
      "Learners can sign up for a course on Cardano Mainnet",
      "Learners commit to an assignment on Cardano Mainnet",
      "Learners can track learning progress: on-chain",
      "Learners can complete a course and register the results to global state",
      "Creators can create a course on Mainnet",
      "Creators can approve assignment commitments on Mainnet",
    ],
    products: [],
    community: [],
  },
  {
    date: "November 2024",
    andamioPlatform: ["Andamio Platform: Full Public Release"],
    features: [
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
      "Reviewers can distribute funds for completed projects",
    ],
    products: [],
    community: [],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <MenuBar />
      <main
        className="items-center justify-center"
        style={{ minHeight: "calc(100vh - 5rem)" }}
      >
        <div className="mx-auto w-full">
          <h1 className="p-5 text-4xl font-bold">Andamio Roadmap</h1>
          <div className="relative z-10 p-5">
            <div
              className="absolute inset-0 z-20 grid h-[3020px] w-full grid-cols-12 bg-gradient-to-b from-indigo-300 to-orange-300"
              id="background-grid"
            >
              <div className="col-span-3 h-[3020px] border-r border-black/50">
                <p className="py-3 text-center text-xl font-bold">
                  Andamio Platform
                </p>
              </div>
              <div className="col-span-3 h-[3020px] border-r border-black/50 ">
                <p className="py-3 text-center text-xl font-bold">Features</p>
              </div>
              <div className="col-span-3 h-[3020px]">
                <p className="py-3 text-center text-xl font-bold">Community</p>
              </div>
              {/* <div className="col-span-2 h-[4000px] ">
              <p className="py-3 text-center text-xl font-bold">Products</p>
            </div> */}
              <div className="col-span-4 "></div>
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
                    <div className="col-span-3 col-start-1 mx-2 my-1 flex flex-col items-center px-2">
                      {rmp.andamioPlatform.map((cp, j) => {
                        let col = "bg-purple-800";
                        if (cp.startsWith("Course")) {
                          col = "bg-green-800";
                        }
                        if (cp.startsWith("Andamio Platform")) {
                          col = "bg-gradient-to-r from-green-800 to-purple-800";
                        }
                        if (cp.startsWith("INTERNAL")) {
                          col = "bg-red-800";
                        }
                        return (
                          <Card
                            size="md"
                            className={`mx-auto my-1 flex w-11/12 items-center p-3 ${col} text-lg text-white`}
                            key={cp + j}
                          >
                            {cp}
                          </Card>
                        );
                      })}
                    </div>
                    <div className="col-span-3 col-start-4 mx-2 my-1 flex flex-col items-center px-2 text-sm">
                      {rmp.features.map((vp, j) => {
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

                        if (
                          vp.startsWith("Contributors") ||
                          vp.startsWith("Organizations") ||
                          vp.startsWith("Reviewers")
                        ) {
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
                    <div className="col-span-3 col-start-7 mx-2 my-1 flex flex-col items-center px-2 text-sm">
                      {rmp.community.map((community, j) => (
                        <Card
                          size="md"
                          className="mx-auto my-1 flex w-11/12 items-center bg-blue-800 px-2 text-white"
                          key={community + j}
                        >
                          {community}
                        </Card>
                      ))}
                    </div>
                    {/* 
                  <div className="col-span-2 col-start-7 mx-2 my-1 flex flex-col items-center px-2 text-sm">
                    {rmp.products.map((pro, j) => (
                      <Card
                        size="md"
                        className="mx-auto my-1 flex w-11/12 items-center bg-orange-800 px-2 text-white"
                        key={pro + j}
                      >
                        {pro}
                      </Card>
                    ))}
                  </div> */}
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
    </>
  );
}
