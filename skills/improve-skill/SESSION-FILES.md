# Finding Claude Code Session Files on Disk

## When You Need This

When the user says things like:
- "improve skill based on that session" (referring to a past conversation)
- "look at the session where we did X"
- "find the session for branch Y"
- Any time you need to read back a previous Claude Code conversation transcript

## Storage Layout

```
~/.claude/
├── projects/
│   └── -Users-jacob-p-{project-name}/    # Path-encoded project directory
│       ├── sessions-index.json            # Master index of all sessions
│       ├── {session-uuid}.jsonl           # Individual session transcripts
│       └── {session-uuid}/
│           └── subagents/
│               └── agent-{id}.jsonl       # Subagent transcripts
├── debug/                                 # Debug logs (keyed by session UUID)
├── file-history/                          # File change history per session
├── history.jsonl                          # Global conversation history
├── session-env/                           # Session environment snapshots
├── todos/                                 # Todo/task tracker JSON files
└── plans/                                 # Plan markdown files
```

## Project Directory Encoding

The project path is encoded by replacing `/` with `-`:
- `/Users/jacob/p/eon-next-core` -> `-Users-jacob-p-eon-next-core`

So session files live at:
```
~/.claude/projects/-Users-jacob-p-{project-name}/
```

## Finding Sessions

### Step 1: Check the sessions index

```bash
cat ~/.claude/projects/-Users-jacob-p-{project-name}/sessions-index.json | python3 -m json.tool
```

The index maps session UUIDs to metadata including:
- `gitBranch` — the branch active during the session
- `firstPrompt` — the opening message
- `created` / `modified` — timestamps
- `messageCount` — number of messages

### Step 2: Filter by branch name

```bash
# Find sessions for a specific branch
python3 -c "
import json
with open('$HOME/.claude/projects/-Users-jacob-p-{project-name}/sessions-index.json') as f:
    idx = json.load(f)
for sid, meta in idx.items():
    if 'branch-name' in meta.get('gitBranch', ''):
        print(f\"{sid}  branch={meta.get('gitBranch')}  msgs={meta.get('messageCount')}  modified={meta.get('modified')}\")
"
```

### Step 3: If not in index (very recent sessions)

Recent/active sessions may not yet be indexed. Fall back to content search:

```bash
# Search JSONL files for a keyword (e.g. PR number, branch name)
rg "pr-27746" ~/.claude/projects/-Users-jacob-p-{project-name}/*.jsonl -l
```

Or find by modification time:

```bash
ls -lt ~/.claude/projects/-Users-jacob-p-{project-name}/*.jsonl | head -20
```

### Step 4: Read a session transcript

Session files are JSONL (one JSON object per line). Each line is a message in the conversation:

```bash
# Read full transcript
cat ~/.claude/projects/-Users-jacob-p-{project-name}/{session-uuid}.jsonl

# Preview first few messages
head -5 ~/.claude/projects/-Users-jacob-p-{project-name}/{session-uuid}.jsonl | python3 -m json.tool
```

## Notes

- Session JSONL files can be large (hundreds of KB to several MB for long sessions)
- Orchestrator/parent sessions that spawn subagents will have a subdirectory with subagent transcripts
- The `history.jsonl` at `~/.claude/history.jsonl` is a global log across all projects — useful for cross-project searches but very large
