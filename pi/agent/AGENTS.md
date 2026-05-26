## Search Tools

### Search Tools Usage
- **Use `rg` (ripgrep) as the primary search tool** for all searches in the codebase

## File Manipulation
- Prefer `apply_patch` for precise file edits, especially multi-file edits; use `edit` only when `apply_patch` is not available or a direct exact replacement is simpler
- Prefer to use bash commands like `cp` and `mv` to move files around rather than reading a file and writing it manually

## TypeScript Tools

#### Other TypeScript Rules:
- Never use `npx` — use the project's package manager (bun, pnpm, etc.)
- For type checking, prefer project-defined scripts (e.g. `bun run typecheck`) over raw `tsc`
- If no script exists, run `tsc --noEmit` from the project root where tsconfig.json is located
- Never use the `!` non-null assertion operator in TypeScript
- When writing typescript, avoid using `any` and strive to use the correct, canonical types
- Minimise use of intersection types `&` instead prefer a compositional style

## Commit Assistance
- when helping author commits, include no reference to claude or claude code
- always use the `-n` flag when comitting to skip checks

## GitHub Tools
- when provided a github url under the amber electric org e.g. `https://github.com/amberelectric/amber-core/` you must use the github CLI to fetch any private information about the resource. you will not be able to read the public web page.

## NPM Tools
- never attempt to run `npm run bootstrap` - this has already been done

## Python Tools
- when working with python, unless a specific project specifies otherwise, always prefer using `uv` for tooling

## Communication Guidelines
- in instances of ambiguity, prefer to ask the human (me) questions rather than make assumptions. I'd rather we discuss and get it right
- Only make behavior configurable/optional when explicitly requested; otherwise replace the existing implementation with the requested implementation.

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
