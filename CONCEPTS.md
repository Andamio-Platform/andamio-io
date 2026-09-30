# Concepts

> Shared domain vocabulary for this site. Glossary only, not a spec. Direct edits are fine.

## Credentials

### Credential
A record, anchored on Cardano, that an earner completed specific learning targets in a course and that an issuer reviewed and accepted. The earner holds it in their own wallet, and anyone can verify it without asking the issuer.

### Proof Ring badge
The visual form of a credential on this site (`src/ui/system/proof-badge/`). The face shows the course, earner, issuer DID, issue date and network. The two rings encode the credential's identifiers as tick marks, so the badge carries its own proof: the outer ring encodes the course ID and the inner ring encodes the SLT hash.

### Course ID
The on-chain identifier of a course (56 hex characters). It links to the course on Andamioscan.

### SLT (Student Learning Target)
One "I can…" statement a credential attests to. A module groups several SLTs.

### SLT hash
A 64-hex SHA-256 hash of a module's canonicalized SLT list. It changes if any target changes, so it pins exactly what was assessed.

### Issuer DID
The decentralized identifier of the organization that issued the credential, shown on the badge face.

### Claim
The earner's step of taking a reviewed credential into their own wallet.

### Verify
Checking a credential against the chain, for example by scanning the badge QR or opening the claim on Andamioscan.

## Audience lifecycles

Each page uses the lifecycle for its audience.

- **Earner:** Enroll, Submit evidence, Get reviewed, Claim, Carry it anywhere. Used on home and `/show-me`.
- **Organization:** Define, Review, Issue, Verify. Used on `/issuer`.
- **Developer:** Commit, Review, Claim, then gate access on credentials. Used on `/developers`.

## Adoption modes

- **Invisible:** the organization sponsors transactions and a wallet is created for each user at sign-in, so users never handle crypto. Example: FC Barcelona's Barça Fan Lab with BarçaID.
- **Visible:** users connect their own Cardano wallet and hold credentials directly.

## Site terms

### Concept A
The binding funnel direction: issuer-primary, the credential shown first, developers as secondary depth.

### Demo truth (CNT-02)
Illustrative demos must read as illustrative. Nothing on the site claims a real mint or verification that did not happen.
