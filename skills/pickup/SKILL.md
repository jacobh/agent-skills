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

1. **Check for related handoffs** — If the handoff mentions prerequisite or follow-up handoffs (e.g., "Follows: `2026-01-13-impl-get-unsynced-prs.md`"), read the related handoff(s) to understand the broader context and what was completed previously.

2. **Validate file paths** — Before reading files listed under "Files to Read," verify they exist. Handoffs sometimes contain stale or incorrect paths (e.g., missing `/ui/` segment, wrong `__tests__/` directory). If a file doesn't exist at the listed path:
   - Search for it by filename: `find . -name "filename.ts" -type f`
   - Report the correct path and proceed

3. **Read the listed files** — Read each file listed under "Files to Read" to understand the relevant code

4. **Run suggested exploration** — If there are exploration suggestions, perform them to gather additional context (e.g., grep for patterns, review related files)

If the handoff does NOT have a Bootstrap Context section (older handoffs may lack it):
- Extract implicit file references from the "Files and Code Sections" (§3) and "Next Step" (§7) sections
- Read the most important files mentioned there

### 3. Verify current state

Before proposing work, verify the actual state of the codebase:

1. **Check for staleness** — If the handoff is old, the codebase may have changed. Look at recent git history for the files mentioned in the handoff:
   ```bash
   git log --oneline -5 -- path/to/relevant/file.ts
   ```
   If files have been modified since the handoff date, note this when summarizing.

2. **Verify code snippets** — If the handoff includes specific code at line numbers, spot-check that the code still looks as described. Don't assume line numbers are still accurate.

### 4. Summarize and propose first step

After reading the handoff file and gathering context, **do NOT immediately start working**. Instead:

1. **Summarize your understanding** of the handoff in a brief paragraph (what was being worked on, current state, key context)

2. **Flag any issues discovered** during context gathering:
   - Stale file paths that needed correction
   - Code that has changed since the handoff
   - Speculative language in the handoff (e.g., "likely", "probably") that you've now verified or disproven

3. **Propose the first step** you would take, based on the handoff content. If the handoff's §7 (Next Step) contains:
   - **A clear, verified action** → propose it directly
   - **An unresolved design decision** → surface the decision to the user for input before proceeding
   - **Multiple unranked investigation paths** → propose the most promising one and explain why
   - **A premature handoff** (next step is trivially small) → just do it and propose what comes after

4. **Ask the user to confirm** before proceeding, or if they have something else in mind

Only proceed with work after the user confirms.
