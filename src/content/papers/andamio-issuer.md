<!-- GENERATED — DO NOT EDIT. Synced from ecosystem-enterprise/papers/andamio-issuer.md.
     Edit the source there and re-run scripts/sync-papers.sh. -->

# Andamio Issuer

<!-- doc-status: draft -->
> **Draft. Open for team review.** This is live on `main` so anyone can find it and comment. The language is not settled or consented yet, and it is not for external publication as written. To read it and leave feedback, run the `/whitepaper` skill. Review thread: #26.

## The problem with badges

If you issue credentials, they need to mean something to whoever relies on them: an employer, a partner, or your own team. But the digital credential most organizations issue is a "badge", and badges are not effective. 

A badge is a picture that can be shared on LinkedIn, but it isn't data your systems can act on. In a 2025 survey, 91 percent of employers said they look for digital credentials when they hire, but only 34 percent of the organizations issuing them provide data a hiring system can actually read.[1]

Compounding the problem, your badges live in your vendor's database, where they can be changed, switched off, or lost if the vendor closes its doors. The vendor, not you, effectively controls your credentialing system.

Andamio turns your badge into a credential you control. It adds a verifiable credential layer on top of the programs you already run, anchored on a public ledger no single company controls. You get everything a blockchain guarantees and none of the blockchain to learn. No wallets, no tokens, nothing new for you or the people you credential to understand.

Six design decisions make an Andamio credential a building block instead of a badge, and the rest of this paper walks through each one.

## What makes an Andamio credential different

### 1. It outlives whoever issued it

A badge lives in your vendor's system, which means it can be quietly changed, switched off, or lost when a contract ends or a company folds. An Andamio credential is immutable and stored on public infrastructure that no single company owns. It cannot be altered after the fact, and it does not disappear when a vendor does. You are not locked in, and neither are the people you credential.

### 2. It builds on other credentials

A badge stands on its own, and nothing connects to it after it is earned. Like a university prerequisite, an Andamio credential can be required before someone attempts to earn another. This requirement is enforced by the blockchain itself, not by an app's rules, which means it holds even across organizations. A credential your program issues can be the prerequisite for a program someone else runs.

### 3. It is something software can act on

A badge is a picture. At best it carries some metadata, but as the opening numbers show, most issuers do not even provide data a hiring system can read. An Andamio credential is machine-readable and programmable. An application can check that someone holds it and gate access on that.

### 4. Its proof is public; its evidence is private

More than half of job seekers admit to having lied on a resume,[2] yet badge verification is mostly theatrical, and the systems that try to do it properly often have to expose the work itself. On Andamio, anyone can verify that a credential is real, while the work behind it stays with the person who earned it and the organization that issued it. 

This is how university credentials already work: a diploma is public; the exam papers are not. The signal goes where anyone can check it, and the evidence stays private, with no surveillance of the work.

### 5. You own what it means

With most platforms, the platform decides what your credential is worth and how it can be used. On Andamio, the barrier to issue is low and the credential makes no claim about its own value. You define what it certifies, and its value comes from the track record it earns once it is out in the world. You also decide who on your team can issue credentials and who reviews the work behind them. Andamio provides the issuance infrastructure; the meaning is yours.

### 6. The earner keeps it

A badge is trapped in the system that issued it, which is a large part of why so few are ever seen again. An Andamio credential lives with the person who earned it, not in your system, and they can carry it anywhere it is useful, even if they leave your program. Everything a person earns from you accumulates in one record they control rather than a scatter of separate items, so each person's history stays coherent and you can issue at any volume without piling on cost. Counterintuitively, that is what makes it worth more: a credential people can actually take with them is one they will actually use.

## A New Kind of Badge

These six design decisions are why an Andamio credential works as a building block. It's a new kind of badge that outlives its issuer, builds on others, can be acted on by software, proves itself publicly while protecting the work, means what you say it means, and belongs to the earner. 

An Andamio credential is infrastructure that the next person, the next organization, or the next system, can trust without taking anyone's word for it. This kind of badge is ready for how real work gets done, today.

For what each plan includes, see [Andamio's published pricing](https://www.andamio.io/pricing).

## Sources

[1] Accredible, *2025 State of Credentialing Report* (survey of 502 HR and recruiting leaders and 175 credential issuers, spring 2025): 91% of employers look for digital credentials when hiring; 34% of issuers provide structured data hiring systems can use. https://www.accredible.com/reports/2025-state-of-credentialing-report

[2] StandOutCV, *How many people lie on their resume to get a job?* (survey of 1,785 employed Americans): 55–64% report having lied on a resume at least once. Multiple independent surveys (ResumeLab, Resume Builder, 2023–2025) cluster between 44% and 70%. https://standout-cv.com/usa/stats-usa/study-fake-job-references-resume-lies


*For how this works under the hood, see Building on Andamio. For what Andamio is and why it is built this way, see the Andamio Light Paper.*
