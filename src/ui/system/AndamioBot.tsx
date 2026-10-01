"use client";

/**
 * AndamioBot — the /bot product page. Grounded in the andamio-bot README:
 * a reusable Discord bot that reads members' credentials and gates roles, with
 * no wallet handling by adopters or members. Composed from the ./kit system.
 */

import React from "react";
import { nav, bot, footer } from "~/ui/explore/content";
import { color, font } from "./tokens";
import {
  Page,
  Section,
  Display,
  Button,
  ButtonRow,
  Footer,
  SectionIntro,
  CardRow,
  Kicker,
} from "./kit";
import { ProofCard } from "./instrument";

const mono = { fontFamily: font.mono };
const muted = { color: color.inkMuted };

const pageFooter = (
  <Footer
    tagline={footer.tagline}
    meta={footer.meta}
    copyright={footer.copyright}
    columns={footer.columns}
    backHref="/"
    backLabel="← Back to Andamio"
  />
);

export default function AndamioBot() {
  return (
    <Page
      nav={{ items: nav.items, secondaryCta: nav.secondaryCta }}
      footer={pageFooter}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section id="top" bordered={false}>
        <div className="pt-16 sm:pt-24">
          <Kicker>{bot.hero.eyebrow}</Kicker>
          <Display as="h1" size="xl" className="mt-6 max-w-[16ch]">
            {bot.hero.headline}
          </Display>
          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgb(var(--sys-ink-rgb) / 0.7)" }}
          >
            {bot.hero.sub}
          </p>
          <div className="mb-16 mt-12 sm:mb-24">
            <ButtonRow>
              <Button variant="ink" href={bot.hero.primaryCta.href}>
                {bot.hero.primaryCta.label} <span aria-hidden>→</span>
              </Button>
              <Button variant="outline" href={bot.hero.secondaryCta.href}>
                {bot.hero.secondaryCta.label} <span aria-hidden>→</span>
              </Button>
            </ButtonRow>
          </div>
        </div>
      </Section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Section id="how" bordered={false}>
        <div
          className="border-t pb-16 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro title={bot.how.heading} />
          <div className="mt-8">
            <CardRow items={bot.how.items} size="md" numbered />
          </div>
          <figure className="mt-12 max-w-2xl">
            <ProofCard
              bodyClassName="p-0"
              footer="#get-started · illustration of the flow, not a live capture"
            >
              <ol className="divide-y" style={{ borderColor: color.cell }}>
                {bot.flow.map((m, i) => (
                  <li
                    key={i}
                    className="flex gap-3 px-5 py-4"
                    style={{ borderColor: color.cell }}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                      style={{
                        background: m.who === "bot" ? color.cyan : color.cell,
                        color: m.who === "bot" ? color.onInk : color.ink,
                      }}
                    >
                      {m.who === "bot" ? "AB" : "you"}
                    </span>
                    <div>
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: color.ink }}
                      >
                        {m.who === "bot" ? "AndamioBot" : "member"}
                        {m.who === "bot" ? (
                          <span
                            className="ml-2 px-1 py-px text-[10px] uppercase"
                            style={{
                              ...mono,
                              background: color.cell,
                              color: color.inkMuted,
                            }}
                          >
                            app
                          </span>
                        ) : null}
                      </p>
                      <p
                        className="mt-1 text-[14px] leading-relaxed"
                        style={
                          m.text.startsWith("/")
                            ? { ...mono, color: color.cyan }
                            : muted
                        }
                      >
                        {m.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </ProofCard>
            <figcaption
              className="mt-3 text-[12px]"
              style={{ color: color.inkFaint }}
            >
              Bot replies are ephemeral: only the member who ran the command
              sees them.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ── The commands ─────────────────────────────────────────────────── */}
      <Section id="commands" bordered={false}>
        <div
          className="border-t pb-16 pt-14"
          style={{ borderColor: color.rule }}
        >
          <SectionIntro title={bot.commandsHeading} />
          <dl className="mt-8 border-t" style={{ borderColor: color.rule }}>
            {bot.commands.map((c) => (
              <div
                key={c.name}
                className="grid grid-cols-1 gap-1 border-t py-4 first:border-t-0 sm:grid-cols-12 sm:gap-6"
                style={{ borderColor: color.cell }}
              >
                <dt
                  className="text-[14px] font-semibold sm:col-span-3"
                  style={mono}
                >
                  {c.name}
                </dt>
                <dd
                  className="text-[14px] leading-relaxed sm:col-span-9"
                  style={muted}
                >
                  {c.desc}
                </dd>
              </div>
            ))}
          </dl>
          <div
            className="mt-10 border-t pt-8"
            style={{ borderColor: color.rule }}
          >
            <p className="max-w-2xl text-[15px] leading-relaxed" style={muted}>
              {bot.noWallet}
            </p>
            <div className="mt-8">
              <Button variant="ink" href={bot.cta.href}>
                {bot.cta.label} <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
