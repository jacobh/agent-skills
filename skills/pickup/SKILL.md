---
name: pickup
description: Resume work from a previous handoff session. Use when the user says pickup, wants to continue previous work, or mentions a handoff file. Lists available handoffs from .claude/handoffs/ or loads a specific one to continue where the previous session left off.
---

# Pickup

Resumes work from a previous handoff session which are stored in `.claude/handoffs`.

The handoff folder might not exist if there are none.

Requested handoff file: `$ARGUMENTS`

## Process

### 1. Check handoff file

If no handoff file was provided, list them all. Eg:

```bash
echo "## Available Handoffs"
echo ""
for file in .claude/handoffs/*.md; do
  if [ -f "$file" ]; then
    title=$(grep -m 1 "^# " "$file" | sed 's/^# //')
    basename=$(basename "$file")
    echo "* \`$basename\`: $title"
  fi
done
echo ""
echo "To pickup a handoff, use: /pickup <filename>"
```

### 2. Read handoff file

If a handoff file was provided locate it in `.claude/handoffs` and read it. Note that this file might be misspelled or the user might have only partially listed it. If there are multiple matches, ask the user which one they want to continue with.

### 2.5. Gather Context

Before summarizing, check if the handoff has a "Bootstrap Context" section. If it does:

1. **Read the listed files** - Read each file listed under "Files to Read" to understand the relevant code
2. **Run suggested exploration** - If there are exploration suggestions, perform them to gather additional context (e.g., grep for patterns, review related files)

This ensures you have the full technical context before proposing next steps.

### 3. Summarize and propose first step

After reading the handoff file, **do NOT immediately start working**. Instead:

1. **Summarize your understanding** of the handoff in a brief paragraph (what was being worked on, current state, key context)

2. **Propose the first step** you would take, based on the handoff content

3. **Ask the user to confirm** before proceeding, or if they have something else in mind

Only proceed with work after the user confirms.
