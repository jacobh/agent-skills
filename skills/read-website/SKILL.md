---
name: read-website
description: Read a web page as clean markdown using defuddle. Use when the user asks to read a URL, fetch documentation, look up a web page, or when you need to reference online content for the current task.
---

# Read Website

Read the content of a web page as clean markdown using defuddle.

Useful for reading documentation, references, blog posts, or any web content needed for the current task.

## Usage

```bash
bunx defuddle parse <url> --markdown
```

This fetches the page, extracts the main content (stripping navigation, ads, sidebars, footers), and outputs clean markdown to stdout.

## Guidelines

- Always use the `--markdown` flag to get readable markdown output
- Use this whenever you need to read a web page — docs, references, articles, READMEs, etc.
- Output goes to stdout; read it directly, no need to save to a file
- If the page is very large, focus on the parts relevant to the task at hand
