<!-- GENERATED — DO NOT EDIT. Synced from ecosystem-enterprise/papers/building-on-andamio.md.
     Edit the source there and re-run scripts/sync-papers.sh. -->

# Building on Andamio

<!-- doc-status: draft -->
> **Draft. Open for team review.** This is live on `main` so anyone can find it and comment. The language is not settled or consented yet, and it is not for external publication as written. To read it and leave feedback, run the `/whitepaper` skill. Review thread: #26.

*The Protocol for Programmable Credentials*

Andamio is made to be built upon, and it gives you primitives at two levels.

### Cardano Blockchain

At the base is the **on-chain layer**: a set of Cardano spending validators and minting policies that enforce who can issue a credential, who can review work, and what has to be true before a badge is earned. On the blockchain, a credential is not a picture and not a database entry. It is a hashed artifact on a public ledger.

### Andamio API

Above the blockchain layer sits the **Andamio API**, which wraps blockchain primitives into endpoints that simplify app development. You do not need to build any transactions from scratch, because the API provides a convenient abstraction.

If you are a developer, you can use Andamio API to build new apps. In the rest of this paper, we will review some patterns that will help you identify where Andamio might fit in your stack.

## 1. Defining Credentials

A credential on Andamio is defined by a **global identifier**: 

`<local_state_id>.<credential_hash>`

The `local_state_id` records where a credential came from, and the `credential_hash` encodes what it certifies. 

In the API, Local States and their hashes are specified like this:
- Course: `course_id.slt_hash`
- Project: `project_id.task_hash`

Two things have to exist before a credential can be issued.

First, a **Local State** has to exist. An issuer creates a Course or Project through the API and gets back a `course_id` or `project_id`, a policy ID that is theirs alone (section 4). Any application can create a Local State ID and start issuing credentials that carry its own policy. That is what turns ordinary software into credential-issuing software. 

Second, the **work** has to exist. The issuer **Defines** it by writing Course Modules or Project Tasks, each with the Student Learning Targets it develops. They then **Publish** it on-chain. Publishing hashes the definition into the **credential hash**, a deterministic fingerprint of exactly what the credential certifies.

The Local State ID is unique to that one Course or Project, and the hash is unique to that one definition, so the pair names exactly one credential, the same way everywhere, for any app or agent that reads it. Once it exists, anyone can Commit to the work and earn it (section 2).

## 2. Commit, Review, Claim

Every credential issued on Andamio runs through a loop with three steps: **Commit**, **Review**, and **Claim**.

For each learner or contributor:

- **Commit.** An Access Token holder Commits to a piece of work. The Task definition is hashed at the moment of commitment, so the on-chain record is what they agreed to do, not what the definition happens to say later. The commitment itself is a token the chain now tracks.
- **Review.** The holder produces evidence: an explanation, a working PR, a transaction hash, a design doc. An authorized reviewer evaluates it against the work's Student Learning Targets, the specific capabilities it is built to develop, and either accepts it or refuses it with specific feedback. The reviewer's authority is granted on-chain and enforced by a validator, so not just anyone can sign off, not even on a Course or Project you forked.
- **Claim.** When the work passes, the holder Claims the credential and it attaches to their identity. The attestation is the explanation: the record carries who committed, what they agreed to, who reviewed it, and when.

These three steps run the same whether the work is a Course assignment or a Project Task, the two systems the protocol ships today (section 3). They differ at the Claim: a Project funds its Tasks from its own treasury, so a contributor who completes one Claims a reward along with the credential, paid from the Project's funds rather than their own pocket.

## 3. Blockchain Validation

Cardano's eUTxO model lets the rules live in on-chain validators, often called "smart contracts," instead of in any application's code.

The on-chain validation layer consists of the following components:

- **Access Token.** Your on-chain identity: a **U Token** in your wallet, and a **G Token** at a shared address that holds your record of credentials. More below.
- **Local State.** Where work lives. The protocol ships two systems, **Course** and **Project**, each with many **instances** owned by individual users.
- **Global State.** The registry and index over every Local State, and where each user's G Token lives.
- **Validators.** The on-chain scripts (Plutus and Aiken) that enforce every rule.

### Roles

The user who creates a Course or Project instance **owns** it. Ownership is mainly the right to delegate: a Course owner authorizes **teachers**, a Project owner authorizes **managers**. The pattern is identical.

Those authorized issuers **Define** credentials and **Review** submitted work. Anyone with an Access Token can **Commit** to that work and **Claim** the credential once it passes. A validator checks each role's authority on every transaction, even on a Course or Project someone forked.

### U and G Tokens

A credential is never minted as its own token into a wallet. When a holder Claims one, the identifier is written as an entry into their **G Token**, held at the shared Global State address. The **U Token** in their wallet authorizes the write.

Every credential a person earns, from every issuer, accumulates in that one record. The split does three things:

- **Cheap.** Earning a credential is a single state update, not a fresh mint.
- **In one place.** A person's entire history sits in one record any validator can read.
- **Forgery-proof.** Nothing reaches your Global State without your U Token.

### Composability and Prerequisites

The datum stores only `PolicyId -> hash` fingerprints. That is what lets a credential earned under one policy be required by another, while the work behind it stays private. In centralized services, competing credentials are illegible to each other; here, no one has to be trusted, because the rule lives in the validator.

A Project can declare a credential from another issuer as a **prerequisite**. The check fires at **Commit time**: the validator confirms the holder's Global State already holds the required credential before it lets the commitment mint. This runs on mainnet today, across credentials from programs that never coordinated. (The portable, human-facing verifier that reads prerequisites out of a credential is still in flight; section 5.)

## 4. Build on the API

The quickest way to see Andamio is to use it: [app.andamio.io](https://app.andamio.io) is the live app, open to anyone, where you can take a Course, Commit to work, and earn a credential right away. It runs entirely on the Andamio API, the same one you build on.

The Andamio API ([api.andamio.io](https://api.andamio.io)) turns the on-chain primitives into endpoints. You query it for data and for valid transactions, and the blockchain enforces the rules underneath. Its full reference is generated from the spec, [`andamio-dev`](https://github.com/Andamio-Platform/andamio-dev) plugs into your agent and walks you through it, and the documentation is at [docs.andamio.io](https://docs.andamio.io).

### Create Your Own

Use the API to create a new Course or Project. You get back a Course ID or Project ID that is yours and published on-chain, and you are now an issuer: you Define what the credentials mean, and every credential earned against them carries your policy. From there you build whatever application you want around that ID. The fastest start is [`andamio-app-template`](https://github.com/Andamio-Platform/andamio-app-template), which lets you build from the same UX as app.andamio.io, pointed at your own Courses and Projects.

### Build on Existing Work

You do not have to own a Course or Project to build on one. Given access to the data, the same API lets you build on Courses and Projects other issuers have created: a dashboard over a partner's credentials, a verifier, a directory, or an agent that Commits to work on someone's behalf. Because credentials are public and composable by design, building on another issuer's work is a first-class use, not a workaround.

## 5. Privacy and Verification

Andamio anchors trust without leaking data. The rule is simple: private data cannot go on a public blockchain, so Andamio does not put it there. It puts the hash. A Blake2b hash of the off-chain evidence goes on-chain; the evidence itself stays with whoever produced it. Anyone can confirm a credential is real; no one has to expose the work behind it.

At the application level, you set the rules for whether human-readable data is public or private. The Andamio API makes credential identifiers public, but not the human-readable details.

The verification model is fetch, recompute, compare: read the on-chain anchor, recompute the hash of the artifact you hold, and check that they match. You do not have to trust Andamio; you can recompute the hashes yourself, and the compiled bytes are already public on-chain, so there is nothing to wait for.

## 6. Agent Integration

Andamio's developer surface is small enough to hand to your agent. Point it at the **andamio-dev** repo (from section 4), the knowledge layer that teaches it the protocol and estimates costs, and it drives the **Andamio CLI** to build, sign, and submit transactions for you.

The CLI ([`andamio-cli`](https://github.com/Andamio-Platform/andamio-cli), v0.13.3) wraps the full transaction lifecycle, build, sign, submit, register, and confirm on-chain, and is the source of truth for what an Andamio transaction looks like. It targets preprod for development and mainnet for production.

## 7. Future Development

### Easy Onramps

Earning a credential on-chain still asks an end user for a Cardano wallet and an Access Token. That is the last hard edge in the experience, and smoothing it is next on Andamio's roadmap.

The lever is **sponsored transactions**: on the enterprise tier an issuer covers all user-facing transaction costs, so the people you credential never hold ADA or manage a wallet. Billing is ordinary; the chain is invisible to them. This path is built and exercised on preprod today, with an issuer-funded sidecar signing each user's transactions; mainnet activation is the step that remains.

Build against the sponsored path on preprod today, and you are ready the day it ships on mainnet.

### New Local States

"Course" and "Project" are not the entire Andamio protocol. They are the first two systems built on it. Both are instances of one `local-state` pattern that plugs into the shared `global-state`, which is why a credential earned in either composes with everything else.

The same machinery, Commit, Review, Claim, anchored by a hash and enforced by a validator, can carry any such loop you can define. Building an entirely new local-state system is protocol-level work, not a turnkey feature, but it is the deepest sense in which Andamio is a protocol you build on: Courses and Projects are where Andamio started, not the edge of what the pattern can hold.


*For what Andamio is and why it is built this way, read the Andamio Light Paper. For what you can put to work today and what it saves you, read Andamio Issuer. This paper is the how.*
