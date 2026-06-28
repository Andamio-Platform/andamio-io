import React from "react";
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { UseCaseLayout, CycleGrid, Flywheel, type Cycle } from "~/ui/use-cases/chrome";

export default function DecentralizedInnovationPage() {
  return (
    <UseCaseLayout
      kicker="Use Case · Innovation"
      title="Decentralized Innovation"
      description="Use Andamio to certify reviewers, build their reputation, and ensure high-quality assessments."
      caption="Use Cases · Innovation"
    >
      <CycleGrid cycles={cycles} />

      <Flywheel
        src="/pc-flywheel.svg"
        alt="decentralized innovation fund reviewer flywheel"
        heading="The Decentralized Innovation Flywheel"
        description="The Reviewer journey is a continuous cycle of learning, certification, and paid contributions, helping build trusted reputations within your community."
      />
    </UseCaseLayout>
  );
}

const cycles: Cycle[] = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Invite community members to earn Level 1 certification, training them to assess proposals and provide structured feedback.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified reviewers join funding rounds, providing structured proposal feedback.",
      },
      {
        label: "Reward:",
        content: "Compensation drives accuracy and engagement.",
      },
      {
        label: "Outcome:",
        content:
          "Each review enhances the reviewer's credibility and strengthens funding decisions.",
      },
    ],
  },
  {
    title: "Cycle Two",
    icon: CheckBadgeIcon,
    description:
      "Support experienced reviewers in advancing to Level 2 certification for handling more complex proposal reviews.",
    steps: [
      {
        label: "Action:",
        content:
          "Level 2 reviewers apply advanced criteria in later funding rounds.",
      },
      {
        label: "Reward:",
        content: "Increased compensation encourages continuous improvement.",
      },
      {
        label: "Outcome:",
        content:
          "High-quality reviews from skilled contributors boost trust and improve funding outcomes.",
      },
    ],
  },
  {
    title: "Cycle Three",
    icon: BriefcaseIcon,
    description:
      "Develop a team of milestone reviewers, certified to oversee milestone progress and validate project completion.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified milestone reviewers monitor project stages and validate results.",
      },
      {
        label: "Reward:",
        content: "Financial incentives ensure diligent oversight.",
      },
      {
        label: "Outcome:",
        content:
          "Consistent milestone management strengthens your organization's reputation for accountability.",
      },
    ],
  },
];
