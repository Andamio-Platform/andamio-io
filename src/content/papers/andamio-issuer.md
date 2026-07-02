<!-- GENERATED — DO NOT EDIT. Synced from ecosystem-enterprise/papers/andamio-issuer.md.
     Edit the source there and re-run scripts/sync-papers.sh. -->

---
title: Andamio Issuer
type: whitepaper
status: draft
canonical: true
owner: Ecosystem Enterprise
circle: Ecosystem Enterprise
description: 'Enterprise positioning: the problem with badges, and how an Andamio credential is permanent, useful, yours, and backed by proof.'
reviewed: '2026-07-02'
consented:
target_meeting:
review_due:
---

# Andamio Issuer

## The problem with badges

You have good reasons to issue digital badges. As marketing, badges work: people share them, and you should not lose that reach. The badge is not the problem. The problem is where it lives and how it is made.

A badge lives in someone else's database, so the company that hosts it can change it, lock it behind a paywall, or switch it off. This is not hypothetical, as recent stories from [Canvas](https://blogs.chapman.edu/academics/2025/06/16/sunset-of-canvas-badges-credentials/) and [LinkedIn](https://www.linkedin.com/help/linkedin/answer/a1690529) can attest. A badge is also cheap to issue in bulk, with no work behind it that anyone can check. A credential nobody can verify is just more noise, and noise doesn't build trust.

Public credentials should help people trust each other. When credentials can be faked, forgotten about, or deleted entirely, it's hard to build trust. That's why we built Andamio.

When issued on Andamio, your badges become credentials that are permanent, useful, yours, and backed by proof. Each one combines the recognition of OpenBadges 3.0 (OB3)[2] with the permanence of blockchain, so you can build on it. You keep the reach, and add the meaning.

Because it's built on structured data, your systems can use it, without compromising your trade secrets. You get the guarantees of a public ledger, wrapped in a small API that can be integrated in minutes.

## Permanent, useful, yours, and backed by proof

Trust has to be built into the credential itself. Here's how:

### 1. Credentials should be permanent

A badge lives in your vendor's system, which means it can be quietly changed, switched off, or lost when a contract ends or a company folds. An Andamio credential is immutable and stored on public infrastructure that no single company owns. It cannot be altered after the fact, and it does not disappear when a vendor does. You are not locked in, and neither are the people you credential.

### 2. Credentials should be useful

As a picture, a badge is easy to share, but a picture is where it ends. No system reads it, nothing requires it, no software acts on it, and the problem badges were meant to solve stays unsolved. You still can't trust what people claim. Most job seekers embellish their résumés, and nearly a third fabricate outright.[3]

An Andamio credential is useful because your systems can act on it. It's structured data an application can read, so it can check that someone holds a credential and gate access on that. When you build a course, one credential can be required before another, as a prerequisite enforced by the ledger itself rather than an app's rules. This lets you build learning pathways people progress through, where each credential opens the door to the next.

### 3. Credentials should be yours

A badge belongs to whatever platform hosts it. An Andamio credential belongs to the person who earned it, anchored on a public ledger no company controls. Anyone can verify it's real without trusting the issuer, so it can't be faked.

That ownership works two ways.

#### 3a. For Credential Issuers

Issuing takes a few API calls, and you decide who on your team can issue and who reviews the work behind each one. That work, the evidence a credential rests on, stays private and stays yours. What's public is only that the credential is real, the way a diploma is public but the exam papers are not.

#### 3b. For Credential Earners

The credential belongs to the person who earned it, recorded against their own on-chain identity rather than in your database. Everything they earn, from every issuer, accumulates in one record they control, and it travels with them, not from them. No one, not even you, can revoke it. Anyone can check that it's real, so it holds its meaning long after they've moved on.

### 4. Credentials should carry proof

Open a typical badge and there is nothing inside. It names an achievement, and that is where it ends.

An Andamio credential carries its proof within it, because every credential runs through the same pattern. You define what the credential means. Someone commits to the work and submits evidence. A reviewer you authorized checks that evidence against your standards, and only then is the credential claimed. What the earner holds records what was done, who reviewed it, and what it proves, so a real human interaction stands behind every single one.

There is no bulk mint. You issue one credential at a time, each backed by work, and that is why the trust builds faster. You are slowing down to move fast.

The analytics stay yours, too. Andamio does not track how your badges are shared or viewed. That layer belongs to you: keep the platform you already use for reach, or build your own. What the protocol records are the interactions behind each credential, defined, evidenced, reviewed, and claimed, and nothing more.

## A New Kind of Badge

An Andamio credential delivers the trust a badge always promised but never could. It outlives its issuer, software can act on it, it belongs to the person who earned it, and the work behind it travels inside it.

Bulk badges are noise. An Andamio credential is signal: it takes work to earn one, and proof to issue one. It's not a picture of what someone once did. It's infrastructure the next person, team, or system can trust without taking anyone's word for it, a starting point for what they'll do next.

Trust is expensive to earn and cheap to lose. Andamio is the scaffolding you build it on.

Outgrow the product and you're still not stuck. The protocol is open, and you can build your own applications directly on Andamio.

Ready to issue? See [plans and pricing](https://www.andamio.io/pricing).

## Sources

[1] Joseph Fuller et al., *Hidden Workers: Untapped Talent*, Harvard Business School / Accenture, September 2021: 88% of employers say their automated screening rejects qualified high-skilled candidates (94% for middle-skilled) because they do not exactly match the criteria. https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf

[2] 1EdTech Consortium, Open Badges 3.0, final release May 29, 2024: a governed open standard, in which each OB3 credential is a digitally signed W3C Verifiable Credential. https://www.1edtech.org/1edtech-article/new-open-badges-30-standard-provides-enhanced-security-and-mobility/411060 OB3 is a profile of the W3C Verifiable Credentials Data Model v2.0 (W3C Recommendation, May 2025): https://www.w3.org/TR/vc-data-model-2.0/

[3] Henle, Dineen & Duffy (2019), "Assessing Intentional Resume Deception: Development and Nomological Network of a Resume Fraud Measure," *Journal of Business and Psychology* 34(1), 87–106: across multiple studies, 72% embellished, 61% omitted, and 31% fabricated résumé information, at least to some extent. https://link.springer.com/article/10.1007/s10869-017-9527-4


*For how this works under the hood, see Building on Andamio. For what Andamio is and why it is built this way, see Introducing Andamio.*
