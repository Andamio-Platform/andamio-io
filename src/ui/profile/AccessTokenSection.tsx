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
    <div>
      <p>
        Your unique alias in the Andamio network is
        <b>
          {accessToken
            ? " " +
              Buffer.from(accessToken.unit.substring(62), "hex").toString()
            : ""}
        </b>
        .
      </p>
    </div>
  );
}
