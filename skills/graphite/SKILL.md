---
name: graphite
description: General Graphite knowledge and reference. Use when the user asks about Graphite concepts, stacking workflows, CLI commands, troubleshooting, or how Graphite differs from vanilla git. Not for specific actions like creating branches (use gt-create for that).
---

# Graphite

Graphite is a CLI tool and web platform for **stacked pull requests** on GitHub. It wraps git, adding branch dependency tracking that git lacks, and provides a web UI for reviewing, merging, and managing stacks.

## Core Concepts

### What is stacking?

Stacking means breaking a large change into a chain of small, dependent branches — each becoming its own PR. Instead of one 500-line PR, you create a stack of 5 PRs with ~100 lines each. Each PR is independently reviewable and mergeable.

```
main → db-schema → backend-api → frontend-ui → integration-tests
```

Each branch builds on the one below it. Reviewers see only the incremental diff for each PR, not the cumulative change.

### Why stacking matters

- **Stay unblocked**: Keep building on top of in-review code instead of waiting for merges
- **Faster reviews**: Small PRs get reviewed faster and with better feedback
- **Granular ownership**: Different reviewers for different parts of the stack
- **Safer merges**: Smaller changes = fewer conflicts, easier reverts
- **Continuous flow**: Trunk-based development with very short-lived branches

### Graphite's mental model vs git

Git has no concept of branch dependencies. If you rebase or modify a branch, its children don't know. You must manually track parent-child relationships and propagate changes.

Graphite tracks the **dependency graph** between branches. When you modify a mid-stack branch, `gt modify` automatically restacks all descendant branches. When trunk advances, `gt sync` pulls changes and restacks your entire stack. This dependency awareness is Graphite's core value — it automates the tedious rebase cascades that make manual stacking painful.

**Key difference**: In Graphite, each branch typically has **one commit** (not multiple commits on one branch like git workflows). What you'd split into commits in git, you split into branches in Graphite. Each branch = one atomic changeset = one PR.

### Vocabulary

| Term | Meaning |
|------|---------|
| **Stack** | A chain of dependent branches, each building on the last |
| **Trunk** | The main branch (e.g. `main`) — the root all stacks grow from |
| **Upstack** | Branches above the current one (depend on it) |
| **Downstack** | Branches below the current one (it depends on them) |
| **Restack** | Rebase branches so each sits on the current version of its parent |
| **Submit** | Push branches to remote and create/update GitHub PRs |
| **Fold** | Merge a branch into its parent (combine two stack levels) |
| **Absorb** | Intelligently distribute staged hunks to the right commits downstack |

## CLI Command Map

### The core loop

| What you're doing | Command | Short |
|---|---|---|
| Create a branch with staged changes | `gt create -am "msg"` | `gt c -am "msg"` |
| Amend changes to current branch | `gt modify -a` | `gt m -a` |
| Push branches & create/update PRs | `gt submit` | |
| Push entire stack | `gt submit --stack` | `gt ss` |
| Pull trunk, clean up merged branches, restack | `gt sync` | |

### Navigation

| What you're doing | Command | Short |
|---|---|---|
| Switch to a branch | `gt checkout <branch>` | `gt co` |
| Move up one branch | `gt up` | `gt u` |
| Move down one branch | `gt down` | `gt d` |
| Go to stack top | `gt top` | `gt t` |
| Go to stack bottom | `gt bottom` | `gt b` |
| View stack | `gt log` | |
| View branches only | `gt log short` | `gt ls` |

### Stack manipulation

| What you're doing | Command | Short |
|---|---|---|
| Restack branches onto updated parents | `gt restack` | |
| Move branch to a different parent | `gt move --onto <branch>` | |
| Fold branch into parent | `gt fold` | |
| Split branch into multiple | `gt split` | `gt sp` |
| Squash commits in branch to one | `gt squash` | `gt sq` |
| Reorder branches in stack | `gt reorder` | |
| Distribute staged hunks to right commits | `gt absorb` | `gt ab` |
| Delete branch, restack children onto parent | `gt delete` | |
| Remove branch, keep working tree | `gt pop` | |

### Collaboration

| What you're doing | Command |
|---|---|
| Fetch a teammate's stack | `gt get <branch>` |
| Freeze branch (prevent local edits) | `gt freeze` |
| Unfreeze branch | `gt unfreeze` |

### Recovery

| What you're doing | Command |
|---|---|
| Undo last Graphite mutation | `gt undo` |
| Abort current rebase | `gt abort` |
| Continue after resolving conflicts | `gt continue` |

## Common Workflows

### Modify a mid-stack branch

```bash
gt checkout <mid-stack-branch>
# make changes
gt modify -a                    # amend + auto-restack descendants
gt submit --stack               # push entire stack
```

### Sync with trunk after teammates merge

```bash
gt sync                         # pull trunk, delete merged branches, restack
gt submit --stack               # re-push if needed
```

### Resolve restack conflicts

```bash
gt restack
# resolve conflicts in editor
gt add .
gt continue
```

### Split a large branch

```bash
gt split --by-commit            # split at commit boundaries
gt split --by-hunk              # interactive hunk selection
gt split --by-file "*.json"     # extract files by pattern
```

### Collaborate on a shared stack

```bash
gt get <coworkers-branch>       # fetch their stack (frozen by default)
gt create -am "my addition"     # stack your work on top
gt submit --stack
```

## Structuring Stacks

Five frameworks for deciding how to split work into stacks:

1. **Functional component** — one PR per architectural layer (DB → backend → frontend → tests)
2. **Iterative improvement** — each PR improves on the last; submit as you go
3. **Refactor/change** — separate refactoring from the actual feature/fix
4. **Version bump/generated code** — isolate noisy boilerplate from meaningful changes
5. **Riskiness** — isolate risky changes for easy independent revert

## Reference Documentation

### Subfiles

Read these when the user needs deeper help on a specific topic:

- **`stack-lifecycle.md`** — creating branches, modifying them, navigating stacks, viewing state, and submitting PRs. Read when the user needs help with `gt create`, `gt modify`, `gt absorb`, `gt submit`, `gt log`, or stack navigation (`gt up/down/top/bottom/checkout`).
- **`syncing-conflicts.md`** — syncing with remote, restacking, and conflict resolution. Read when the user needs help with `gt sync`, `gt restack`, `gt continue`, `gt abort`, `gt undo`, phantom conflicts after squash-merge, the standard recovery sequence (`gt sync && gt restack && gt submit --stack`), `graphite-base/*` branches, or is stuck in a bad rebase state.
- **`stack-manipulation.md`** — reshaping stacks: fold, split, squash, absorb, reorder, move, delete, pop, insert. Decision guide, detailed flags, before/after examples, and multi-command patterns. Read when the user needs to restructure, combine, split, or reorder branches.

### Source documentation

Full Graphite documentation is available in the `docs/` directory relative to this skill:

- `docs/command-reference.md` — every command and flag
- `docs/cheatsheet.md` — quick reference tables
- `docs/comparing-git-and-gt.md` — git vs gt side-by-side
- `docs/troubleshooting.md` — common CLI issues
- `docs/faqs.md` — frequently asked questions
- `docs/configure-cli.md` — CLI configuration options

To refresh the docs, run `./fetch-docs.sh` from the skill directory.
