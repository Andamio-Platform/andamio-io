import { UtxoWithSlot } from "@maestro-org/typescript-sdk";
import { Asset, UTxO } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import axios from "axios";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";
import AcceptDenyAssignment from "~/components/transactions/acceptDenyAssignment/acceptDenyAssignment";
import CommitToAssignment from "~/components/transactions/commitToAssignment/commitToAssignment";
import UTxOi from "~/components/transactions/model";
import { INDEXER_URL } from "~/config/indexer";
import maestro from "~/config/maestro";
import { Asset as maestroAsset } from "@maestro-org/typescript-sdk";

interface RequestData {
  CourseGovernanceUTxO: UTxOi;
  CourseNFTTokenName: string;
  CourseFacilitatorAccessTokenName: string;
  AssignmentCode: string;
  CollateralUTxO: UTxOi;
  CourseFacilitatorDecision: "accept" | "deny";
  CourseFacilitatorAccessTokenUTxO: UTxOi;
  UserAssignmentUTxO: UTxOi;
  UserUTxOs: UTxOi[];
  address: string;
  changeAddress: string;
  LocalStateValidatorAddress: string;
  AssignmentValidatorAddress: string;
  LocalStatePolicyID: string;
  AssignmentValidatorRefUTxO: UTxOi;
  CourseNFTPolicyID: string;
}

export default function Tx() {
  const { connected, wallet } = useWallet();

  async function click() {
    const addr = await wallet.getChangeAddress();

    const coll_utxo = await wallet.getCollateral();
    const CollateralUTxO: UTxOi = {
      TxID: coll_utxo[0].input.txHash,
      TxIDIndex: coll_utxo[0].input.outputIndex,
    };

    const userUTxOs = await wallet.getUtxos();

    const courseFacilitatorAccessTokenUTxO = userUTxOs.find((utxo: UTxO) =>
      utxo.output.amount.some((a) => a.unit.includes(ACCESS_TOKEN_POLICY_ID)),
    );

    const accessToken = courseFacilitatorAccessTokenUTxO?.output.amount.find(
      (item: Asset) => item.unit.includes(ACCESS_TOKEN_POLICY_ID),
    );
    const accessTokenNameHex = accessToken?.unit.substring(62);
    const accessTokenName = Buffer.from(
      accessTokenNameHex ? accessTokenNameHex : "",
      "hex",
    ).toString("utf-8");

    const assignmentValidatorUtxos = await maestro.fetchAddressUTxOs(
      "addr_test1xq9vj9jrajejxfrk8w89lc2net7p9n7t9s8hf3eguzvgrqyx0j94wtj6ercvzj48g97tnjhvn50l2r5efamja2edd86qj4gl08",
    );
    const learnerAliasHex = Buffer.from("nelson").toString("hex");
    const assignmentValidatorUTxO = assignmentValidatorUtxos.find(
      (utxo: UTxO) =>
        utxo.output.amount.some((a) => a.unit.includes(learnerAliasHex)),
    );

    const remainingUTxOs = userUTxOs.filter(
      (utxo) => utxo !== coll_utxo && utxo !== courseFacilitatorAccessTokenUTxO,
    );
    const UserUTxOs: UTxOi[] = [
      {
        TxID: "e6ba17a1c95c28a5379b53ab7c72098c82e4437c52c5a5bfad202013b8d07037",
        TxIDIndex: 1,
      },
      {
        TxID: "02c5f287acac4d76fd8918f2145dcce016bc825be2508cdc8fbfbe13ce3ad5dd",
        TxIDIndex: 5,
      
      }
    ];
    // remainingUTxOs.forEach((utxo: UTxO) => {
    //   UserUTxOs.push({
    //     TxID: utxo.input.txHash,
    //     TxIDIndex: utxo.input.outputIndex,
    //   });
    // });

    const res = await axios.get(
      `${INDEXER_URL}/api/instance-validator/assignmentValidatorRefUtxoByCourseNftPolicy?policy=${"5679763f47a4ca0877dd774ef15db7558f29e2b753273e5613db2d9b"}`,
    );

    const assignmentValidatorRefUTxO: UtxoWithSlot = res.data;

    const courseGovernanceUTxO_res = await axios.get(
      `${INDEXER_URL}/api/course-governance-validator/utxoByCourseNftPolicy?policy=${"5679763f47a4ca0877dd774ef15db7558f29e2b753273e5613db2d9b"}`,
    );

    const courseGovernanceUTxO: UtxoWithSlot = courseGovernanceUTxO_res.data;
    const courseNFTTokenNameHex = courseGovernanceUTxO.assets
      .find((asset: maestroAsset) =>
        asset.unit.includes(
          "5679763f47a4ca0877dd774ef15db7558f29e2b753273e5613db2d9b",
        ),
      )
      ?.unit.substring(56);
    const courseNFTTokenName = Buffer.from(
      courseNFTTokenNameHex!, "hex"
    ).toString("utf-8");

    const req: RequestData = {
      CourseGovernanceUTxO: {
        TxID: courseGovernanceUTxO.tx_hash,
        TxIDIndex: courseGovernanceUTxO.index,
      },
      CourseNFTTokenName: courseNFTTokenName!,
      CourseFacilitatorAccessTokenName: accessTokenName,
      AssignmentCode: "102",
      CollateralUTxO: CollateralUTxO,
      CourseFacilitatorDecision: "accept",
      CourseFacilitatorAccessTokenUTxO: {
        TxID: courseFacilitatorAccessTokenUTxO.input.txHash,
        TxIDIndex: courseFacilitatorAccessTokenUTxO.input.outputIndex,
      },
      UserAssignmentUTxO: {
        TxID: assignmentValidatorUTxO.input.txHash,
        TxIDIndex: assignmentValidatorUTxO.input.outputIndex,
      },
      UserUTxOs: UserUTxOs,
      address: addr,
      changeAddress: addr,
      LocalStateValidatorAddress:
        "addr_test1xzqpxtpwrytst9l3u57ur78m87f9htx4sqnwhsc93r2xpcvx0j94wtj6ercvzj48g97tnjhvn50l2r5efamja2edd86qq47rmk",
      AssignmentValidatorAddress:
        "addr_test1xq9vj9jrajejxfrk8w89lc2net7p9n7t9s8hf3eguzvgrqyx0j94wtj6ercvzj48g97tnjhvn50l2r5efamja2edd86qj4gl08",
      LocalStatePolicyID:
        "e09bd39b12390d5ccbcdaae0c18f496e195e7e6dab1f8d44a07422c3",
      AssignmentValidatorRefUTxO: {
        TxID: assignmentValidatorRefUTxO.tx_hash,
        TxIDIndex: assignmentValidatorRefUTxO.index,
      },
      CourseNFTPolicyID:
        "5679763f47a4ca0877dd774ef15db7558f29e2b753273e5613db2d9b",
    };

    console.log(req);

    const response = await axios.post(
      "/api/backend/txs/acceptDenyAssignment",
      req,
    );

    const unsignedTx = response.data.unsignedTxCBOR;

    const signedTx = await wallet.signTx(unsignedTx, true);
    const txId = await wallet.submitTx(signedTx);
  }

  return (
    <>
      <CardanoWallet />
      <button onClick={click}>Click</button>
    </>
  );
}
