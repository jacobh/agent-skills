> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Mid Stack Branches

> Learn how to make changes to mid-stack branches and auto-restack seamlessly with Graphite CLI.

You can iterate on your stack before it's merged by using the following three concepts:

* Using `gt checkout` to hop between branches in your stack

* Adding changes to a branch using `gt modify`

* Pushing the new changes to remote using `gt submit`

## Prerequisites

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Visualize a stack](/visualize-stack)

* [Navigate a stack](/navigate-stack)

* [Create and submit pull requests](/create-submit-prs)

## Working with commits

Any branch you create with Graphite (using the [recommended workflow](/create-stack#create-your-first-branch-with-the-cli)) will already contain a commit with your initial changes. There are two main ways to update your branch with new changes:

* Maintain the 1:1 relationship between commits and branches, meaning you'll use `gt modify` to continuously amend the commit on the branch (recommended)

* Create multiple commits on each branch using `gt modify --commit` each time you make changes

### Amend commits

By default, the `gt modify` command amends the commit on the branch. Here's how you would address feedback on a branch in the middle of your stack by amending a commit:

```bash Terminal theme={null}
# address review comments by amending a commit


# navigte to the appropriate branch in the stack
gt checkout some_branch_mid_stack


# make some changes to your files


# amend the latest commit on that branch (this automatically restacks any branches upstack)
gt modify -a
# OR don't pass the -a flag to be prompted to stage changes interactively
gt modify


# you can also use aliases for both of these commands
gt co some_branch_mid_stack
gt m -a
```

### Create commits

If you prefer to create an entirely new commit for each of the changes you make to a branch, you can use `gt modify` with the `--commit` flag:

```bash Terminal theme={null}
# navigte to the appropriate branch in the stack
gt checkout some_branch_mid_stack


# make some changes to your files


# create a new commit (this automatically restacks any branches upstack)
gt modify --commit -am "my fourth commit"
# OR don't pass -a or -m to be prompted to enter a commit message and stage changes interactively
gt modify --commit


# you can also use aliases for both of these commands
gt co some_branch_mid_stack
gt m -c
```

### Automatically restack branches

Given that there are no merge conflicts (see next section), `gt modify` will automatically restack any upstack branches on top of your new changes and provide the following output:

```bash Terminal theme={null}
1 file changed, 0 insertions(+), 0 deletions(-)
create mode 100644 my amended commit
Restacked next_branch on some_branch_mid_stack.
Restacked last_branch on next_branch.
```

### Resolve upstack conflicts when modifying branches

If `gt modify` encounters any conflicts as they recursively restack your branches, you'll be prompted to resolve your conflicts before continuing:

```bash Terminal theme={null}
Hit conflict restacking next_branch on some_branch_mid_stack.


You are here (resolving next_branch):
◯ top_branch
◉ next_branch
◯ some_branch_mid_stack
◯ first_branch
◯ main


To fix and continue your previous Graphite command:
(1) resolve the listed merge conflicts
(2) mark them as resolved with gt add .
(3) run gt continue to continue executing your previous Graphite command
It's safe to cancel the ongoing rebase with `gt abort`
```

You can always exit out of the rebase using `gt abort`.

Read more about [restacking branches](/restack-branches).

## Absorbing changes into your stack

While `gt modify` allows you to make changes to a single branch in your stack, Graphite also provides `gt absorb`, which automatically applies your changes to the relevant branches throughout your stack, without needing to check each one out individually.

Each change will be amended into the correct commit in a branch downstack from the currently checked out branch, inclusive.

Before applying the changes, `gt absorb` will show which lines will be absorbed into each commit, and prompt for confirmation (unless the `--force` flag is passed).

```bash Terminal theme={null}
# Receive review comments on your stack


# Make changes


# absorb all changes into the branches downstack of the current branch, inclusive (this automatically restacks any branches upstack)
gt absorb -a
# OR don't pass the -a flag to be prompted to stage changes interactively
gt absorb
```

### How does `gt absorb` work?

For each "hunk" of changed lines, `gt absorb` attempts to "commute" the change with each commit in your stack to find the most recent commit that they do not commute with, which tends to be the correct commit to amend them to. It is possible that a hunk commutes all the way down to your trunk branch, in which case it will not be absorbed into any commit. In this case, you can then apply those changes to the correct branch manually with `gt checkout` and `gt modify`.
