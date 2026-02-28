> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Graphite Chat

> Chat with an AI-powered conversational assistant for pull request review and collaboration

With Graphite Chat, you can ask for context on code changes, get instant feedback, and make edits directly from the chat interface without leaving your review workflow.

<Note>
  The Graphite Chat panel is found on the right side of your PR review page.
  Simply type your question or request to get started.
</Note>

## What you can do with Graphite Chat

### Get PR summaries and context

Ask Graphite to explain what changed in a pull request, highlight potential issues, or provide context about specific code sections. Highlight specific lines in your PR diff to ask targeted questions about that code.

* *"Summarize the changes in this PR"*
* *"What are the main issues I should focus on?"*
* *"Explain what this function does"*
* *"What should I pay attention to while reviewing this?"*

### Make direct code edits

Ask for suggested fixes and apply them in one click right from the  review page.

* *"Fix the type error on line 42"*
* *"Add error handling to this function"*
* *"Optimize this database query"*
* *"Does this code have tests? If not, write them"*

### Search across your codebase

Find related files, understand dependencies, and get context from other PRs without switching tabs. Graphite has full context on your entire codebase and PR history.

* *"Where else is this API endpoint used?"*
* *"Show me similar implementations in the codebase"*
* *"How does this relate to PR #123?"*
* *"Does this follow our existing patterns?"*

### Address reviewer feedback

Get help understanding and implementing feedback from your teammates and reviewers.

* *"How should I address this comment?"*
* *"What are the tradeoffs of the approach my teammate suggested?"*
* *"Help me implement the changes requested in this review"*

### Debug CI failures

Diagnose and resolve failing checks directly from your PR page with full context from your CI results.

* *"Fix failing checks"*
* *"Why are the tests failing?"*
* *"How can I run this locally?"*

## How it works

Graphite Chat uses AI to analyze your code changes and provide contextual assistance. Unlike generic AI tools, Graphite has full awareness of your codebase, PR stack, CI failures, reviewer comments, and team coding patterns.

**What makes it different:**

* **Fully embedded**: Ask questions, get suggestions, apply edits, and commit without leaving your PR
* **Codebase-aware**: Understands your full codebase history, entire PR stack, and team conventions
* **Interactive editing**: Preview and apply changes directly to your PR with the built-in editor
* **Works for everyone**: Designed for both reviewers seeking context and authors making updates

All edits made with Graphite Chat are tracked in version control and can be reviewed like any other change.

## Editor

When Graphite suggests code changes, you can preview them in context before applying:

1. Click to open the **Editor**
2. Review suggested changes alongside your existing code
3. Make additional tweaks if needed
4. Apply changes directly to your PR
5. Commit and merge without switching to your IDE

## Privacy and security

Graphite Chat processes only the necessary code and metadata from your pull requests to provide contextual assistance. Your data is:

* **Not used for training**: Strict agreements prevent AI providers from training on your code
* **Minimally exposed**: Only relevant PR content is sent for analysis
* **Securely handled**: Protected by Graphite's enterprise security standards

*Graphite Chat is designed with the security of your data in mind. You can find more details in our [AI security and privacy](/ai-privacy-and-security) page.*
