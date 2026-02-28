# Write Graphite Syncing & Conflicts Subfile

## 1. Primary Request and Intent

Create a detailed reference subfile `syncing-conflicts.md` within the `graphite` skill covering synchronization and conflict resolution: `gt sync`, `gt restack`, `gt continue`, `gt abort`, `gt undo`. This is where users get stuck most often — understanding what happened, why there's a conflict, and how to get out of it.

The parent `SKILL.md` has a brief "Common Workflows" section on syncing. The subfile should go deep on the mechanics: what `gt sync` actually does step by step, what restacking means at the git level, how to resolve conflicts, and recovery from bad states.

## 2. Key Technical Concepts

- `gt sync` — does three things: (1) pulls latest trunk from remote, (2) prompts to delete branches whose PRs are merged/closed, (3) restacks all branches that can be restacked without conflicts. Supports `--all` (across all trunks), `--no-restack`, `--force`.
- `gt restack` — ensures each branch has its parent in its git history, rebasing if necessary. Scoped with `--only`, `--upstack`, `--downstack`, `--branch`. This is the core operation that propagates changes through a stack.
- `gt continue` — resumes a Graphite command halted by a rebase conflict. Supports `-a` (stage all before continuing). The workflow is: resolve conflicts → `gt add .` → `gt continue`.
- `gt abort` — aborts the current rebase. Safe escape hatch.
- `gt undo` — undoes the most recent Graphite mutation. Recovery tool.
- **Why conflicts happen**: When trunk advances (squash-merge creates new commits), the common ancestor doesn't change, so git thinks downstream branches still contain the old commits. `gt sync` + `gt restack` handle this by rebasing branches onto the new trunk, cutting out already-merged commits.
- **The `graphite-base/*` branches**: Temporary branches created during web-UI merging for atomic retargeting. CI should ignore them.
- After resolving conflicts locally: `gt sync && gt restack && gt submit --stack` is the standard recovery sequence.

## 3. Files and Code Sections

### `/Users/jacob/p/agent-skills/skills/graphite/SKILL.md`
- **Why important**: Contains brief sync and conflict resolution workflows. The subfile must expand on these significantly.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/sync-with-a-remote-repo.md`
- **Why important**: Primary doc for `gt sync`. Explains the three-step process, shows before/after `gt log` output, covers conflict scenarios.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/restack-branches.md`
- **Why important**: Deep dive into `gt restack`. Shows what happens at the git level (commit graph before/after), explains why restacking is needed after sync, covers conflict resolution flow.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/merge-pull-requests.md`
- **Why important**: Explains why squash-merge creates "phantom conflicts", how Graphite's merge job resolves them, the `graphite-base/*` branches, and the recommended CI ignore pattern. Critical for understanding why conflicts appear even when there's no real conflict.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/command-reference.md`
- **Why important**: Authoritative flag reference for `gt sync`, `gt restack`, `gt continue`, `gt abort`, `gt undo`.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/troubleshooting.md`
- **Why important**: Common CLI issues, many of which are sync/conflict related.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/comparing-git-and-gt.md`
- **Why important**: "Syncing from remote, restacking, and resubmitting" section shows the git vs gt comparison for this exact workflow.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/collaborate-on-a-stack.md`
- **Why important**: "Staying in sync" section covers sync in a collaboration context — `gt sync` + `gt get` + `gt submit` loop.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/faqs.md`
- **Why important**: May contain sync/conflict related FAQs.

## 4. Problem Solving

No problems encountered. Key insight from reading the docs: the most confusing aspect for users is *why* conflicts appear after merging. The squash-merge "phantom conflict" mechanic (§2) is the single most important concept to explain clearly. An agent that understands this can save users significant confusion.

## 5. Pending Tasks

After this subfile is written:
- Update `SKILL.md` to add a reference directing agents to read `syncing-conflicts.md` when relevant
- The other two subfiles (stack-lifecycle, stack-manipulation) are handled by separate handoffs

## 6. Current Work

We created the `graphite` skill with a conceptual `SKILL.md` and downloaded all 90 Graphite docs into `docs/`. We then discussed grouping subfiles by topic and settled on three: stack lifecycle, stack manipulation, and syncing & conflicts.

## 7. Next Step

Write `skills/graphite/syncing-conflicts.md`. Structure it as:

1. **Overview** — what syncing means in Graphite, why it's needed
2. **`gt sync` in detail** — the three steps (pull trunk, clean up merged branches, restack). Flags. What it looks like in practice.
3. **`gt restack` in detail** — what it does at the git level, scoping flags (`--only`, `--upstack`, `--downstack`), when to use it independently vs as part of sync
4. **Why conflicts happen** — the squash-merge phantom conflict mechanic. This deserves a clear explanation with a diagram-like walkthrough:
   - PR A is on trunk, PR B stacked on A
   - A gets squash-merged → new commit on trunk
   - B still points at old A commits → git sees conflict
   - `gt restack` rebases B onto new trunk, cutting out old A commits
5. **Resolving conflicts** — step-by-step: encounter conflict → resolve files → `gt add .` → `gt continue`. The `gt abort` escape hatch. The `gt undo` nuclear option.
6. **The standard recovery sequence** — `gt sync && gt restack && gt submit --stack`
7. **`graphite-base/*` branches** — what they are, why CI should ignore them, the YAML snippet
8. **Troubleshooting** — common stuck states and how to get out of them

Read all the docs listed in §3, synthesize into a cohesive reference. After writing the subfile, update `SKILL.md`'s "Reference Documentation" section to include a pointer to it.

## 8. Bootstrap Context

**Check status**: N/A — this is documentation, not code.

### Files to Read
- `/Users/jacob/p/agent-skills/skills/graphite/SKILL.md` — understand existing coverage
- `/Users/jacob/p/agent-skills/skills/graphite/docs/sync-with-a-remote-repo.md` — primary sync doc
- `/Users/jacob/p/agent-skills/skills/graphite/docs/restack-branches.md` — primary restack doc
- `/Users/jacob/p/agent-skills/skills/graphite/docs/merge-pull-requests.md` — phantom conflicts, graphite-base branches
- `/Users/jacob/p/agent-skills/skills/graphite/docs/command-reference.md` — flag reference
- `/Users/jacob/p/agent-skills/skills/graphite/docs/troubleshooting.md` — common issues

### Suggested Exploration
- `rg "gt sync" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning sync
- `rg "gt restack" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning restack
- `rg "conflict" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all conflict-related content
- `rg "graphite-base" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find graphite-base branch references
