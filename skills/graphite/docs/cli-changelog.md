> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI Changelog

> See the history of changes for the Graphite CLI.

<Info> For current and historical version information, please visit our [NPM repository](https://www.npmjs.com/package/@withgraphite/graphite-cli?activeTab=versions). </Info>

<Update label="1.7.20" description="2026-02-19" tags={["feature","bug-fix"]}>
  * Added `--close` flag to `gt fold` command to close pull requests when folding branches.
  * Display worktree paths next to branches in `gt log` output when multiple worktrees are present.
  * Added proxy settings to user configuration accessible via `gt config` menu, with fallback to environment variables.
  * Fixed git checkout hooks (e.g. post-checkout) not showing output when using `gt checkout`.
  * Improved fetch performance in some cases
</Update>

<Update label="1.7.19" description="2026-02-17" tags={["improvement"]}>
  * Made internal improvements to `gt submit`.
</Update>

<Update label="1.7.18" description="2026-02-02" tags={["feature","bug-fix"]}>
  * AI-generated branch names now honor the lowercase CLI configuration setting.

  * Improved `gt sync --force` warning behavior - non-interactive mode now consistently respects the flag, and interactive mode shows more informative warnings.

  * Fixed a bug where range diff could incorrectly evaluate empty output as equivalent, causing sync to take the remote version despite local changes.

  * Fixed a bug related to empty commit messages during rebase.

  * Fixed a bug where `gt get` and `gt checkout` would exit with code 0 even on error.

  * Fixed an issue where users would see `fatal: ambiguous argument 'refs/gt-fetch-head/...': unknown revision or path not in the working tree.` when running `gt sync`.

  * Fixed a bug where `gt get` and `gt checkout` did not properly look for numerical branch names.
</Update>

<Update label="1.7.17" description="2026-01-28" tags={["feature","bug-fix"]}>
  * Updated `gt get` command description to include new flags
  * Fixed a bug where stale remote tracking references could cause incorrect failed pushes when reusing branch names.
  * Fixed `gt undo` to properly work with `gt freeze` and `gt unfreeze` commands.
  * Fixed CLI help text for `gt split --by-file`.
</Update>

<Update label="1.7.16" description="2026-01-20" tags={["feature", "improvement", "bug-fix", "performance"]}>
  * Added new `--remote-upstack` (`-u`) flag to `gt get` to fetch upstack branches submitted by other users.
  * Fixed a bug where frozen branches could be updated by `gt submit` after a `gt sync`.
  * Fixed `gt reorder` incorrectly splitting stacks when reordering branches above frozen branches.
  * Fixed commit message formatting when using multiple -m flags - messages now include newlines between each flag, which matches native git behavior.
  * Fixed a bug where `gt submit` would use the wrong branch's metadata to generate a title and description under some circumstances.
</Update>

<Update label="1.7.15" description="2026-01-07" tags={["feature", "improvement"]}>
  * Added new `--close` flag (alias `-c`) to `gt delete` to also close a branch's associated PR on GitHub.
  * Improved branch name suggestion logic when running `gt split` to match behavior of `gt create`.
</Update>

<Update label="1.7.14" description="2025-12-23" tags={["feature"]}>
  * Added new `--into` flag to `gt modify` for committing changes into a downstack branch instead of the current branch.
</Update>

<Update label="1.7.13" description="2025-12-18" tags={["bug-fix"]}>
  * Fixed some internal issues with builds.
</Update>

<Update label="1.7.12" description="2025-12-15" tags={["feature", "bug-fix"]}>
  * Fixed issue with branch selection when running `gt create --insert`.
  * Add current branch indicator in `gt log`.
  * Always prompt a user before opening an editor for a PR description.
  * Fixed `gt submit --cli --ai` prompt to reflect AI auto-fills PR descriptions when skipped.
</Update>

<Update label="1.7.11" description="2025-12-10" tags={["feature", "bug-fix"]}>
  * Updated `gt up` and `gt down` to return a non-zero exit code when they cannot move because the current branch is already at the top or bottom of the stack.
  * Running `gt undo` right after `gt abort` will now undo the command that ran before the aborted command instead of failing.
  * Updated all CLI help text and generated documentation links to use graphite.com instead of graphite.dev.
</Update>

<Update label="1.7.10" description="2025-11-20" tags={["feature","bug-fix"]}>
  * Added a new feature to `gt submit` that lets users choose whether reviewers should be applied to all PRs or only to newly created PRs when submitting a stack that contains a mix of new and existing PRs.
  * Fixed a circular dependency bug in split by file that occurred when branch names conflicted after a split was performed.
  * Fixed an alias parsing issue causing unintentional command execution upon user typos
</Update>

<Update label="1.7.9" description="2025-11-14" tags={["feature","bug-fix"]}>
  * Added ability to set and manage a default profile through the interactive config menu.
  * Show unstaged changes during `gt create`.
  * Added a tip explaining the difference between `gt checkout` (unfrozen) and `gt get` (frozen) when fetching new branches.
  * Fixed error with missing refs on remote.
  * Made `--edit-title` and `--edit-description` imply `--cli` automatically.
  * Ensured `--cli` is auto-enabled only when PR title/description editing is actually enabled.
  * Added clarification to `gt delete` explaining that deleting branches for open PRs is a local-only operation; PRs must be manually closed in GitHub.
</Update>

<Update label="1.7.8" description="2025-11-12" tags={["feature", "performance"]}>
  * Added a feature to automatically check out branches authored by the current user as unfrozen when using `gt get`.
  * Optimized performance when gathering rebase metadata.
</Update>

<Update label="1.7.7" description="2025-10-25" tags={["bug-fix", "feature"]}>
  * Added `--to <target_branch>` flag to `gt up` for targeted branch navigation within large stacks.
  * Updated CLI, menu bar app, and VS Code extensions to request `app.graphite.com` instead of `app.graphite.dev`.
  * Trim whitespace from branch names in `gt rename` to prevent command failures.
  * Changed debug log file extension from `.log` to `.log.jsonl` for to match updated format.
</Update>

<Update label="1.7.6" description="2025-10-31" tags={["feature", "bug-fix"]}>
  * Added a feature to display warnings from PR submissions directly in the CLI to provide additional guidance to users.
  * Added retries on intermittent server errors.
  * Updated `--edit` to imply `--cli` in `gt submit` to ensure users can edit PR titles and descriptions directly in the CLI.
  * Fixed an issue where checking out the current branch after a rebase would create incorrect previous-branch entries in the reflog.
  * Fixed inconsistencies in upgrade behavior due to different packaging systems.
  * Fixed messaging to show "Updating PRs..." instead of "Creating/updating PRs..." when the update-only flag is used.
  * Fixed an issue where editing a PR description wouldn't show the existing content by fetching the PR body from the server.
  * Fixed an issue where `gt-fetch-head` refs could cause conflicts when creating new refs by deleting them when deleting a branch.
  * Fixed terminal alignment issues by replacing the pencil emoji (✏️) with a memo emoji (📝).
  * Improved error messages when a branch is updated outside of Graphite and `gt submit` fails.
  * Improved error reporting for Graphite API failures.
</Update>

<Update label="1.7.5" description="2025-10-25" tags={["bug-fix", "performance"]}>
  * Fixed an issue where `gt submit` would incorrectly warn about out-of-date trunk when trunk was up-to-date.
  * Fixed a bug where `gt submit` would fail with a force-with-lease error with custom fetch refspecs (or shallow clones).
  * Added automatic re-tries in some cases to improve `gt submit` reliability.
</Update>

<Update label="1.7.4" description="2025-10-06" tags={["feature", "bug-fix", "performance"]}>
  * Added gt upgrade command to update the CLI.
  * Introduced automatic background updates (configurable via user settings).
  * Added a feature to automatically fast-forward the trunk to the upstream merge base when it's out of sync, improving UX during sync operations.
  * Added a feature that prevents submitting changes after a branch has been merged or added to a merge queue.
  * Merged branches are now shown as merged in status and are uneditable to prevent accidental edits.
  * Performance improvements to gt log --short and gt checkout
  * Improved messaging to help users resolve "BlockedWhileMerging" errors by suggesting next steps in the CLI.
  * Fixed messaging in gt demo stack output to use "upstack" instead of "downstack" for descendant branches.
  * Fixed a critical logging regression that caused loss of debug logs.
  * Fixed an issue where the CLI wouldn't update the trunk when fetching if a branch hadn't yet been submitted.
</Update>

<Update label="1.7.2" description="2025-10-06" tags={["feature", "bug-fix", "performance"]}>
  * Added a feature to block submits and modifications to merging branches.
  * Added various performance optimizations on sync/get commands.
  * Fixed issue where syncing or fetching a frozen branch would unfreeze it.
</Update>

<Update label="1.7.1" description="2025-09-26" tags={["feature", "bug-fix"]}>
  * Added controls to show/hide inline tips.
  * Added `--reset-author` flag to `gt modify` for resetting commit authorship.
  * Added the ability to `gt get` PRs opened outside of Graphite.
  * Added `--upstack` and `--downstack` options to `gt delete`
  * Fixed bug where progress indicators would sometimes interfere with prompts for ssh key passphrases.
  * Fixed autocomplete output formatting for better terminal compatibility.
</Update>

<Update label="1.7.0" description="2025-09-01" tags={["feature", "bug-fix", "improvement", "performance"]}>
  * Added new `gt freeze` and `gt unfreeze` commands. Freezing a branch prevents modifications to that branch.
  * New branches from `gt get` will be frozen by default.
  * Added warnings for newly empty branches after restack operations.
  * Added a cap to debug log size.
  * Improved `gt feedback` experience and reliability.
  * Fixed issue where `gt undo` could remove unstaged or untracked changes.
  * Fixed bug where `gt undo` sometimes failed after `gt continue`.
  * Fixed issue where org prefixes were duplicated for team reviewers in PRs.
  * Fixed branch sync to correctly detect trunk status when upstream is missing.
  * Fixed issue where `gt sync` would hang when branches were too far behind trunk.
  * Automatically set `--no-interactive` mode when stdin/stdout are not TTYs.
</Update>

<Update label="1.6.8" description="2025-08-05" tags={["bug-fix"]}>
  * Added warnings when trunk is out of date during `gt submit`.
  * Fixed an issue where `gt sync` and `gt get` could result in slow operations.
  * Fixed an issue where `gt feedback` incorrectly reported a failure.
  * Fixed an issue where `gt submit` incorrectly required the `--force` flag.
  * Fixed an issue where `gt log` with `-n 0` would report the incorrect branch.
  * Fixed an issue where `gt revert` would fail to perform any action.
  * Fixed an issue where git hooks configured absolute paths would not be found.
</Update>

<Update label="1.6.7" description="2025-07-09" tags={["bug-fix"]}>
  * Fixed an issue where `gt submit` would incorrectly report a branch as having a "New parent".
  * `gt submit --branch` now validates that a branch name is provided when the flag is used.
  * Fixed an issue where `gt absorb` would fail with an error message "Shas does not match current stack".
  * Fixed an issue where rebasing empty branch could cause incorrect metadata.
  * Fixed an issue where `gt track` would not recover a diverged branch if the branch was already tracked.
  * [GT MCP](/gt-mcp) beta released.
</Update>

<Update label="1.6.6" description="2025-06-11" tags={["bug-fix"]}>
  * Add an option to cancel the operation when `gt get` or `gt sync` encounter merge conflicts.
  * Fixed an issue where `gt submit` would incorrectly warn about missing remote changes.
</Update>

<Update label="1.6.5" description="2025-06-04" tags={["bug-fix"]}>
  * Added logging of processes holding index.lock when Git commands fail due to lock contention.
  * Extended debug log expiry from 1 to 7 days for better access to historical logs.
  * Added validation for unexpected arguments in the `gt checkout` command to avoid accidental invocations.
  * Fixed an issue where some vscode extension activity could cause excessive log file usage.
</Update>

<Update label="1.6.4" description="2025-05-19" tags={["bug-fix", "performance"]}>
  * Fixed a bug where `gt submit` and `gt sync` could incorrectly report a new remote version.
  * Fixed a bug where `gt submit` may try to push the same branch twice.
  * Fixed a bug where help text would be displayed in a single column when piped to another command.
  * Fixed an issue where polling in the vscode extension could cause large amounts of log file usage.
</Update>

<Update label="1.6.3" description="2025-05-09" tags={["bug-fix", "performance"]}>
  * Fixed a bug in `gt submit` and `gt sync` that caused performance degradation and crashes when pull requests were modified outside of Graphite.
</Update>

<Update label="1.6.2" description="2025-05-02" tags={["bug-fix", "performance"]}>
  * `gt track` shows the exact number of commits that will go into the new branch, making it easier to spot oversized stacks.
  * Updated git fetch commands to no longer fetch tags, reducing network usage and speeding up operations.
  * Fixed a bug in `gt pr` where branch names were interpreted as a PR number if they started with a digit.
  * Fixed a bug in `gt submit` where PR descriptions were being generated larger than the GitHub PR description limit.
  * Fixed a bug in `gt submit` where PR titles were being generated larger than the GitHub PR title limit.
  * Fixed a bug in `gt submit` where pushing all the branches in a stack could partially fail leading to inconsistent diffs in some PRs.
  * Fixed a bug in `gt submit` where temporary branches were not being cleaned up correctly.
  * Fixed a bug in `gt create` where the branch name was incorrectly added to the commit message.
  * Fixed a bug where in certain cases, trunk commits could be included in a tracked branch, resulting in many Graphite operations hanging or failing.
  * Fixed a bug where certain cases of syncing a branch submitted outside of Graphite would crash the CLI.
  * Added better protections against running too many `git` subprocesses.
</Update>

<Update label="1.6.1" description="2025-03-21" tags={["bug-fix", "performance"]}>
  * Fixed a bug where in certain cases, trunk commits could be included in a tracked branch, resulting in many Graphite operations hanging or failing.
  * Fixed a bug where certain cases of syncing a branch submitted outside of Graphite would crash the CLI.
  * Added better protections against running too many `git` subprocesses.
</Update>

<Update label="1.6.0" description="2025-03-07" tags={["feature", "bug-fix", "improvement"]}>
  * Added support for multiple `-m` flags in `gt create`, `gt modify`, and `gt squash`.
  * Provided additional context when commands fail due to Graphite maintenance and incidents.
  * Use commit message for branch name if there are no staged changes.
  * Updated output colors to avoid difficult to read output.
  * Fixed a bug where `gt feedback` could fail due to large log files.
  * Fixed a bug where the remote repository could be marked as ''.
  * Fixed a bug where a large number of commits can cause "Invalid string length" exceptions.
  * Fixed a bug where whitespace in the repository path is not handled correctly when worktrees are used.
  * Dropped official support for Node 18 in anticipation of its end-of-life date on 2024-04-30.
  * Removed `gt interactive`
</Update>

<Update label="1.5.3" description="2025-01-21" tags={["improvement", "bug-fix"]}>
  * Introduced a progress bar for `git fetch` and `git push` operations.
  * Fixed an issue where feature flags could be inadvertently disabled.
  * Adjusted some command output formatting for consistency.
</Update>

<Update label="1.5.2" description="2024-12-23" tags={["bug-fix", "improvement"]}>
  * Cleanup `graphite-base` branches if a submit fails to push to remote
  * Fixed a bug where `graphite-base` branches were incorrectly introduced in trailing trunk multi-trunk configurations
  * Fixed a bug where `gt submit` could lead to incorrect diffs upstack if submit was not run on the full stack
  * Fixed a bug where `gt rename` did not use configured branch prefixes
  * Fixed a bug where `gt` commands could fail with `EAGAIN` errors
  * Fixed a bug where `gt delete` could fail when run on untracked branches
</Update>

<Update label="1.5.1" description="2024-12-12" tags={["bug-fix", "improvement"]}>
  * Fixed a bug where `gt submit` on a stack would lead to temporary incorrect diffs on the upstack remote PRs
  * Fixed a bug where `gt sync` failed with `"RangeError: Invalid string length"`
  * Updated `gt rename` to fail if the user aborts the command
  * Updated `gt squash` to fail if the squash command does nothing
  * Updated all output to properly respect the `--no-interactive` flag (e.g. `gt log`, `gt info`…)
</Update>

<Update label="1.5.0" description="2024-12-04" tags={["feature", "bug-fix"]}>
  * Introduced `gt abort`, which aborts the current rebase operation and restores the repository state to before the original command that introduced the conflict
  * Introduced `gt undo`, which undoes the most recent Graphite mutation, restoring the repository to its state before the mutation was applied
  * Fixed a bug where submitting a moved branch could temporarily result in incorrect diffs on remote
  * Updated `gt create` to prompt for a branch name for empty branches if one was not provided
</Update>

<Update label="1.4.11" description="2024-11-22" tags={["improvement"]}>
  * Internal improvements to config files
  * Add linux arm64 build to releases
</Update>

<Update label="1.4.8" description="2024-09-26" tags={["improvement"]}>
  * Added additional debugging information for pr info updates
</Update>

<Update label="1.4.7" description="2024-09-26" tags={["bug-fix", "improvement"]}>
  * Fixed a bug in `gt demo` that would corrupt the repo's name and owner
  * Updated sending non-info cli output to stderr instead of sending everything to stdout
</Update>

<Update label="1.4.6" description="2024-09-26" tags={["bug-fix", "improvement"]}>
  * Fixed a bug where `gt sync` would not update trunk if there were no previously submitted branches
  * Updated `gt submit --branch` to work while checked out untracked branches
  * Updated support for git pre-push hooks on Windows machines
</Update>

<Update label="1.4.5" description="2024-09-13" tags={["feature", "bug-fix", "improvement"]}>
  * Added support for working with and updating branches checked out across worktrees
  * Added support for working with branches automatically rebased by graphite
  * Fixed a bug where adding an undefined trunk would corrupt cli metadata
  * Fixed a bug where `gt sync --all` would only clean up branches on the current trunk
  * Improved `gt submit` performance by skipping unnecessary fetches
  * Improved performance of deleting branches by only deleting required metadata
  * Updated `gt checkout` to work while on a detached head
  * Updated `gt submit` to submit branches that have never been submitted with Graphite
  * Updated `gt sync` to better handle cases where the branch was updated outside of Graphite
  * Updated `gt init --trunk` to warn against setting a trunk that does not exist locally
  * Updated `gt sync` and `gt get` to work on untracked branches
</Update>

<Update label="1.4.4" description="2024-08-09" tags={["feature", "bug-fix", "improvement"]}>
  * Added new `gt unlink` command to unlink a branch from the currently associated PR
  * Added better support for re-using branch names
  * Added support for passing a branch name to `gt info`
  * Added installation information to CLI releases
  * Fixed a bug where rebases would not handle commits without a parent commit (e.g. original or orphaned commits)
  * Fixed a bug where rebases with merge commits would cause conflicts with already merged commits
  * Fixed a bug where request error logs could cause circular structure errors
  * Updated `gt rename` to use the correct name when asking for a rename confirmation
  * Updated `gt create --insert` to leave descendants in an un-restacked state when there are conflicts
  * Updated `gt delete` to also prune branches
  * Updated pre-push git hooks to better handle running in repo root
</Update>

<Update label="1.4.3" description="2024-08-09" tags={["feature", "bug-fix", "improvement"]}>
  * Added a `--stack` flag to `gt checkout` to only show current stack
  * Fixed a bug where `gt log` and `gt checkout` don't work on untracked branches
  * Fixed a bug where unsetting a trunk would not fully unset it
  * Fixed a bug where `gt` throws a cannot read undefined error while reading "validationResult"
  * Fixed a bug where `gt track` might get into an infinite loop while recovering diverged branches
  * Improved merge conflict status to handle unstaged changes during rebasing
  * Updated instructions for committing untracked files to be more clear
  * Updated networking error diagnostics
  * Updated `gt pr`, `gt docs`, and `gt dash` to print out the URL being opened
</Update>

<Update label="1.4.2" description="2024-07-30" tags={["feature", "bug-fix", "improvement"]}>
  * Added support for `--verbose/-v` in `gt create` and `gt modify` to include the diff in the commit message template
  * Added a `--add` flag to `gt trunk` to configure an additional trunk branch
  * Updated list of unmerged conflict files to print paths relative to the current working directory
  * Updated `gt create` to suppress the detached HEAD message on every create
  * Update pre-push hook error messages to include more details
  * Updated `gt demo` to work in repos the user cannot submit to yet
  * Fixed a bug where the branch name date prefix was incorrect in `gt config`
  * Fixed a bug where `gt submit` would not fetch the branch before submitting to determine if it needs submitting
  * Fixed a bug where `gt continue` would swallow the post-rewrite git hook output
  * Fixed a bug where `gt track` would incorrectly tell you to track the branch
  * Fixed a bug where the `--force` flag was not respected in `gt submit` when the remote was updated
  * Fixed a bug in the interactive selector with `--all` where trunks could not be correctly selected
</Update>

<Update label="1.4.1" description="2024-07-10" tags={["feature", "bug-fix", "improvement"]}>
  * Added a `--trunk/-t` to `gt checkout` to switch to the current trunk
  * Fixed bug where `gt sync` would try to update a trunk you don't have configured
  * Fixed bug in `gt demo` that incorrectly created a "-p" directory to run the demo in
  * Updated `gt init --reset` to also reset PR metadata
  * Reduced the maximum number of parallel git calls in order to reduce spawn errors
</Update>

<Update label="1.4.0" description="2024-07-03" tags={["feature"]}>
  * This version of the Graphite CLI adds support for working on multiple trunks that will be rolled out over the coming weeks via a server-side feature flag.
</Update>

<Update label="1.3.10" description="2024-06-26" tags={["improvement"]}>
  * Updated `gt squash` to no-op when there are no commits to squash or only a single commit
  * Updated all prompt suggestions to support fuzzy searching branches
</Update>

<Update label="1.3.9" description="2024-06-18" tags={["improvement"]}>
  * Updated `gt demo` to initialize Graphite automatically if the current repo has not yet been initialized
</Update>

<Update label="1.3.8" description="2024-06-12" tags={["improvement", "bug-fix"]}>
  * Updated `gt absorb` to print the number of hunks that were not absorbed
  * Updated `gt log` to not show `updated remotely` since it does not respect the new sync changes
  * Fixed bug where `gt sync` would always ask to reconcile when there were local changes
</Update>

<Update label="1.3.7" description="2024-06-05" tags={["improvement", "bug-fix"]}>
  * Updated `gt modify` to print out conflicts when it cannot restack cleanly
  * Added better error handling in `gt sync/get` for server-side errors
  * Fixed more cases of the bug where local version was being overwritten by remote even when user selected `no` from prompt
  * Fixed bug where remote tracking errors would cause commands to fail completely
  * Fixed bug where staged changes were incorrectly detected because of a stale index cache
</Update>

<Update label="1.3.6" description="2024-05-29" tags={["improvement", "bug-fix"]}>
  * Updated `gt feedback` to not require to be run in a repo
  * Fixed bug where a command could trigger thousands of parallel git commands at once causing spawn issues
  * Fixed bug where `gt get` would try to checkout a branch that was just deleted
</Update>

<Update label="1.3.5" description="2024-05-22" tags={["improvement", "bug-fix"]}>
  * Updated `gt modify` to leave descendants in an unrestacked state when there are conflicts.

  * Updated `gt split` behavior to skip git hooks.

  * Fixed bug where local version was being overwritten by remote even when user selected `no` from prompt.

  * Fixed bug where remote rebase-only changes were not reconciled during `gt sync`.

  * Fixed bug where staged changes were incorrectly detected as unstaged.

  * Fixed bug where files changed in parent directories were not detected.

  * Fixed bug where children of split branches were not being tracked.

  * Fixed bug where pre-push hooks were not being run from the repo root.

  * Removed references to deprecated command names.
</Update>

<Update label="1.3.4" description="2024-04-29" tags={["bug-fix"]}>
  * Fixed multiple issues with the new versions of `gt get`, `gt sync`, and `gt submit`. The new versions will be rolled back out with this release.

  * Fixed an issue where `post-checkout` hooks were swallowed, resulting in issues when interactive scripts are used.

  * Fixed some typos in command output.

  * `gt demo` now skips all Git hooks (with an implicit global `--no-verify`).

  * `gt sync` no longer prints out `Restacking branches` if there are no branches to restack.

  * Added details about troubleshooting to `gt --help`.
</Update>

<Update label="1.3.3" description="2024-04-05" tags={["bug-fix"]}>
  * Fixed an issue where `gt submit` could fail in certain cases due to the format of a Git remote URL.

  * Fixed an issue where the wrong branch name was referenced by `gt move`'s prompt.

  * Fixed an issue where `gt absorb` could fail in certain environments.

  * Fixed an issue where `gt log short` could incorrectly show a branch as "updated remotely" when it was not.

  * Added interactivity to `gt feedback`.
</Update>

<Update label="1.3.2" description="2024-03-26" tags={["bug-fix"]}>
  * Fixed a bug where `gt submit` would hang in certain cases.
</Update>

<Update label="1.3.1" description="2024-03-23" tags={["improvement", "bug-fix"]}>
  * Updated `gt submit` to match the new behavior of `gt sync` and `gt get`.

  * `gt submit` now skips branches with no commits between head and base and their descendants, instead of failing outright (GitHub does not allow PRs with no commits).

  * `gt submit` now prompts to restack if the `--restack` flag is not passed and it would fail without restacking.

  * Fixed a bug where `gt submit` would restack in certain cases when the `--restack` flag was not passed.

  * Fixed a bug where `gt submit` was not prompting to choose between pasting template/commit messages and editing them.

  * Fixed a bug where legacy scoped submit commands were not enforcing that branches be restacked before submitting.

  - Deleting branches in `gt sync`, `gt get`, `gt submit`, or with `gt delete` now prints the SHA the branch was at before deletion like Git, as there is no reflog for deleted branches.

  * Added better error messaging for the new version of `gt sync` when unauthed.

  * Fixed a bug where commands that open a URL would fail if `xdg-open` was not installed, instead of printing the URL to the terminal.

  * Fixed a bug where `gt get` would not set up the remote-tracking branch properly.

  * Fixed a bug in the new version of `gt get` and `gt sync` where branches would not get newly associated with PRs.

  * Fixed a typo in `gt absorb`.
</Update>

<Update label="1.3.0" description="2024-03-20" tags={["feature"]}>
  * This version of the Graphite CLI includes a significant update to `gt sync` and `gt get` that will be rolled out over the coming weeks via a server-side feature flag.

  - The primary goal of these changes is to improve the experience of syncing remote changes to your local branches, ensuring that flows like collaborating on a stack or applying suggested edits to a PR are seamless and reliable.

  - Notably, `gt sync` now syncs all branches, where previously it just synced trunk. This brings it closer to the behavior of `gt get`.

  - Conversely, `gt get` with no argument passed is essentially "`gt sync` for the currently checked out stack."

  - The full behavior is:

  1. Update the trunk branch to match remote

  2. Clean up branches associated with merged or closed PRs

  3. Sync any remote changes to local branches

  4. Restack branches as needed

  * If you'd like to be included in the initial rollout of these changes, please let us know in the #cli-beta channel on our Community Slack. Since we are using a server-side feature flag, updating to 1.3.0 alone will not enable the new behavior.

  * The changes are largely based on your feedback, and we're excited to see how they improve your experience with Graphite. THANK YOU!

  - `gt create` now applies the branch prefix to branch names passed in directly (e.g. `gt create branch-name` with a prefix of `prefix/` will yield a branch called `prefix/branch-name`). This behavior can be disabled in `gt config`. If the branch name already begins with the prefix, it will not be added again.

  - Graphite now sets the environment variable `GT` to `1`, which can be checked by subprocesses like an editor or Git hook to determine if they are being run from Graphite.

  * Fixed a bug where `gt absorb` would fail if the git config to detect copies in diffs was enabled.

  * Fixed a bug where `gt split --by-hunk` would leave the user in a detached state if interrupted.

  * If no changes are staged in a step of `gt split --by-hunk`, it will now prompt to stage changes again instead of exiting with an error.

  - Slightly updated help text and error messages for `gt fold`.
</Update>

<Update label="1.2.8" description="2024-03-12" tags={["bug-fix"]}>
  * Fixed a segfault issue caused by a dependency.
</Update>

<Update label="1.2.7" description="2024-03-07" tags={["improvement", "bug-fix"]}>
  * Added support for \`gt demo\` to use a temporary repository if run from outside of a repository.

  * Added support for \`gt demo\` to be run without authenticating the CLI.

  * Fixed an issue where tab autocompletion did not work inside of \`gt demo\`.

  - Added support for \`gt create\` to use AI to populate commit message and branch name. This will be rolled out via a server-side feature flag over the coming weeks.
</Update>

<Update label="1.2.6" description="2024-03-05" tags={["improvement", "bug-fix"]}>
  * By default, `gt create` will now replace slashes in commit messages when inferring branch names, and will convert uppercase letters to lowercase. Both of these new behaviors can be disabled in \`gt config\`.

  * Added individual `--edit-title` and `--edit-description` flags to `gt submit` to allow for editing the PR title and body, respectively. `--no-edit-title` and `--no-edit-description` can be used to skip the prompts for each. Note that `--edit `and `--no-edit` will still work as before.

  * Added support for `gt submit` to use AI to populate PR titles and description. This will be rolled out via a server-side feature flag over the coming weeks.

  * When creating new PRs, `gt submit` will continue to a web browser to edit PR metadata. `--cli` can be passed to use the CLI flow.

  * Added a setting to `gt config` to toggle the above behavior: i.e., use the CLI instead of web by default. In that case, \`--web\` can be passed to use the web flow.

  - Fixed an issue resulting in certain commands failing when using a YubiKey-protected SSH key.

  - Fixed an issue where `gt demo` would not work on Windows.

  * Debug logs are now always written, even when the `--debug` flag is not passed.

  * The `--debug` flag now logs to the terminal as well as to a file.

  * `gt feedback <message> --with-debug-context` now sends our engineers all debug logs from the past 24 hours.
</Update>

<Update label="1.2.5" description="2024-02-27" tags={["improvement", "bug-fix"]}>
  * Adjusted the set of branches that might be included in the new prompt to update upstack branches.

  * Fixed an issue where staged changes could be discarded inadvertently during a `gt sync`.

  * Fixed an issue where `gt demo` would fail on Windows.

  * Added an NPM `postinstall` script to ensure NodeJS version compatibility.
</Update>

<Update label="1.2.4" description="2024-02-22" tags={["improvement", "bug-fix"]}>
  * `gt submit` now prompts to update upstack branches with open PRs when run from a mid-stack branch.

  * `gt submit` is now able to detect when GitHub/Graphite sync is not enabled for a repository. We'll be rolling out the check for this over the coming weeks.

  * A warning is now displayed when branches diverge from Graphite's tracking, and a new flow has been added to `gt track` to remediate diverged branches.

  * `gt log` is now sorted stably.

  - Fixed the `gt sq` alias for `gt squash`.

  - Fixed an issue where `gt submit` would fail (before submitting upstack branches) if run from a merged branch.

  - Fixed an issue where `gt submit` would fail if a pre-push hook had spaces in its path.

  - Ensured better error messaging for various commands when a rebase is in progress.

  - Removed the `--show-delete-progress` flag of `gt submit`.
</Update>

<Update label="1.2.3" description="2024-02-14" tags={["bug-fix"]}>
  Fixed an issue where `gt submit` would fail in repositories using `git-lfs`.
</Update>

<Update label="1.2.2" description="2024-02-13" tags={["improvement", "bug-fix"]}>
  * Adjusted some copy in `gt absorb`
  * Fixed an issue where `gt absorb` only worked when run from the root of a repository
  * Fixed an issue where aborting a `gt create` could leave you in a detached state
  * Added protections against creating server-side PR dependency cycles
</Update>

<Update label="1.2.1" description="2024-02-11" tags={["bug-fix"]}>
  * Fixed an issue where the `gt ab` alias for absorb wasn't recognized
  * Fixed an issue where `gt absorb --patch` hung instead of opening the patch selector
  * Fixed an issue where invalid Graphite metadata would prevent any command from being run
</Update>

<Update label="1.2.0" description="2024-02-09" tags={["feature", "improvement", "bug-fix"]}>
  * Introduced `gt absorb`, which automatically amends staged changes to commits in your stack
  * You can now select which PR template will be used by default in `gt config`
  * `gt checkout -` now selects the last branch that was checked out, just like Git
  * `gt sync` now denotes the currently checked out branch when it was unable to restack it cleanly
  * Added clearer messaging for the action needed to avoid detected merge conflicts on `submit`
  * Fixed an issue where pressing Escape in an interactive prompt selected the current option
  * Fixed an issue where GitHub pull request templates with extensions other than .txt and .md were not detected
  * Fixed an issue where invalid/expired auth on `gt get` resulted in an unclear error message
  * Fixed an issue where `gt get` would not work for stacked branches if using a YubiKey-protected SSH key
  * Fixed an issue where `gt track` would display remote-tracking branches as potential parents
</Update>

<Update label="1.1.5" description="2024-02-02" tags={["improvement", "bug-fix", "feature"]}>
  * Fixed bug in `create` and `modify` where we showed `--update` as an option when there were only unstaged changes (now we only show `--all` and `--patch`)
  * We now show `--patch` as an option for `create` and `modify` even when there are only untracked changes
  * Added interface to let users pick untracked files to track in `--patch` mode (in `create` and `modify`)
  * Improved error messaging for `gt get` for when we can't find a PR for the requested branch
  * Updated `gt get <trunk>` functionality to checkout the trunk branch
  * Improved error messaging for when a user tries to fold a branch into main
  * Added an example to `gt fold --help`
  * Fixed bug where `gt rename` could cause branches to become untracked
  * Added support for `pre-push` git hook
</Update>

<Update label="1.1.4" description="2024-01-31" tags={["improvement"]}>
  * Added an alias `gt --help --all`, which is equivalent to `gt --help --all-commands`
</Update>

<Update label="1.1.3" description="2024-01-22" tags={["feature", "improvement"]}>
  * Added an option to change the trunk branch name in `gt config`
  * Removed prompt to submit on web when the `--no-edit` flag is passed to `gt submit`
  * Updated `gt --help --all-commands`
  * Added `gt completion` to `gt --help --all`
</Update>

<Update label="1.1.2" description="2024-01-16" tags={["bug-fix"]}>
  * Fixed a bug where `gt demo` would error out once the user attempts to run `gt create`
</Update>

<Update label="1.1.1" description="2024-01-12" tags={["bug-fix"]}>
  * Fixed a bug where `gt submit` would unnecessarily prompt that the branch would conflict with remote.

  * Fixed a bug where `gt sync` failed with `"RangeError: Invalid string length"`

  * Updated `gt rename` to fail if the user aborts the command

  * Updated `gt squash` to fail if the squash command does nothing

  * Updated all output to properly respect the `--no-interactive` flag (e.g. `gt log`, `gt info`…)

  * Updated `gt init --reset` to also reset PR metadata

  * Reduced the maximum number of parallel git calls in order to reduce spawn errors
</Update>

<Update label="1.1.0" description="2024-01-09" tags={["feature"]}>
  * Added new `gt demo` feature which interactively teaches you how to use `gt` to create pull requests and stacks.

    * Run `gt demo pull-request` from any repo to create a sample PR.

    * Run `gt demo stack` from any repo to create a sample stack of PRs.

  * Made improvements to `gt help --all-commands`

    * Organized the commands into sections, for better scanning & readability

    * Updated each command description to be shorter on this help page, for better readability

    * Added docs links to the bottom of the help output

    * Configured wrap width of the output to be more responsive to your terminal size

    * Colorized anything in `backticks` in the help output

  - Fixed error messaging in `gt pr` to show the branch name when we couldn't find an open PR for the current branch

  - Fixed the copy in `gt guide workflow` based on community feedback.

  - Fixed `gt merge` to correctly handle the case when a branch is locked.

  - Fixed a bug with `gt get` where it was not correctly checking out the branch after syncing it
</Update>

<Update label="1.0.14" description="2023-12-20" tags={["improvement", "bug-fix"]}>
  * Improved error messaging when config file is invalid.

  * Updated `gt submit` behavior when upstack branches have merged.

  * Added `gt interactive` command to open the Graphite Interactive extension.

  * Updated `gt auth` to print more information about the user's auth status.

  - Fixed an issue where `gt track` would hang if no parent was explicitly passed to the command.
</Update>

<Update label="1.0.13" description="2023-12-13" tags={["bug-fix"]}>
  * Fixed bug where "needs restack" was not printing out in `gt log short`.
</Update>

<Update label="1.0.12" description="2023-12-11" tags={["improvement", "bug-fix"]}>
  * Updated `gt --help` to be an overview of `gt` and the Graphite workflow.

  * Moved the previous command help reference to `gt --help --all-commands`.

  * Added an inline CLI guide to the Graphite workflow, available underneath \`gt guide workflow\`.
</Update>

<Update label="1.0.11" description="2023-11-27" tags={["bug-fix"]}>
  * Fixed bug where aliases were not respected.

  * Added retry when fetching branch from remote fails.
</Update>

<Update label="1.0.10" description="2023-11-13" tags={["improvement", "bug-fix"]}>
  * Updated the `gt submit --draft` flag to only no longer convert already published PRs back to drafts.

  * Added support for team reviewers. Team reviewers can either be specified using `gt submit --team-reviewers slug` or through `gt submit --reviewers org/slug`.

  - Added output to `log short` when a branch needs to be fetched from remote (using `gt get`).

  - Added output after `gt checkout` specifying whether a branch needs to be submitted, fetched, or restacked.

  * Removed a reference to legacy command names.
</Update>

<Update label="1.0.9" description="2023-10-23" tags={["improvement", "bug-fix"]}>
  * Improved how PR descriptions are persisted across aborted `submit` runs.

  * Modified version prompting so users are only asked to upgrade their CLIs once per day.

  - Fixed a bug in remote changes detection.
</Update>

<Update label="1.0.8" description="2023-10-16" tags={["improvement", "bug-fix"]}>
  * Added an `--update` option for `create` and `modify` that stages changes to all already-tracked files.

  * Added support for `gt get <pr-number>.`

  * Added a `--comment` flag to `submit` which will add a comment with the provided text to the submitted PR.

  * Added additional debugging information to the output file of the `--debug` flag.

  - Fixed a bug where the incorrect version number was displayed after running `gt get` for a remote branch
</Update>

<Update label="1.0.7" description="2023-10-04" tags={["improvement", "bug-fix"]}>
  * Added `gt aliases --legacy` command to automatically add all of the old shortcuts to your aliases configuration.

  * Added ability to navigate through prompts using ctrl+n and ctrl+p.

  * Updated `submit` description behavior to include commit messages if no default template exists.

  * Updated how we detect if there are remote changes to a PR that need to be resolved.

  - Fixed a bug where local state could become corrupt after switching trunk branch.

  - Fixed a bug where we were syncing information for untracked branches.

  - Fixed incorrect `restack` deprecation warning.
</Update>

<Update label="1.0.6" description="2023-09-29" tags={["improvement", "bug-fix"]}>
  * Updated the default behavior on `gt submit` to not restack branches.

  * Added an optional `--restack` flag to `gt submit`.

  * Always prompt on `gt submit` if the branch will have conflicts with main.
</Update>

<Update label="1.0.5" description="2023-09-18" tags={["bug-fix"]}>
  * Fixed a stray line of output in `gt create`.

  * Fixed an issue where syncing PR data from remote could set the wrong parent.
</Update>

<Update label="1.0.4" description="2023-09-18" tags={["improvement", "bug-fix"]}>
  * Updated `--help` output to be more consistent and more helpful.

  * Added a new command `gt aliases` to open up the alias file in your editor.

  * Now removes `~/.graphite_user_config` once your configuration has been moved to the new location to reduce confusion.

  - `gt submit` now opens the PR in your browser if you pass the `--view` flag.

  - `gt rename` now prompts instead of immediately failing if you don't pass `--force` when required.

  - `gt up `interactive selection now prompts you a single time instead of at each level (similar to the `top` change from v1.0.2).

  * Fixed the `gt pr` command.

  * Fixed a bug where no error message was printed when you try to create a branch with an invalid or existing name.

  * Updated branch naming validation to more closely match the Git specification. Please let us know if you see any inconsistencies.
</Update>

<Update label="1.0.3" description="2023-09-15" tags={["bug-fix"]}>
  * Fixed an issue where restacking did not respect the `commit.gpgSign` configuration value.

  * Fixed an issue where `create` with just a branch name incorrectly failed to execute.

  * Fixed an issue where the `git --version` check failed on Windows (and likely certain other git distributions).
</Update>

<Update label="1.0.2" description="2023-09-15" tags={["improvement", "bug-fix"]}>
  * `gt top` interactive selection now offers which tip to travel to instead of prompting at each intermediate step. We'll be porting the same behavior to `gt up` soon.- The `--debug` flag now logs to a file instead of stdout.- Clearer error messaging for outdated Git version.

  * Fixed a bug where `gt sync` could reset the index and working tree, and improved error handling in similar cases with uncommitted changes.- Fixed the error messge when running a deprecated command to print the correct alias file location.
</Update>

<Update label="1.0.1" description="2023-09-14" tags={["bug-fix"]}>
  * Fixed a bug where `gt submit --stack` did not work from the trunk branch.
</Update>

<Update label="1.0.0" description="2023-09-13" tags={["feature"]}>
  ### Renaming and configuration

  * All commands that fell under `branch`, `stack`, `upstack`, `downstack`, `repo`, and `user` have been renamed to drop the noun. Old command names still work, but will be removed in an upcoming version.

  * The full list of commands is available in `gt --help` or at [https://graphite.com/graphite-cli-v1-command-names](https://graphite.com/graphite-cli-v1-command-names).

  * Graphite now supports custom aliasing for any command via `~/.config/graphite/aliases` (or `$XDG_CONFIG_HOME/graphite/aliases`).

  * A preset to copy into this file to keep the old short command names is found at [https://graphite.com/docs/legacy-alias-preset](https://graphite.com/docs/legacy-alias-preset).

  * All Graphite configuration now lives in the interactive `gt config` command.

  * Graphite's user-level configuration files are now XDG Base Directory Specification compliant, or stored in `~/.config/graphite` by default.

  `gt create`

  * `gt create` is the new command to create a Graphite branch (formerly `branch create`)

  * `gt create` now supports inferring a branch name from the commit editor, which means it is now possible to run it with no arguments.

  * If you have unstaged changes and no staged changes when running `gt create`, you are now asked whether you'd like to stage and commit them as part of the new branch.

  `gt modify`

  * `gt modify` is the new command to modify a Graphite branch (formerly `gt commit amend`/`gt commit create`).

  * The default behavior is to amend the current commit on the branch, unless the branch has no commits or `--commit` is passed.

  * When amending a commit, the editor is not opened by default unless `-e`/`--edit` is passed.

  * If you have unstaged changes and no staged changes when running `gt amend`, you are now asked whether you'd like to stage them before running the amend or commit operation.

  * `gt branch edit` has been moved to `gt modify --interactive-rebase`

  **`gt sync`**

  * `gt sync` is the new command to update your trunk branch, clean up merged branches, and restack most branches in your repo.

  * `gt sync` now restacks all branches by default (no longer need `-r`).

  * If any branch has conflicts with its parent branch, instead of launching you into a conflict resolution, `sync` will print out the list of conflicting branches so that you can run `gt restack` on them.

  `gt submit`

  * `gt submit` is the new command to push branches to GitHub and create stacked PRs for them.

  * `gt submit` submits the currently checked out branch and its ancestors (dependent branches) by default.

  * `gt ss` is included in the alias file by default as an alias for `gt submit --stack`, which replicates the behavior of the old `gt stack submit`

  * `gt submit` now handles cases where branches in your stack have merged or been updated remotely, as long as there are no rebase conflicts to resolve. This includes both incorporating remote changes and removing merged branches from the stack.

  * `gt submit` now ensures that your branches are restacked instead of failing when they aren't.

  ### Entirely new commands

  * `gt pop` to delete the current branch and check out its parent without modifying the working tree. Can't be run if the current branch has children.

  * `gt trunk` to navigate directly to your trunk branch.

  * `gt parent` to print out the raw parent of the branch (for scripting).

  * `gt children` to print out the raw children of the branch, line by line (for scripting).

  * `gt revert` (experimental) to create a branch that reverts a commit in your trunk branch.

  ### Other changes

  * Added a new `--stat` flag to `gt info` that prints out a diffstat instead of a full diff. Compatible with either `--diff` or `--patch`.

  * `gt create --insert` now asks which siblings should be moved onto the new branch if there are more than one of them.

  * Performance improvements.

  ### Bug fixes

  * Fixed a bug where stray output was printed while completing command names.

  * Fixed an issue where a single optional PR template was interpreted as required PR template.

  * Fixed a bug where branch prefixes could not end with a slash.

  * Fixed a bug where `split --hunk` would not work for branches that added new files.

  * Fixed a bug where the branches created by `split` were all based on the parent of the split branch instead of being stacked correctly.

  * Fixed a bug where the `--patch` flag to `create` and `modify` did not include new files.

  ### Notes

  * The `test` command has been temporarily removed due to persistent bugginess, but will be added back when we have time to dedicate to making it work well. For now, one option is to script using the new `gt children` and `gt parent` commands, which should handle most use cases.

  * We are still working on further improvements to `sync` and would love your feedback in this area!

  * We'd also love to hear about how we can make `revert` work best for you!

  * As of the release of this version, certain parts of the web app and docs may still reference the old command names. We're updating those places as you read this!
</Update>

<Update label="0.22.16" description="2023-09-08" tags={["improvement", "bug-fix"]}>
  * Added autocomplete support for the renamed commands.
  * Fixed a bug in `get` when the PR does not exist locally.
  * Fixed a bug where an `git range-diff` failure could block submit.
</Update>

<Update label="0.22.15" description="2023-09-07" tags={["improvement", "bug-fix"]}>
  * Introduced an environment variable to preview the command rename and custom aliasing system that will be released next week as Graphite CLI v1. For more details, see [https://graphite.com/graphite-cli-v1-command-names](https://graphite.com/graphite-cli-v1-command-names).
  * Introduced a new interactive command `gt config` which covers all user- and repo-level configurations. The `gt user` and `gt repo` top-level commands will be deprecated in an upcoming release.
  * `checkout` now prompts to `sync` when the branch's PR has been merged.
  * `get` no longer fetches branches for merged PRs.
  * Fixed a bug where having the VSCode extension open while restacking could corrupt cached stack data.
  * Fixed a bug where restacks would get stuck in a confusing/corrupt state due to concurrent git processes (i.e. VSCode extesnion).
  * Fixed a bug where an `git range-diff` failure could block submit.
</Update>

<Update label="0.22.14" description="2023-09-06" tags={["bug-fix"]}>
  * Fixed a bug where users with a Yubikey-protected SSH key were unable to `sync`.
  * Fixed a bug where an uncaught IPC exception would appear after running a command.
  * The cool part is that turning this configuration on allows you to set custom aliases via the `~/.graphite_aliases` file, which we know some of you have been asking us about for quite a while!
</Update>

<Update label="0.22.9" description="2023-08-31" tags={["bug-fix"]}>
  * Fixed a bug where the wrong version could be shown in `gt log`.
  * Fixed a bug where `get` didn't work to fetch new branches.
  * Cleaned up a suggestion to run `submit --force`
  * Removed the interactive portion at the end of `init` for branch tracking (hint about `track` is still shown).
  * `GT_RENAME` flag now displays the correct command names in suggestions.
</Update>

<Update label="0.22.8" description="2023-08-31" tags={["improvement", "bug-fix"]}>
  * You guessed it -- more performance improvements!

  * `submit` commands now automatically pull in changes from remote and rebase on top of them when your local changes don't conflict with them.

  * `downstack get` now shows which version of the PR has been fetched.

  * `gt log` now shows the last submitted version of each PR, as well as whether you need to \`submit\` or \`get\`.

  * `branch checkout` now informs you if you need to `get`.

  * Fixed an issue where `branch checkout --patch` failed with an incorrect error message.

  * Fixed an issue where `downstack get` failed with an incorrect error message.

  * Fixed some issues with inconsistent failures in `get`

  * Added an experimental `graphite_aliases` file (see below)

  We are currently in the process of renaming all Graphite commands. This version is the first one with the full set of renamed commands implemented. If you'd like to try out this new command surface, you can add "export GT\_RENAME=1" to your shell configuration file (e.g. \~/.zshrc) to be warned when you run a renamed command and what the new name is. It may be unstable and is primarily meant for employee testing purposes until further notice. There is no overlap between the old set of commands and the new set.
  For more information, see this [Notion doc](https://www.notion.so/withgraphite/Proposal-for-Graphite-CLI-changes-400d068c7c8546fcbc90b5573e6f27e9?pvs=4).
  The cool part is that turning this configuration on allows you to set custom aliases via the `~/.graphite_aliases` file, which we know some of you have been asking us about for quite a while!
</Update>

<Update label="0.22.6" description="2023-08-25" tags={["improvement", "bug-fix"]}>
  * More performance improvements!

  * Fixed an issue where mangled output was displayed in `gt user editor`.

  * Fixed an issue where `downstack merge` didn't exit if the PR was already merging/merged.

  * Fixed an issue where `downstack get` did not work.
</Update>

<Update label="0.22.4" description="2023-08-21" tags={["improvement", "bug-fix"]}>
  * More performance improvements!

  * Added a clearer warning about Node.js version compatibility for `npm` installs.

  * Fixed an issue where `--force` in `submit` was not respected.

  * Building on a change from 0.22.1, `downstack get` now automatically pulls in changes from GitHub if the local state of the branch matches a submitted version of the branch's open pull request, \*\*even if rebased\*\*.

  * `submit` now prompts for a `downstack get` in cases where there are remote changes that need to be synced.
</Update>

<Update label="0.22.3" description="2023-08-16" tags={["improvement", "bug-fix"]}>
  * Many small performance improvements!

  * Added a `--rerequest-review` flag to `submit` commands that rerequests review from anyone who has reviewed the PR.

  * `submit` is now blocked by an ongoing rebase.

  * `--quiet` is now respected by underlying `git commit` calls.
</Update>

<Update label="0.22.1" description="2023-08-10" tags={["bug-fix"]}>
  * Fixed a bug where `prNumber` was incorrectly displayed in the `gt log` output instead of the actual PR number.

  * `downstack get` now automatically pulls in changes from GitHub if the local state of the branch matches a submitted version of the branch's open pull request.

  * `submit` commands now suggest running `downstack get` when the above situation is detected.

  * YubiKey prompting for SSH is now moved behind a config, in order to address some bugs that passing through the YubiKey prompt introduced. If you are using a YubiKey to authenticate with GitHub, you can enable this config with `gt user yubikey --enable`.

  * Added a global `--cwd` flag to run any Graphite command in a directory other than the one it is initiated from.
</Update>

<Update label="0.22.0" description="2023-08-04" tags={["feature"]}>
  * Added a new `gt downstack merge` command to merge stacks and PRs directly from the CLI.

  * `submit` commands now display code updates and metadata updates as two different statuses in the list of updates.
</Update>

<Update label="0.21.5" description="2023-07-27" tags={["improvement", "bug-fix"]}>
  * We had a few versions' worth of iterating on internal issues and the new release process from our monorepo, thanks for bearing with us!
</Update>

<Update label="0.21.0" description="2023-07-21" tags={["feature"]}>
  * We pushed a few patch versions to npm and brew between 0.20.24 and now, but there were no major changes in any of them, so they are not listed in the changelog.

  * `gt log` now shows the PR's overall status (consistent with Graphite app; takes stacks into account).

  * Added a new `-m` flag to `submit` commands that enables "merge when ready" on the Graphite app, merging the PR if it is already ready to be merged.

  * Added a new option `--exclude-templates` to `gt user submit-body` which specifies that the PR template should not be included in the default PR description when `--include-commit-messages` is enabled.

  * Fixed a few long-standing performance issues that affected all commands, most noticeably shorter-running ones.

  * Fixed an issue where the Yubikey prompt shown by git commands was not being diplayed.

  * Fixed an issue where the \`branch track\` command was missing.
</Update>

<Update label="0.20.22" description="2023-06-22" tags={["improvement", "bug-fix"]}>
  * Added the request ID to HTTP error message output for better user issue debugging
</Update>

<Update label="0.20.21" description="2023-06-22" tags={["improvement", "bug-fix"]}>
  * No changes, had to bump a new version to get around accidentally pushing v0.20.19 to `npm` as v0.20.20
</Update>

<Update label="0.20.20" description="2023-06-21" tags={["improvement", "bug-fix"]}>
  * `gt dash` commands now use the app URL from the user's profile when passing links to `open`.
</Update>

<Update label="0.20.19" description="2023-05-11" tags={["improvement", "bug-fix"]}>
  * When editing a PR description, the temporary file is now named `GRAPHITE_PR_DESCRIPTION.md`. This allows for Markdown syntax highlighting, and also adding additional editor config by specifically targeting this file name.
</Update>

<Update label="0.20.18" description="2023-4-28" tags={["bug-fix"]}>
  * Fixed a bug where `gt changelog` was broken for the binary version of the CLI (e.g. installed via `brew`).

  * Fixed a bug where `gt branch edit` was accidentally removed from the CLI. Thank you @vampire!

  * Added `fish` completion support via `gt fish >> ~/.config/fish/completions/gt.fish`! Thank you @szamanr!
</Update>

<Update label="0.20.17" description="2023-4-24" tags={["improvement", "bug-fix"]}>
  * This should fix the npm install issues!
</Update>

<Update label="0.20.16" description="2023-4-21" tags={["bug-fix"]}>
  * Fixed a bug where `repo sync` attempts to delete branches that were never associated with a PR.
</Update>

<Update label="0.20.15" description="2023-3-22" tags={["improvement", "bug-fix"]}>
  * Add setting trunk to remote version if it cannot be fast-forwarded.
</Update>

<Update label="0.20.14" description="2023-2-10" tags={["improvement", "bug-fix"]}>
  * Add `--always` flag to submit to always push updates, even if the branch has not changed.
</Update>

<Update label="0.20.13" description="2022-1-20" tags={["improvement", "bug-fix"]}>
  * Tweaked git passthrough copy to make it clear that a command was run.

  * Fixed a bug where `test` commands didn't support multiple separators in a branch name.

  * Replaced individual `gt ls-remote` calls on `submit` with a single one, which should speed up submission significantly!

  * Fixed a bug where PR data was not being synced in the background.
</Update>

<Update label="0.20.12" description="2022-11-25" tags={["improvement", "bug-fix"]}>
  * `gt stack submit` now prompts for submission info inline after each individual branch, instead of after all branches.

  * The `--edit/-e` flag on `submit` commands now allows updating the PR title and body.

  * The `--reviewers/-r` flag on `submit` commands can now update existing PRs.

  * The `--reviewers/-r` flag on `submit` commands now accepts a string of comma separated reviewers (e.g. `user1, user2`).

  * `gt commit amend` no longer requires staged changes.

  * `gt commit amend` no longer allowed on empty branches.

  * `gt commit create/amend` no longer allowed during a rebase.

  * Improved suggested messages when encountering errors during a rebase.

  * Improved error messaging by showing error code and number when available.

  * Improved error reporting when running `test` commands.
</Update>

<Update label="0.20.11" description="2022-09-26" tags={["improvement", "bug-fix"]}>
  * Changed many error messages to be more actionable, and changed some tips to always-visible messages.

  * Improved accuracy of checking whether a branch is up to date on `submit`.

  * The `--edit/-e` flag on `submit` now opens an editor for each PR without prompting first. Passing no flag still prompts the user whether they'd like to open an editor, and `--no-edit` still skips the prompt,

  * The `--select/-s` flag of `submit` now prompts about which branches to include in the submit as the first step so that it can validate that the correct dependencies are included in the submit scope.

  * Fixed a bug preventing creation of a debug context within a large repository.

  * Fixed a bug logging output for `gt branch test` on branches with a slash in the name.

  * Running git commands no longer opens another terminal on Windows.
</Update>

<Update label="0.20.10" description="2022-08-02" tags={["improvement", "bug-fix"]}>
  * Addressed one remaining gap in pager parity with git: set the environment variables `LESS=FRX` and `LV=-c` if unset.
</Update>

<Update label="0.20.9" description="2022-08-02" tags={["improvement", "bug-fix"]}>
  * Fixed remaining issues with pager by switching from a temp file to a pipe.

  * Fixed a bug where `gt log short` wouldn't show the filled-in circle for branches needing a restack.

  * Fixed a bug where `gt branch split` untracked children of the branch being split if the last branch in the split kept its name.
</Update>

<Update label="0.20.8" description="2022-07-29" tags={["improvement", "bug-fix"]}>
  * Improved error mesaging around failed pager execution.
</Update>

<Update label="0.20.7" description="2022-07-29" tags={["improvement", "bug-fix"]}>
  * `gt log`, `gt changelog`, and `gt branch info` now display in a pager. The pager defaults to your git pager, but can be overridden with (for example) `gt user pager --set 'less -FRX'`.

  * Fixed a bug where `--no-edit` on `submit` would automatically open new PRs in draft mode (it now prompts unless `--draft`, `--publish`, or `--no-interactive` is set).

  * Fixed a bug where killing the CLI during submit could result in being unable to submit again (due to a temporary filename clash).

  * Fixed colors for `gt branch info --patch`.

  * Fixed a bug related to buffer size for certain git commands.

  * Fixed the error displayed when attempting to install Graphite on old Node.js versions.
</Update>

<Update label="0.20.6" description="2022-07-25" tags={["improvement", "bug-fix"]}>
  * `submit` after an aborted submit now asks the user whether they'd like to use their cached PR body instead of always using it.

  * `gt branch split` now tracks untracked branches automatically before splitting.

  * `gt branch untrack` now untracks the current branch if no branch name is provided.

  * Fixed an issue where `gt branch create` would fail instead of creating a branch with no commit in certain cases.

  * Fixed `gt branch edit`.
</Update>

<Update label="0.20.5" description="2022-07-22" tags={["improvement", "bug-fix"]}>
  * Fixed `gt changelog`.

  * Fixed `submit`, `downstack edit` for editor commands containing spaces.

  * Fixed `git push` errors being swallowed on submit.
</Update>

<Update label="0.20.4" description="2022-07-21" tags={["improvement", "bug-fix"]}>
  * Added `gt changelog` and `gt docs`. You probably want to pipe the changelog to a pager or file :).

  * Fixed a bug where a `git rebase --abort` after a restack conflict would result in Graphite being wrong about the current branch.

  * Improved `test` command output.

  * Internal improvements.
</Update>

<Update label="0.20.3" description="2022-07-21" tags={["improvement", "bug-fix"]}>
  * Minor internal fix.
</Update>

<Update label="0.20.2" description="2022-07-19" tags={["improvement", "bug-fix"]}>
  * Fixed an issue preventing installation.
</Update>

<Update label="0.20.1" description="2022-07-19" tags={["improvement", "bug-fix"]}>
  * Fixed an issue preventing installation.
</Update>

<Update label="0.20.0" description="2022-07-19" tags={["feature"]}>
  * Added a new command `gt branch split` that allows the user to interactive split a branch into multiple dependent branches. There are two styles of operation:

    * `--by-commit` mode (aliases `--commit`, `-c`) prompts the user to select the commits within the branch that they'd like to have branches at.

    * `--by-hunk` mode (aliases `--hunk`, `-h`) prompts the user to create a series of single-commit branches from the changes of the branch using the `git add --patch` interface.

  * Greatly improved `gt log short` readability. Give it a try!

  * `gt branch create`, `gt commit create`, and `gt commit amend` now support the `-p/--patch` option (like `git commit --patch`). Please note that this won't be the most useful option until autostashing is implemented, planned soon.

  * Branch navigation commands now notify the user if the branch being checked out is either

    * behind its parent (needs restacking)

    * upstack of a branch that is behind its parent

    * untracked

  * `gt log` and `gt log short` now show untracked branches when `--show-untracked/-u` is passed in.

  * `gt branch checkout` now includes untracked branches in the selector when `--show-untracked/-u` is passed in.

  * Added `-n` as an alias for `--no-edit` for `submit`. Try out `gt ss -np` to quickly publish your changes!

  * Added `--select`/`-s` option for `submit` to select which branches to push.

  * Added `--force`/`-f` option `submit` to do a force-push, i.e. `git push -f`, instead of the default `git push --force-with-lease`.

  * Added a non-blocking note if the user submits a branch that is not restacked on trunk.

  * On trying to submit branches with PRs already closed/merged, instead of failing immediately users will be prompted to choose either to abort or create new PRs.

  * `submit` now correctly sets the upstream of the pushed branch.

  * You can now configure whether you'd like commit messages in PR bodies by default behind the configuration `gt user submit-body --include-commit-messages`. Disabled by default. Use `gt user submit-body --no-include-commit-messages` to disable.

  * Added `--force`/`-f` for `gt downstack get` to always overwrite local branches.

  * `gt downstack track` can now take a positional branch name argument (like `gt branch track`).

  * Added `--diff`/`-d` for `gt branch info` to show the diff of the whole branch (unlike `--patch`/`-p` which shows the diff of each commit).

  * Interactive prompts autocomplete is now case-insensitive.

  * `gt --help` now includes a link to the CLI documention.

  * Improved `gt repo init` copy.

  * Improved error messaging for when an internal `git` command fails.

  * Improved error messaging for when a `submit` command fails due to a GitHub API error.

  * Improved `test` command output.

  * Improved clarity of positional arguments for all commands with them in `--help`

  * Improved performance of internal cache.

  * Improved telemetry.

  * Fixed a bug where `test` commands were completely broken.

  * Fixed a bug where `upstack onto` autocomplete did not work if `uso` shortcut was used.

  * Fixed a bug where `--no-interactive` and `--no-edit` were not handled properly for `submit`

  * Fixed a bug where `gt log` would break on the initial commit of a repository.

  * Fixed a bug where trunk would be in the list of branches to track in `gt repo init`

  * Fixed a bug where the error message for old versions of Node.js wouldn't show up.

  * Added cycle detection for parent pointers.
</Update>

<Update label="0.19.6" description="2022-07-07" tags={["improvement", "bug-fix"]}>
  * Fixed a bug where continue state could be corrupted by running a `gt` command before running `gt continue`.

  * Fixed a bug where `upstack onto` could target untracked branches, resulting in corrupted state.

  * Fixed a bug where renaming a branch to its current name resulted in corrupted state.

  * Added `dstr` as an alias for `downstack track`.

  * Slightly improved rebase conflict printout.
</Update>

<Update label="0.19.5" description="2022-07-06" tags={["improvement", "bug-fix"]}>
  * Added a new command `gt downstack track` that, from an untracked branch, allows you to track recursively by choosing the parent until you reach a tracked branch. Use `--force/-f` to automatically select the nearest ancestor of each branch, which should give behavior similar to `gt stack fix --regen` of old.

  * Added a new command `gt branch fold` that folds the changes of the current branch into the parent branch. Uses the parent branch's name for the new branch with default; pass in `--keep/-k` to use the current branch's name instead.

  * Added a new command `gt branch squash` that turns a branch of multiple commits into a single-commit branch. Takes `--message/-m` and `--no-edit/-n` arguments just like `gt commit amend`, and defaults to using the message of the first commit on the branch.

  * Fixed a bug where if neither `--draft` nor `--submit` was passed, updated PRs would always be published if previously drafts, and new PRs would be published instead of being created as draft.

  * Fixed a bug where `gt branch track --force` wouldn't always select the nearest ancestor.

  * Fixed a bug where `gt` with no command would throw an uncaught exception instead of displaying the help message.

  * Fixed a bug where cancelling certain interactive prompts would result in undefined behavior.
</Update>

<Update label="0.19.4" description="2022-07-05" tags={["improvement", "bug-fix"]}>
  * Based on a user survey, we've slightly changed the defaults for PR title and description on `submit` commands.

    * PR Title defaults to the title of the first (or only) commit on the branch.

    * PR Description defaults to a list of commit messages followed by a PR template, if one exists.

  * `branch info` and `log` now show the commit hash of trunk.

  * Added a `repo init --reset` which clears all Graphite metadata.

  * Added a new user-scoped configuration enabled by `gt user restack-date --use-author-date` which when enabled passes `--committer-date-is-author-date` to the internal `git rebase` of restack operations. To return to the default, use `gt user restack-date --no-use-author-date`.

  * Added autocompletion for the `branch up` disambiguation prompt.

  * Added `gt dpr` as a shortcut for `gt dash pr`

  * Renamed the `--no-draft` option for \`submit\` commands to `--publish/-p`. There are three modes of operation for the command:

    * By default, leave existing PRs in the same state and create new PRs in draft mode.

    * When `--draft/-d` is passed, all PRs in the submit scope will be marked as draft.

    * When `--publish/-p` is passed, all PRs in the submit scope will be marked ready for review.

  * Added an interactive prompt for `gt branch rename` when no new name is passed in.

  * Added a `--force/-f` option for `gt branch track `that skips the interactive prompt by picking the nearest tracked ancestor.

  * Fixed a bug where `branch submit` and `downstack submit` base validation would fail incorrectly on certain operating systems.

  * Fixed a bug where leftover cached metadata across CLI versions could result in inconsistent state.
</Update>

<Update label="0.19.3" description="2022-06-28" tags={["improvement", "bug-fix"]}>
  * Changed the flow of `gt branch track`. Now, it tracks the current branch by default, unless another branch is specified. By default, prompts the user to select a branch to be its parent if there are multiple possibilities, or you can pass in a `--parent`.

  * Updated the new `log short` view to be more comprehensible (uses diagram symbols from `log`).

  * Fixed a bug where `--restack` wouldn't restack all branches as expected if `gt repo sync` was run from trunk.

  * Fixed a bug where `gt ss` would fail if run from trunk.

  * Fixed a bug where `gt downstack get` would fail to get branches that existed locally but were untracked by `gt`.

  * Fixed a bug where after a `git rebase`, Graphite metadata could end up in a broken state.

  * Fixed a bug that prevented `gt feedback --with-debug-context` from working as expected.

  * Fixed a bug where `gt upstack onto` interactive selection could appear wonky.

  * Fixed some copy in v0.19 newly added features.
</Update>

<Update label="0.19.2" description="2022-06-15" tags={["improvement", "bug-fix"]}>
  * Fixed an issue where `downstack get `was completely broken.

  * Replaced the emoji for `Pushing to remote and creating/updating PRs...` step of `submit`

  * Fixed an issue where `gt branch edit` would only work if the branch was not in need of restacking.

  * Added support to rebase local changes on top of remote for `downstack get`

  * Fixed a bug where choosing to cancel `submit` because of an empty branch did not abort correctly.
</Update>

<Update label="0.19.1" description="2022-06-14" tags={["improvement", "bug-fix"]}>
  * Removed some development tooling as a workaround to unblock Homebrew release. Sorry for the delay!

  * Fixed a shebang issue that resulted from trying to clean up Node.js v18 warnings. Added a different fix to prevent Node.js warnings from showing up in CLI output.

  * Fixed a bug with Node.js v14 support.

  * Changed the Homebrew Node.js dependency to v16, which is the same as we use for development.
</Update>

<Update label="0.19.0" description="2022-06-13" tags={["feature"]}>
  * Ensured every commonly used command has an alias and changed a few names. A current list of commands will be included in the Community Slack with this release.

    * `gt branch show` is now `gt branch info`. As this command is relatively new, we are not leaving `show` as an alias.

    * `gt branch create --restack` is now `gt branch create --insert`. This was the originally intended name, and it does something different than `gt repo sync --restack`

    * `gt downstack sync` is now `gt downstack get`. It was confusing to have two `sync` commands do entirely different things!

    * The old names `gt branch prev` and `gt branch next` for `down` and `up` are now fully deprecated.

  * Updated a significant portion of the info and error messages spanning almost every command.

  * Ensured every command has up-to-date and helpful `--help`.

  * Added a number of tips to various commands.

  * Greatly improved autcompletion —now every command has autocomplete for nouns, verbs, flags, and branch names when applicable.

  * `gt branch checkout`, `gt upstack onto`, and `gt branch track` now all have substring autocompletion for interactive branch selection. Enjoy! :D

  * `gt auth` and `gt user` commands can now be run outside of a Git repository.

  * Removed the concept of "ignored branches" from `gt repo init`, and the user config.Removed the `gt repo ignored-branches` command.

  * Removed `gt <scope> fix`. `fix` is now an alias for `restack`.

  * Removed `gt <scope> validate`

  * Removed `gt branch parent`, `gt branch children`, and `gt branch pr-info`. All of this information is now found in `gt branch info`. `gt branch rename` is now the only way to reset PR info for a branch, as PR info is now synced by branch name for the open PR with that name.

  * Removed `gt repo fix`.

  * Removed `gt repo trunk`. You can change the trunk branch by running `gt repo init --trunk <trunkName>` .

  * Removed `exec` functionality of `gt downstack edit`—we recommend using `gt stack test` for running a command on each branch in your stack.

  * Added a new command `gt branch track`. In order to track an existing git branch `<branchName>`, ensure that it is based on a Graphite branch `<parentBranchName>`, and then with `<parentBranchName>` checked out, run `gt branch track <branchName>` to start tracking it as a Graphite branch.

    * You can also specify a `--parent` in `gt branch track` instead of checking out the desired parent before running the command.

    * If run without a branch to track `gt branch track` suggests branches that have the current branch/specified parent in their history.

  * Added `gt branch untrack` to remove Graphite metadata for a branch.

  * Added a new flow to `gt repo init` for letting users new to Graphite convert an existing "stack" of branches into a Graphite stack. Essentially calls `gt branch track` in a loop.

  * Added a new verb `gt <scope> restack` for the `branch`, `upstack`, `downstack`, and `stack` nouns. For each branch in the scope, this command checks if the branch is based on its parent, and rebases it if necessary. `gt upstack fix` and `gt stack fix` will alias to `restack` for a couple versions.

  * Improved `gt log short` - the view now essentially a single-line-per-branch version of `gt log`. The old style can still be accessed with `gt log short --classic`.

  Added a `--reverse` option to `gt log` and `gt log short/.` Helpful for big stacks!

  * Added `--stack` option for `gt log` and `gt log short`. Only displays the current stack (i.e. what \`gt stack submit\` would submit).

  * Added `--steps <n>` option for `gt log` and `gt log short`. Implies `--stack` and only shows \`n\` levels above and below the current branch.

  * Rebase conflict message now shows a `gt log short --steps 3` centered at the branch being resolved.

  * Interactive selection for `gt branch checkout`and `gt upstack onto` now uses the new `gt log short` view. Much easier to see what you're doing with long branch names!

  * `gt dash` can now open the PR page for the current branch or a specified one: `gt dash pr [numberOrBranchName]`

  * `gt branch info` can now show the current PR description with `--description`.

  * Added `upstack` and `downstack` counterparts of `gt branch test`.

  * `gt branch delete` now restacks the deleted branch's children onto its parent.

  * Removed the `--resubmit` flow from `repo sync` —we may add it back in the future.

  * Added a `--restack` option to `repo sync`, which restacks the current branch and any branches in stacks with cleaned up branches. We imagine a common flow if you know that you don't have conflicts with trunk will be `gt rs -rf`. Or even `gt rs -rf && gt ss`.

  * Fixed a bug where `--draft` and `--no-draft` on `submit` commands would unnecessarily submit unchanged PRs.

  * Fixed bugs related to rebases not being performed properly that often resulted in confusing state and messaging.

  * Now fails gracefully if running on an unsupported Node.js version (requires Node.js version 14 or higher)

  * The Graphite CLI experience survey is no longer shown when commands are run in non-interactive mode.

  **Note from the maintainers:**

  Thanks for trying out the new version of the Graphite CLI! Please let us know if you see any issues with this new version, or have any suggestions for improvements related to functionality, flow, or transparency/simplicity.

  New documentation for the CLI is coming soon! We love hearing your feedback about what documentation would be helpful —keep it coming!

  Rebasing on `gt downstack get` has been outscoped for this release in order to get it to you sooner! We're still excited to put it out soon.
</Update>

<Update label="0.18.7" description="2022-05-31" tags={["improvement", "bug-fix"]}>
  * Fixed a pervasive bug that prevented using `gt` on Windows at all — there are likely still remaining issues to work out before we have full support, and we still recommend using WSL for the most stable Graphite experience. Thanks to our community for helping out here!

  * Fixed a bug where `git push` error messages would not be displayed on `submit`, resulting in confusion around whether pushes were failing because of e.g. `pre-push` hooks or`--force-with-lease` errors.

  * Added better support for multiple checkouts (i.e. `git worktre`\`). We consider our support experimental, see the new section of the docs for details.
</Update>

<Update label="0.18.6" description="2022-05-20" tags={["improvement", "bug-fix"]}>
  * Fixed a bug where running `gt branch rename` on submitted branches would result in `gt` becoming largely unusable.

  * Added a new `--force/-f` option to `gt branch rename` that is required for already-submitted branches.

  * `gt branch rename` now respects character replacement settings.
</Update>

<Update label="0.18.5" description="2022-05-19" tags={["improvement", "bug-fix"]}>
  * `.` and `/` are no longer replaced in branch names.

  * Fixed a regression where the current branch wouldn't be selected by default in `gt branch checkout` interactive mode.

  * Upgraded `node` and `yarn` dependencies, please let us know if you see any weirdness!
</Update>

<Update label="0.18.4" description="2022-05-16" tags={["improvement", "bug-fix"]}>
  * `gt downstack sync` no longer requires turning on a configuration option to use (for real this time)
</Update>

<Update label="0.18.3" description="2022-05-13" tags={["improvement", "bug-fix"]}>
  * Rewritten `gt downstack sync` using a different mechanism for fetching remote stack dependencies.

  * `gt downstack sync` no longer requires turning on a configuration option to use.

  * Fixed an issue in `submit` where in-progress PR title wouldn't be saved if the user cancelled while writing the body.
</Update>

<Update label="0.18.2" description="2022-05-12" tags={["improvement", "bug-fix"]}>
  * Fixed certain cases of an issue where restacking after `stack edit` and `commit create` would use an incorrect upstream. A broader fix is coming in v0.19.0.

  * Fixed an issue where after certain `downstack edit` or `upstack onto` flows, branches would be pushed to GitHub in an order that caused them to be closed prematurely.

  * Added `gt branch-prefix --reset` to turn off the user prefix for automatically generated branch names.

  * Cleaned up copy in `submit` commands.
</Update>

<Update label="0.18.1" description="2022-05-10" tags={["improvement", "bug-fix"]}>
  * `gt repo sync` and `gt repo fix` now prompt to delete closed branches in addition to merged ones.

  * Added more customization for auto-generated branch name prefixes. Check out `gt user branch-date` and `gt user branch-replacement`.

  * Config files are now written with 600 permissions instead of 644.

  * Fixed an issue where `downstack sync` would overwrite the local copy of a branch even if the user chose not to.

  * Fixed an issue where a misconfigured trunk wouldn't be brought to the user's attention.

  * Fixed an issue where Graphite would fail to parse repository owner/name.

  * Removed deprecation warning for `gt stacks` - it's been long enough.

  * Cleaned up interactive mode copy for `submit`.
</Update>

<Update label="0.18.0" description="2022-05-04" tags={["feature"]}>
  ### New functionality

  * Added an experimental command `gt downstack sync` to pull down the remote copy of a branch and its downstack dependencies from remote. This feature is gated behind a configuration by default, and we are still working on the documentation. If you would like to try it out and help us iterate on the feature, please join the #experimental channel in the Graphite community Slack server!

  * Added additional functionality to `submit` to support the experimental collaboration features. Gated by default.

  * Added additional functionality to `gt repo sync` to support the experimental collaboration features. Gated by default.

  ### New commands

  * Added a new command `gt branch edit` that runs a native `git rebase --interactive` over the commits on the current branch. This command is intended for advanced Git users who want to make use of the commit structure within a branch while working with Graphite.

  * Added a new command `gt branch show` that runs a native `git log` over the commits on the current branch. Includes a `--patch/-p` option to view the diffs.

  ### New ways to use existing commands

  * Added an `--insert` option to `gt branch create` which restacks all children of the parent of the new branch onto the new branch itself.

  * Added interactive branch selection for `gt upstack onto` (similar to `gt branch checkout`). No longer requires a positional argument.

  * `gt repo sync` now handles `--no-interactive` correctly.

  * `gt commit amend --no-edit` now fails and warns the user when there are no staged changes, just like `gt commmit create`.

  * `--no-edit` is now aliased to `-n` for `gt continue` and `gt commit amend`.

  * `gt continue` now supports `--all/-a` to stage all changes.

  * `submit --no-interactive` no longer un-publishes submitted PRs (unless `--draft` is specified).

  * `gt downstack edit` now supports an `exec/x` option to execute arbitrary shell commands in between branch restacks (based on `git rebase --interactive`).

  * `gt branch delete` now supports deleting the current branch. It checks out the parent (or trunk if Graphite cannot find a parent).

  ### Fixes

  * Fixed a bug where `submit --no-interactive` could prompt the user for reviewers.

  * Fixed a bug where `gt repo owner` would set the remote as well, breaking `sync` and resulting in having to manually edit the configuration file to get Graphite working again.

  * Fixed a bug where `submit` would fail for certain classes of branch name.

  * Fixed a bug where comments in the `gt downstack edit` file were not respected.

  * Fixed a bug where `p` as an alias for `pick` in `gt downstack edit` did not work properly.

  * Fixed a bug where `fix` could swallow a rebase exception and leave the repository in a bad state.

  * Fixed a bug where `gt branch checkout` interactive selection would fail if executed from an untracked branch.

  * Fixed a bug where `gt branch delete` could fail to delete the branch but leave it in a corrupt state.

  ### Improvements

  * Improved the speed of `gt downstack edit` and `gt upstack onto` by being smarter about when a rebase is actually necessary.

  * Improved the speed of stack validation for some commands.

  ### Under the hood

  * Added infra to backfill the SHA of branch parent in metadata globally wherever it is safe to do so to prepare for an upcoming update to the stack validation algorithm that we expect to improve performance and reduce hangs.

  * Added plenty of tests and refactored code core to many commands for stability and future extensibility.
</Update>

<Update label="0.17.11" description="2022-04-23" tags={["improvement", "bug-fix"]}>
  * Fix an issue introduced in the previous version where the async calls to fill in PR info on `submit` would not be awaited serially, resulting in a poor user experience.
</Update>

<Update label="0.17.10" description="2022-04-22" tags={["improvement", "bug-fix"]}>
  * `sync` commands no longer allow pushing to branches associated with closed/merged PRs.

  * Rename `gt branch sync` to `gt branch pr-info` as its behavior is not aligned with the other \`sync\` commands.

  * Fix some output formatting for `sync` and `submit` commands.

  * Fix an issue where pr data could be overwritten on `submit`.

  * Decreased max branch name length slightly to support an upcoming feature.

  * Start tracking SHA of branch parent in metadata, a requirement for some upcoming features.

  * This version includes some initial changes to sync branch metadata with remote, gated by a hidden flag.
</Update>

<Update label="0.17.9" description="2022-04-14" tags={["improvement", "bug-fix"]}>
  * Flipped `gt log short` view to match other log commands and `up`/`down` naming convention. `↳` `→` `↱`!

  * Graphite now asks for confirmation if the user tries to submit an empty branch.

  * Graphite now displays an info message when it creates an empty commit on a new branch.

  * The empty commit copy in the commit editor now only appears when Graphite has created an empty commit.

  * Added support for remotes not named `origin` - use the new `gt repo remote` command to set the name of your remote.

  * Added support for branch names up to GitHub's max supported length (256 bytes including `/refs/heads` gives us room for 245 bytes).

  * Allowlisted many git commands for passthrough.

  * Added autocomplete support for `gt branch delete`.

  * Changed force option on `gt branch delete` from `-D` to `-f`.

  * Cleaned up output on `gt branch delete` failure.

  * Fixed an issue where a branch could not be submitted if its name matched a file in the repository.

  * Fixed an issue where `gt repo max-branch-length` wouldn't print the configured value.

  * Added more debug information for the `--debug` option.
</Update>

<Update label="0.17.8" description="2022-04-08" tags={["improvement", "bug-fix"]}>
  * Happy Friday! This should fix many hangs that users are experiencing.
</Update>

<Update label="0.17.7" description="2022-04-08" tags={["improvement", "bug-fix"]}>
  * Graphite no longer cleans up local branches that share a name with merged branches on remote unless they have been associated with the merged PR (via a `submit` command).

  * Fix bug where PR info wasn't being synced periodically.

  * Added a new command `upstack fix`, similar to `stack fix` that only runs upstack of the current branch.

  * `commit create` and `commit amend` now internally run an `upstack fix` instead of a `` stack fix` ``

  * Fix a hang related to `git config diff.external` being set.

  * Fix autocompletions for `gt branch checkout`.
</Update>

<Update label="0.17.6" description="2022-03-29" tags={["improvement", "bug-fix"]}>
  * Support handling corrupted `.graphite_merge_conflict` files.
</Update>

<Update label="0.17.5" description="2022-03-23" tags={["improvement", "bug-fix"]}>
  * Add deprecation warnings for `gt branch next` and `gt branch prev` in favor of `gt branch up` and `gt branch down`, respectively.

  * Add `gt bu` and `gt bd` shortcuts for `gt branch up` and `gt branch down`, respectively.

  * Change `gt branch delete` shortcut to `gt bdl`.

  * Support passing through `gt stash` as `git stash`.

  * Fix bug where `fish` users couldn't add backticks to commit message using the `-m` option.

  * Silence retype errors.

  * Minor copy updates.
</Update>

<Update label="0.17.4" description="2022-02-25" tags={["improvement", "bug-fix"]}>
  * Refactored config loading to reduce race conditions.

  * Add quotes around commit message in ammend command.

  * Minor copy updates.
</Update>

<Update label="0.17.3" description="2022-02-25" tags={["improvement", "bug-fix"]}>
  * Fix bug regarding repository config file reading from repository subdirs.
</Update>

<Update label="0.17.2" description="2022-02-16" tags={["improvement", "bug-fix"]}>
  * Support numbers when generating a branch name from a commit message through `gt bc -m <message>`

  * Prompt for a commit message when autogenerating an empty commit when running `branch create` with no staged changes.
</Update>

<Update label="0.17.1" description="2022-02-15" tags={["improvement", "bug-fix"]}>
  * Support creating new branches with no staged changes, by automatically creating an empty commit.
</Update>

<Update label="0.17.0" description="2022-02-15" tags={["improvement", "bug-fix"]}>
  * Enable changing existing PRs' draft status using the `--draft` flag on submit.

  * Add a new command, `gt downstack edit` which enables interactive reordering of stack branches.

  * Update implementation of `gt stack submit` to avoid GitHub rate limitted when submitting large stacks.
</Update>

<Update label="0.16.8" description="2022-02-02" tags={["improvement", "bug-fix"]}>
  * Enable manually setting reviewers on submit with the `-r` flag.
</Update>

<Update label="0.16.7" description="2022-02-01" tags={["improvement", "bug-fix"]}>
  * Allow Graphite to run when there are untracked files.
</Update>

<Update label="0.16.6" description="2022-01-27" tags={["improvement", "bug-fix"]}>
  * Fix issue with detecting downstack/upstack branches on submit
</Update>

<Update label="0.16.5" description="2022-01-07" tags={["improvement", "bug-fix"]}>
  * Fix issue with detecting some PR templates
</Update>

<Update label="0.16.4" description="2021-12-13" tags={["improvement", "bug-fix"]}>
  * Wildcard matching for ignored branches (`gt repo ignored-branches --set`) now accepts glob-patterns

  * Option to remove a branch from ignored list (`gt repo ignored-branches --unset`)

  * Submit now supports --update-only option which will only update-existing PRs and not create new ones.

  * Bugfix: Submit to honor the --no-verify flag

  * Better logging and documentation to clarify behavior
</Update>

<Update label="0.16.3" description="2021-12-3" tags={["improvement", "bug-fix"]}>
  * Support up and down aliases for `gt branch` next/prev respectively.

  * Fix issue where `gt tips` could not be disabled.

  * Inherit shell editor preference for user from env (\$GIT\_EDITOR/\$EDITOR) and prompt user to set shell editor preference on submit if env not set.

  * Allow user to change editor preference using `gt user editor`
</Update>

<Update label="0.16.2" description="2021-10-25" tags={["improvement", "bug-fix"]}>
  * Support for `gt continue` to continue the previous Graphite command when interrupted by a rebase.
</Update>

<Update label="0.16.1" description="2021-10-14" tags={["improvement", "bug-fix"]}>
  * Fix issue with `gt repo sync` deleting metadata for existing branches.

  * Reduce merge conflicts caused by `gt commit amend`.
</Update>

<Update label="0.16.0" description="2021-10-12" tags={["improvement", "bug-fix"]}>
  * Support for branch autocomplete functionality on gt branch-related commands. Enable this functionality by running \`gt completion\` and adding the ouputted bash script to your relevant bash profile (e.g. \~/.bashrc, \~/.zshrc).

  * Added functionality to query users for feedback on the Graphite CLI.

  * Refactor the suite of gt submit commands to make them more easily cancellable; re-ordered submit to edit all PRs locally before doing any writes and cancelling mid-submit will save any previously entered data (e.g. title and body).

  * Submit also now includes a `--dry-run` flag to show the user what will be submitted in the invocation.

  * Submit queries GitHub for PRs before submitting, resolving an issue where submit would sometimes try to create a new PR though one already existed for that head branch/base branch combo on GitHub (Graphite just didn't know about it).
</Update>

<Update label="0.15.1" description="2021-10-4" tags={["improvement", "bug-fix"]}>
  * Fix `gt commit create -m` multi-word commit messages.
</Update>

<Update label="0.15.0" description="2021-10-4" tags={["improvement", "bug-fix"]}>
  * Support for `gt stack top` and `gt stack bottom`.

  * Adjusted logic for cleaning metadata in `gt repo sync`.
</Update>

<Update label="0.14.4" description="2021-10-1" tags={["improvement", "bug-fix"]}>
  * Improve performance of stack logic on repos with a high number of local branches.

  * Allow `gt commit create` to be used without `-m`, launching the system editor.

  * Infer the body of a PR from the commit message body (if it exists).

  * Add `gt repo trunk --set`.
</Update>

<Update label="0.14.3" description="2021-09-30" tags={["improvement", "bug-fix"]}>
  * Improved `gt repo sync` performance when repos have a high number of stale branches. `gt repo sync` now deletes branches more eagerly and has an optional flag to show progress (`--show-delete-progress`).

  * New command `gt repo fix` searches for common problems that cause degraded Graphite performance and suggests common remediations.
</Update>

<Update label="0.14.2" description="2021-09-29" tags={["improvement", "bug-fix"]}>
  * Tacit support for merge-based workflows; merges no longer cause exponential branching in `gt log` and hang `gt upstack onto`.

  * Fixes to recreation of debug state in `gt feedback debug-context --recreate`.
</Update>

<Update label="0.14.1" description="2021-09-27" tags={["improvement", "bug-fix"]}>
  * Assorted improvements to the `gt repo sync` merged branch deletion logic and options to fix dangling branches.

  * `gt branch parent --reset` resets Graphite's recorded parent for a branch (to undefined).

  * `gt branch sync --reset` resets Graphite's recorded PR info a branch (to undefined).
</Update>

<Update label="0.14.0" description="2021-09-16" tags={["improvement", "bug-fix"]}>
  * `gt debug-context` captures debug metadata from your repository and can send that to Screenplay to help troubleshoot issues.

  * `gt repo sync` now pulls in PR information for all local branches from GitHub to link any PRs Graphite doesn't know about/better remove already-merged branches.

  * Re-enable metadata deletion from `repo sync`.

  * Re-enable pull request base pushing from `repo sync`.

  * `gt branch create -m` now has `-a` flag to include staged changes in the commit.
</Update>

<Update label="0.13.1" description="2021-09-01" tags={["improvement", "bug-fix"]}>
  * Disable metadata deletion from `repo sync`

  * Disable pull request base pushing from `repo sync`
</Update>

<Update label="0.13.0" description="2021-08-31" tags={["improvement", "bug-fix"]}>
  * `stack submit` now checks if update is needed for each branch.

  * Support `upstack submit` and `branch submit`

  * Fixed bug which was preventing `upstack` from having the alias `us`

  * Added a command `branch rename` to rename branches and correctly update metadata.

  * Better support cancelling out of prompts.

  * Rename `stack clean` to `repo sync` and update to be able to be run from any branch.

  * Update `repo sync` to delete old branch metadata refs.

  * Update `repo sync` to update PR merge bases if necessary.

  * Support passing through commands to git which aren't supported by Graphite.

  * Add experimental command `stack test`.

  * Fix bug causing branches to show up twice in log commands.

  * Show PR and commit info in `log` command

  * Add tip advising against creating branches without commits.
</Update>

<Update label="0.12.3" description="2021-08-23" tags={["improvement", "bug-fix"]}>
  * Fix outdated copy reference to gp.

  * Print error stack trace when --debug flag is used.

  * Flag midstack untracked branches in `gt ls` output.

  * Improve submit to correctly support `gt stack submit` and `gt downstack submit`

  * Reduce unnecessary git ref calls to improve performance in large repos.

  * Support graceful handling of sigint.
</Update>

<Update label="0.12.2" description="2021-08-23" tags={["improvement", "bug-fix"]}>
  * Fix bug in `gt ls` stack traversal.
</Update>

<Update label="0.12.1" description="2021-08-23" tags={["improvement", "bug-fix"]}>
  * Fix bug resulting in always showing tips for `gt ls`.
</Update>

<Update label="0.12.0" description="2021-08-23" tags={["improvement", "bug-fix"]}>
  * Disallow branching off an ignored branch.

  * Disallow sibling branches on top of trunk branch.

  * Establish pattern of toggleable CLI tips.

  * Rewrite `gt ls` to improve speed and output formatting.

  * Optimize git ref traversal and memoization.
</Update>

<Update label="0.11.0" description="2021-08-18" tags={["improvement", "bug-fix"]}>
  * Support PR templates in `stack submit` command.

  * Update `stack submit` to support interactive title and description setting.

  * Update `stack submit` to support creating draft PRs.

  * Allow max branch length to be configured (from the default of 50).

  * Fix a crash in logging that happened in a edge case involving trailing trunk branches.

  * Hide remote branches in `log long` output.
</Update>

<Update label="0.10.0" description="2021-08-17" tags={["improvement", "bug-fix"]}>
  * Fix case where commands fail if a branch's stack parent had been deleted.

  * Fix copy across CLI to use `gt` rather than the old `gp`.

  * Add more shortcut aliases for commands such as `s` for `submit`

  * Fix copy around `repo-config` to `repo`

  * Add command `branch checkout`

  * Refactor \`stacks\` command into \`log short\`

  * Update `log` command to support `log`, `log short` and `log long`

  * Support dropping the space on double-alias shortcuts. Eg \`branch next\` = \`b n\` = \`bn\`, \`stack submit\` = \`ss\` etc

  * Throw actionable errors if two branches point at the same commit.

  * Add top level `graphite` alias such that the CLI can be called using both \`gt\` and \`graphite\`.
</Update>

<Update label="0.9.1" description="2021-08-15" tags={["improvement", "bug-fix"]}>
  * Fix `gp` alias deprecation warning for homebrew installations.
</Update>

<Update label="0.9.0" description="2021-08-15" tags={["improvement", "bug-fix"]}>
  * Rename graphite CLI alias to `gt` from `gp` per feedback.
</Update>

<Update label="0.8.2" description="2021-08-13" tags={["improvement", "bug-fix"]}>
  * Improved performance of `gp stacks` command, particularly in repositories with a large number of stale branches.

  * Changed search-space limiting settings to live at the top level and apply to both stacks and log. (`gp repo max-stacks-behind-trunk`, `gp repo max-days-behind-trunk`).
</Update>

<Update label="0.8.1" description="2021-08-10" tags={["improvement", "bug-fix"]}>
  * Improved performance of `gp log` command, particularly in repositories with a large number of stale branches.

  * Users can now set the maximum number of stacks to show behind trunk in `gp log` (`gp repo log max-stacks-behind-trunk`) as well as the maximum age of stacks to show (`gp repo log max-days-behind-trunk`).

  * `gp log` also now has `--on-trunk` and `--behind-trunk` options.

  * Improved CLI documentation and copy.
</Update>

<Update label="0.8.0" description="2021-08-07" tags={["improvement", "bug-fix"]}>
  * Autogenerated branch name date format change.

  * stack fix command now has `stack f` alias.

  * branch create command now has `branch c` alias.

  * branch create command now has `branch c` alias.

  * `stack regen` is deprecated, and is now a flag for `stack fix --regen`.

  * `stack fix` now shows an interactive prompt by default.
</Update>

<Update label="0.7.1" description="2021-08-06" tags={["improvement", "bug-fix"]}>
  * Dont zero count months when generating branch names.

  * Improve help text for amend.

  * Improve help auth print out.
</Update>

<Update label="0.7.0" description="2021-08-05" tags={["improvement", "bug-fix"]}>
  * Refactor `gp log` command, while supporting old behavior with `gp log --commits/-c`

  * Check for updates in orphaned child process, making all commands faster.

  * More helpful validation error messaging.

  * `gp branch next/prev` now support interactive choices and stepping multiple branches.

  * `gp branch create [-m]` now doesn't commit by default. It can also autogenerate branch names from commit messages.

  * Added `gp commit create -m` for creating commits and fixing upstack.

  * Added `gp commit amend -m` for amending commits and fixing upstack.

  * Added `gp user branch-prefix [--set]` reading and setting your branch prefix.

  * Added `gp branch parent [--set]` plumbing command for reading and setting a branch parent.

  * Added `gp branch children` plumbing command for reading the children of a branch.
</Update>

<Update label="0.6.3" description="2021-08-02" tags={["improvement", "bug-fix"]}>
  * Better telemetry for measuring cli performance.

  * `gp l` alias for log command.
</Update>

<Update label="0.6.2" description="2021-08-02" tags={["improvement", "bug-fix"]}>
  * `stack fix` now works for a individual stack. (Upstack inclusive for now)
</Update>

<Update label="0.6.1" description="2021-08-02" tags={["improvement", "bug-fix"]}>
  * Fix homebrew release to not include a dev dependency on `chai`.
</Update>

<Update label="0.6.0" description="2021-08-02" tags={["improvement", "bug-fix"]}>
  * Support `--no-verify` flag when running `branch create` to skip precommit hooks.

  * Validation passes when a branch points to the same commit as trunk HEAD.

  * Add `repo init` command.

  * Self heal `.graphite_repo_config` file.

  * Always track trunk branch and ignored branches.

  * Update `stack regen` to always set stack foundations to trunk.

  * Update `stack regen` such that, when from from trunk, regenerates all stacks.

  * `branch next/prev` now traverses based on Graphite's stack metadata.

  * Refactor `gp stacks` print output.
</Update>

<Update label="0.5.4" description="2021-07-30" tags={["improvement", "bug-fix"]}>
  * Update `stack regen` to operate across entire stack rather than just upstack.

  * `stack submit` infers PR title from single-commit branches.

  * Using trunk branch inference, ignore trunk parents such as trailing `prod` branches.
</Update>

<Update label="0.5.3" description="2021-07-29" tags={["improvement", "bug-fix"]}>
  * Begin infering trunk branch from `.git` config.

  * Ignore trunk parent branches during validation and other operations.
</Update>

<Update label="0.5.2" description="2021-07-28" tags={["improvement", "bug-fix"]}>
  * \`upstack onto\` can now move branches with no parent branches.

  * `validate` now passes cases where branches point to the same commit.

  * `stack fix` now prints better messaging during rebase conflicts.

  * Removed unused args from `stack submit` and `stack fix`.

  * Updated copy
</Update>

<Update label="0.5.1" description="2021-07-28" tags={["improvement", "bug-fix"]}>
  * Dont automatically create repository config file.
</Update>

<Update label="0.5.0" description="2021-07-27" tags={["improvement", "bug-fix"]}>
  * Improved `stack submit` command and promoted command out of expermental status.
</Update>

<Update label="0.4.3" description="2021-07-27" tags={["improvement", "bug-fix"]}>
  * Update all copy to match new termonology from the 4.0.0 refactor.
</Update>

<Update label="0.4.2" description="2021-07-27" tags={["improvement", "bug-fix"]}>
  * Update `branch create` command to accept optional positional argument for branch name.
</Update>

<Update label="0.4.1" description="2021-07-27" tags={["improvement", "bug-fix"]}>
  * Fix demo command and downstack string.
</Update>

<Update label="0.4.0" description="2021-07-27" tags={["improvement", "bug-fix"]}>
  * Refactor all command names into a noun-verb subcommand pattern.

  * Introduce concept of `upstack` and `downstack`.

  * Simplify documentation.

  * Minor bugfixes.
</Update>

<Update label="0.3.4" description="2021-07-25" tags={["improvement", "bug-fix"]}>
  * Fix bug in checking for uncommitted changes.
</Update>

<Update label="0.3.3" description="2021-07-25" tags={["improvement", "bug-fix"]}>
  * Self heal if branch metadata parent somehow becomes self.

  * Diff rolls back changes if commit hook fails.

  * Fix bug in metadata stack traversal used by `fix` command.

  * Restack fails fast if there are uncommitted changes.
</Update>

<Update label="0.3.2" description="2021-07-24" tags={["improvement", "bug-fix"]}>
  * Slim down size of homebrew artifact.
</Update>

<Update label="0.3.1" description="2021-07-24" tags={["improvement", "bug-fix"]}>
  * Diff now only commits staged changes.
</Update>

<Update label="0.3.0" description="2021-07-24" tags={["improvement", "bug-fix"]}>
  * Support resolving merge conflicts during a recursive restack.

  * Update `sync` command to be visable in `--help`.
</Update>

<Update label="0.2.0" description="2021-07-22" tags={["improvement", "bug-fix"]}>
  * Update unlisted `gp sync` command to support trunk argument.

  * Update unlisted `gp sync` command to prompt before deleting branches.
</Update>
