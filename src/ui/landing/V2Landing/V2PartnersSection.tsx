import React from "react";
import Link from "next/link";

interface Partner {
  name: string;
  description: string;
  status: string;
  statusColor: string;
}

const partners: Partner[] = [
  {
    name: "Intersect",
    description: "Cardano ecosystem governance & contributor tracking",
    status: "Enterprise Trial (V2)",
    statusColor: "text-warning",
  },
  {
    name: "Toha Network",
    description: "Nature regeneration financing",
    status: "Planning Phase",
    statusColor: "text-warning",
  },
  {
    name: "Syngenta",
    description: "Agricultural supply chain credentials",
    status: "Active",
    statusColor: "text-success",
  },
];

export default function V2PartnersSection() {
  return (
    <section id="partners" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From governance to agriculture, room for more.
          </h2>
          <Link
            href="/use-cases"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all use cases
          </Link>
        </div>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="sm:flex sm:items-baseline sm:gap-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  {partner.name}
                </span>
                <span className="text-muted-foreground">
                  {partner.description}
                </span>
              </div>
              <span
                className={`text-sm font-medium tabular-nums ${partner.statusColor}`}
              >
                {partner.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
