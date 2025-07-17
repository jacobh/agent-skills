# Claude Code Instructions

## Search Tools

### CRITICAL: ast-grep is MANDATORY for Code Search
**You MUST use `ast-grep` for ANY search in source code files. Using `rg` or `grep` for code searches is a violation of these instructions.**

### ast-grep Usage (REQUIRED for all code searches)
- **ALWAYS use ast-grep FIRST** when searching in any source code file
- ast-grep uses Abstract Syntax Trees (AST) to find code patterns semantically, not just text matching
- **Supported file extensions where ast-grep MUST be used:**
  - JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`
  - Python: `.py`
  - Rust: `.rs`
  - Go: `.go`
  - Java: `.java`
  - C/C++: `.c`, `.cpp`, `.h`, `.hpp`
  - Any other programming language files

### ast-grep Pattern Examples (use these patterns):
- **Function calls**: `ast-grep -p '$FUNC($$$ARGS)'`
- **Specific function**: `ast-grep -p 'console.log($MSG)'`
- **Method calls**: `ast-grep -p '$OBJECT.$METHOD($$$ARGS)'`
- **Variable declarations**: `ast-grep -p 'const $VAR = $VALUE'` or `ast-grep -p 'let $VAR = $VALUE'`
- **Import statements**: `ast-grep -p "import { $$$IMPORTS } from '$MODULE'"`
- **Class definitions**: `ast-grep -p 'class $CLASS { $$$BODY }'`
- **If statements**: `ast-grep -p 'if ($CONDITION) { $$$THEN }'`
- **Function definitions**: `ast-grep -p 'function $NAME($$$PARAMS) { $$$BODY }'`
- **Arrow functions**: `ast-grep -p '($$$PARAMS) => $BODY'`
- **Try-catch blocks**: `ast-grep -p 'try { $$$TRY } catch ($ERR) { $$$CATCH }'`
- **Type definitions**: `ast-grep -p 'type $TYPE = $$$BODY'`

### ast-grep Best Practices (IMPORTANT)
- **NEVER pipe ast-grep output to grep/rg** - this is an anti-pattern that defeats the purpose of AST-based search
- **Avoid overly generic searches** - don't search for all imports then filter; search for the specific import directly
- **Use specific patterns**:
  - ❌ BAD: `ast-grep -p "import { $$$IMPORTS } from '$MODULE'" | grep MyComponent`
  - ❌ BAD: `ast-grep -p 'type $TYPE = $$$BODY' | grep -A 10 -B 2 -i channel`
  - ✅ GOOD: `ast-grep -p "import { MyComponent } from '$MODULE'"`
  - ✅ GOOD: `ast-grep -p "import { $$$IMPORTS } from 'my-module'"`
  - ✅ GOOD: `ast-grep -p 'type Channel = $$$BODY'` (search for specific type name directly)
- **Be precise with your patterns** - ast-grep is designed to find exactly what you're looking for using AST semantics
- **If you need to find a specific import/function/variable, include that specificity in the ast-grep pattern itself**

### rg Usage (ONLY for these specific cases):
- **ONLY use `rg` for:**
  - Non-code files: `.md`, `.txt`, `.json`, `.yaml`, `.yml`, `.toml`, `.xml`, `.html`, `.css`
  - Searching within comments in code files
  - Searching for string literals
  - When ast-grep explicitly fails or returns an error
  - Configuration files and documentation
- **NEVER use `rg` as a first choice for code search**
- **NEVER use traditional `grep` - always use `rg` when text search is absolutely necessary**
- **Prefer to use `rg` or `grep` directly instead of running `find` and then piping the result or using `-exec`**

### Search Priority Order:
1. **ast-grep** - MANDATORY for all code searches
2. **rg** - ONLY for non-code files or when ast-grep fails
3. **grep** - NEVER use

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