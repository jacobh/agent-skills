---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(gt create:*)
description: Create a Graphite branch with staged changes
---

## Background

Graphite is a CLI tool and web platform for managing stacked pull requests. It wraps git and provides commands like `gt create`, `gt submit`, and `gt sync` to make working with stacks of dependent PRs easier. Stacked PRs help break large changes into smaller, reviewable pieces while maintaining dependencies between them.

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits on this branch: !`git log --oneline -5`

## Your task

Create a new Graphite branch with the current changes using `gt create`.

1. First, stage all changes with `git add -A`
2. Then run `gt create` with the `--no-interactive` flag and a commit message

### Commit message guidelines

- Write a clear, concise commit message based on the staged changes
- First line should be a short summary (50 chars or less ideally)
- If more context is needed, include a body separated by a blank line

### Multiline commit messages

Use bash's `$'...'` syntax to embed literal newlines in the commit message. This properly interprets `\n` as actual newlines:

```bash
gt create --no-interactive -m $'Short summary of changes\n\nLonger explanation of why this change was made, any relevant context, etc.\n\n- Bullet points work too'
```

### Skipping hooks

To skip pre-commit hooks, use `--no-verify`. Note that Graphite uses `--no-verify`, not `-n` (which is what `git commit` uses).

### Command format

```bash
git add -A && gt create --no-interactive --no-verify -m $'summary\n\noptional body'
```

If the user provided specific instructions via `$ARGUMENTS`, incorporate them into the commit message. Otherwise, derive an appropriate message from the changes.

User instructions: $ARGUMENTS
