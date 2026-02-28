> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Collaborate On A Stack

> Learn how to work on shared collaborative stacks with other Graphite users.

Learn how to work on shared collaborative stacks with other Graphite users. Stacking doesn’t have to be single-player, and it’s a great way to collaborate with teammates on a project or feature! This page talks about how to fetch remote stacks, stack on top of your co-worker’s PRs, and submit your own changes when working with others.

## Getting remote branches with gt get

`gt get` allows you to pull your coworker's stacks from remote into your local repository to see their changes on your own machine or as a starting point for collaboration.

For example, coworker A creates and submits their branch:

```bash Terminal theme={null}
gt create my_branch -m "My changes"
gt submit
```

Then, coworker B pulls the branch to their machine:

```bash Terminal theme={null}
gt get my_branch
```

This syncs all branches that `my_branch` depends on (starting from the bottom of the stack). If any of the branches already exist locally and differ from the remote version, Graphite will ask to either overwrite your local changes or rebase them on top of the remote version.

<Tip>
  `gt get` is also the recommended workflow for developers who work on more than one machine:submit draft PRs for your stack on one machine with `gt submit` and then use `gt get` from the other device.
</Tip>

## Building together

To build on top of your coworker's changes run `gt get` on the branch you want to build on top of, make your changes, and run `gt create` , exactly the same way you would to create a stack on-top of your own branch. For example, to stack some analytics changes on-top of your coworker's frontend changes:

```bash Terminal theme={null}
gt get "my-coworkers-frontend-changes"
touch analytics.js
gt create -m "add-analytics"
```

Lastly, when you're ready to, just run `gt submit` to submit your new branches to Graphite.

## Staying in sync

As you and your teammates push to your shared stack, you should both periodically run:

* `gt sync` to pull down any new changes the other has made to existing branches
* `gt get` for each net new branch the other has made
* `gt submit` to push up changes

If you encounter any conflicts during restacking, Graphite will drop you into the same conflict resolution flow that you are already familiar with from both Graphite and git.

<Note>
  `gt sync` restacks by default to keep your branches up-to-date with the latest remote. If your trunk branch has been updated, you may be prompted to resubmit changes (including rebase-only changes). If you'd like to sync without restacking, run `gt sync --no-restack`.
</Note>

## Getting a partial stack

By default, `gt get` will sync the full stack. If you'd like to pull down just part of a stack, you can run `gt get --downstack` to sync just downstack branches.

## Safely building on a coworkers stack

In `gt` version 1.7.0, the concept of "frozen" branches was introduced. A "frozen" branch will still be kept up to date with remote changes when it is synced, but will block local changes being made to it. This allows you to pull down a coworker's branch and stack on top of it without worrying about accidentally making edits to their changes.

* If `gt get` is pulling down a new branch, it will mark that branch as "frozen" by default (you can use the `--unfrozen` flag if you want to get the branch in an editable state).
* You can also use `gt freeze` and `gt unfreeze` to update the "frozen" status of a branch.
* You can see if a branch is frozen or not with the `gt info` or `gt log` command.

## Advanced: collaborating on non-Graphite branches

We strongly recommend that coworkers who wish to collaborate on a branch both use `gt` to ensure that the dependencies are managed and synced correctly as you work together.

Only branches that your coworkers have submitted with `gt` can be synced down to your local environment, as we rely on the Graphite submission to keep track of the dependency tree.

If you want to stack on top of your non-Graphite-using coworkers’ branches, the best way to do this is `git pull` and `gt track`. However, Graphite will rebase these branches on a `gt sync`, just like branches you created.
