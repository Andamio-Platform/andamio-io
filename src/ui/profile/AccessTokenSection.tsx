import { AssetExtended } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN_POLICY_ID } from "~/andamio.config";

export default function AccessTokenSection({
  accessToken,
}: {
  accessToken: AssetExtended;
}) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold py-5">Andamio Access Token</h2>
      <p className="text-lg pt-5">
        <b>
          {accessToken
            ? " " +
              Buffer.from(accessToken.unit.substring(62), "hex").toString()
            : ""}
        </b>
      </p>
      <p className="text-sm font-light">YOUR UNIQUE TOKEN ALIAS</p>
    </div>
  );
}
