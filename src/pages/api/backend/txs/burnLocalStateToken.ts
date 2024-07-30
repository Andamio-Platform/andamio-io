import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env } from "~/env";

interface ResponseData {
  unsignedTxCBOR: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestData = req.body;
  const api = `${env.GCP_BACKEND}/api/v1/tx/burn-local-state-token`;

  try {
    const response = await axios.post(api, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData: ResponseData = response.data;
    res.status(200).json({ unsignedTxCBOR: responseData.unsignedTxCBOR });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
