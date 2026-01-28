---
name: handoff
description: Create a detailed handoff document for continuing work in a new session. Use when the user says handoff, wants to save their progress, needs to continue later, or is ending a session with unfinished work. Writes a comprehensive summary to .claude/handoffs/ for pickup by a future agent.
---

# Handoff

Creates a detailed handoff plan of the conversation for continuing the work in a new session.

The user specified purpose:

<purpose>$ARGUMENTS</purpose>

You are creating a summary specifically so that it can be continued by another agent. For this to work you MUST have a purpose. If no specified purpose was provided in the `<purpose>...</purpose>` tag you must STOP IMMEDIATELY and ask the user what the purpose is.

Do not continue before asking for the purpose as you will otherwise not understand the instructions and do not assume a purpose!

## Goal

Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit purpose for the next steps.
This handoff plan should be thorough in capturing technical details, code patterns, and architectural decisions that will be essential for continuing development work without losing context.

## Process

Analyze the conversation internally (do not output analysis to chat). In your analysis:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like file names, full code snippets, function signatures, file edits, etc
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your plan should include the following sections:

1. **Primary Request and Intent**: Capture all of the user's explicit requests and intents in detail
2. **Key Technical Concepts**: List all important technical concepts, technologies, and frameworks discussed.
3. **Files and Code Sections**: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. **Problem Solving**: Document problems solved and any ongoing troubleshooting efforts.
5. **Pending Tasks**: Outline any pending tasks that you have explicitly been asked to work on.
6. **Current Work**: Describe in detail precisely what was being worked on immediately before this handoff request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
7. **Optional Next Step**: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this handoff request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
8. **Bootstrap Context**: Provide context to help the next agent get up to speed quickly:
   - **Files to Read**: List the most important files (with absolute paths) that the next agent should read first, with a brief reason for each
   - **Suggested Exploration** (optional): If helpful, suggest specific searches or areas to explore (e.g., "Search for `FunctionName` in `src/`")

Additionally create a "slug" for this handoff. The "slug" is how we will refer to it later in a few places. Examples:

* current-user-api-handler
* implement-auth
* fix-issue-42

Together with the slug create a "Readable Summary". Examples:

* Implement Current User API Handler
* Implement Authentication
* Fix Issue #42

## Output

**IMPORTANT: Do NOT output the full handoff plan to the chat.** Write directly to the file.

1. Do your analysis internally (use thinking/reasoning, not chat output)
2. Write the handoff document directly to `.claude/handoffs/[timestamp]-[slug].md` where `[timestamp]` is the current date in format `YYYY-MM-DD`
3. After writing the file, provide only a brief summary to the user (2-3 sentences max) confirming the handoff was created

### Handoff File Structure

The markdown file you write should follow this structure:

```markdown
# [Readable Summary]

## 1. Primary Request and Intent
[Detailed description of all user requests and intents]

## 2. Key Technical Concepts
- [Concept 1]
- [Concept 2]
- [...]

## 3. Files and Code Sections
### [File Name 1]
- **Why important**: [Summary of why this file is important]
- **Changes made**: [Summary of the changes made to this file, if any]
- **Code snippet**:
\`\`\`language
[Important Code Snippet]
\`\`\`

### [File Name 2]
...

## 4. Problem Solving
[Description of solved problems and ongoing troubleshooting]

## 5. Pending Tasks
[Any pending tasks explicitly requested]

## 6. Current Work
[What was being worked on immediately before handoff]

## 7. Next Step
[Required next step, directly aligned with user's explicit handoff purpose]

## 8. Bootstrap Context
### Files to Read
[List the most important files the next agent should read first, with brief reasons]
- `/path/to/file.ts` - [why this file matters]

### Suggested Exploration (optional)
[If helpful, suggest specific searches or areas to explore]
- Search for `PatternName` in `src/`
- Review the test files in `path/to/tests/`
```

### User Confirmation

After writing the file, tell the user:
- The filename that was created
- That they can use `/pickup FILENAME` to continue
