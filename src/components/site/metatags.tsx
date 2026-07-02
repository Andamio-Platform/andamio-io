import Head from "next/head";
import { useRouter } from "next/router";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  absoluteUrl,
} from "~/lib/seo";

/**
 * The one SEO surface for Pages Router pages. Rendered with defaults from
 * _app.tsx so no page ships without metadata; pages render their own
 * <Metatags> to override. Every tag carries a `key` so next/head dedupes —
 * the page-level render wins over the _app defaults.
 */
export default function Metatags({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  ogType?: "website" | "article";
}) {
  const router = useRouter();
  const path = (router.asPath ?? "/").split(/[?#]/)[0] ?? "/";
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        key="viewport"
      />
      <meta charSet="utf-8" key="charset" />

      <title key="title">{fullTitle}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonical} key="canonical" />

      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta property="og:type" content={ogType} key="og:type" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={imageUrl} key="og:image" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:site" content={TWITTER_HANDLE} key="twitter:site" />
      <meta name="twitter:title" content={fullTitle} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta
        name="twitter:creator"
        content={TWITTER_HANDLE}
        key="twitter:creator"
      />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      <meta
        name="twitter:image:alt"
        content={fullTitle}
        key="twitter:image:alt"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon.ico"
        key="favicon"
      />

      <meta
        name="msapplication-TileColor"
        content="#555555"
        key="msapplication-TileColor"
      />
      <meta name="theme-color" content="#eeeeee" key="theme-color" />
    </Head>
  );
}
