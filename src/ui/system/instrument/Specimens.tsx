"use client";

import React from "react";
import { color, font } from "../tokens";
import { GETTING_STARTED } from "../proof-badge/getting-started";
import { TickRule } from "./TickRule";
import { ArcHeading } from "./ArcHeading";
import { Readout } from "./Readout";
import { ProofCard } from "./ProofCard";
import { OrbitSteps } from "./OrbitSteps";
import { MiniBadge } from "./MiniBadge";
import { LogoRail } from "./LogoRail";

const label = (t: string) => (
  <p
    className="mb-3 text-[11px] uppercase tracking-[0.16em]"
    style={{ fontFamily: font.mono, color: color.inkGhost }}
  >
    {t}
  </p>
);

/** Every instrument component rendered with realistic content, for the style guide. */
export function InstrumentSpecimens() {
  return (
    <div className="space-y-14">
      <div>
        {label("TickRule · one tick per lifecycle step")}
        <TickRule count={5} active={2} label="03 / 05" />
      </div>

      <div>
        {label("ArcHeading · arc fills index / total")}
        <ArcHeading index={3} total={6} kicker="Andamio Issuer" title="Issue credentials that verify themselves." />
      </div>

      <div>
        {label("OrbitSteps · earner lifecycle")}
        <OrbitSteps
          label="Earner lifecycle"
          steps={[
            { id: "enroll", label: "Enroll", detail: "Join a course with an Access Token." },
            { id: "submit", label: "Submit evidence", detail: "Show the work each learning target asks for." },
            { id: "review", label: "Get reviewed", detail: "The organization's reviewers accept or return it." },
            { id: "claim", label: "Claim", detail: "Mint the credential to your wallet." },
            { id: "carry", label: "Carry it anywhere", detail: "Anyone can verify it on-chain, without calling us." },
          ]}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {label("Readout · mono rows with copy")}
          <Readout
            title="Credential identity"
            rows={[
              { k: "course_id", v: GETTING_STARTED.params.courseId, copy: GETTING_STARTED.params.courseId },
              { k: "slt_hash", v: GETTING_STARTED.params.sltHash, copy: GETTING_STARTED.params.sltHash },
              { k: "network", v: "Cardano mainnet" },
              { k: "verify", v: "andamioscan.io", href: "https://andamioscan.io" },
            ]}
          />
        </div>
        <div>
          {label("ProofCard · outline draws on hover")}
          <ProofCard
            kicker="Audit"
            title="Contracts audited by TxPipe"
            footer="TxPipe · smart contract audit"
            href="#"
          >
            The on-chain validators behind courses, reviews and claims were
            reviewed by an independent auditor.
          </ProofCard>
        </div>
      </div>

      <div>
        {label("MiniBadge · still, themed per partner")}
        <div className="flex flex-wrap items-end gap-8">
          <MiniBadge size={140} brand="Intersect" course="Governance Fundamentals" />
          <MiniBadge
            size={140}
            brand="Fan Lab"
            course="Barça Fan Lab"
            theme={{ cyan: "#5f8dff", orange: "#e84a5f", accent: "#a50044" }}
          />
          <MiniBadge size={100} />
        </div>
      </div>

      <div>
        {label("LogoRail · every mark links to its use case")}
        <LogoRail
          logos={[
            { name: "Intersect", src: "/customer/intersect/intersect-logo.png", href: "/use-cases", caption: "Governance" },
            { name: "Syngenta", src: "/customer/syngenta/syngenta-logo.jpg", href: "/use-cases", caption: "Agronomy" },
            { name: "FC Barcelona", src: "/customer/fcbarcelona/fcbarcelona-logo.webp", href: "/use-cases", caption: "Fan engagement" },
          ]}
        />
      </div>
    </div>
  );
}
