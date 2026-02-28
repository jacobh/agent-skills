> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Edit The Branch Order In A Stack

> Learn how to edit the branch order in a stack using Graphite CLI commands.

## Prerequisites

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Visualize a stack](/visualize-stack)

* [Create and submit pull requests](/create-submit-prs)

* [Update mid-stack branches](/update-mid-stack-branches)

* [Sync changes from a remote repository](/sync-with-a-remote-repo)

## Edit the order of branches in your stack

The Graphite CLI allows you to modify the dependencies of any of your branches often with just a single command.

### gt move to modify branch ordering

`gt move` rebases the current branch and all of its recursive children (anything upstack of the current branch) onto a branch of your choice.

```bash Terminal theme={null}
# check out the branch you wish to uproot (no pun intended)
gt checkout second_branch
# run gt move with no arguments to open an interactive picker
gt move
```

Output of the previous commands:

```bash Terminal theme={null}
? Choose a new base for second_branch (autocomplete or arrow keys) ›
    ◯    another_first_branch
❯   │ ◯  first_branch
    ◯─┘  main
```

You can also run `gt move --onto <BRANCH_NAME>` if you already know the branch name of your current branch's new parent. After successfully running `gt move --onto` with `main`, you should see the following output (given that there are no merge conflicts)

```bash Terminal theme={null}
Restacked some_branch_mid_stack on main.
Restacked next_branch on some_branch_mid_stack.
```

### gt reorder to modify branch ordering

If you've created a stack of several branches and want to open an editor to do an interactive re-ordering of branches, you can use `gt reorder`. `gt reorder` opens an editor that allows you to manually copy and paste branch names into different orders. The editor will only show the branch you currently have checked out, as well as anything downstack (ancestors) of it.

```bash Terminal theme={null}
# check out the branch
gt branch checkout some_branch_mid_stack
# reorder downstack branches
gt reorder
```

Output of the previous commands (in a vim editor):

```bash Terminal theme={null}
third_branch
second_branch
first_branch
# main (trunk, shown for orientation)
#
# Stack will be rearranged on trunk to match the above order.
~
~
~
~
```

You can shuffle, add, and delete branches as necessary to produce a stack that has the dependencies you desire. For example, deleting `second_branch` in the above example yields the following output:

```bash Terminal theme={null}
first_branch does not need to be restacked on main.
Restacked third_branch on first_branch.
```

### --insert flag on create to modify branch ordering

To create an entirely new branch in the middle of a stack and automatically rebase any dependent branches, use the optional `--insert` branch when invoking the `gt create` command. See the following example:

```bash Terminal theme={null}
# check out the branch on top of which you want to create some changes
gt checkout first_branch


# * create some changes *


# stage, commit, and insert your changes with gt branch create
gt create --all --insert --message "inserted_branch"


# aliases for the previous two commands
gt co first_branch_in_the_stack
gt c -aim "creating_a_branch_in_between"
```

Output of the previous commands:

```bash Terminal theme={null}
[inserted_branch bad2ec6] inserted_branch
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 inserted_branch
Restacked second_branch on inserted_branch.
```

### Resolve merge conflicts when editing branch ordering

Under the hood, `gt move` , `gt reorder`, and `gt create --insert` perform restacks just like `gt modify` —and there is a chance you can run into merge conflicts when invoking them. If you do, you can follow the same flow as [encountering merge conflicts after creating/amending commits](/update-mid-stack-branches) to branches mid-stack.
