import { zodResolver } from "@hookform/resolvers/zod";
import { UTxO } from "@meshsdk/core";
import { CardanoWallet, useNetwork, useWallet } from "@meshsdk/react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { use, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import FormInput from "~/components/form/form-input";
import Loading from "~/components/loading";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { INDEXER_URL } from "~/config/indexer";
import maestro from "~/config/maestro";
import { api } from "~/utils/api";

interface RequestData {
  Address: string;
  ChangeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  AccessTokenName: string;
  UserInfo: string;
}

export default function MintAccessToken() {
  const { data: sessionData } = useSession();
  const ctx = api.useUtils();
  const router = useRouter();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const network = useNetwork();

  const { mutate: createUnconfirmedTx } =
    api.user.updateUnconfirmedTx.useMutation({
      onSuccess: () => {
        toast.success("Unconfirmed Tx updated");
        void ctx.user.getUserById.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        console.error(errorMessage);
        toast.error("Something went wrong. Please try again.");
      },
    });

  const { mutate: updateAccessTokenMintTx } =
    api.user.updateAccessTokenMintTx.useMutation({
      onSuccess: () => {
        toast.success("Access token mint TxId updated");
        void ctx.user.getUserById.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        console.error(errorMessage);
        toast.error("Something went wrong. Please try again.");
      },
    });

  // TO DO: Remove after successfully implementing tx confirmation manager
  const { mutate: updateHasMintedAccessToken } =
    api.user.updateHasMintedAccessToken.useMutation({
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
        setIsAvailable(false);
        setError("tokenAlias", {
          type: "availability",
          message: "This alias is already taken.",
        });
      } else {
        clearErrors("tokenAlias");
        setIsAvailable(true);
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
        Address: addr,
        ChangeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        AccessTokenName: data.tokenAlias,
        UserInfo: "Andamio User",
      };

      const response = await axios.post(
        "/api/backend/txs/mintAccessToken",
        req,
      );

      console.log("response", response.data);

      const unsignedTx = response.data.unsignedTxCBOR;

      console.log("unsignedTx", unsignedTx);

      const signedTx = await wallet.signTx(unsignedTx, true);

      console.log("signedTx", signedTx);

      const txHash = await wallet.submitTx(signedTx);

      console.log(txHash);

      if (txHash) {
        createUnconfirmedTx({
          userId: sessionData!.user.id,
          txHash: txHash,
        });
        updateAccessTokenMintTx({
          userId: sessionData!.user.id,
          txHash: txHash,
        });
        // TO DO: Remove after successfully implementing tx confirmation manager
        updateHasMintedAccessToken({
          userId: sessionData!.user.id,
          hasMinted: true,
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
                You&apos;re are connected to the Cardano{" "}
                {network === 0
                  ? "Preprod"
                  : network === 1
                    ? "Mainnet"
                    : "Unknown"}
                .
              </div>
              <div>
                {network === 1 ? (
                  <div>Andamio is not yet available on Cardano Mainnet </div>
                ) : network === 0 ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormInput
                        {...register("tokenAlias")}
                        name="tokenAlias"
                        placeholder="Token Alias"
                        form={form}
                      />
                      {isAvailable && (
                        <div className="mb-2 text-sm text-green-500">
                          This alias is available.
                        </div>
                      )}
                      <Button type="submit">Mint</Button>
                    </form>
                  </Form>
                ) : (
                  <div>Andamio is not available on this network</div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
}

export const CheckTokenAliasAvailability = async (tokenAlias: string) => {
  const response = await axios.get(`${INDEXER_URL}/api/aliasAvailability?alias=${tokenAlias}`)
  return response.data.isAvailable;
};
