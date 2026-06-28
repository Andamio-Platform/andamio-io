import React from "react";
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { UseCaseLayout, CycleGrid, Flywheel, type Cycle } from "~/ui/use-cases/chrome";

export default function FanEngagementPage() {
  return (
    <UseCaseLayout
      kicker="Use Case · Sports & Media"
      title="Fan Engagement"
      description="Use Andamio to empower contributors to promote your sports team on social media, build fan loyalty, and grow your audience."
      caption="Use Cases · Sports & Media"
    >
      <CycleGrid cycles={fanEngagementCycles} />

      <Flywheel
        src="/fan-engagement-flywheel.svg"
        alt="fan engagement flywheel"
        zoomAlt="Fan engagement flywheel"
        heading="The Fan Engagement Flywheel"
        description="Each cycle builds loyalty, grows your fanbase, and rewards engaged contributors, creating a powerful feedback loop in fan engagement."
      />
    </UseCaseLayout>
  );
}

const fanEngagementCycles: Cycle[] = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Engage fans to create unique content for social media, promoting your team and increasing visibility.",
    steps: [
      {
        label: "Action:",
        content: "Fans learn content creation skills and gain certification.",
      },
      {
        label: "Reward:",
        content:
          "Content creators receive rewards for unique social media posts promoting the team.",
      },
      {
        label: "Outcome:",
        content:
          "High-quality content enhances fans' skills and builds their credibility.",
      },
    ],
  },
  {
    title: "Cycle Two",
    icon: CheckBadgeIcon,
    description:
      "Train fans to become social media promoters, driving engagement and visibility across platforms.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified promoters share team content and enhance engagement.",
      },
      {
        label: "Reward:",
        content: "Promoters receive rewards for driving positive engagement.",
      },
      {
        label: "Outcome:",
        content:
          "Successful promotion builds promoters' reputation and engagement metrics.",
      },
    ],
  },
  {
    title: "Cycle Three",
    icon: UserGroupIcon,
    description:
      "Enable experienced promoters to become social media managers, representing your team on a national level.",
    steps: [
      {
        label: "Action:",
        content:
          "Promoters advance to social media managers, overseeing team representation.",
      },
      {
        label: "Reward:",
        content:
          "Managers earn compensation for their role, increasing engagement and loyalty.",
      },
      {
        label: "Outcome:",
        content:
          "Active involvement in social media management solidifies their reputation.",
      },
    ],
  },
];
