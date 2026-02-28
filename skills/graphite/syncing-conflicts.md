# Syncing & Conflict Resolution

Deep reference for synchronization and conflict resolution in Graphite. This is where users get stuck most often — understanding what happened, why there's a conflict, and how to recover.

## Overview

Stacked branches diverge from trunk as teammates merge PRs. **Syncing** brings your local repo up to date with remote and propagates those changes through your stacks. Two commands handle this:

- `gt sync` — the all-in-one sync: pulls trunk, cleans up merged branches, restacks everything it can
- `gt restack` — the targeted tool: ensures branches sit on the current version of their parents

Most of the time `gt sync` is all you need. You reach for `gt restack` when sync flags a branch it couldn't auto-restack, or when you've modified a mid-stack branch and need to propagate changes upward.

## `gt sync` in Detail

`gt sync` performs three steps in order:

### Step 1: Pull trunk from remote

Fast-forwards your local trunk (`main`) to match `origin/main`. If trunk can't be fast-forwarded (e.g. someone force-pushed), Graphite overwrites local trunk with the remote version.

### Step 2: Clean up merged/closed branches

Prompts you to delete local branches whose PRs have been merged or closed on GitHub. This keeps your branch list clean and prevents confusion from stale branches.

### Step 3: Restack all branches

Rebases every tracked branch onto the current version of its parent. Branches that can be restacked without conflicts are restacked silently. Branches that would hit conflicts are skipped and reported:

```
All branches restacked cleanly, except for:
▸ 09-14-part_4
You can fix these conflicts with gt restack.
```

You then check out the conflicting branch and run `gt restack` to resolve manually.

### Flags

| Flag | Effect |
|------|--------|
| `--all` / `-a` | Sync branches across all configured trunks (for multi-trunk repos) |
| `--force` / `-f` | Skip all confirmation prompts (delete branches, overwrite, etc.) |
| `--no-restack` | Pull trunk and clean up branches but skip step 3 entirely |

### Typical usage

```bash
gt sync                    # standard sync — do this frequently
gt sync --no-restack       # just pull trunk and clean up, don't rebase anything
gt sync --force            # non-interactive sync (useful in scripts)
gt sync --all              # sync across all trunks
```

## `gt restack` in Detail

`gt restack` ensures each branch in a stack has its parent's current commit in its git history, rebasing if necessary. This is the core operation that propagates changes through a stack.

### What it does at the git level

Consider a stack: `main → part_1 → part_2 → part_3`

After `part_1` is squash-merged into `main`, `git log` shows:

```
* ff393d3 - part 1 (#100) - (origin/main, main)        ← squash-merge commit
| * 7ebfd3f - part 3 - (part_3)
| * 6fe5a7c - part 2 - (part_2)
| * 4f3f756 - part 1                                    ← original commit, now obsolete
|/
```

`main` has advanced but `part_2` still sits on the old `part_1` commit. `gt restack` rebases `part_2` onto the new `main`, cutting out the obsolete `part_1` commit, then rebases `part_3` onto the new `part_2`:

```
* 543c8b3 - part 3 - (part_3)
* 778006d - part 2 - (part_2)
* ff393d3 - part 1 (#100) - (origin/main, main)
```

### Scoping flags

By default, `gt restack` restacks the **entire current stack**. Use scoping flags to limit it:

| Flag | Scope |
|------|-------|
| `--only` | Only the current branch |
| `--upstack` | Current branch and its descendants |
| `--downstack` | Current branch and its ancestors |
| `--branch <name>` | Run from a specific branch (without checking it out) |

### When to use restack independently

- **After `gt sync` reports conflicts**: check out the flagged branch, run `gt restack`, resolve
- **After `gt modify` on a mid-stack branch**: `gt modify` auto-restacks, but if you used raw git commands instead, run `gt restack` to propagate
- **After `gt move`**: moving a branch to a new parent may require restacking descendants
- **Targeted restack**: use `--only` or `--upstack` when you only need to fix part of a large stack

## Why Conflicts Happen

The most confusing scenario: you merge a PR cleanly on GitHub, but downstream branches suddenly show conflicts. This isn't a bug — it's an artifact of how squash-merge (and rebase-merge) work.

### The squash-merge phantom conflict

Here's the mechanic step by step:

1. **You have a stack**: `main → PR_A → PR_B → PR_C`
2. **PR_A gets squash-merged into main**: GitHub creates a **new commit** on `main` that contains all of PR_A's changes. This is a brand new SHA — it is *not* the same commit as the original PR_A commits.
3. **PR_B's base hasn't changed**: PR_B still points at the original PR_A commits. From git's perspective, the common ancestor of PR_B and `main` hasn't moved.
4. **GitHub sees a problem**: When it evaluates PR_B's mergeability, it sees that PR_B still "contains" the old PR_A commits. If PR_A and PR_B modified any of the same lines, GitHub reports a merge conflict — even though the changes are already on trunk.
5. **The conflict is a phantom**: You're not actually conflicting with new work. Git is just trying to replay already-merged history and getting confused.

### How Graphite resolves it

`gt sync` pulls the new trunk (with the squash-merge commit), then `gt restack` rebases PR_B onto the new `main`. During this rebase, Graphite cuts out the obsolete PR_A commits — the ones that were already squash-merged. The result is that PR_B sits cleanly on `main` with only its own changes.

If PR_A and PR_B touched the same lines, the rebase may still produce a real conflict that you need to resolve manually. But in most cases, the restack resolves it automatically.

### The same issue cascades

If you merge PR_A *and* PR_B, then PR_C has the same problem — it still points at old commits from both. `gt sync && gt restack` handles the entire cascade, resolving each branch in order from trunk upward.

## Resolving Conflicts

When `gt restack` (or `gt sync` during its restack phase) encounters a conflict, it drops you into an interactive rebase:

```
Hit conflict restacking part_2 on main.

You are here (resolving part_2):
◯ part_3
◉ part_2
◯ main

To fix and continue your previous Graphite command:
(1) resolve the listed merge conflicts
(2) mark them as resolved with gt add .
(3) run gt continue to continue executing your previous Graphite command
It's safe to cancel the ongoing rebase with `gt abort`
```

### Step-by-step resolution

```bash
# 1. Resolve conflicts in your editor (look for <<<<<<< markers)

# 2. Stage the resolved files
gt add .

# 3. Continue the restack (stages all remaining changes with -a)
gt continue
# or: gt continue -a    (stages everything before continuing)
```

Graphite then continues restacking any remaining branches in the stack.

### Escape hatches

#### `gt abort`

Aborts the current rebase and returns your branch to its pre-restack state. Safe to use at any point during conflict resolution.

```bash
gt abort              # prompts for confirmation
gt abort --force      # aborts immediately, no prompt
```

Use when:
- You realize the conflict is too complex to resolve right now
- You want to make changes to a lower branch before restacking
- Something went wrong and you want a clean slate

#### `gt undo`

Undoes the most recent Graphite mutation entirely. This is the nuclear option — it reverses the last `gt` command's effects.

```bash
gt undo               # prompts for confirmation
gt undo --force       # undoes immediately, no prompt
```

Use when:
- `gt abort` isn't available (the rebase already completed but the result is wrong)
- A restack produced incorrect results
- You accidentally deleted or modified a branch

**Important**: `gt undo` only undoes the *most recent* mutation. You can't undo multiple steps back.

## The Standard Recovery Sequence

When things go sideways — PRs show conflicts on GitHub, branches are out of date, diffs look wrong — this three-command sequence fixes most problems:

```bash
gt sync && gt restack && gt submit --stack
```

What each step does in this context:

1. **`gt sync`** — pulls latest trunk, deletes merged branches, restacks what it can
2. **`gt restack`** — resolves any remaining conflicts that sync couldn't auto-fix (you resolve manually with `gt add . && gt continue`)
3. **`gt submit --stack`** — force-pushes the restacked branches to remote, updating all PRs

This sequence is specifically recommended by Graphite when:
- `Merge (N)` fails on the web UI due to a rebase conflict
- PR diffs on GitHub don't match your local state
- You've been away and your stack is significantly behind trunk

After running this, go back to the affected PR in Graphite and retry the merge.

## `graphite-base/*` Branches

When you merge a stack of PRs through the Graphite web UI, Graphite automatically rebases the remaining upstack branches on remote. During this process, it creates temporary `graphite-base/*` branches for atomic retargeting — ensuring CODEOWNERS rules and GitHub Actions workflows don't misfire during the transition.

These branches are:
- **Temporary** — Graphite creates and deletes them as part of the merge process
- **Harmless** — they don't affect your local workflow
- **Noisy for CI** — if not filtered, they trigger unnecessary builds and can cause failures

### Ignoring in CI

Configure your GitHub Actions to skip these branches:

```yaml
on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches-ignore:
      - "**/graphite-base/**"
```

### If CI already failed

If your CI hasn't been configured to ignore these branches, you may see errors like:

```
Fetching base branch: refs/heads/graphite-base/*
fatal: couldn't find remote ref refs/heads/graphite-base/*
```

To fix: trigger a fresh CI run by running `gt sync && gt submit` (only works if sync fetches new commits that cause a restack). As a fallback, push a trivial change to the PR. The long-term fix is adding the YAML snippet above.

**Note**: The automatic rebase feature only works when merging from the Graphite web UI, not when merging directly from GitHub.

## Troubleshooting

### "I ran `gt sync` and it says branches couldn't be restacked"

This is normal. Check out each listed branch and run `gt restack` to resolve conflicts manually:

```bash
gt checkout <flagged-branch>
gt restack
# resolve conflicts → gt add . → gt continue
gt submit --stack
```

### "My PR diff on GitHub looks wrong / shows too many changes"

Your remote branches are out of sync with your local restacked state. Run:

```bash
gt submit --stack
```

If that doesn't fix it (because submit detects no local changes), use:

```bash
gt submit --stack --always
```

### "I'm stuck in a rebase and don't know what to do"

```bash
gt abort              # safely cancel and return to pre-rebase state
```

If you've already continued past the point of no return:

```bash
gt undo               # reverse the last Graphite operation
```

### "Graphite metadata seems corrupted"

Escalating options:

1. `gt dev cache --clear` — clears internal cache, doesn't change git or Graphite state
2. `gt untrack <branch>` + `gt track` — re-track specific problematic branches (may need manual `git rebase` first)
3. `gt init --reset` — nuclear option, deletes all Graphite metadata; all branches need re-tracking

### "I want to sync without rebasing anything"

```bash
gt sync --no-restack
```

This pulls trunk and cleans up merged branches but leaves your branch positions untouched. Useful when you want to see what changed on trunk before deciding to restack.

### "A coworker pushed changes to a branch I'm stacked on"

```bash
gt sync                        # pulls trunk changes
gt get <coworkers-branch>      # syncs their specific branch from remote
gt restack                     # propagates changes through your stack
gt submit --stack               # push your updated stack
```

### "I need to undo a sync/restack that went wrong"

```bash
gt undo                        # reverses the most recent gt operation
```

Only works for the single most recent mutation. If you need to go further back, you'll need to use `git reflog` to find and restore previous branch states manually.
