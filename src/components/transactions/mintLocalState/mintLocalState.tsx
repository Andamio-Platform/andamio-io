import { Asset, BlockfrostProvider, UTxO } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "~/components/loading";
import UTxOi from "~/components/transactions/model";
import { Button } from "~/components/ui/button";
import { blockfrostProvider } from "~/config/blockfrost";

interface RequestData {
  address: string;
  changeAddress: string;
  UserUTxOs: UTxOi[];
  CollateralUTxO: UTxOi;
  AccessTokenName: string;
  UserInfo: string;
  UserGlobalStateUTxO: UTxOi;
  UserAccessTokenUTxO: UTxOi;
}

export default function MintLocalState() {
  const router = useRouter();

  const { connected, wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
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

      const accessTokenUtxo: UTxO = userUTxOs.find((utxo: UTxO) =>
        utxo.output.amount.some((a) =>
          a.unit.includes(
            "7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9",
          ),
        ),
      );
      const accessToken = accessTokenUtxo?.output.amount.find((item: Asset) =>
        item.unit.includes(
          "7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9",
        ),
      );
      const accessTokenNameHex = accessToken?.unit.substring(62);
      const accessTokenName = Buffer.from(
        accessTokenNameHex ? accessTokenNameHex : "",
        "hex",
      ).toString("utf-8");

      // replace with indexer
      const globalStateUtxos = await blockfrostProvider.fetchAddressUTxOs(
        "addr_test1zqkhwvnlh8ylh7kwk8jmlrurfwcz9af2upmkpskxc9mma56vlu7w7kccycfgum045pdq9h2rnnyt6ep7wghq27nmwr0q0eceac"
      )
      const globalStateUtxo = globalStateUtxos.find((utxo: UTxO) =>
        utxo.output.amount.some((a) =>
          a.unit.includes(
            accessTokenNameHex!,
          ),
        ),
      );

      const req: RequestData = {
        address: addr,
        changeAddress: addr,
        UserUTxOs,
        CollateralUTxO,
        AccessTokenName: accessTokenName,
        UserInfo: "Andamio User",
        UserGlobalStateUTxO: {
          TxID: globalStateUtxo.input.txHash,
          TxIDIndex: globalStateUtxo.input.outputIndex,
        },
        UserAccessTokenUTxO: {
          TxID: accessTokenUtxo.input.txHash,
          TxIDIndex: accessTokenUtxo.input.outputIndex,
        },
      };

      console.log(req);

      // const response = await axios.post("/api/backend/txs/mintLocalState", req);

      const unsignedTx = "84a90083825820d95535bee2bc2028fcf7dad6cb342c00a6a92e7146c1e4d94d9aa429c258961202825820d95535bee2bc2028fcf7dad6cb342c00a6a92e7146c1e4d94d9aa429c258961203825820c87a5a586390922beea971bfbd1d8a31a4e8483ae1dbc6b72545f79786a77404050184a3005839101fbfa7a810c977de99b1d020341fd6795f0cf9970eb82aaeb6b5ce334cff3cef5b1826128e6df5a05a02dd439cc8bd643e722e057a7b70de01821a001e8480a1581c7d491e135694421f7d20449072c184aa66027870c69775b7b9272594a1476175727468757201028201d818584ad8799f9fff581c7d491e135694421f7d20449072c184aa66027870c69775b7b9272594581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d94761757274687572ffa3005839102d77327fb9c9fbfaceb1e5bf8f834bb022f52ae07760c2c6c177bed34cff3cef5b1826128e6df5a05a02dd439cc8bd643e722e057a7b70de01821a001e8480a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a14a3130306175727468757201028201d818585cd87984581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9476175727468757281d87983581c4485de16ec74da4b5de81e8792bef9c2cb904442ba46729702d6719480d87a804c416e64616d696f205573657282583900f74dcd44f0b4de7f9cb4bec179d11ae242b91edaa0b6f2c0cd371fa8d2cbc424056af110c7fbee3cc410371c682d6f619a81877b5502ebbf821a001e8480a1581c7d865954a3ea829709740a9894eb5b06be115cce91ad452e268f41d9a14a323232617572746875720182583900f74dcd44f0b4de7f9cb4bec179d11ae242b91edaa0b6f2c0cd371fa8d2cbc424056af110c7fbee3cc410371c682d6f619a81877b5502ebbf1a01fbf971021a0003a19d031a037002ea09a1581c7d491e135694421f7d20449072c184aa66027870c69775b7b9272594a14761757274687572010b5820547241fa1f688b39494224317409210ccee7dfe5d17753d464447a83f4d0aef90d8182582026e1da57f4498738b2c136829b9b689cab0a46dccf803f1bce23e1c5eaf6b2d7000e82581c884d3b17e122f26688064b8b28d87e6faa5b24d58094feae00da1a5f581cf74dcd44f0b4de7f9cb4bec179d11ae242b91edaa0b6f2c0cd371fa81283825820aa08ff819817b821e123e7cab3f387fe9a1adb51900fc333fc394b16a8f7e49702825820aa1fdd7191960bb238b2151d7a07b7c3e6269246707a0338a168ac6ef0abff0f03825820aa08ff819817b821e123e7cab3f387fe9a1adb51900fc333fc394b16a8f7e49704a300818258209cf2b170f034d02d90bb2ffe58038383603ba845827346d82f5e574e3796e6525840bc3e7920021a5ef8195766d3051203724cf51f02150d25b856438a8e53a18172b35b8e72867743f847436769531d95fbae56128cc80aa94bf9ac95862d46230303800582840002d87981d87982581c4485de16ec74da4b5de81e8792bef9c2cb904442ba46729702d6719480820000840100d8799f4761757274687572ff820000f5f6";

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
            <Button onClick={onSubmit}>Enroll now</Button>
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
