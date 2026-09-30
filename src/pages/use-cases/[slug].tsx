import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { CASES, caseBySlug } from "~/ui/use-cases/cases";
import { CaseDetail } from "~/ui/use-cases/chrome";

export const getStaticPaths: GetStaticPaths = () => ({
  paths: CASES.map((c) => ({ params: { slug: c.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ slug: string }> = ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  return caseBySlug(slug) ? { props: { slug } } : { notFound: true };
};

export default function UseCasePage({ slug }: { slug: string }) {
  const study = caseBySlug(slug);
  return study ? <CaseDetail study={study} /> : null;
}
