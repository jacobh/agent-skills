---
name: commit
description: Create git commits with well-crafted messages. Use when the user asks to commit changes, create a commit, or save their work to git. Analyzes staged/unstaged changes and recent commit history to generate appropriate commit messages.
---

# Git Commit

Perform a git commit by inspecting both uncommitted files and the diff of this branch to the base branch to determine an appropriate commit message.

## Process

Use subtasks to run the following git commands in parallel to gather information:
- `git status`
- `git diff`
- `git log`
- `git diff --cached`
- `git diff main...HEAD`

## Guidelines

- Lockfile changes (package-lock.json, yarn.lock, pnpm-lock.yaml, etc.) should not be considered for commit unless the human has manually staged the lockfile change
- Use the information from these parallel git operations to create an appropriate commit message
- Do not use `git -C <path>` - we are already in the correct repository
