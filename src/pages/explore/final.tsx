import Head from "next/head";
import AndamioLanding from "~/ui/system/AndamioLanding";

/**
 * The chosen landing (iteration 22), composed entirely from the design system
 * (src/ui/system/*). This is the working canonical page — the basis for the
 * Round 3 final once the live demo is wired back in.
 */
export default function Final() {
  return (
    <>
      <Head>
        <title>Andamio — Verifiable credentials that keep working</title>
      </Head>
      <AndamioLanding />
    </>
  );
}
