> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Track Branches

> Learn how to track git branches with the Graphite CLI.

## Prerequisites

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Visualize a stack](/visualize-stack)

* [Create and submit pull requests](/create-submit-prs)

* [Edit the order of branches in a stack](/edit-branch-order)

* [Sync changes from a remote repository](/sync-with-a-remote-repo)

## Track branches with the CLI

If you're just getting started with Graphite, it's likely you have some branches floating around that you created with `git`, but you want to pull them into your `gt` workflow. Alternatively, there are situations in which tracking branches can help fix your `gt` state if your metadata ever gets messed up.

### Git passthrough

`git` passthrough enables users to switch between native `git` commands and `gt` without interrupting their workflow. There are a number of `git` commands that aren't implemented in `gt` because there's no need to recreate them. Here are several you may find useful throughout your workflow:

* `git add`: Stage files to commit; `-p` is helpful for precise cases

* `git stash:` Save changes for later (retrieve with `git stash pop`). Since restacking requires the working tree to be clean, stashing changes you don't intend to commit is often necessary while using `gt`. The `-p` option is just like `git add`'s.

* `git diff`: See what has changed between two branches.

* `git status`: Keep track of your worktree and staging area, just like `git`.

* `git rebase`: Useful for preparing branches created outside of Graphite to be tracked (see below). Also potentially dangerous (see below).

Knowing the effects/benefits of `git` passthrough is useful when working with externally created branches, since you may need to use a combination of `git` and `gt` commands to update your working state. If you ever need to do something that isn't natively supported in `gt`, you can *always* jump back to `git` and sync your changes to `gt` if needed.

### Track branches created outside of `gt`

Because of the "restacking" model, it is always safe to update your branches with simple `git` commands—a `gt restack` will rebase descendants so that they have the new version in their history.

If you use `git` instead of `gt` to create a branch, you must let `gt` know what its parent is with `gt track`. It prompts you to select a parent for the current branch from the branch's `git` history:

```bash Terminal theme={null}
# Ensure the branch you want to track has the desired parent in its history
# In this case, we want to stack our branch `first_branch` on `main`
git checkout first_branch
git rebase main first_branch


# Now, we'll track our branch
gt track
# alias
gt tr
```

If there is more than one potential parent for the `first_branch`, you'll be prompted to select one:

```bash Terminal theme={null}
? Select a parent for first_branch (autocomplete or arrow keys) ›
❯   last_branch
    some_other_branch
    main
```

If you want to track a specific branch that already exists, you can pass the branch name as an argument to `branch track`:

```bash Terminal theme={null}
gt track <DESIRED_BRANCH>
```

### Track a whole stack at once

Imagine you've created a stack of multiple branches outside of Graphite, or on a different machine, for example. If you run `gt track` from the tip, Graphite will automatically track multiple branches in a row iterating by parent commits from your current branch until you reach a branch that is already tracked. The `--force` flag chooses the nearest ancestor of each branch as its parent.

### Track branches to repair `gt` metadata

`gt track` can also be used to fix Graphite metadata if it ever becomes corrupted or invalid.

## Dangers of using a vanilla Git rebase

The CLI's engine keeps track of the base of each branch—meaning, the commit in its history that corresponds to its parent branch. This means that if you use a vanilla `git rebase` that removes that commit from the branch's history, **your branch and its children may suddenly become untracked**. In order to bring the branch back into Graphite, you must ensure the branch is correctly based on its parent, and then use `gt track` to fix its metadata.

Rebases that don't remove that base of the branch from its history are safe. For example, running a `git rebase -i` on the commits of a branch is safe, although there is a command for this called `gt modify --interactive rebase` that runs an interactive rebase and then restacks upstack branches when you `gt continue`.
