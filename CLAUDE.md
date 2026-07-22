
# Project Name

  Landing page and blog for Andamio

  <skills>
    <skill name="seo-setup">
      <file>@.claude/skills/seo-skill/SKILL.md</file>
      <description>Automated SEO implementation</description>
      <trigger>Use <seo-setup> when setting up SEO</trigger>
    </skill>
    <skill name="landing-excellence">
      <file>@.claude/skills/landing-excellence/SKILL.md</file>
      <description>Andamio landing funnel: Concept A, Warm Index, canonical stack, requirements, tool adoption</description>
      <trigger>Use <landing-excellence> for homepage /show-me /issuer planning or changes</trigger>
    </skill>
    <skill name="github-skills-index">
      <file>@.claude/skills/github-skills-index/SKILL.md</file>
      <description>Index of 77 vendored GitHub agent skills from the landing excellence catalog</description>
      <trigger>Use <github-skills-index> to find or refresh vendored GitHub skills</trigger>
    </skill>
  </skills>

  Vendored GitHub skills live under `.claude/skills/` with prefixes
  `obra-`, `anthropic-`, `ms-`, `ecc-`, `tob-`, `arz-`, `ghcp-`, `davila-`.
  Each includes `VENDOR.md` provenance. Authority for Andamio landing remains
  `landing-excellence` over conflicting vendor guidance. Refresh with
  `python .claude/skills/sync-github-skills.py`.

## Project knowledge

  `docs/solutions/` — documented solutions to past problems (bugs, best
  practices, design patterns), organized by category with YAML frontmatter
  (`module`, `tags`, `problem_type`). Relevant when implementing or debugging
  in documented areas.

  `CONCEPTS.md` — shared domain vocabulary (entities, named processes, status
  concepts). Relevant when orienting to the codebase or discussing domain terms.
