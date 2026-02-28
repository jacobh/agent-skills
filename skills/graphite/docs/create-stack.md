> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create A Stack

> Learn how to create stacked branches with the Graphite CLI.

<Frame>
  <iframe width="750" height="360" src="https://www.youtube.com/embed/WgTe0B19slY?si=JhftN6K_coXzHwwy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
</Frame>

## Prerequisites

To create a stack of branches with the Graphite CLI, make sure you've:

* [Installed and configured the CLI](/install-the-cli)

* [Authenticated with GitHub](/install-the-cli#install-the-cli)

* [Initialized `gt`](/cli-quick-start#initializing-graphite) in a repo of your choice

## Create your first branch with the CLI

If you're familiar with the `git` workflow, creating a branch and staging/committing changes shouldn't be new to you. While using a `git`-style workflow to create branches in Graphite still works, we strongly recommend that you follow the Graphite workflow when creating and editing branches:

1. Add your changes directly on top of an existing branch. \*\*DON'T \*\*create an empty branch before doing so (we'll explain further down).

2. Stage these changes using `gt add -a` to stage all of your files, or `gt add <FILENAME>` to stage individual files

3. Create a new branch with these changes using `gt create ...`

This follows the traditional *stacked changes* workflow, treating each branch as an atomic changeset that contains (at least to start with) a single commit.

Graphite generally treats branches as if they were commits. This means that something you would break up into multiple commits in a typical `git` workflow, you would instead break up into multiple branches in Graphite (typically with one commit on each branch).

### Different ways to create a branch

Here are a few ways to create a branch containing a single commit using `gt create`:

```bash Terminal theme={null}
# navigate to the trunk branch of your repository
gt trunk


# * build part 1 of your feature *


# the following two commands create a new branch off of main with your changes and add a commit


# add all unstaged changes (same syntax as git add)
gt add -A
# create a commit on a new branch with its name inferred from your commit message
gt create
# OR specify your commit message via an option, just like git
gt create -m "part 1"
# OR you can also specify a branch name yourself
gt create making_part_1
# This works too!
gt create -m "part 1" making_part_1




# If you don't run `add`, you'll be prompted to add your changes interactively.
# You can also run `add` as part of the create command with the `-a` flag
gt create -am "part 1"


# You can make the previous command even shorter by using an alias (most common gt commands have an alias, and you can even configure your own!)
gt c -am "part 1"
```

### Configure a branch prefix

When using `gt create`, you can decide whether to pass in a branch name. A branch name is auto-generated from your commit message if a branch name isn't provided.

You can configure a prefix for `gt create` to add to all of your auto-generated branch names. See [Configure the CLI](/configure-cli) for more details.

## Stack more branches on top

Once you've created a branch with your first set of changes, you can continue to build your stack by issuing more `gt create` commands as you work.

```bash Terminal theme={null}
# * build part 2 of your feature *


# create a new branch on your stack
gt create -am "part 2"


# * build part 3 of your feature *


# create another new branch on your stack
gt create -am "part 3"
```

## Create a stack from an existing branch

If you have a large branch that you want to split up into a stack of smaller branches, you can use the `gt split` command. Learn more about [splitting a branch](/squash-fold-split).
