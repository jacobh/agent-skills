# Write Graphite Stack Manipulation Subfile

## 1. Primary Request and Intent

Create a detailed reference subfile `stack-manipulation.md` within the `graphite` skill covering stack restructuring operations: reordering, folding, splitting, squashing, absorbing, moving, deleting, and popping branches. These are the "surgery" commands — used when a stack needs reshaping after initial creation.

The parent `SKILL.md` has a brief command table for these. The subfile should explain *when* to use each operation, show realistic before/after examples, and cover the important flags and edge cases.

## 2. Key Technical Concepts

- `gt fold` — combines current branch into its parent. Preserves commit history. `--keep` to use current branch's name instead of parent's. Note: doesn't close the GitHub PR — user must do that manually.
- `gt split` — splits current branch into multiple. Three modes: `--by-commit` (split at commit boundaries), `--by-hunk` (interactive staging), `--by-file <pathspec>` (extract by file pattern). Key nuance: to keep a PR attached, reuse the original branch name for one of the new branches.
- `gt squash` — squash all commits in current branch into one. Useful after `gt fold` or accidental `gt modify -c`. Supports `--edit` and `--message`.
- `gt absorb` — intelligently distributes staged hunks to the right downstack commits. Only absorbs hunks that can be deterministically attributed. Supports `--dry-run`, `--patch`, `--all` (but `-a` here only stages tracked files, unlike `gt create -a`).
- `gt move --onto <branch>` — rebase current branch onto a different parent. Restacks descendants.
- `gt reorder` — opens editor to reorder branches between trunk and current branch.
- `gt delete` — deletes a branch and its metadata. Children get restacked onto the parent. Supports `--upstack`, `--downstack`, `--close` (close PR).
- `gt pop` — deletes current branch but keeps working tree changes.
- `gt insert` — not a standalone command, but `gt create --insert` inserts a new branch between current and its child.

## 3. Files and Code Sections

### `/Users/jacob/p/agent-skills/skills/graphite/SKILL.md`
- **Why important**: Contains the "Stack manipulation" command table. The subfile must go deeper without duplicating.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/squash-fold-split.md`
- **Why important**: Primary doc covering squash, fold, and split in detail with examples. This is the most important source doc for this subfile.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/edit-branch-order.md`
- **Why important**: Covers `gt reorder` and `gt move` for changing branch order in a stack.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/command-reference.md`
- **Why important**: Authoritative flag reference for `gt fold`, `gt split`, `gt squash`, `gt absorb`, `gt move`, `gt reorder`, `gt delete`, `gt pop`, `gt create --insert`.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/cheatsheet.md`
- **Why important**: "Reorganizing your stack" table — quick reference for the manipulation commands.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/comparing-git-and-gt.md`
- **Why important**: The "check pointing" section explains the fold pattern — using `gt create` as checkpoints then `gt fold` to consolidate before submitting.

### `/Users/jacob/p/agent-skills/skills/graphite/docs/how-to-structure-your-stacks.md`
- **Why important**: Provides context on *why* you'd restructure — the five frameworks. Mentions `gt split` for post-hoc splitting.

## 4. Problem Solving

No problems encountered. Key assumption: the subfile should focus on *decision guidance* — helping an agent recommend the right manipulation command for a given situation. A common failure mode is agents not knowing the difference between fold, squash, and absorb.

## 5. Pending Tasks

After this subfile is written:
- Update `SKILL.md` to add a reference directing agents to read `stack-manipulation.md` when relevant
- The other two subfiles (stack-lifecycle, syncing-conflicts) are handled by separate handoffs

## 6. Current Work

We created the `graphite` skill with a conceptual `SKILL.md` and downloaded all 90 Graphite docs into `docs/`. We then discussed grouping subfiles by topic and settled on three: stack lifecycle, stack manipulation, and syncing & conflicts.

## 7. Next Step

Write `skills/graphite/stack-manipulation.md`. Structure it as:

1. **Overview** — when and why you'd restructure a stack
2. **Decision guide** — "I want to X, which command?" table mapping intentions to commands:
   - Combine two branches → `gt fold`
   - Break one branch into several → `gt split`
   - Consolidate commits → `gt squash`
   - Distribute scattered changes to right branches → `gt absorb`
   - Change branch order → `gt reorder`
   - Move branch to different parent → `gt move`
   - Remove a branch entirely → `gt delete`
   - Remove branch but keep changes → `gt pop`
   - Insert a branch mid-stack → `gt create --insert`
3. **Each command in detail** — for each: purpose, key flags, before/after example, gotchas (e.g. fold doesn't close PRs, split needs to reuse branch name to keep PR attached)
4. **Patterns** — common multi-command patterns:
   - Checkpoint-then-fold workflow
   - Split-and-resubmit workflow
   - Absorb for scattered fixups

Read all the docs listed in §3, synthesize into a cohesive reference. After writing the subfile, update `SKILL.md`'s "Reference Documentation" section to include a pointer to it.

## 8. Bootstrap Context

**Check status**: N/A — this is documentation, not code.

### Files to Read
- `/Users/jacob/p/agent-skills/skills/graphite/SKILL.md` — understand existing coverage
- `/Users/jacob/p/agent-skills/skills/graphite/docs/squash-fold-split.md` — primary source for fold/split/squash
- `/Users/jacob/p/agent-skills/skills/graphite/docs/edit-branch-order.md` — reorder and move
- `/Users/jacob/p/agent-skills/skills/graphite/docs/command-reference.md` — authoritative flag reference
- `/Users/jacob/p/agent-skills/skills/graphite/docs/comparing-git-and-gt.md` — checkpoint-then-fold pattern

### Suggested Exploration
- `rg "gt fold" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning fold
- `rg "gt split" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning split
- `rg "gt absorb" /Users/jacob/p/agent-skills/skills/graphite/docs/` — find all docs mentioning absorb
