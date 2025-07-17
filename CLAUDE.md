# Claude Code Instructions

## Search Tools

### Search Tools Usage
- **Use `rg` (ripgrep) as the primary search tool** for all searches in the codebase
- **NEVER use traditional `grep`** - always use `rg` when text search is needed
- **Prefer to use `rg` directly** instead of running `find` and then piping the result or using `-exec`
- `rg` is fast, supports regex, and works well with all file types including source code

## TypeScript Tools

### CRITICAL: NEVER Run tsc Against Specific Files
**ABSOLUTE RULE: You MUST NEVER run `tsc` with file paths. This is a critical error that breaks TypeScript's configuration system.**

#### Why This Is Critical:
- Running `tsc /path/to/file.ts` or `tsc --noEmit /path/to/file.ts` **IGNORES** the tsconfig.json
- This causes the TypeScript compiler to miss:
  - Project-wide type definitions
  - Module resolution settings
  - Path mappings and aliases
  - Bundling configurations
  - Compiler options from tsconfig.json
- **RESULT**: You will encounter floods of module import errors that don't actually exist in the project

#### Correct Usage:
- ✅ **CORRECT**: `tsc` (runs on entire project using tsconfig.json)
- ✅ **CORRECT**: `tsc --noEmit` (type-checks entire project without emitting files)
- ❌ **WRONG**: `tsc /path/to/file.ts` (NEVER do this)
- ❌ **WRONG**: `tsc --noEmit /path/to/file.ts` (NEVER do this)
- ❌ **WRONG**: `tsc src/components/Button.tsx` (NEVER do this)
- ❌ **WRONG**: Any form of `tsc` with a file path

#### Other TypeScript Rules:
- Always use `tsc` directly, never with `npx`
- Never use the `!` non-null assertion operator in TypeScript
- Always run `tsc` from the project root where tsconfig.json is located
- For type checking, ALWAYS use `tsc --noEmit` on the ENTIRE project
- When writing typescript, avoid using `any` and strive to use the correct, canonical types

## Commit Assistance
- when helping author commits, include no reference to claude or claude code
- always use the `-n` flag when comitting to skip checks
- never commit lockfiles (package-lock.json, yarn.lock, pnpm-lock.yaml, etc.) unless specifically requested
- exclude lockfiles from automatic staging when creating commits

## GitHub Tools
- when provided a github url under the amber electric org e.g. `https://github.com/amberelectric/amber-core/` you must use the github CLI to fetch any private information about the resource. you will not be able to read the public web page.

## NPM Tools
- never attempt to run `npm run bootstrap` - this has already been done

## Python Tools
- when working with python, unless a specific project specifies otherwise, always prefer using `uv` for tooling

## Task Tool Usage
- when using the `Task` tool, always strive to use tasks in parallel as much as possible
- avoid serial, sequential task processing - launch multiple independent tasks concurrently for better performance

## Communication Guidelines
- in instances of ambiguity, prefer to ask the human (me) questions rather than make assumptions. I'd rather we discuss and get it right

## Error Handling Style
- Avoid blanket try/catch blocks in code - they are too general and make it harder to trace issues
- Use surgical try/catches only where there are known possible issues and it's part of the business logic to handle a particular error
- Blanket try/catches may be acceptable at the top layer of a call tree when runtime constraints make it desirable, but this is a specific scenario, not a general rule