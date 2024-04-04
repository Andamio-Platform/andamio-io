// Pick up here on 2024-04-05

// Use this for Coin Selection (in a new file) if helpful:

// import { UTxO } from "@meshsdk/core";

// export function getMintingTxUTxOs(utxos: UTxO[], desiredLovelace: number) {
//   // Filter the list of UTxOs to include UTxOs that only have lovelace
//   const lovelaces = utxos.filter((utxo) => utxo.output.amount.length == 1);

//   // Sort from least amount of lovelace to greatest
//   const sorted = lovelaces.sort((a, b) => Number(a.output.amount[0].quantity) - Number(b.output.amount[0].quantity));

//   // Calculate the total amount of lovelace in the first n outputs
//   let totalAmount = 0;
//   let n = 0;
//   while (totalAmount < desiredLovelace) {
//     totalAmount += Number(sorted[n].output.amount[0].quantity);
//     n++;
//   }

//   const collateralUTxO = sorted.find((utxo) => Number(utxo.output.amount[0].quantity) >= 5000000);
//   const singleUTxO = sorted.find((utxo) => Number(utxo.output.amount[0].quantity) >= desiredLovelace);

//   return { collateralUTxO: collateralUTxO, spendingUTxOs: [singleUTxO] };
// }

export default function MintAccessToken() {
  return (
    <div>
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1>Mint Your Token</h1>

        <h2>About</h2>
        <p>
          On this screen, anyone with a Cardano Browser wallet can mint an
          Andamio Network Access Token
        </p>
        <h2>On This Screen: User Flow</h2>
        <ol className="ml-10 list-decimal">
          <li>User is prompted to connect a wallet to get started</li>
          <li>
            After the wallet is connected, if the wallet already holds an Access
            Token, then the existing token is shown in the UI
          </li>
          <li>
            If connected wallet does not hold an Access Token, show a form where
            user can enter desired name for Access Token
          </li>
          <li>UI shows the availability of name</li>
          <li>
            If name is avaliable, user can initialize a minting transaction
          </li>
          <li>
            When a minting tx is initialized, a dialog appears, showing
            transaction details
          </li>
          <li>When ready, User presses a button to confirm transaction</li>
          <li>Wallet UI opens so that User can sign transaction</li>
          <li>
            After user signs the transaction, UI shows status of the minting
            transaction
          </li>
          <li>
            When transaction is successful, a call to action appears,
            congratulating the user and linking to Dashboard screen
          </li>
        </ol>

        <h2>Prepare for Minting Tx</h2>

        <p>Andamio Team: See source code for next steps</p>

        {/* TODO 2024-04-05 */}
        {/* For reference https://gitlab.com/gimbalabs/andamio/andamiojs-group/andamio-network-access-token-demo/-/tree/main/src/app/mint?ref_type=heads */}

        {/* <CardanoWallet /> */}
        <h2>Connected Address</h2>
        {/* <p>{address}</p>
          <h2>Selected UTxOs</h2>
          <pre>{JSON.stringify(connectedUTxOs, null, 2)}</pre>
          <h2>Collateral</h2>
          <pre>{JSON.stringify(collateralUTxO, null, 2)}</pre>
          <h2>Formatted for Minting Tx Service</h2>
          <pre>Selected Token Name: {inputTokenName}</pre>
          <pre>
            {connectedUTxOs &&
              JSON.stringify(
                [{ TxID: connectedUTxOs[0].input.txHash, TxIDIndex: connectedUTxOs[0].input.outputIndex }],
                null,
                2
              )}
          </pre> */}
        <h2>Select an Access Token Name</h2>
        <p>
          This name will be permanent. Our UI should provide guidance for users
          who are unsure how to choose a name.
        </p>
        {/* <form className="flex flex-col gap-3">
            <input
              type="text"
              name="tokenName"
              onChange={handleInputChange}
              className="p-2 bg-[#171717] border border-neutral-700 text-white"
            />
          </form>
          <div className="flex flex-row gap-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="p-2 my-3 bg-green-900 hover:bg-green-800 text-white"
            >
              Set Token Name
            </button>
            <div>
              {nameList.includes(inputTokenName) ? (
                <div className="bg-red-900 my-3 p-2 text-white">This name is not available</div>
              ) : (
                <>{inputTokenName && <div className="bg-green-900 my-3 p-2 text-white">This name is available!</div>}</>
              )}
            </div>
          </div>
          <div>
            <pre>{JSON.stringify(indexerInputUTxO, null, 2)}</pre>
          </div> */}
      </div>
    </div>
  );
}
