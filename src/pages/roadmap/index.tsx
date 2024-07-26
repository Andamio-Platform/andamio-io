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
          <p className="py-3 text-center text-xl font-bold">Andamio Platform</p>
          <p className="py-3 text-center text-xl font-bold">Features</p>
          <p className="py-3 text-center text-xl font-bold">Community</p>
          <div
            className="w-full font-bold opacity-90"
            id="foreground-grid"
          >
            {roadmapData.map((rmp, i) => (
              <>
                <div
                  className="w-full py-24"
                  key={i}
                >
                  <div className="flex w-11/12 mx-auto my-5 text-4xl">
{rmp.date}
                    </div>
                  <div className="mx-2 my-1 flex flex-col items-center px-2">
                    {rmp.andamioPlatform.map((cp, j) => {
                      return (
                        <Card
                          size="md"
                          className={`mx-auto my-1 flex w-11/12 items-center p-3 text-lg `}
                          key={cp + j}
                        >
                          {cp}
                        </Card>
                      );
                    })}
                  </div>
                  <div className="mx-2 my-1 flex flex-col items-center px-2 text-sm">
                    {rmp.features.map((vp, j) => {
                      return (
                        <Card
                          size="md"
                          className={`mx-auto my-1 flex w-11/12 items-center px-2`}
                          key={vp + j}
                        >
                          {vp}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
