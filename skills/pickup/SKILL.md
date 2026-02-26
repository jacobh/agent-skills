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

1. **Verify check status** — If the handoff mentions check/test suite status (e.g., "All checks pass"), note this. You'll verify it yourself before starting work.

2. **Check for related handoffs** — If the handoff mentions prerequisite or follow-up handoffs (e.g., "Follows: `2026-01-13-impl-get-unsynced-prs.md`"), read the related handoff(s) to understand the broader context and what was completed previously.

3. **Validate file paths** — Before reading files listed under "Files to Read," verify they exist. Handoffs sometimes contain stale or incorrect paths (e.g., missing `/ui/` segment, wrong `__tests__/` directory). If a file doesn't exist at the listed path:
   - Search for it by filename: `find . -name "filename.ts" -type f`
   - Report the correct path and proceed

4. **Read the listed files** — Read each file listed under "Files to Read" to understand the relevant code

5. **Run suggested exploration** — If there are exploration suggestions, perform them to gather additional context (e.g., grep for patterns, review related files)

If the handoff does NOT have a Bootstrap Context section (older handoffs may lack it):
- Extract implicit file references from the "Files and Code Sections" (§3) and "Next Step" (§7) sections
- Read the most important files mentioned there
- Run the project's check/test command to establish current state

### 3. Verify current state

Before proposing work, verify the actual state of the codebase:

1. **Run the check suite** — Run the project's check command (e.g., `bun run check -- --no-progress`) to see if things are green or if there are existing issues. This is especially important if the handoff was created days or weeks ago.

2. **Check for staleness** — If the handoff is old, the codebase may have changed. Look at recent git history for the files mentioned in the handoff:
   ```bash
   git log --oneline -5 -- path/to/relevant/file.ts
   ```
   If files have been modified since the handoff date, note this when summarizing.

3. **Verify code snippets** — If the handoff includes specific code at line numbers, spot-check that the code still looks as described. Don't assume line numbers are still accurate.

### 4. Summarize and propose first step

After reading the handoff file and gathering context, **do NOT immediately start working**. Instead:

1. **Summarize your understanding** of the handoff in a brief paragraph (what was being worked on, current state, key context)

2. **Flag any issues discovered** during context gathering:
   - Stale file paths that needed correction
   - Code that has changed since the handoff
   - Check suite failures not mentioned in the handoff
   - Speculative language in the handoff (e.g., "likely", "probably") that you've now verified or disproven

3. **Propose the first step** you would take, based on the handoff content. If the handoff's §7 (Next Step) contains:
   - **A clear, verified action** → propose it directly
   - **An unresolved design decision** → surface the decision to the user for input before proceeding
   - **Multiple unranked investigation paths** → propose the most promising one and explain why
   - **A premature handoff** (next step is trivially small) → just do it and propose what comes after

4. **Ask the user to confirm** before proceeding, or if they have something else in mind

Only proceed with work after the user confirms.
