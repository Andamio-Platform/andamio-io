<!-- GENERATED — DO NOT EDIT. Synced from ecosystem-enterprise/papers/andamio-light-paper.md.
     Edit the source there and re-run scripts/sync-papers.sh. -->

# Andamio Light Paper

<!-- doc-status: draft -->
> **Draft. Open for team review.** This is live on `main` so anyone can find it and comment. The language is not settled or consented yet, and it is not for external publication as written. To read it and leave feedback, run the `/whitepaper` skill. Review thread: #26.

Andamio is a credentialing solution. It allows people to issue, earn, and verify credentials that can be carried anywhere.

Andamio means scaffolding. Scaffolding is a temporary structure that helps something stand up for the first time, and then comes down.

Andamio is scaffolding that people use to build trust.

## Trust Signals

On the Internet, content is now effectively infinite, but trust signals are scarce.

Here are three questions for you:

1. How do you know who you can trust with your data?
2. How do you know who you can trust to tell the truth?
3. How do you know who you can trust to do what they say they will?

Credentials are how people have answered questions like these for a long time. We think they are due for an upgrade.

## Design Decisions

We built Andamio by making a handful of design decisions about how credentials could work differently. The foundation is a public blockchain ledger, infrastructure no single company owns. Every decision below follows from putting credentials there instead of inside a company's database.

### 1. Credentials are immutable and stored on public infrastructure

No one can quietly change them or switch them off, and they do not disappear when a company does. A credential outlives whoever issued it.

### 2. Credentials are composable

One credential can be required to earn another. What you earn opens the door to what comes next, so credentials build on each other instead of piling up in a drawer.

### 3. Credentials are useful

A credential is more than something to display. Software can read its contents, who issued it and what it certifies, and an application can check that someone holds one and act on it. A credential can gate access, unlock the next step, or drive what an app does, not just sit in a profile.

### 4. Proof is public and evidence is private

Anyone can verify that a credential is real, while the work behind it stays yours. A diploma is public, but the exam and the answers are not. This is how credentials have worked for centuries, and Andamio keeps it that way. The proof goes on a ledger anyone can read, and everything behind it stays private: the work an individual did to earn the credential, and how an organization grants it.

### 5. Anyone can issue a credential

A credential makes no claim about its own value; value comes from use. Issuance is the public good. Creating meaning is the issuer's responsibility.

### 6. The holder owns the credential

It lives with the person who earned it, not in the issuer's system, and they can carry it anywhere it is useful. Everything someone earns lives together in one record they control, rather than scattered across the systems that issued each piece. Value stays where the work was created.

## Learn More

If you want to know what you can put to work today, read Andamio Issuer. If you want to know how it works and how to build on it, read Building on Andamio.

## About Us

Andamio is built by a globally distributed team, in the open. The way we govern ourselves is part of the product: the decisions we have agreed to are written where anyone can read them. We named the company for a structure that helps you stand, and then comes down. You keep the credential and the trust you built; the scaffolding gets out of the way.
