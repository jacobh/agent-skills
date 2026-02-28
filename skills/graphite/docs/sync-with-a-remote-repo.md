> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync Changes From A Remote Repository

> Learn how to sync changes from a remote repository with Graphite's CLI, managing branch updates and conflicts.

## Prerequisites

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Visualize a stack](/visualize-stack)

* [Create and submit pull requests](/create-submit-prs)

* [Update mid-stack branches](/update-mid-stack-branches)

## Sync changes from your remote repository

If your remote `trunk` branch (also known as `origin/main`) gets ahead of your local repository while you're developing, you can use `gt sync` to bring your stack up-to-date. Using a [trunk-based-development workflow](/trunk-based-development) allows you to frequently sync changes from your `main` branch without running into unmanageable merge conflicts.

`gt sync` does a few things:

* Pulls in the latest changes from `main`

* Prompts you to delete any stale local branches which have been merged into trunk

* [Restacks](https://graphite.com/docs/restack-branches) your upstack branches which have not been merged and your current stack onto `main`. If you encounter any merge conflicts, you'll be prompted to resolve them.

Let's say that you've squash-and-merged in the first branch in your stack, `pp--06-14-part_1`, of a three-branch stack. Since you know that your `main` branch has been updated with the changes of `pp--06-14-part_1,` you can sync that change from remote using the `gt sync` command:

```bash Terminal theme={null}
> gt sync


🌲 Pulling main from remote...
main fast-forwarded to 4604ea03f728126332fa23bbfa74643c18d2fca3.
🧹 Checking if any branches have been merged/closed and can be deleted...
✔ pp--06-14-part_1 is merged into main. Delete it? … yes
Deleted branch pp--06-14-part_1
Restacked pp--06-14-part_2 on main.
Restacked pp--06-14-part_3 on pp--06-14-part_2.
```

If you run `gt log`, you see that `part_2` is now based on `main`:

```bash Terminal theme={null}
◉ pp--06-14-part_3 (current)
│ 39 minutes ago
│
│ PR #101 part 3
│ pp--06-14-part_3: https://app.graphite.com/github/pr/withgraphie/pranathi-test-repo/102
│
│ 95338df - part 3
│
◯ pp--06-14-part_2
│ 39 minutes ago
│
│ PR #101 part 2
│ pp--06-14-part_2: https://app.graphite.com/github/pr/withgraphite/pranathi-test-repo/101
│
│ 95610c6 - part 2
│
◯ main (current)
│ 30 minutes ago
│
```

### Dealing with conflicts

Syncing from a remote repository is almost always followed by restacking any of the dependent branches. `gt sync` tries to restack as much as it can without needing your input to resolve conflicts.

You can think of restacking branches as distributing the new changes from your `main` branch across all of the branches that are dependent on trunk and haven't yet been merged.

If these changes conflict with changes you've made, `gt sync` might output something like:

```bash Terminal theme={null}
All branches restacked cleanly, except for:
▸ 09-14-part_4
You can fix these conflicts with gt restack.
```

This means you need to check out `09-14-part_4` and run `gt restack`, which will take into standard `git` conflict resolution (just like if you had hit conflicts during `gt modify`).
