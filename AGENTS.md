# Agent Skills Repository

Single source of truth for agent configuration (skills, instructions, extensions)
that gets symlinked into agent-specific directories (`~/.claude`, `~/.pi/agent`, etc).

## Repository Structure

```
claude/              → ~/.claude/ (Claude Code)
  CLAUDE.md            agent instructions
  skills -> ../skills  shared skills symlink
pi/agent/            → ~/.pi/agent/ (pi)
  AGENTS.md            agent instructions
  agents/              subagent definitions
  extensions/          pi extensions
  skills -> ../../skills  shared skills symlink
skills/              shared skills (available to all agents)
install.sh           creates/verifies symlinks
```

## How It Works

- `claude/` and `pi/` mirror home directory structure
- `install.sh` symlinks each top-level child into the corresponding home dotdir
- Skills are shared: each agent dir contains a relative symlink back to `skills/`
- The script is idempotent — safe to re-run at any time
- It refuses to overwrite real files (only replaces existing symlinks)

## Commands

```bash
./install.sh           # create all symlinks
./install.sh --verify  # check symlinks are correct (no changes)
./install.sh --dry-run # show what would be done
```

## Adding a New Skill

Create a directory under `skills/` with a `SKILL.md`:

```
skills/my-skill/SKILL.md
```

Available to all agents automatically — no install changes needed.

## Adding Agent-Specific Config

Place files under the appropriate agent directory:

- Claude Code: `claude/`
- pi: `pi/agent/`

Run `./install.sh` after adding new top-level entries in those directories.

## Per-Agent Instructions

Each agent has its own instructions file (`claude/CLAUDE.md`, `pi/agent/AGENTS.md`).
These are maintained independently. When making changes, consider whether the change
is agent-specific or should be applied to all agents in lockstep.

## Important

- **Always edit files in this repo**, never directly in `~/.claude` or `~/.pi/agent`
- After structural changes (new top-level files/dirs), run `./install.sh`
- Adding files within already-symlinked directories (like new skills) needs no re-install
