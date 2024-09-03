import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress } from "@meshsdk/react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "~/components/form/form-input";
import { Form } from "~/components/ui/form";
import { INDEXER_URL } from "~/config/indexer";
import MintAccessToken from "../accessToken/MintAccessToken";
import SuccessTxModalContent from "../SuccessTxComponent";

export default function MintAccessTokenDialog() {
  const address = useAddress();
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [mintingAlias, setMintingAlias] = useState<string | undefined>(
    undefined,
  );

  const [successTxHash, setSuccessTxHash] = useState<string | undefined>(
    undefined,
  );

  const nextSteps = [
    { text: "Learn how to use your Access Token", url: "/course/andamio101" },
    { text: "Commit to Your First Assignment", url: "/course/andamio101" },
    { text: "Go to Dashboard", url: "/dashboard" },
  ];

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
    (tokenAlias: string) => {
      debounce(async () => {
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
      }, 500);
    },
    [clearErrors, setError],
  );

  // Watch for changes in tokenAlias field
  const tokenAlias = watch("tokenAlias");

  useEffect(() => {
    if (tokenAlias.length >= 2) {
      // Avoid checking for very short strings or empty
      void validateTokenAlias(tokenAlias);
    }
  }, [tokenAlias, validateTokenAlias]);

  function onSubmit() {
    if (tokenAlias.length > 1) {
      setMintingAlias(tokenAlias);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Mint Access Token</Button>
      </DialogTrigger>
      <DialogContent>
        {successTxHash ? (
          <SuccessTxModalContent
            txName="Mint Access Token"
            nextStepLinks={nextSteps}
            txHash={successTxHash}
          />
        ) : (
          <>
            <h1>Confirm Mint Access Token</h1>
            {/* About this Module */}
            <h2>Token Alias</h2>
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
                <Button>Submit</Button>
              </form>
            </Form>
            <h2>What it means to mint an Andamio Access Token</h2>
            {address && mintingAlias && (
              <>
                <pre>{address}</pre>
                <pre>{mintingAlias}</pre>
                <MintAccessToken
                  userAddress={address}
                  alias={mintingAlias}
                  setSuccessTxHash={setSuccessTxHash}
                />
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export const CheckTokenAliasAvailability = async (
  tokenAlias: string,
): Promise<boolean> => {
  const response: { data: { isAvailable: boolean } } = await axios.get(
    `${INDEXER_URL}/api/aliasAvailability?alias=${tokenAlias}`,
  );
  return response.data.isAvailable;
};
