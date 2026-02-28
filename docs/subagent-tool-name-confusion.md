# Subagent Tool-Name Confusion

**Date:** 2026-02-28
**Observed in:** Claude Code (pi agent harness)

## The Failure

When attempting to read 8 files in parallel, the agent constructed a `subagent` call with `"agent": "read"`:

```json
{
  "tasks": [
    { "agent": "read", "task": "Read the full contents of /path/to/file.ts" },
    ...
  ]
}
```

This failed with:

```
Unknown agent: "read". Available agents: "scout", "worker".
```

## Root Cause

The agent confused two different namespaces:

| Concept | Namespace | Examples |
|---------|-----------|----------|
| **Direct tools** | Tools the agent can invoke itself | `Read`, `Bash`, `Edit`, `Write`, `subagent` |
| **Subagent agents** | Named agent configs in `~/.pi/agent/agents/` | `scout`, `worker` |

The `Read` tool is a direct tool — it reads files. The `subagent` tool delegates to named agents like `scout` or `worker`. The agent populated the subagent's `agent` field with the direct tool name `"read"`, crossing the namespace boundary.

## Why This Happened

The system prompt describes available tools as:

> Available tools:
> - read: Read file contents
> - bash: Execute bash commands
> - ...

Then the `subagent` tool schema has an `agent` parameter described as:

> "Name of the agent to invoke (for single mode)"

The word "agent" vs "tool" distinction is subtle. When the agent wanted parallel file reads, it reached for `subagent` (the only tool with a `tasks` array for parallelism) and reflexively used the tool name `read` as the agent name.

## Contributing Factors

1. **Parallel execution desire**: The agent wanted to read 8 files concurrently. The `subagent` tool was the only one with explicit parallel task support, making it attractive.
2. **Name similarity**: The direct tool `read` and the concept of "reading files" are tightly coupled. When filling in `"agent": "???"`, `"read"` felt natural.
3. **No pre-flight validation**: The agent didn't check which agents were actually available before constructing the call. The available agents (`scout`, `worker`) are only revealed in the error message.

## Correct Approaches

### Option A: Direct parallel tool calls (preferred for simple reads)

Multiple `Read` tool invocations can be made in the same function-call block — they execute in parallel natively. No subagent needed. This is the right choice when the task is just "read N files."

### Option B: Use actual subagents for complex delegated work

Use `"agent": "scout"` for investigative/read-heavy tasks, or `"agent": "worker"` for tasks that involve changes. These are the real agent names, not tool names.

```json
{
  "tasks": [
    { "agent": "scout", "task": "Read and summarise /path/to/file.ts" },
    { "agent": "scout", "task": "Read and summarise /path/to/other.ts" }
  ]
}
```

## Lessons / Mitigation Ideas

1. **Agent instructions should emphasise**: direct tools and subagent names are different things. Consider adding a note like: "The `agent` field in subagent calls refers to named agent configurations (scout, worker), NOT to tool names (read, bash, edit, write)."
2. **Pre-flight listing**: The agent could run a quick check (e.g. `ls ~/.pi/agent/agents/`) to discover available agents before constructing subagent calls.
3. **Prefer direct tools for simple operations**: Subagents add overhead. For straightforward parallel reads, multiple direct `Read` calls in one block are simpler, faster, and avoid the namespace confusion entirely.
4. **Error message helps**: The error "Available agents: scout, worker" is good — it immediately reveals the valid options. But by that point a tool call has already been wasted.
