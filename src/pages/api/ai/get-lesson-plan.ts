import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await axios.get(
    // `https://ai.andamio.io/get-lesson-plan?slt=${req.body.slt}`,
    `http://localhost:8080/get-lesson-plan?slt=${req.body.slt}`,
  );
  res.status(200).json({ data: result.data });
}
