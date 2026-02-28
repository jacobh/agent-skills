# Stack Lifecycle

The daily Graphite loop: creating branches, modifying them, navigating stacks, viewing state, and submitting PRs. These are the commands used dozens of times a day. Each section covers the command patterns, important flags, and nuances an agent needs to help effectively.

## Creating Branches

### The `gt create` command

`gt create` (alias `gt c`) does four things in one step: stages changes, creates a new branch stacked on the current one, commits the staged changes, and checks out the new branch. This replaces the git workflow of `git checkout -b` → `git add` → `git commit`.

```bash
# Most common form: stage all + commit message
gt create -am "add user search endpoint"

# Stage specific files first, then create
gt add src/search.ts src/types.ts
gt create -m "add user search endpoint"

# Interactive hunk selection
gt create -p -m "add user search endpoint"

# Explicit branch name (overrides auto-generated name)
gt create -am "add search" my-search-branch

# AI-generated branch name and commit message
gt create -a --ai
```

### Key flags

| Flag | Purpose |
|------|---------|
| `-a, --all` | Stage all unstaged changes (including untracked files) before committing |
| `-u, --update` | Stage updates to tracked files only (excludes untracked) |
| `-m, --message` | Commit message. If omitted, opens editor |
| `-p, --patch` | Interactively pick hunks to stage |
| `-i, --insert` | Insert this branch between the current branch and its child (prompts if multiple children) |
| `--ai` | AI-generate branch name and commit message |
| `--no-ai` | Suppress AI generation (takes precedence over `--ai`) |

### Branch naming

When no explicit name is given, Graphite auto-generates one from the commit message. Configurable via `gt config`:

- **Custom prefix** — e.g. initials like `jb--` prepended to all auto-generated names
- **Date prefix** — optional date like `02-28-` prepended to the branch name
- **Character rules** — whether to allow slashes, uppercase letters
- **Replacement character** — what replaces unsupported symbols (default: underscore)

Example: with prefix `jb` and date enabled, `gt create -am "add search"` → branch `jb--02-28-add_search`.

### The one-branch-one-commit principle

Graphite treats branches as atomic changesets. What you'd split into multiple commits in git, you split into multiple branches in Graphite. Each branch = one commit = one PR. This is fundamental to the mental model:

- **Don't** create an empty branch then make commits on it
- **Do** make your changes first, then `gt create` to wrap them in a branch
- If you need checkpoints during development, use `gt create` for each checkpoint, then `gt fold` to merge them together before submitting

### Building a stack

Successive `gt create` calls build a stack. Each new branch stacks on whatever branch is currently checked out:

```bash
# Start from trunk
gt checkout --trunk

# Build a three-branch stack
gt create -am "add database migration"
gt create -am "add backend API endpoint"
gt create -am "add frontend search UI"

# View the result
gt log short
# ◉  02-28-add_frontend_search_UI
# ◯  02-28-add_backend_API_endpoint
# ◯  02-28-add_database_migration
# ◯  main
```

### Inserting into an existing stack

Use `--insert` to place a new branch between the current branch and its child, rather than on top of the stack:

```bash
gt checkout 02-28-add_database_migration
gt create -am "add database seed data" --insert
# New branch is now between migration and API endpoint
# Descendants are automatically restacked
```

## Modifying Branches

### The `gt modify` command

`gt modify` (alias `gt m`) updates the current branch's commit. By default it amends the existing commit. It automatically restacks all descendant branches after the modification.

```bash
# Amend staged changes into the current branch's commit
gt add src/fix.ts
gt modify

# Stage all + amend (most common)
gt modify -a

# Stage all + amend with updated message
gt modify -am "improved search endpoint"

# Open editor to update commit message (without changing files)
gt modify -e
```

### Amend vs new commit

By default, `gt modify` amends the single commit on the branch. Use `--commit` to create an additional commit instead:

```bash
# Amend (default) — maintains one-commit-per-branch
gt modify -a

# New commit — branch now has multiple commits
gt modify -cam "address review feedback"
```

The amend workflow is recommended to maintain the one-branch-one-commit principle. Use `--commit` when you want to preserve distinct change history within a branch, or use `gt squash` later to collapse multiple commits back to one.

### Amending into a downstack branch

`--into` lets you amend staged changes into a different branch further down the stack, without checking it out:

```bash
# You're on the frontend branch but need to fix the API branch
gt add src/api/fix.ts
gt modify --into 02-28-add_backend_API_endpoint
# Amends the API branch's commit, restacks everything above it
```

If no branch name is given with `--into`, an interactive selector opens.

### Interactive rebase

For complex edits to a branch's commit history:

```bash
gt modify --interactive-rebase
# Opens git interactive rebase on the commits in this branch
```

### Auto-restacking after modify

When you modify a mid-stack branch, Graphite automatically rebases all descendant branches onto the updated commit. If conflicts arise during restacking:

1. Graphite pauses and shows which branch has the conflict
2. Resolve the conflicts in your editor
3. `gt add .` to mark resolved
4. `gt continue` to resume restacking
5. Or `gt abort` to cancel the entire operation

### The `gt absorb` command

`gt absorb` (alias `gt ab`) is a smarter alternative to manually checking out branches and running `gt modify`. It automatically distributes staged hunks to the correct commits across your stack:

```bash
# Make fixes across multiple files that belong to different stack branches
gt absorb -a
# Graphite analyzes each hunk, finds the most recent commit it applies to,
# and amends it there. Prompts for confirmation before applying.

# Dry run to preview what would happen
gt absorb -a --dry-run

# Skip confirmation prompt
gt absorb -a --force
```

**How it works**: For each hunk, `gt absorb` walks down the stack looking for the first commit where the hunk cannot be cleanly "commuted" (reordered past). That commit is the one the hunk belongs to. Hunks that commute all the way to trunk are not absorbed — you must apply those manually.

**Key difference from `gt modify`**: `absorb` stages changes with `-a` but excludes untracked files (since file creations can't be attributed to an existing commit). Use `-p` (patch) for interactive hunk selection.

### Key modify/absorb flags

| Flag | `modify` | `absorb` | Purpose |
|------|----------|----------|---------|
| `-a, --all` | ✓ | ✓ | Stage all changes before operating |
| `-p, --patch` | ✓ | ✓ | Interactively pick hunks to stage |
| `-m, --message` | ✓ | — | Set/update commit message |
| `-c, --commit` | ✓ | — | Create new commit instead of amending |
| `-e, --edit` | ✓ | — | Open editor for commit message |
| `--into` | ✓ | — | Amend into a specific downstack branch |
| `-d, --dry-run` | — | ✓ | Preview without applying |
| `-f, --force` | — | ✓ | Skip confirmation prompt |

## Navigating Stacks

### Directional navigation

| Command | Alias | Action |
|---------|-------|--------|
| `gt up` | `gt u` | Move to the child branch (prompts if multiple children) |
| `gt down` | `gt d` | Move to the parent branch |
| `gt top` | `gt t` | Jump to the tip of the stack (prompts if ambiguous) |
| `gt bottom` | `gt b` | Jump to the base of the stack (first branch above trunk) |
| `gt up N` | `gt u N` | Move up N branches |
| `gt down N` | `gt d N` | Move down N branches |

`gt bottom` goes to the lowest branch in the stack, **not** trunk. To get to trunk: `gt checkout --trunk` or `gt checkout -t`.

When the stack forks (a branch has multiple children), `gt up` and `gt top` prompt for which path to follow. Use `gt up --to <target>` to select the path toward a specific branch without prompting.

### Checkout

```bash
# Checkout a specific branch by name
gt checkout my-branch
gt co my-branch

# Interactive selector (arrow keys + autocomplete)
gt co

# Show branches across all trunks
gt co --all

# Only show branches in current stack
gt co --stack
```

### Viewing stack state

Three forms of `gt log`:

| Command | Alias | Shows |
|---------|-------|-------|
| `gt log` | — | All tracked branches with PR status, commit info, timestamps |
| `gt log short` | `gt ls` | Branch names only, compact view |
| `gt log long` | `gt ll` | Full commit ancestry graph across all branches |

Useful `gt log` flags:

| Flag | Purpose |
|------|---------|
| `--stack` / `-s` | Only show ancestors and descendants of current branch |
| `--steps N` / `-n N` | Show N levels up and down from current branch (implies `--stack`) |
| `--reverse` / `-r` | Print log upside down (useful for tall stacks) |
| `--all` / `-a` | Show branches across all configured trunks |
| `--show-untracked` / `-u` | Include untracked branches |

### Other inspection commands

```bash
# Show current branch info, optionally with diff
gt info              # basic info
gt info --diff       # include diff against parent
gt info --stat       # diffstat summary
gt info --body       # show PR body

# Show parent/children
gt parent
gt children
```

## Submitting

### The `gt submit` command

`gt submit` pushes branches to the remote and creates or updates GitHub PRs. By default it submits the current branch and all its ancestors (down to trunk). It validates that branches are properly restacked before pushing.

```bash
# Submit current branch + ancestors
gt submit

# Submit entire stack (ancestors + descendants)
gt submit --stack    # alias: gt ss

# Only update branches that already have open PRs
gt submit --update-only    # alias with --stack: gt ss -u
```

### PR creation flow

When submitting a branch that doesn't have a PR yet, Graphite prompts for:
- **Title** — defaults to the commit message
- **Description** — opens editor (or web UI, depending on config)
- **Draft status** — draft or published

This behavior is configurable via `gt config` → Submit settings:
- **CLI vs web** — edit PR metadata in terminal or in browser
- **PR description source** — blank, from PR template, from commit message body, or both

### Key submit flags

| Flag | Short | Purpose |
|------|-------|---------|
| `--stack` | `-s` | Include descendant branches |
| `--draft` | `-d` | Create new PRs as drafts |
| `--publish` | `-p` | Publish all PRs being submitted |
| `--edit` | `-e` | Edit metadata for all PRs (not just new ones) |
| `--no-edit` | `-n` | Skip all PR field editing |
| `--reviewers` | `-r` | Set reviewers (comma-separated, or prompt if no arg) |
| `--team-reviewers` | `-t` | Set team reviewers by slug |
| `--merge-when-ready` | `-m` | Auto-merge PRs when all requirements are met |
| `--dry-run` | — | Preview what would be submitted without pushing |
| `--confirm` | `-c` | Show plan and ask for confirmation before pushing |
| `--update-only` | `-u` | Only push branches that already have open PRs |
| `--force` | `-f` | Force push (overwrite remote). Default is `--force-with-lease` |
| `--view` | `-v` | Open PR in browser after submitting |
| `--web` | `-w` | Open web editor for PR metadata |
| `--restack` | — | Restack before submitting (resolves simple drift) |
| `--comment` | — | Add a comment on the PR |
| `--always` | — | Push even if branch unchanged (fixes inconsistent Graphite web state) |
| `--ai` | — | AI-generate title and description for new PRs |

### Common submit patterns

```bash
# Quick submit entire stack, no prompts
gt submit --stack --no-edit

# Submit stack as drafts with reviewers
gt submit --stack --draft --reviewers "alice,bob"

# Submit and auto-merge when ready
gt submit --stack --merge-when-ready

# Preview what would happen
gt submit --stack --dry-run

# Re-push after modifying a mid-stack branch
gt checkout mid-stack-branch
gt modify -a
gt submit --stack    # pushes this branch AND all descendants

# Submit only changed branches that already have PRs
gt ss -u
```

### Important submit behaviors

- **Force-with-lease by default** — `gt submit` uses `--force-with-lease` to prevent overwriting remote changes you haven't seen. Use `--force` to override.
- **Blocks on remote drift** — if a branch has changed on remote since your last submit/get, Graphite blocks the push. Use `--force` to override.
- **Validates restacking** — submit fails if branches aren't properly restacked. Use `--restack` to auto-fix, or run `gt restack` first.
- **Submitting after mid-stack modify** — always use `--stack` when you've modified a branch with descendants, otherwise upstack PRs won't reflect the changes and their diffs on GitHub will be wrong.

## End-to-End Examples

### Example 1: Build and submit a feature stack

A typical flow for building a three-part feature from scratch:

```bash
# Start from trunk
gt checkout --trunk

# Part 1: database changes
# ... edit files ...
gt create -am "add search index to tasks table"

# Part 2: backend API
# ... edit files ...
gt create -am "add task search API endpoint"

# Part 3: frontend UI
# ... edit files ...
gt create -am "add search UI component"

# Review the stack
gt log short
# ◉  02-28-add_search_UI_component
# ◯  02-28-add_task_search_API_endpoint
# ◯  02-28-add_search_index_to_tasks_table
# ◯  main

# Submit entire stack, creating PRs for each branch
gt submit --stack --draft
# Creates 3 draft PRs, each showing only its incremental diff

# After review feedback, publish and set reviewers
gt submit --stack --publish --reviewers "alice,bob"
```

### Example 2: Respond to review feedback on a mid-stack branch

A reviewer requests changes to the API endpoint branch (middle of the stack):

```bash
# Navigate to the branch that needs changes
gt checkout 02-28-add_task_search_API_endpoint
# or: gt bottom → gt up

# Make the requested changes
# ... edit src/api/search.ts ...

# Amend the branch's commit (auto-restacks descendants)
gt modify -a

# Re-submit the entire stack so upstack PR diffs are correct
gt submit --stack
```

### Example 3: Continue building while awaiting review

Your stack is in review but you want to keep working on a related feature:

```bash
# Go to the top of your existing stack
gt top

# Stack more work on top
# ... implement profile search ...
gt create -am "add profile search endpoint"

# ... implement profile search UI ...
gt create -am "add profile search UI"

# Submit only the new branches
gt submit --stack

# Meanwhile, if review feedback comes in on a lower branch:
gt checkout 02-28-add_task_search_API_endpoint
# ... fix ...
gt modify -a
gt submit --stack    # re-pushes everything above this point too
```
