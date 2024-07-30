import { type AssetExtended } from "@meshsdk/core";

export default function AccessTokenSection({
  accessToken,
}: {
  accessToken: AssetExtended;
}) {
  return (
    <div className="text-center">
      <h2 className="py-5 text-xl font-bold">Andamio Access Token</h2>
      <p className="pt-5 text-lg">
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
