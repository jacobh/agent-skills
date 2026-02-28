> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GT MCP

> Use the Graphite CLI with AI agents through Model Context Protocol

<Note>
  GT MCP is currently in beta and some workflows may not be fully supported.
</Note>

## Overview

GT MCP allows AI agents to automatically create stacked PRs, breaking down large AI-generated changes into smaller, reviewable stacked pull requests.

* With large AI-generated diffs, stacking is more essential than ever. Just like reviewing large human PRs, reviewing massive AI-generated diffs can be overwhelming, and makes it hard to understand what changes your agent has made.
* Stacking breaks AI output into clear, sequential chunks, so you can understand what's changing and why—earlier, faster, and in order. It helps your agent reason through changes chronologically, validating each step as it goes.

## Installation

GT MCP is built into the [Graphite CLI](/install-the-cli)!

<Note>Your `gt` CLI's version must be `1.6.7` or higher to use GT MCP. See how to update your CLI [here](/update-cli).</Note>

## Setup

### Cursor

[Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=Graphite\&config=eyJjb21tYW5kIjoiZ3QiLCJhcmdzIjpbIm1jcCJdfQ%3D%3D)

Or, to add it manually:

1. Open **Cursor Settings** → **Tools & Integrations** → **Add Custom MCP**
2. Paste:

```json  theme={null}
{
  "mcpServers": {
    "graphite": {
      "command": "gt",
      "args": ["mcp"]
    }
  }
}
```

### Claude Code

```bash Terminal theme={null}
claude mcp add graphite gt mcp
```
