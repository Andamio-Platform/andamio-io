import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { env } from "~/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Request Body:", req.body);
  const requestData = req.body;
  const api = `${env.INDEXER}/api/v1/instance-validator/fetchLocalStateValildatorRefUtxoByCourseNftPolicy?policy=${requestData.policy}`;

  try {
    const response = await axios.post(api);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
