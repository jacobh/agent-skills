# Stack Manipulation

Reshaping a stack after initial creation — reordering, combining, splitting, and removing branches.

## When to Restructure

Stacks rarely stay in their original shape. Common triggers:

- A branch grew too large and needs splitting for review
- Two branches are logically one change and should be combined
- A reviewer asks you to reorder so a refactor lands before the feature
- Scattered fixup changes need distributing to the right branches
- A mid-stack branch is no longer needed
- You realize a branch belongs under a different parent

## Decision Guide

| I want to... | Command |
|---|---|
| Combine a branch into its parent | `gt fold` |
| Break one branch into several | `gt split` |
| Consolidate multiple commits into one | `gt squash` |
| Distribute staged hunks to the right downstack commits | `gt absorb` |
| Change the order of branches in my stack | `gt reorder` |
| Move a branch to a different parent | `gt move --onto <branch>` |
| Remove a branch entirely | `gt delete` |
| Remove a branch but keep the working tree changes | `gt pop` |
| Insert a new branch in the middle of a stack | `gt create --insert` |

## Commands in Detail

### `gt fold` — Combine branch into parent

Folds the current branch into its parent. The two branches become one, preserving all commit history from both. Children of the folded branch are reparented onto the combined branch.

**Key flags:**
- `--keep` (`-k`) — Use the current branch's name for the combined branch instead of the parent's name.

**Example:**

```
# Before:
#   main → first_branch → second_branch (current) → third_branch
#
# second_branch has changes that belong with first_branch

gt fold

# After:
#   main → first_branch (current, now contains both sets of changes) → third_branch
```

**Gotchas:**
- Fold does **not** close the GitHub PR for the folded branch. You must close it manually or delete the remote branch.
- After folding, the combined branch will have multiple commits. Run `gt squash` afterward if you want a single commit.
- By default the **parent's name** is kept. Use `--keep` if the current branch's name is the one with the open PR you want to preserve.

---

### `gt split` — Break branch into multiple

Splits the current branch into two or more branches. Three modes:

**Modes:**
- `--by-commit` (`-c`) — Split at commit boundaries. Choose which commits go into which branch. Best when you already have logically separate commits.
- `--by-hunk` (`-h`) — Interactive staging (like `git add --patch`). Stage hunks for each new branch one at a time. Best for splitting a single-commit branch.
- `--by-file` (`-f`) — Extract files matching a pathspec into a new parent branch. Repeatable for multiple patterns. The only mode that works non-interactively.

If the branch has one commit, hunk mode is used automatically. If multiple commits and no flag given, you're prompted to choose.

**Example — split by file:**

```
# Before:
#   main → feature (current, has both schema changes and API changes)

gt split --by-file "migrations/**"

# After:
#   main → schema-migrations → feature (current, now only has API changes)
```

**Example — split by commit:**

```
# Before:
#   main → big-branch (current, 4 commits)

gt split --by-commit

# Interactive editor opens — choose split points between commits
# After:
#   main → big-branch-part1 → big-branch-part2
```

**Gotchas:**
- GitHub PR branch names are **immutable**. If the branch being split already has an open PR, **reuse the original branch name** for one of the new branches to keep it attached to the existing PR and its review discussion.
- `--by-file` creates a new **parent** branch (the extracted files go downstack), not a child.

---

### `gt squash` — Consolidate commits

Squashes all commits on the current branch into a single commit. Restacks upstack branches afterward.

**Key flags:**
- `--message` (`-m`) — Set the commit message directly.
- `--edit` — Open an editor to modify the commit message.
- `--no-edit` (`-n`) — Keep the existing commit message as-is.

**Example:**

```
# Before:
#   feature (current)
#     commit 3: "fix typo"
#     commit 2: "add validation"
#     commit 1: "initial implementation"

gt squash -m "implement feature with validation"

# After:
#   feature (current)
#     commit 1: "implement feature with validation"
```

**When to use:**
- After `gt fold` — folding preserves all commits from both branches, so squash cleans up the history.
- After accidental `gt modify -c` — if you meant to amend but created a new commit instead.
- Before submitting — to keep each branch as a clean single commit (Graphite's convention).

---

### `gt absorb` — Distribute hunks to the right commits

Intelligently distributes staged hunks to the correct downstack commits. For each hunk, Graphite looks at which commit last touched those lines and amends the hunk into that commit — but **only** if the attribution is unambiguous. Hunks that can't be deterministically placed are left staged but not absorbed.

**Key flags:**
- `--all` (`-a`) — Stage all unstaged changes before absorbing. **Unlike `gt create -a`**, this does not include untracked (new) files, since file creations can never be absorbed into an existing commit.
- `--dry-run` (`-d`) — Print which commits each hunk would go to without actually absorbing.
- `--patch` (`-p`) — Interactively pick hunks to stage before absorbing.
- `--force` (`-f`) — Skip confirmation prompt.

**Example:**

```
# Stack: main → add-schema → add-api → add-ui (current)
# You've made fixes that touch code in both add-schema and add-api

gt add .
gt absorb

# Graphite inspects each hunk, finds the commit that last touched those lines,
# and amends the hunk into the right branch's commit.
# Restacks upstack branches afterward.
```

**When to use:**
- You've made scattered fixups across multiple files and want each fix to land in the branch that owns that code.
- Alternative to manually checking out each branch and running `gt modify`.

**Gotchas:**
- Only works for hunks that modify existing lines. New files and hunks touching lines from multiple commits are skipped.
- Always use `--dry-run` first if you're unsure where hunks will land.
- The `-a` flag only stages **tracked** files (unlike `gt create -a` which also stages untracked files).

---

### `gt reorder` — Reorder branches in stack

Opens an editor showing all branches between trunk and the current branch. Rearrange lines to reorder branches. You can also delete lines to remove branches from the stack.

**Example:**

```
# Before:
#   main → first → second → third (current)

gt reorder

# Editor opens:
#   third
#   second
#   first
#   # main (trunk, shown for orientation)

# Rearrange to:
#   second
#   third
#   first

# After:
#   main → second → third → first (current)
```

**Gotchas:**
- Only shows branches **downstack** of (and including) the current branch. Checkout the top of your stack first to reorder the entire stack.
- Performs restacks under the hood — may trigger merge conflicts.
- Deleting a line removes that branch from the stack (children restack onto its parent).

---

### `gt move` — Reparent a branch

Rebases the current branch (and all its descendants) onto a different parent branch.

**Key flags:**
- `--onto` (`-o`) — Target branch to move onto. If omitted, opens an interactive picker.
- `--source` — Branch to move (defaults to current branch).
- `--all` (`-a`) — Show branches across all trunks in interactive selection.

**Example:**

```
# Before:
#   main → feature-a → feature-b (current)
#   main → refactor

# feature-b actually depends on refactor, not feature-a
gt move --onto refactor

# After:
#   main → feature-a
#   main → refactor → feature-b (current)
```

**Gotchas:**
- All descendants of the moved branch come along — they're restacked onto the moved branch's new position.
- May trigger merge conflicts if the new parent has different content than the old parent.

---

### `gt delete` — Remove a branch

Deletes a branch and its Graphite metadata. Children are restacked onto the deleted branch's parent.

**Key flags:**
- `--force` (`-f`) — Delete even if the branch isn't merged or closed (skips confirmation).
- `--close` (`-c`) — Also close the associated GitHub PR.
- `--upstack` — Also delete all descendants.
- `--downstack` — Also delete all ancestors (between trunk and the branch).

**Example:**

```
# Before:
#   main → setup → feature → tests

gt checkout feature
gt delete

# After:
#   main → setup → tests
# "tests" is restacked onto "setup"
```

**Gotchas:**
- This is **local only** by default. The remote branch and PR are untouched unless you pass `--close`.
- If the branch has an open PR you want to close, either pass `--close` or close it manually on GitHub.

---

### `gt pop` — Remove branch, keep changes

Deletes the current branch but leaves all its changes in the working tree. Useful when you created a branch prematurely and want to rework the changes before recommitting.

**Example:**

```
# Before:
#   main → wip-branch (current, has some experimental changes)

gt pop

# After:
#   main (current, experimental changes still in working tree)
# You can now stage selectively and create a new, better-structured branch.
```

---

### `gt create --insert` — Insert branch mid-stack

Creates a new branch between the current branch and its child, automatically restacking the child onto the new branch.

**Example:**

```
# Before:
#   main → feature → tests

gt checkout feature
# Make changes for a new validation layer
gt create --all --insert --message "add-validation"

# After:
#   main → feature → add-validation (current) → tests
# "tests" has been restacked onto "add-validation"
```

**Gotchas:**
- If the current branch has multiple children, you'll be prompted to choose which one to restack onto the new branch.
- May trigger merge conflicts during the restack of the child branch.

## Patterns

### Checkpoint-then-fold

Use `gt create` as save points while developing, then consolidate before submitting. This gives you git-commit-style checkpointing without creating a PR for every checkpoint.

```bash
# Working on a feature, save progress as you go
gt create -am "initialize boilerplate"
gt create -am "fill out functions"
gt create -am "fix edge case"

# Before submitting, fold checkpoints into one branch
gt fold          # fold "fix edge case" into "fill out functions"
gt fold          # fold "fill out functions" into "initialize boilerplate"
gt squash -m "implement feature"
gt submit
```

### Split-and-resubmit

A reviewer asks you to pull out a refactor from your feature branch into its own PR.

```bash
gt checkout feature-branch

# Extract the refactor files into a new parent branch
gt split --by-file "src/refactored-module.*"
# Name the new branch "refactor" and keep "feature-branch" for the remainder

# Now: main → refactor → feature-branch
# The original PR stays attached to "feature-branch" (same name)
gt submit --stack
```

### Absorb for scattered fixups

You've been making fixes across your working tree that belong to different branches in your stack.

```bash
# You're at the top of your stack with scattered changes
gt add .
gt absorb --dry-run    # preview where hunks will land
gt absorb              # confirm and distribute

# Any hunks that couldn't be attributed stay staged
# Handle remaining hunks manually:
gt modify              # amend them into the current branch
# or
gt modify --into       # interactively pick which downstack branch to amend into
```
