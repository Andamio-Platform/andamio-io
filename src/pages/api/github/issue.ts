import { type NextApiRequest, type NextApiResponse } from "next";
import { Octokit } from "@octokit/core";
import { env } from "~/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const octokit = new Octokit({
    auth: env.GITHUB_TOKEN,
  });

  await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: "Andamio-Platform",
    repo: "andamio-platform",
    title: req.body.title,
    body: req.body.body,
    assignees: [],
    labels: ["new"],
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  res.status(200).json(true);
}
