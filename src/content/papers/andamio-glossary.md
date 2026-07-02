<!-- GENERATED — DO NOT EDIT. Synced from ecosystem-enterprise/papers/andamio-glossary.md.
     Edit the source there and re-run scripts/sync-papers.sh. -->

---
title: Andamio Glossary
type: glossary
status: draft
canonical: true
owner: Ecosystem Enterprise
circle: Ecosystem Enterprise
description: 'Shared glossary for the Andamio Whitepapers: plain definitions of the terms used across the set.'
reviewed: '2026-06-29'
consented:
target_meeting:
review_due:
---

# Andamio Glossary

Plain definitions of the terms used across the Andamio papers. Each entry is the short version; the mechanics behind them are the subject of Building on Andamio.

## Identity

**Access Token.** A person's on-chain identity on Andamio, minted once and named for a self-chosen alias. It is a pair of tokens, a U Token and a G Token, that together carry who you are and what you have earned. An Access Token is the one prerequisite for committing to work or earning a credential.

**Alias.** The self-chosen name an Access Token is minted under. It identifies the holder in every transaction.

**U Token.** The half of the Access Token held in the holder's own wallet. It is proof of ownership and the means of control, and it is the only thing a user keeps in their wallet. Acting on your record requires your U Token.

**G Token.** The half of the Access Token held at a single on-chain address, the Global State, rather than in a wallet. Its datum carries the holder's record of participation: the credentials they have earned, across every organization they touch. Credentials are written here as entries, not minted as separate tokens.

## State

**Local State.** Where work lives on Andamio. A Local State is an instance of one of the systems the protocol ships, owned by the Access Token holder who created it. Course and Project are the two systems Andamio ships.

**Course.** A Local State for learning. Its owner authorizes teachers, who Define Modules and Review the work students submit.

**Project.** A Local State for work. Its owner authorizes managers, who Define Tasks and Review the work contributors submit. A Project funds its Tasks from a treasury, so completing one earns a reward along with the credential.

**Global State.** The shared registry and index over every Local State, and the address where each user's G Token lives. It records which instances are authorized to issue credentials, and it lets any validator read any user's credentials.

**Instance.** A single Course or Project (for example, "Intro to Woodworking" owned by Alice). Many instances can run on the same system, each with its own owner and credentials.

**Validator.** An on-chain script (written in Plutus and Aiken) that enforces a rule. The rules of Andamio live in validators, not in any application's code, so they hold no matter which app or agent is in front of them.

## Roles

**Owner.** The Access Token holder who created a Course or Project instance. Ownership is mainly the right to delegate: an owner authorizes the people who can issue and review on that instance.

**Teacher.** Someone an owner authorizes on a Course to Define its Modules and Review student submissions.

**Manager.** Someone an owner authorizes on a Project to Define its Tasks and Review contributor submissions.

**Student.** Anyone with an Access Token who Commits to a Course's work, submits evidence, and Claims the credential when it passes.

**Contributor.** Anyone with an Access Token who Commits to a Project's Task, submits evidence, and Claims the credential and its reward when it passes.

## Credentials

**Credential.** A single entry in a holder's Global State recording something they have earned. It is not a picture and not a token sitting in a wallet; it is a `PolicyId -> hash` pair, the signature `local_state_id.credential_hash`: where it came from (the Course or Project that issued it) and what it certifies (the hash its issuer defined).

**Credential hash.** The fingerprint of what a credential certifies, defined by the instance's authorized issuer. For a Course it is computed from the Module's Student Learning Targets (`course_id.slt_hash`); for a Project, from the Task (`project_id.task_hash`). Storing only the hash keeps the definition verifiable while the details stay with the issuer.

**Student Learning Target (SLT).** The specific capability a unit of work is built to develop. A Course credential's hash is computed from its SLTs, and reviewers evaluate submitted work against them.

**Task.** A unit of Project work with a defined reward. A Project credential's hash is computed from the Task definition.

**Evidence.** The work a person submits to earn a credential: an explanation, a working PR, a transaction hash, a design doc. Only a hash of the evidence goes on-chain; the evidence itself stays with whoever produced it.

**Hash.** A short, one-way fingerprint of a piece of data (Andamio uses Blake2b). Andamio puts hashes on the public ledger instead of private data, so anyone can verify a match without seeing the data itself.

**OpenBadges 3.0.** The 1EdTech standard for portable, verifiable digital credentials, aligned with W3C Verifiable Credentials. Andamio issues each credential in this format, its achievement, issuer, and on-chain anchor structured so the wider badge ecosystem can read it.

**Prerequisite.** A credential required before someone can Commit to gated work. Within a single issuer's courses and pathways, the requirement is enforced on-chain at Commit time. Enforcing it across organizations, so a credential one program issues can gate work in a program that never coordinated with it, is not yet available.

## The loop

**Commit.** Taking on a unit of work. The definition is hashed at the moment of commitment, so the on-chain record is what the holder agreed to do.

**Review.** An authorized issuer, a teacher or a manager, evaluates submitted evidence against the work's targets and accepts or refuses it. (The on-chain action is named assess.)

**Claim.** Recording passed work as a credential on the holder's identity. For a Project, claiming also releases the Task's reward.

**Define and Publish.** What an issuer does before anyone Commits: Define a Course or Project and its Modules or Tasks, then Publish it on-chain so others can Commit to the work.

## Funding and access

**Treasury.** A Project's on-chain pool of funds. Task rewards are paid from it, and anyone can add to it.

**Reward.** The funds a contributor receives on claiming a Project credential, paid from the Project's treasury rather than the contributor's own pocket.

**Sponsored transactions.** An enterprise path in which an issuer covers all user-facing transaction costs, so the people they credential never hold ADA or manage a wallet. Not yet available.

**Andamio API.** The interface that turns Andamio's on-chain primitives into endpoints, so builders can create Courses and Projects and the applications around them without writing transactions themselves.

**Andamio CLI.** The command-line tool that wraps the full transaction lifecycle (build, sign, submit, register, confirm) and is the source of truth for what an Andamio transaction looks like.

---

*Introducing Andamio explains why the system is built this way. Andamio Issuer covers what you can put to work. Building on Andamio is how it works under the hood.*
