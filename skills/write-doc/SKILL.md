---
name: write-doc
description: Write notes, plans, research, or documentation to a new dated file in docs/. Trigger phrases include "write up", "document this", "save to docs", "create a doc for".
---

# Write Doc

Writes content to a new markdown file with automatic date-prefixed naming.

## When to Use

Use this skill when the user wants to:
- Write up findings, notes, or research
- Document a plan or investigation
- Save conversation context to a file
- Create any markdown documentation

Trigger phrases: "write up", "document this", "save to docs", "create a doc for", "write to docs/"

## Process

### 1. Parse the request

Extract from the user's prompt:
- **Topic/title**: What the document is about
- **Content**: The actual information to write (may come from conversation context)
- **Path override**: If user specifies a different directory than `docs/`

### 2. Determine the output path

**Default behavior:**
1. Check if `docs/` directory exists in the current project
2. If yes, use `docs/` as the target directory
3. If no, ask the user where to write the file

**Filename format:** `yyyy-mm-dd_slug.md`
- Date is today's date
- Slug is derived from the topic (lowercase, hyphens, no special chars)
- Example: "Cherry Pick Conflicts" → `2026-01-30_cherry-pick-conflicts.md`

### 3. Generate the slug

Convert the topic to a filename-safe slug:
- Lowercase all characters
- Replace spaces with hyphens
- Remove special characters except hyphens
- Collapse multiple hyphens to single
- Trim hyphens from start/end
- Limit to ~50 characters for readability

Examples:
- "My Investigation Notes" → `my-investigation-notes`
- "Bug: Open PRs Have No Files" → `bug-open-prs-have-no-files`
- "Factory Randomization Plan" → `factory-randomization-plan`

### 4. Write the document

Structure is minimal - just a title header:

```markdown
# {Title}

{Content goes here}
```

The content should flow naturally based on what the user provided. Do NOT add artificial section scaffolding like "## Summary" or "## Next Steps" unless the content naturally warrants it.

**Content guidelines:**
- Use code blocks with language tags for code
- Use tables for comparisons or structured data
- Use `##` headers to organize longer content into logical sections
- Keep the voice consistent with what the user provided

### 5. Confirm to the user

After writing, tell the user:
- The full path of the created file
- A brief note that they can edit it further if needed

## Examples

**User:** "write up our discussion about the cherry-pick --no-commit behavior to docs"

**Action:**
1. Check `docs/` exists
2. Generate filename: `2026-01-30_cherry-pick-no-commit-behavior.md`
3. Write the document with content from the conversation
4. Confirm: "Written to docs/2026-01-30_cherry-pick-no-commit-behavior.md"

**User:** "document the factory randomization plan"

**Action:**
1. Check `docs/` exists
2. Generate filename: `2026-01-30_factory-randomization-plan.md`
3. Write the plan content
4. Confirm the path

**User:** "save these notes to notes/meeting.md"

**Action:**
1. User specified explicit path, use `notes/meeting.md` directly (no date prefix since they gave a specific name)
2. Write the content
3. Confirm the path
