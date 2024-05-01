import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function useUnconfirmedTx(unconfirmedTxHash : string) {
//   const { data: sessionData } = useSession();

//   console.log(sessionData);

//   if (!sessionData?.user?.unconfirmedTx) {
//     throw new Error("No unconfirmed transaction found in session data");
//   }

  const txHash = unconfirmedTxHash;

  const fetchTxState = async (txHash: string) => {
    const response = await axios.get(
      `https://preprod.gomaestro-api.org/v1/txmanager/${txHash}/state`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "text/plain",
          "api-key": "m8zXGrp0XabJqE9coRk6zvTEB7Xy2FlE",
        },
      },
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["transactionState", txHash],
    queryFn: () => fetchTxState(txHash),
    enabled: !!txHash,
  });

  return { data, error, isLoading };
}