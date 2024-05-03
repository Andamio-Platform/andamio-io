import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db } from "~/server/db";
import { MODEL_SERVER_URL } from "~/config/ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newData = await db.andamioAIQueries.create({
    data: {
      type: "get-lesson-plan",
      inputs: req.body.slt,
      userId: req.body.userId,
    },
  });

  const result = await axios.get(
    `${MODEL_SERVER_URL}get-lesson-plan?slt=${req.body.slt}`,
  );

  await db.andamioAIQueries.update({
    where: {
      id: newData.id,
    },
    data: {
      outputs: JSON.stringify(result.data),
    },
  });

  res.status(200).json({ data: result.data });
}
