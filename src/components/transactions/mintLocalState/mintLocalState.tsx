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
        "addr_test1zqkhwvnlh8ylh7kwk8jmlrurfwcz9af2upmkpskxc9mma56vlu7w7kccycfgum045pdq9h2rnnyt6ep7wghq27nmwr0q0eceac",
      );
      const globalStateUtxo = globalStateUtxos.find((utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(accessTokenNameHex!)),
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

      const response = await axios.post("/api/backend/txs/mintLocalState", req);

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
