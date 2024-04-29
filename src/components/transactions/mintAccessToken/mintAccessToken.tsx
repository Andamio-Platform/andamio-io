import { zodResolver } from "@hookform/resolvers/zod";
import { UTxO } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import FormInput from "~/components/form/form-input";
import Loading from "~/components/loading";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api } from "~/utils/api";

interface RequestData {
  address: string;
  changeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  AccessTokenName: string;
  UserInfo: string;
}

export default function MintAccessToken() {
  const ctx = api.useUtils();
  const router = useRouter();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  // const [isConfirming, setIsConfirming] = useState(false);

  const { mutate: updateAccessToken } = api.user.updateAccessToken.useMutation({
    onSuccess: () => {
      toast.success("Access token updated");
      void ctx.user.getUserById.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      console.error(errorMessage);
      toast.error("Something went wrong. Please try again.");
    },
  });

  const FormSchema = z.object({
    tokenAlias: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tokenAlias: "",
    },
  });

  const { register, setError, clearErrors, watch } = form;

  // Debounced API call
  const validateTokenAlias = useCallback(
    debounce(async (tokenAlias) => {
      const isAvailable = await CheckTokenAliasAvailability(tokenAlias);
      if (!isAvailable) {
        setError("tokenAlias", {
          type: "availability",
          message: "This alias is already taken.",
        });
      } else {
        clearErrors("tokenAlias");
      }
    }, 500),
    [],
  );

  // Watch for changes in tokenAlias field
  const tokenAlias = watch("tokenAlias");

  useEffect(() => {
    if (tokenAlias.length >= 2) {
      // Avoid checking for very short strings or empty
      void validateTokenAlias(tokenAlias);
    }
  }, [tokenAlias, validateTokenAlias]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const addr = await wallet.getChangeAddress();
      // sum utxos with mininum ADA 10
      const userUTxOs = await wallet.getUtxos();
      const UserUTxOs: UTxOi[] = [];
      userUTxOs.forEach((utxo: UTxO) => {
        UserUTxOs.push({
          TxID: utxo.input.txHash,
          TxIDIndex: utxo.input.outputIndex,
        });
      });
      const coll_utxo = await wallet.getCollateral();
      const CollateralUTxO: UTxOi = {
        TxID: coll_utxo[0].input.txHash,
        TxIDIndex: coll_utxo[0].input.outputIndex,
      };

      const req: RequestData = {
        address: addr,
        changeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        AccessTokenName: data.tokenAlias,
        UserInfo: "Andamio User",
      };

      const response = await axios.post(
        "/api/backend/txs/mintAccessToken",
        req,
      );

      const unsignedTx = response.data.unsignedTxCBOR;

      const signedTx = await wallet.signTx(unsignedTx, true);
      const txId = await wallet.submitTx(signedTx);

      console.log(txId);

      // setIsConfirming(true);
      // let confirmation = false;
      // while (!confirmation) {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      //   confirmation = await ConfirmTx(txId);
      // }

      // set database
      if (txId) {
        updateAccessToken({
          alias: req.AccessTokenName,
          mintTxId: txId,
          confirmed: false,
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      void router.push("/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error", error);
    }
  }

  return (
    <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
      {!isLoading ? (
        <>
          {!connected ? (
            <CardanoWallet />
          ) : (
            <div className="flex flex-col gap-y-4">
              <div>
                <CardanoWallet />
              </div>
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput
                      {...register("tokenAlias")}
                      name="tokenAlias"
                      placeholder="Token Alias"
                      form={form}
                    />
                    <Button type="submit">Mint</Button>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* {isConfirming && <p>Confirming transaction...</p>} */}
          <Loading />
        </>
      )}
    </div>
  );
}

export const CheckTokenAliasAvailability = async (tokenAlias: string) => {
  const response = await fetch(
    `${process.env.GCP_BACKEND}/api/v1/tx/check-access-token-name-aveliblity/${tokenAlias}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(""),
    },
  );
  const data = await response.json();

  return !data.IsUsed && !data.isExist;
};

// export const ConfirmTx = async (txId: string) => {
//   const response = await fetch(
//     `${process.env.GCP_BACKEND}/api/v1/tx/confirm+access+token+was+minted/${txId}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(""),
//     },
//   );
//   const data = await response.json();

//   return data.IsConfirmed;
// };
