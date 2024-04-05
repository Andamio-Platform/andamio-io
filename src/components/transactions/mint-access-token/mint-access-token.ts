import UTxOi from "~/components/transactions/model";

interface Request {
    address: string;
    changeAddress: string;
    UserUTxOs: UTxOi[];
    CollateralUTxO: UTxOi;
    AccessTokenName: string;
    UserInfo: string;
}

export default async function MintAccessToken(
  requestData: Request,
): Promise<string | null> {
  const api = `${process.env.GCP_BACKEND}/api/v1/tx/mint+access+token`;

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData.unsignedTxCBOR;
  } catch (error) {
    console.error("Error:", error);
    return null; 
  }
}
