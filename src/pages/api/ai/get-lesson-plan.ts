import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await axios.get(
    `https://ai.andamio.io/get-lesson-plan?slt=${req.body.slt}`,
  );
  console.log("result", result);

  res.status(200).json({ data: result.data});
}
