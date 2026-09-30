import Head from "next/head";

/** Emits one schema.org JSON-LD block into <head> for Pages Router pages. */
export default function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <Head>
      <script
        key={`jsonld-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
