import React from "react";
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { UseCaseLayout, CycleGrid, Flywheel, type Cycle } from "~/ui/use-cases/chrome";

export default function LeadGeneratorPage() {
  return (
    <UseCaseLayout
      kicker="Use Case · Business Development"
      title="Lead Generation"
      description="Use Andamio to connect with certified lead generators to drive your business growth."
      caption="Use Cases · Business Development"
    >
      <CycleGrid cycles={leadgenCycles} />

      <Flywheel
        src="/leadgen-flywheel.svg"
        alt="leadgen flywheel"
        zoomAlt="leadgen DAO flywheel"
        heading="The LeadgenDAO Flywheel"
        description="Through each cycle, LeadgenDAO members continue learning, earning, and advancing within the DAO, building a network of trusted lead generation professionals."
      />
    </UseCaseLayout>
  );
}

const leadgenCycles: Cycle[] = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Train quality connectors through Andamio's LeadGen course, certifying them as skilled lead generators to fulfill your company's lead generation needs.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified connectors review lead gen needs and commit to providing leads for your business.",
      },
      {
        label: "Reward:",
        content:
          "Connectors receive compensation upon successfully delivering quality leads.",
      },
      {
        label: "Outcome:",
        content:
          "Each lead delivered enhances their expertise and builds their reputation.",
      },
    ],
  },
  {
    title: "Cycle Two",
    icon: CheckBadgeIcon,
    description:
      "Develop expert lead generators by advancing them to mentorship roles, sharing their skills with new contributors.",
    steps: [
      {
        label: "Action:",
        content:
          "Expert lead gens earn mentor certification to train and support new lead generators.",
      },
      {
        label: "Reward:",
        content:
          "Mentors receive compensation for their guidance and support, building loyalty.",
      },
      {
        label: "Outcome:",
        content:
          "Effective mentorship further establishes mentors' expertise within LeadGenDAO.",
      },
    ],
  },
  {
    title: "Cycle Three",
    icon: UserGroupIcon,
    description:
      "Support expert mentors in becoming active DAO members, gaining access to benefits and participating in governance.",
    steps: [
      {
        label: "Action:",
        content:
          "Mentors join the DAO, participating in governance and decision-making.",
      },
      {
        label: "Reward:",
        content:
          "DAO members access exclusive benefits, enhancing their engagement and loyalty.",
      },
      {
        label: "Outcome:",
        content:
          "Growing influence within LeadGenDAO elevates their professional reputation.",
      },
    ],
  },
];
