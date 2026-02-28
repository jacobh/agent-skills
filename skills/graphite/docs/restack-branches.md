> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Restack Branches

> Learn to restack Git branches efficiently with Graphite's CLI.

## Prerequisites

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Visualize a stack](/visualize-stack)

* [Create and submit pull requests](/create-submit-prs)

* [Update mid-stack branches](/update-mid-stack-branches)

* [Sync changes from a remote repository](/sync-with-a-remote-repo)

A key benefit of using Graphite as opposed to vanilla `git` when working with stacks is dependency management for your branches—keeping track of the "parent" of a given branch. When a parent branch changes in some way or is deleted, vanilla `git`, because it does not have this concept of branch dependencies, leaves the parent as-is.

`gt modify` [automatically restacks any dependent branches](/update-mid-stack-branches#automatic-restacking-of-branches) and prompts you to resolve merge conflicts when needed. Another instance that requires branch restacking is after you've [synced changes from a remote repository](/sync-with-a-remote-repo).

Here's the output of `gt log long` to get an idea of what's happening on the `git` level when `gt sync` is unable to automatically restack:

```bash Terminal theme={null}
> gt log long


* ff393d3 - (40 minutes ago) part 1 (#100) - Pranathi Peri (origin/main, origin/HEAD, main)
| * 7ebfd3f - (14 hours ago) part 3 - Pranathi Peri (origin/pp--06-14-part_3, pp--06-14-part_3)
| * 6fe5a7c - (14 hours ago) part 2 - Pranathi Peri (HEAD -> pp--06-14-part_2, origin/pp--06-14-part_2)
| * 4f3f756 - (14 hours ago) part 1 - Pranathi Peri
|/
```

`main` has advanced to the squash-and-merge commit for `part_1`, but `part_2`—even though it is supposed to be based on `main` now—is actually still sitting on the old version of `part_1`.

`gt restack` fixes that. This command, for the current stack, ensures that all branches are based on the current version of their parents.

```bash Terminal theme={null}
Hit conflict restacking pp--06-14-part_2 on main.


You are here (resolving pp--06-14-part_2):
◯ pp--06-14-part_3
◉ pp--06-14-part_2
◯ main


To fix and continue your previous Graphite command:
(1) resolve the listed merge conflicts
(2) mark them as resolved with gt add .
(3) run gt continue to continue executing your previous Graphite command
It's safe to cancel the ongoing rebase with `gt abort`
```

Resolving merge conflicts during a restack is performed the same way as amending or creating a new commit on a branch in the middle of a stack:

```bash Terminal theme={null}
> gt continue -a


Resolved rebase conflict for pp--06-14-part_2.
Restacked pp--06-14-part_3 on pp--06-14-part_2.


> gt log short


◯ pp--06-14-part_3
◉ pp--06-14-part_2
◯ main


> gt log long


* 543c8b3 - (14 hours ago) part 3 - Pranathi Peri (pp--06-14-part_3)
* 778006d - (14 hours ago) part 2 - Pranathi Peri (HEAD -> pp--06-14-part_2)
* ff393d3 - (44 minutes ago) part 1 (#100) - Pranathi Peri (origin/main, origin/HEAD, main)
```

After running the `restack` command, you can see that `git` and `gt` are in agreement about the history. Next, you may want to resubmit the restacked versions of these branches (`gt submit`), or make some changes to a branch mid-stack to address any review comments.
