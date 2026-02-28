> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Command Reference

> This reference documents every command and flag available in Graphite’s command-line interface.

Follow the [installation guide](/install-the-cli) to set up the Graphite CLI.

## Global flags

`--help`Show help for a command.

`--allCommands`This is not printed with the global help, but if passed to `gt --help --all`, will print out the full list of command help.

`--cwd`Working directory in which to perform operations.

`--debug`Write debug output to the terminal.

`--interactive`Enable interactive features like prompts, pagers, and editors. Enabled by default. Disable with `--no-interactive`.

`--verify`Enable git hooks. Enabled by default. Disable with `--no-verify`.

`--quiet`Minimize output to the terminal. Implies `--no-interactive`.

## Available commands

### `gt abort`

Aborts the current Graphite command halted by a rebase conflict.

#### flags

`-f, --force`Do not prompt for confirmation; abort immediately.

### `gt absorb`

Amend staged changes to the relevant commits in the current stack. Relevance is calculated by checking the changes in each commit downstack from the current commit, and finding the first commit that each staged hunk (consecutive lines of changes) can be applied to deterministically. If there is no clear commit to absorb a hunk into, it will not be absorbed. Prompts for confirmation before amending the commits, and restacks the branches upstack of the current branch.

#### flags

`-a, --all`Stage all unstaged changes before absorbing. Unlike create and modify, this will not include untracked files, as file creations would never be absorbed.

`-d, --dry-run`Print which commits the hunks would be absorbed into, but do not actually absorb them.

`-f, --force`Do not prompt for confirmation; apply the hunks to the commits immediately.

`-p, --patch`Pick hunks to stage before absorbing.

### `gt add [args..]`

git add passthrough

#### arguments

`[args] (optional)`git add arguments

### `gt aliases`

Edit your command aliases.

#### flags

`--legacy`Append legacy aliases to your configuration. See [https://graphite.com/docs/legacy-alias-preset](https://graphite.com/docs/legacy-alias-preset) for more details.

`--reset`Reset your alias configuration.

### `gt auth`

Add your auth token to enable Graphite CLI to create and update your PRs on GitHub.

#### flags

`-t, --token`Auth token. Get it from: [https://app.graphite.com/activate](https://app.graphite.com/activate)

### `gt bottom`

Switch to the branch closest to trunk in the current stack.

### `gt changelog`

Show the Graphite CLI changelog.

### `gt checkout [branch]`

Switch to a branch. If no branch is provided, opens an interactive selector.

#### arguments

`[branch] (optional)`The branch to checkout.

#### flags

`-a, --all`Show branches across all configured trunks in interactive selection.

`-u, --show-untracked`Include untracked branches in interactive selection.

`-s, --stack`Only show ancestors and descendants of the current branch in interactive selection.

`-t, --trunk`Checkout the current trunk.

### `gt cherry-pick [args..]`

git cherry-pick passthrough

#### arguments

`[args] (optional)`git cherry-pick arguments

### `gt children`

Show the children of the current branch.

### `gt completion`

Set up `bash` or `zsh` tab completion.

### `gt config`

Configure the Graphite CLI.

### `gt continue`

Continues the most recent Graphite command halted by a rebase conflict.

#### flags

`-a, --all`Stage all changes before continuing.

### `gt create [name]`

Create a new branch stacked on top of the current branch and commit staged changes. If no branch name is specified, generate a branch name from the commit message. If your working directory contains no changes, an empty branch will be created. If you have any unstaged changes, you will be asked whether you'd like to stage them.

#### arguments

`[name] (optional)`The name of the new branch.

#### flags

`--ai`Automatically AI-generate the branch name and the commit message (if unset)

`-a, --all`Stage all unstaged changes before creating the branch, including to untracked files.

`-i, --insert`Insert this branch between the current branch and its child. If there are multiple children, prompts you to select which should be moved onto the new branch.

`-m, --message`Specify a commit message.

`--no-ai`Do not automatically AI-generate the branch name and the commit message. Takes precedence over --ai.

`-p, --patch`Pick hunks to stage before committing.

`-u, --update`Stage all updates to tracked files before creating the branch.

`-v, --verbose`Show unified diff between the HEAD commit and what would be committed at the bottom of the commit message template. If specified twice, show in addition the unified diff between what would be committed and the worktree files, i.e. the unstaged changes to tracked files.

### `gt dash`

Opens your Graphite dashboard.

### `gt delete [name]`

Delete a branch and its Graphite metadata (local-only). Children will be restacked onto the parent branch. If the branch is not merged or closed, prompts for confirmation. This command does not perform any action on GitHub or the remote repository. If you delete a branch with an open pull request, you will need to manually close the pull request.

#### arguments

`[name] (optional)`The name of the branch to delete. If no branch is provided, opens an interactive selector.

#### flags

`-c, --close`Close associated pull requests on GitHub.

`--downstack`Also delete any ancestors of the specified branch.

`-f, --force`Delete the branch even if it is not merged or closed.

`--upstack`Also delete any children of the specified branch.

### `gt demo [demoName]`

Run interactive demos in any repo to learn how to use the Graphite CLI. This will teach you how to create pull requests & stacks with Graphite.

Usage:

1. gt demo pull-request: Learn how to create a PR
2. gt demo stack: Learn how to create a stack of PRs

#### arguments

`[demoName] (optional)`Demo to run

### `gt docs`

Show the Graphite CLI docs.

### `gt down [steps]`

Switch to the parent of the current branch.

#### flags

`-n, --steps`The number of levels to traverse downstack.

### `gt feedback [message]`

Post a string directly to the maintainers' Slack so they can drown in praise, factor in your feedback, laugh at your jokes, cry at your insults, or fall victim to Slack injection attacks.

#### arguments

`[message] (optional)`Positive or constructive feedback for the Graphite team! Jokes are chill too.

#### flags

`-d, --with-debug-context`Include logs from the past 24 hours in your feedback. This can help us understand what's going on in your repo.

### `gt fish`

Set up `fish` tab completion.

### `gt fold`

Fold a branch's changes into its parent, update dependencies of descendants of the new combined branch, and restack. This is useful when you have a branch that is no longer needed and you want to combine its changes with its parent branch. This command does not perform any action on GitHub or the remote repository. If you fold a branch with an open pull request, you will need to manually close the pull request.

#### flags

`-k, --keep`Keeps the name of the current branch instead of using the name of its parent.

### `gt freeze [branch]`

Freeze specified branch and branches downstack of it. Freezing a branch prevents local modifications to the branch including any restacks. You can still sync remote changes to the branch with `gt sync` or `gt get`. You can also build PRs on top of a frozen branch. Freezing can be useful when you want to stack on top of someone else's PRs without making any changes to them. This operation can be undone with `gt unfreeze`.

#### arguments

`[branch] (optional)`The branch to freeze. Defaults to the current branch.

### `gt get [branch]`

For a given branch or PR number, sync branches from trunk to the given branch from remote, prompting the user to resolve any conflicts. If the branch passed to get already exists locally, any local branches upstack of the branch are also synced; to opt out of this behavior, use the --downstack flag. Note that remote-only branches upstack of the branch are not synced by default; to do so, pass the --remote-upstack (-u) flag. If no branch is provided, sync the current stack.

#### arguments

`[branch] (optional)`Branch or PR number to get from remote.

#### flags

`-d, --downstack`When syncing a branch that already exists locally, don't sync upstack branches.

`-f, --force`Overwrite all fetched branches with remote source of truth

`--restack`Restack any branches in the stack that can be restacked without conflicts (true by default; skip with --no-restack).

`-U, --unfrozen`Checkout new branches as unfrozen (allow local edits)

`-u, --remote-upstack`Include upstack PRs when fetching PR information from remote

### `gt guide [title]`

Read extended guides on how to use the gt program.

### `gt info [branch]`

Display information about the current branch.

#### arguments

`[branch] (optional)`The branch to show info for. Defaults to the current branch.

#### flags

`-b, --body`Show the PR body, if it exists.

`-d, --diff`Show the diff between this branch and its parent. Takes precedence over patch.

`-p, --patch`Show the changes made by each commit.

`-s, --stat`Show a diffstat instead of a full diff. Modifies either --patch or --diff. If neither is passed, implies --diff.

### `gt init`

Initialize Graphite in this repository by selecting a trunk branch. Can also be used to change the trunk branch of the repository.

#### flags

`--reset`Untrack all branches.

`--trunk`The name of your trunk branch. If no name is passed, you will be prompted to select one interactively.

### `gt log [command]`

Commands that log your stacks.

Has three forms, `gt log`, `gt log short`, and `gt log long`.

* `gt log long` ignores all options and displays a graph of the commit ancestry of all branches.
* `gt log` and `gt log short` display all tracked branches and their dependency relationships.

The difference between the latter two is that `gt log` displays more information about each branch.

`gt ls` and `gt ll` are default aliases for `gt log short` and `gt log long` respectively.

#### arguments

`[command] (optional)`The format to use. If not provided, `gt log` is assumed.

#### flags

`-a, --all`Show branches across all configured trunks.

`--classic`Use the old short logging style, which runs out of screen real estate more quickly. Other options will not work in classic mode.

`-r, --reverse`Print the log upside down. Handy when you have a lot of branches!

`-u, --show-untracked`Include untracked branched in the log.

`-s, --stack`Only show ancestors and descendants of the current branch.

`-n, --steps`Only show this many levels upstack and downstack. Implies --stack.

### `gt merge`

Merge the pull requests associated with all branches from trunk to the current branch via Graphite.

#### flags

`-c, --confirm`Asks for confirmation before merging branches. Prompts for confirmation if the local branches differ from remote, regardless of the value of this flag.

`--dry-run`Reports the PRs that would be merged and terminates. No branches are merged.

### `gt modify`

Modify the current branch by amending its commit or creating a new commit. Automatically restacks descendants. If you have any unstaged changes, you will be asked whether you'd like to stage them.

#### flags

`-a, --all`Stage all changes before committing.

`-c, --commit`Create a new commit instead of amending the current commit. If this branch has no commits, this command always creates a new commit.

`-e, --edit`If passed, open an editor to edit the commit message. When creating a new commit, this flag is ignored.

`--interactive-rebase`Ignore all other flags and start a git interactive rebase on the commits in this branch.

`--into`Amend staged changes to the specified downstack branch. If no branch is provided, you will be prompted to select a branch.

`-m, --message`The message for the new or amended commit. If passed, no editor is opened.

`-p, --patch`Pick hunks to stage before committing.

`--reset-author`Set the author of the commit to the current user if amending.

`-u, --update`Stage all updates to tracked files before committing.

`-v, --verbose`Show unified diff between the HEAD commit and what would be committed at the bottom of the commit message template. If specified twice, show in addition the unified diff between what would be committed and the worktree files, i.e. the unstaged changes to tracked files.

### `gt move`

Rebase the current branch onto the target branch and restack all of its descendants. If no branch is passed in, opens an interactive selector.

#### flags

`-a, --all`Show branches across all configured trunks in interactive selection.

`-o, --onto`Branch to move the current branch onto.

`--source`Branch to move (defaults to current branch).

### `gt parent`

Show the parent of the current branch.

### `gt pop`

Delete the current branch but retain the state of files in the working tree.

### `gt pr [branch]`

Opens the pull request page for a branch or PR number. If no branch is passed, the current branch's PR is opened.

#### arguments

`[branch] (optional)`A branch name or PR number to open.

#### flags

`--stack`Open the stack page.

### `gt rebase [args..]`

git rebase passthrough

#### arguments

`[args] (optional)`git rebase arguments

### `gt rename [name]`

Rename a branch and update metadata referencing it. If no branch name is supplied, you will be prompted for a new branch name. Note that this removes any association to a pull request, as GitHub pull request branch names are immutable.

#### arguments

`[name] (optional)`The new name for the current branch.

#### flags

`-f, --force`Allow renaming a branch that is already associated with an open GitHub pull request.

### `gt reorder`

Reorder branches between trunk and the current branch, restacking all of their descendants. Opens an editor where you can reorder branches by moving around a line corresponding to each branch.

### `gt reset [args..]`

git reset passthrough

#### arguments

`[args] (optional)`git reset arguments

### `gt restack`

Ensure each branch in the current stack has its parent in its Git commit history, rebasing if necessary. If conflicts are encountered, you will be prompted to resolve them via an interactive Git rebase.

#### flags

`--branch`Which branch to run this command from. Defaults to the current branch.

`--downstack`Only restack this branch and its ancestors.

`--only`Only restack this branch.

`--upstack`Only restack this branch and its descendants.

### `gt restore [args..]`

git restore passthrough

#### arguments

`[args] (optional)`git restore arguments

### `gt revert [sha]`

Create a branch that reverts a commit on the trunk branch. Currently experimental.

#### arguments

`[sha]`The commit to revert.

#### flags

`-e, --edit`Edit the commit message.

### `gt split`

Split the current branch into multiple branches.

Has three forms: `gt split --by-commit`, `gt split --by-hunk`, and `gt split --by-file <pathspec>`.

* `gt split --by-commit` slices up the commit history, allowing you to select split points between existing commits.
* `gt split --by-hunk` interactively stages changes to create new single-commit branches.
* `gt split --by-file <pathspec>` extracts files matching the pathspec and splits them into a new parent branch. Repeat the flag for multiple patterns (e.g., `gt split -f "*.json" -f "*.yaml"`).

All forms must be run interactively except for `--by-file` which can run non-interactively.
`gt split` without options will prompt for a splitting strategy.

`gt sp` is an alias for `gt split`.

#### flags

`-c, --commit, --by-commit`Split by commit - slice up the history of this branch.

`-f, --file, --by-file`Split by file - takes a pathspec and splits any matching files into a new parent branch. Repeat the flag for multiple patterns.

`-h, --hunk, --by-hunk`Split by hunk - split into new single-commit branches.

### `gt squash`

Squash all commits in the current branch into a single commit and restack upstack branches.

#### flags

`--edit`Modify the existing commit message.

`-m, --message`The updated message for the commit.

`-n, --no-edit`Don't modify the existing commit message. Takes precedence over --edit

### `gt submit`

Idempotently force push all branches in the current stack from trunk to the current branch to GitHub, creating or updating distinct pull requests for each. Validates that branches are properly restacked before submitting, and fails if there are conflicts. Blocks force pushes to branches that overwrite branches that have changed since you last submitted or got them. Opens an interactive prompt that allows you to input pull request metadata. To change this default behavior, run `gt config` and select the `Submit settings` menu. `gt ss` is a default alias for `gt submit --stack` to also submit descendants of the current branch.

#### flags

`--ai`Automatically AI-generate title and description for all PRs. Only works when creating new PRs. If --edit, use the generated metadata as starting points.

`--always`Always push updates, even if the branch has not changed. Can be helpful for fixing an inconsistent Graphite stack view on Web/GitHub resulting from downtime/a bug.

`--branch`Which branch to run this command from. Defaults to the current branch.

`--cli`Edit PR metadata via the CLI instead of on web.

`--comment`Add a comment on the PR with the given message.

`-c, --confirm`Reports the PRs that would be submitted and asks for confirmation before pushing branches and opening/updating PRs. If either of --no-interactive or --dry-run is passed, this flag is ignored.

`-d, --draft`If set, all new PRs will be created in draft mode.

`--dry-run`Reports the PRs that would be submitted and terminates. No branches are restacked or pushed and no PRs are opened or updated.

`-e, --edit`Input metadata for all PRs interactively. If neither --edit nor --no-edit is passed, only prompts for new PRs.

`--edit-description`Input the PR description interactively. Default only prompts for new PRs. Takes precedence over --no-edit.

`--edit-title`Input the PR title interactively. Default only prompts for new PRs. Takes precedence over --no-edit.

`-f, --force`Force push: overwrites the remote branch with your local branch. Otherwise defaults to --force-with-lease.

`--ignore-out-of-sync-trunk`Perform the submit operation even if the trunk branch is out of sync with its upstream branch. This can lead to incorrect metadata being used during the submit.

`-m, --merge-when-ready`If set, marks all PRs being submitted as merge when ready, which will let them automatically merge as soon as all merge requirements are met.

`--no-ai`Don't use AI to generate any PR fields. Takes precedence over --ai.

`-n, --no-edit`Don't edit any PR fields inline. Takes precedence over --edit.

`--no-edit-description`Don't prompt for the PR description. Takes precedence over --edit-description and --edit.

`--no-edit-title`Don't prompt for the PR title. Takes precedence over --edit-title and --edit.

`-p, --publish`If set, publishes all PRs being submitted.

`--rerequest-review`Rerequest review from current reviewers.

`--restack`Restack branches before submitting. If there are conflicts, output the branch names that could not be restacked

`-r, --reviewers`If set without an argument, prompt to manually set reviewers. Alternatively, accepts a comma separated string of reviewers

`-s, --stack`Submit descendants of the current branch in addition to its ancestors.

`--target-trunk`Which trunk to open PRs against on remote. Defaults to the target trunk for the current local trunk (defined in `gt config`), or the current local trunk if no target trunk is configured.

`-t, --team-reviewers`Comma separated list of team slugs. You can either pass "slug" to this flag or "org/slug" to the reviewers flag. Will enable the --reviewers prompt if set without arguments.

`-u, --update-only`Only push branches and update PRs for branches that already have PRs open.

`-v, --view`Open the PR in your browser after submitting.

`-w, --web`Open a web browser to edit PR metadata, even if no new PRs are being created or if configured to edit PR metadata via the CLI.

### `gt sync`

Sync all branches with remote, prompting to delete any branches for PRs that have been merged or closed. Restacks all branches in your repository that can be restacked without conflicts. If trunk cannot be fast-forwarded to match remote, overwrites trunk with the remote version.

#### flags

`-a, --all`Sync branches across all configured trunks.

`-f, --force`Don't prompt for confirmation before overwriting or deleting a branch in any place where confirmation is requested.

`--restack`Restack any branches that can be restacked without conflicts (true by default; skip with --no-restack).

### `gt top`

Switch to the tip branch of the current stack. Prompts if ambiguous.

### `gt track [branch]`

Start tracking the current (or provided) branch with Graphite by selecting its parent. Can recursively track a stack of branches by specifying each branch's parent interactively. This command can also be used to fix corrupted Graphite metadata.

#### arguments

`[branch] (optional)`Branch to begin tracking. Defaults to the current branch.

#### flags

`-f, --force`Sets the parent to the most recent tracked ancestor of the branch being tracked to skip prompts. Takes precedence over --parent

`-p, --parent`The tracked branch's parent. Must be set to a tracked branch. If provided, only one branch can be tracked at a time.

### `gt trunk`

Show the trunk of the current branch.

#### flags

`--add`Add an additional trunk.

`-a, --all`Show all configured trunks.

### `gt undo`

Undo the most recent Graphite mutations.

#### flags

`-f, --force`Do not prompt for confirmation; undo the most recent command immediately.

### `gt unfreeze [branch]`

Unfreeze specified branch and branches upstack of it. Freezing a branch prevents local modifications to the branch including any restacks. Unfreezing will enable local modifications to the branch. See `gt freeze` for more information.

#### arguments

`[branch] (optional)`The branch to unfreeze. Defaults to the current branch.

### `gt unlink [branch]`

Unlink the PR currently associated with the branch.

#### arguments

`[branch] (optional)`The branch to unlink.

### `gt untrack [branch]`

Stop tracking a branch with Graphite. If the branch has children, they will also be untracked. Default to the current branch if none is passed in.

#### arguments

`[branch] (optional)`Branch to stop tracking.

#### flags

`-f, --force`Will not prompt for confirmation before untracking a branch with children.

### `gt up [steps]`

Switch to the child of the current branch. Prompts if ambiguous.

#### flags

`-n, --steps`The number of levels to traverse upstack.

`--to`Target branch to navigate towards. When multiple children exist, selects the path leading to this branch.

### `gt upgrade`

Update your CLI to the latest stable version.
