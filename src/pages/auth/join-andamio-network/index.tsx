import { zodResolver } from "@hookform/resolvers/zod";
import { UTxO } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import FormInput from "~/components/form/form-input";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Form } from "~/components/ui/form";
import { useRouter } from "next/router";
import Loading from "~/components/loading";
import MintAccessToken from "~/components/transactions/mint-access-token/mint-access-token";
import debounce from 'lodash.debounce';

export default function JoinAndamioNetwork() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const FormSchema = z.object({
    tokenAlias: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const checkTokenAliasAvailability = async (tokenAlias: string) => {
    const response = await fetch(`${process.env.GCP_BACKEND}/api/v1/tx/check+access+token+name+aveliblity/${tokenAlias}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(""),
    });
    const data = await response.json();
    console.log("here", data.IsUsed, data.isExist)
    return !data.IsUsed && !data.isExist;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tokenAlias: "",
    },
  });

  const { register, setError, clearErrors, watch } = form;

    // Debounced API call
    const validateTokenAlias = useCallback(debounce(async (tokenAlias) => {
      const isAvailable = await checkTokenAliasAvailability(tokenAlias);
      if (!isAvailable) {
        setError('tokenAlias', {
          type: 'availability',
          message: 'This alias is already taken.',
        });
      } else {
        clearErrors('tokenAlias');
      }
    }, 500), []);

    // Watch for changes in tokenAlias field
  const tokenAlias = watch('tokenAlias');

  useEffect(() => {
    if (tokenAlias.length >= 2) { // Avoid checking for very short strings or empty
      validateTokenAlias(tokenAlias);
    }
  }, [tokenAlias, validateTokenAlias]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const addr = await wallet.getChangeAddress();
    // sum utxos with mininum ADA 10
    const userUTxOs = await wallet.getUtxos();
    let UserUTxOs: UTxOi[] = [];
    userUTxOs.forEach((utxo: UTxO) => {
      UserUTxOs.push({
        TxID: utxo.input.txHash,
        TxIDIndex: utxo.input.outputIndex,
      });
    });
    const coll_utxo = await wallet.getCollateral();
    let CollateralUTxO: UTxOi = {
      TxID: coll_utxo[0].input.txHash,
      TxIDIndex: coll_utxo[0].input.outputIndex,
    };

    const unsignedTx = await MintAccessToken({
      address: addr,
      changeAddress: addr,
      UserUTxOs,
      CollateralUTxO,
      AccessTokenName: data.tokenAlias,
      UserInfo: "Andamio User",
    });

    const signedTx = await wallet.signTx(unsignedTx!, true);
    const txId = await wallet.submitTx(signedTx);
    console.log(txId);
    router.push("/home");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Join The Andamio Network</CardTitle>
          <CardDescription>
            Get a token that represents your membership in Andamio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[350px] space-y-2"
            >
              <div className="flex items-center justify-center">
                <CollapsibleTrigger asChild>
                  <Button>{isOpen ? <>Back</> : <>Get Token</>}</Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-2">
                <div className="mx-4 flex items-center justify-center rounded-md border px-4 py-3 font-mono text-sm">
                  {!isLoading ? (
                    <>
                      {!connected ? (
                        <CardanoWallet />
                      ) : (
                        <>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <FormInput
                              {...register('tokenAlias')}
                                name="tokenAlias"
                                placeholder="Token Alias"
                                form={form}
                              />
                              <Button type="submit">Mint</Button>
                            </form>
                          </Form>
                        </>
                      )}
                    </>
                  ) : (
                    <Loading />
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
            {!isOpen && <Button>Got it Already</Button>}
          </CardFooter>
          {!isOpen && (
            <Link href="/home" className="text-start">
              I'll get it later
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
