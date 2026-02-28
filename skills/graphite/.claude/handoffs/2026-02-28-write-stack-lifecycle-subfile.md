# Write Graphite Stack Lifecycle Subfile

## 1. Primary Request and Intent

Create a detailed reference subfile `stack-lifecycle.md` within the `graphite` skill that covers the core CLI loop: creating branches, modifying them, navigating stacks, viewing stacks, and submitting PRs. This is the "bread and butter" of Graphite usage — the commands a user runs dozens of times a day.

The parent `SKILL.md` provides a conceptual overview and command tables. This subfile should go deeper: explain the *workflow patterns*, show realistic multi-step examples, cover flags that matter, and capture the nuances an agent needs to help a user effectively.

The SKILL.md will be updated to reference this subfile with a directive like "read `stack-lifecycle.md` when the user needs help with creating, modifying, navigating, or submitting stacks."

## 2. Key Technical Concepts

- `gt create` — creates a new branch stacked on the current one, commits staged changes. Branch names auto-generated from commit message. Supports `-a` (stage all), `-m` (message), `--patch`, `--insert`, `--ai`.
- `gt modify` — amends the current branch's commit or adds a new commit. Auto-restacks descendants. Supports `-a`, `-c` (new commit vs amend), `--into` (amend into a downstack branch), `--interactive-rebase`.
- `gt submit` — pushes branches to remote, creates/updates GitHub PRs. Key flags: `--stack` (include descendants), `--draft`, `--edit`, `--merge-when-ready`, `--reviewers`, `--dry-run`, `--update-only`.
- `gt log` / `gt log short` / `gt log long` — view stack state. `gt ls` and `gt ll` are aliases.
- `gt up` / `gt down` / `gt top` / `gt bottom` / `gt checkout` — stack navigation.
- Branch naming: configurable prefix, date prefix, auto-generated from commit message.
- Graphite treats branches as single-commit atomic changesets (not multi-commit like git workflows).
- `gt add` is a git add passthrough.

## 3. Files and Code Sections

### `/Users/jacob/p/agent-skills/skills/graphite/SKILL.md`
- **Why important**: The parent skill file. The subfile must complement it without duplicating the high-level command tables already there. Read the "CLI Command Map" and "Core loop" sections to understand what's already covered.
- **Key section**: The "core loop" table and "Common Workflows" section set the baseline.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/create-a-pull-request.md`
- **Why important**: Covers creating a single PR with `gt create`. Shows the step-by-step workflow.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/create-stack.md`
- **Why important**: How to build a stack by issuing successive `gt create` commands. Covers branch naming, `gt split` for splitting existing branches.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/update-mid-stack-branches.md`
- **Why important**: Covers `gt modify` in depth — amending mid-stack branches and how auto-restacking works.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/navigate-stack.md`
- **Why important**: Full coverage of `gt up`, `gt down`, `gt top`, `gt bottom`, `gt checkout`, `gt log`.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/command-reference.md`
- **Why important**: Authoritative reference for all flags on `gt create`, `gt modify`, `gt submit`, `gt log`, `gt checkout`, etc. Use this for accurate flag documentation.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/cheatsheet.md`
- **Why important**: Quick reference tables for common tasks. Good source for short forms and aliases.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/comparing-git-and-gt.md`
- **Why important**: Shows the git-to-gt mental model translation. Good source for "if you'd do X in git, do Y in gt" patterns.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/configure-cli.md`
- **Why important**: Branch naming settings, submit settings (CLI vs web metadata editing), PR description configuration.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/cli-quick-start.md`
- **Why important**: The official quick-start guide, good for the canonical "first time" workflow.

## 4. Problem Solving

No problems encountered. Key assumption: the subfile should be written as a *reference for an agent*, not as user-facing documentation. It should be dense, practical, and pattern-oriented.

## 5. Pending Tasks

After this subfile is written:
- Update `SKILL.md` to add a reference directing agents to read `stack-lifecycle.md` when relevant
- The other two subfiles (stack-manipulation, syncing-conflicts) are handled by separate handoffs

## 6. Current Work

We created the `graphite` skill with a conceptual `SKILL.md` and downloaded all 90 Graphite docs into `docs/`. We then discussed grouping subfiles by topic and settled on three: stack lifecycle, stack manipulation, and syncing & conflicts.

## 7. Next Step

Write `skills/graphite/stack-lifecycle.md`. Structure it as:

1. **Overview** — one paragraph on what this covers
2. **Creating branches** — `gt create` patterns, flags, branch naming, the "one branch = one commit" principle
3. **Modifying branches** — `gt modify` (amend vs new commit), `--into` for downstack amends, auto-restacking behavior
4. **Navigating stacks** — `gt up/down/top/bottom/checkout`, `gt log` variants
5. **Submitting** — `gt submit` patterns, `--stack`, draft mode, reviewers, edit vs no-edit, dry-run, merge-when-ready
6. **End-to-end examples** — 2-3 realistic multi-step workflows showing the full loop

Read all the docs listed in §3, synthesize them into a cohesive reference. Don't just copy docs — distill the patterns and flag combinations that matter most. After writing the subfile, update `SKILL.md`'s "Reference Documentation" section to include a pointer to it.

## 8. Bootstrap Context

**Check status**: N/A — this is documentation, not code.

### Files to Read
- `/Users/jacob/p/agent-skills/skills/graphite/SKILL.md` — understand what's already covered, avoid duplication
- `/Users/jacob/p/agent-skills/skills/graphite/docs/command-reference.md` — authoritative flag reference
- `/Users/jacob/p/agent-skills/skills/graphite/docs/create-stack.md` — creating stacks workflow
- `/Users/jacob/p/agent-skills/skills/graphite/docs/update-mid-stack-branches.md` — modify workflow
- `/Users/jacob/p/agent-skills/skills/graphite/docs/navigate-stack.md` — navigation commands
- `/Users/jacob/p/agent-skills/skills/graphite/docs/comparing-git-and-gt.md` — mental model translation

### Suggested Exploration
- `rg "gt create" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning create
- `rg "gt submit" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning submit
