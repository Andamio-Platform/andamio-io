export default function MintAccessToken() {
  return (
    <div>
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1>Mint Your Token</h1>

        <h1>Prepare for Minting Tx</h1>

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
