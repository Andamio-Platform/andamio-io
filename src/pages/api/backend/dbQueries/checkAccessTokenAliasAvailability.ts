import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env } from "~/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Request Body:", req.body);
  const requestData = req.body;
  const api = `${env.GCP_BACKEND}/api/v1/tx/check-access-token-name-aveliblity/${requestData.tokenAlias}`;

  try {
    const response = await axios.post(api);

    const responseData = response.data;
    res
      .status(200)
      .json({ isAvailable: !responseData.IsUsed && !responseData.isExist });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
