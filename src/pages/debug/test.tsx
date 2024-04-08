import { zodResolver } from "@hookform/resolvers/zod";
import { BrowserWallet, UTxO } from "@meshsdk/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "~/components/form/form-input";
import MintAccessToken from "~/components/transactions/mint-access-token/mint-access-token";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

export default function Test({ wallet }: { wallet: BrowserWallet }) {
  const name = "humbo-mumbo";

  async function check() {
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

    const a = await MintAccessToken({
      address: addr,
      changeAddress: addr,
      UserUTxOs: UserUTxOs,
      CollateralUTxO: CollateralUTxO,
      AccessTokenName: name,
      UserInfo: "",
    });
    console.log(a);

    // const unsignedTx = "84aa0082825820d95535bee2bc2028fcf7dad6cb342c00a6a92e7146c1e4d94d9aa429c258961200825820b814c37817257f7b56785dc787ca2f6d3e84f6f83257dd73ad166f49f6fd2e32050186a300583910705bdd42b7d5591641a33223edf65f65fac42a9a26c0397de6b05c514cff3cef5b1826128e6df5a05a02dd439cc8bd643e722e057a7b70de01821a001e8480a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a1412001028201d81851d8799f4661647269616e456166686773ffa300583910705bdd42b7d5591641a33223edf65f65fac42a9a26c0397de6b05c514cff3cef5b1826128e6df5a05a02dd439cc8bd643e722e057a7b70de01821a001e8480a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a1412001028201d81852d8799f4561666867734761757274687572ff82583900f74dcd44f0b4de7f9cb4bec179d11ae242b91edaa0b6f2c0cd371fa8d2cbc424056af110c7fbee3cc410371c682d6f619a81877b5502ebbf821a001e8480a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a148323232616668677301a3005839102d77327fb9c9fbfaceb1e5bf8f834bb022f52ae07760c2c6c177bed34cff3cef5b1826128e6df5a05a02dd439cc8bd643e722e057a7b70de01821a001e8480a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a148313030616668677301028201d818582ad8799f581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d94561666867738040ffa300583900e9ce2435c12d746217d57a04f570f7cc74e6a37942d9c7edc934c6456d69252ca2a2c137bacfb8d9297c671e4102fa7297a68048455a1e1e011a004c4b40028201d81843d8798082583900f74dcd44f0b4de7f9cb4bec179d11ae242b91edaa0b6f2c0cd371fa8d2cbc424056af110c7fbee3cc410371c682d6f619a81877b5502ebbf1a0368cc55021a000b360b031a035dd9f105a1581df0873a57d6d17aab850c09249b9c00c1ee5aa4a02d02e0c9ba49a0c3dc0009a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a341200148313030616668677301483232326166686773010b5820b5b88da10a7d51b114d6ec5a0a2bc2a0be055e97c808e2227d163c8759343d5c0d81825820f858337d2e9c313a114f65cc86ba72166d55ad7bc147e76dfd1b41c1d3812edc050e82581c884d3b17e122f26688064b8b28d87e6faa5b24d58094feae00da1a5f581cf74dcd44f0b4de7f9cb4bec179d11ae242b91edaa0b6f2c0cd371fa81283825820aa1fdd7191960bb238b2151d7a07b7c3e6269246707a0338a168ac6ef0abff0f00825820bf2b9be10c2478e826d840b8f0a4cb43ca24aa88a924d3fd70707b4a6c57321501825820bf2b9be10c2478e826d840b8f0a4cb43ca24aa88a924d3fd70707b4a6c57321500a300818258209cf2b170f034d02d90bb2ffe58038383603ba845827346d82f5e574e3796e652584073dc01ef200f922d359eda5e746bfae0663ad6677eb7c08e3d69d503212c986ee1a49987b847a869991b1c4f48b38282a1eefbad390411b403e27b02bf8bd70d03800583840001d87981456166686773821a002bcc841a33a7a93b840300d8799f45616668677340ff821a0014545e1a1970c434840100456166686773821a001e2ec01a22f54cb7f5f6"
    // const signedTx = await wallet.signTx(unsignedTx, true);
    // const txId = await wallet.submitTx(signedTx);
    // console.log(txId);
  }

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <h1>Test</h1>
      <form>
        <input type="text" placeholder="Enter your name" />
      </form>
      <button onClick={check} className="bg-slate-400">
        test
      </button>

      <Form {...form}>
        <form
          onSubmit={
            form.handleSubmit(onSubmit)
          }
        >
          <FormInput name="username" label="" form={form} />
          <Button type="submit" intent="dialog" size="lg">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
