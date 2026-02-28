# Claude Code Instructions

## Search Tools

### Search Tools Usage
- **Use `rg` (ripgrep) as the primary search tool** for all searches in the codebase
- **NEVER use traditional `grep`** - always use `rg` when text search is needed
- **Prefer to use `rg` directly** instead of running `find` and then piping the result or using `-exec`
- `rg` is fast, supports regex, and works well with all file types including source code

## File Manipulation
- Prefer to use bash commands like `cp` and `mv` to move files around rather than reading a file and writing it manually

## TypeScript Tools

#### Other TypeScript Rules:
- Always use `tsc` directly, never with `npx`
- Never use the `!` non-null assertion operator in TypeScript
- Always run `tsc` from the project root where tsconfig.json is located
- For type checking, ALWAYS use `tsc --noEmit` on the ENTIRE project
- When writing typescript, avoid using `any` and strive to use the correct, canonical types

## Commit Assistance
- when helping author commits, include no reference to claude or claude code
- always use the `-n` flag when comitting to skip checks

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
- use the `AskUserQuestion` tool liberally while discussing and planning - it helps structure the conversation and ensures we're aligned before proceeding

## Error Handling Style
- Avoid blanket try/catch blocks in code - they are too general and make it harder to trace issues
- Use surgical try/catches only where there are known possible issues and it's part of the business logic to handle a particular error
- Blanket try/catches may be acceptable at the top layer of a call tree when runtime constraints make it desirable, but this is a specific scenario, not a general rule

## Object-Oriented Design
- Prefer composition over inheritance as the default approach
- Use inheritance when it's genuinely the best fit for the problem, not dogmatically

## Functional Style
- Prefer functional patterns (map/filter/reduce) over imperative loops
- Favor immutable data and treating functions as a series of transforms
- Avoid mutating state in place; prefer returning new values

## Control Flow
- Use early returns / guard clauses to handle null/edge cases upfront
- Prefer pattern matching with exhaustive case handling when dealing with variants/unions
- Ensure all branches are explicitly covered rather than relying on default fallbacks

## Naming
- Invest time in finding canonical names for data types and concepts
- Names should reflect the domain accurately, not just describe implementation
- Prefer consistent terminology across the codebase for the same concept
- when writing repetitive typescript tests, prefer using .each