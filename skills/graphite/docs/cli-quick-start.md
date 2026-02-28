> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start

> Learn to create stacked pull requests with the Graphite CLI.

## Introduction

The `gt` CLI tool has 2 key purposes:

1. Simplifying git commands, especially some of the sharper edges like rebasing.

2. Enabling PR stacking, which can help you move faster and stay unblocked.

We think simplifying `git` and pull request creation is compelling on its own! However, adding pull request stacking to your workflow levels it up even further.

<Tip>
  To read about the benefits of pull request stacking, visit [stacking.dev](https://stacking.dev).
</Tip>

## Initializing Graphite

To use the Graphite CLI in a Git repository, we need to know your trunk branch (typically `main` or `master`). This helps us know where to merge pull requests, and how to synchronize changes from your upstream `origin`.

To initialize your repository, run `gt init`:

```bash Terminal theme={null}
cd ~/my-project
gt init
```

The CLI will prompt you to select a trunk branch for your development flow. Follow the prompt to choose a trunk branch, and press **Enter** to confirm.

This configuration is stored at `.git/.graphite_repo_config` inside each repository you initialize.

<Note>
  If you forget to run `gt init` in your repository, don't worry! All `gt` commands check for initialization first, and will auto-prompt you to choose a trunk branch at the time of running any command.
</Note>

## The workflow

This guide will walk you through the lifecycle of stacking: creating stacks, responding to reviewer feedback up and down the stack, pulling in new changes from the main branch to open stacks, and finally merging.

Not all changes require stacks, but the same commands & concepts apply to a single PR as to a stack of 25 PRs.

The Graphite workflow can be broken down to the following steps:

<Steps>
  <Step title="Create a stack" />

  <Step title="Submit the stack" />

  <Step title="Address feedback" />

  <Step title="Merge the stack" />

  <Step title="Sync from trunk & clean up your merged branches locally" />
</Steps>

### Creating a first pull request

Creating a pull request with `gt` should feel similar to workflows you already do with GitHub:

```bash Terminal theme={null}
# Checkout the main branch using gt checkout
gt checkout main


# Make changes with your editor
echo "new code changes" >> file.js


# Create a branch with a single commit
#   - the --all flag will stage any modified files
#   - a branch will be created from the given `--message`
#   - the commit will have the given `--message`
#   - the branch will be checked out for you
gt create --all \
	--message "feat(api): Add new API method for fetching users"


# Push changes to your remote and create a new pull request
gt submit


# If you need to make any follow up changes to the PR, you can
# amend the existing commit with gt modify
echo "some more changes" >> file.js
gt modify --all


# Submit new changes
gt submit
```

### Stacking a second pull request

While you're waiting for a review on your first pull request, you can continue to build out changes by stacking a second pull request on top of the first.

A stack is **a sequence of pull requests**, each building off of its parent. Stacks enable users to break up a large engineering task into a series of small, incremental code changes, **each of which can be tested, reviewed, and merged independently**. If you aren't sure how to start breaking up your changes into stacks of PRs, check out our more detailed guide with [5 helpful frameworks for structuring a stack](/how-to-structure-your-stacks).

`gt` treats stacking as a first-class concept. Stacking new PRs, addressing reviewer feedback in any part of your stack, and making sure upstack branches stay in sync with changes downstack are all seamlessly handled for you by the core `gt` commands.

To stack more changes on top of an existing pull request:

```bash Terminal theme={null}
# Open an interactive branch picker:
#
#   - select the pull request you want to stack on top of
#   - press Enter
#
# to check the branch out.
gt checkout


# Make changes with your editor
echo "update frontend to use the API from PR 1" > \
  frontend/admin/UsersPage.tsx


# Create a second PR on top of the first one
gt create --all \
  --message "feat(frontend): Load and show a list of users"


# Push the stack, which will also create a 2nd pull request
# on top of the first one
gt submit --stack
```

Visualize your new stack locally:

```bash Terminal theme={null}
gt log short  # or run `gt ls`
```

Now that it's pushed, open the PR in Graphite:

```bash Terminal theme={null}
gt pr
```

and assign reviewers using the UI.

If you prefer assigning a reviewer at the same time as submitting, run:

```bash Terminal theme={null}
gt submit --stack --reviewers alice
```

to assign **@alice** as the reviewer on each PR in the stack.

<Tip>
  **Tip**

  You can repeat the process of checking out the top branch, making changes, and creating a new branch with `gt create` to create larger and larger PR stacks.
</Tip>

### Addressing reviewer feedback

It's likely that you'll be asked to make some changes to your stack as a result of code review. The `gt modify` command will let you edit any branch in a stack, and automatically restack all the branches above it.

Example: You have a stack of 2 PRs, and your coworker asks you to make changes on the bottom-most PR.

First, checkout the bottom PR and address the changes in your editor:

```bash Terminal theme={null}
gt checkout first_pr_in_the_stack
echo "making some edits" > a_file_my_coworker_wants_changed.js
```

Next, run `gt modify` to **amend** the last commit in this branch and **restack** all the branches above it:

```bash Terminal theme={null}
gt modify -a
```

An equivalent (but more manual) way to do this would be:

```bash Terminal theme={null}
git add a_file_my_coworker_wants_changed.js
git commit --amend --no-edit
gt restack  # restack all the branches above
```

Now the first branch has the **new changes** from your PR feedback, and the second branch stacked on top is fully **up to date** with those changes as well.

If you prefer to make a 2nd explicit commit for your PR feedback changes, you can do that with `gt modify` as well. Replace the `gt modify -a` command with:

```bash Terminal theme={null}
gt modify --commit \
	--all \
	--message "Responded to reviewer feedback"


# OR shorthand
gt modify -cam "Responded to reviewer feedback"
```

and a new commit will be created for you. All branches above the current branch will be restacked on top of this new commit.

### Pulling the latest changes from main into your stack

As you're developing new features, the `main` trunk branch will eventually get ahead of your open branches.

To update all of your open stacks with the latest changes from `main`, run:

```bash Terminal theme={null}
gt sync
```

This command will:

* Pull the latest changes into main

* Restack (rebase) all your open PRs on top of the new changes in main

* Prompt you to delete any local merged/closed branches

If any of your stacks happen to have merge conflicts as a result of restacking on the new main, gt sync will prompt you to checkout those branches, and manually run `gt restack` to fix any conflicts.

### Merging your stack

Once your stack has been reviewed and is passing CI, open the top of the stack in the Graphite UI:

```bash Terminal theme={null}
# Checkout the top PR in the stack
gt top


# Open the PR in Graphite
gt pr
```

On the PR page, merge the stack by clicking the **Merge** button.

To only merge the first part of a stack and leave the rest unmerged, navigate downstack on the PR page to the top-most PR you want to merge from, and press the **Merge** button from there.

### Sync from trunk & clean up your merged branches locally

Once you've merged your stack into `main` (or whatever your trunk branch is), run `gt sync` to get the latest changes in `main`. In addition to fetching updates, `gt sync` will:

* Automatically detect any merged/closed branches and prompt you to delete them locally.

* Rebases any branches/stacks you have locally onto the newest changes.

<Tip>
  **Tip**

  To make sure you're always working on the most up-to-date version of your base branch, make sure you're frequently running `gt sync` throughout your workflow.
</Tip>
