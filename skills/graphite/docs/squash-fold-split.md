> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Squash, Fold, And Split Changes

> Learn how to squash, fold, and split changes with the Graphite CLI.

## Prerequisites

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Visualize a stack](/visualize-stack)

* [Update mid-stack branches](/update-mid-stack-branches)

## Squash commits in a branch

`gt squash` allows you to squash multi-commit branches into a single commit branch, restacking upstack branches if necessary. This command is useful if you meant to run `gt modify` instead of `gt modify -c`, or to maintain single-commit branches after invoking `gt fold`. For example:

```bash Terminal theme={null}
> gt log
◉ 06-28-second_branch (current)
│ 10 minutes ago
│
| 6s7a8d7 - last committed change
│ d7d41b6 - committing another change
│ 8c6d8de - committing some changes
│
◯ 06-28-first_branch
│ 5 minutes ago
│
│ 232e8cf - initial commit
│
◯ main
│ 10 minutes ago
│
│ 1e0b290 - Merging a pull request


# we want to squash the three commits on 06-28-second_branch into one
> gt squash


# /* opens an interactive editor to rename the single commit */


> gt log
◉ 06-28-second_branch (current)
│ just now
|
│ 9e13a52 - a single commit
│
◯ 06-28-first_branch
│ 5 minutes ago
│
│ 232e8cf - initial commit
│
◯ main
│ 10 minutes ago
│
│ 1e0b290 - Merging a pull request
```

## Fold branches together

`gt fold` folds (combines) the current branch into its parent, and makes all children of the current branch children of the parent branch accordingly. It preserves the commit history of both the branches and their descendants. By default, it will use the name of the parent for the resulting combined branch, but you can use the name of the branch being folded (current branch) instead with the `--keep` flag. For example:

```bash Terminal theme={null}
> gt log
◉ 06-28-second_branch (current)
│ 10 minutes ago
│
│ d7d41b6 - committing another change
│ 8c6d8de - committing some changes
│
◯ 06-28-first_branch
│ 5 minutes ago
│
│ 232e8cf - initial commit
│
◯ main
│ 10 minutes ago
│
│ 1e0b290 - Merging a pull request


# we want to fold 06-28-second_branch into 06-28-first_branch
> gt fold
# or
> gt f
Folded 06-28-second_branch into 06-28-first_branch.


> gt log
◉ 06-28-first_branch (current)
│ just now
│
│ d7d41b6 - committing another change
│ 8c6d8de - committing some changes
│ 232e8cf - initial commit
│
◯ main
│ 10 minutes ago
│
│ 1e0b290 - Merging a pull request
```

## Split a branch into multiple branches

`gt split` splits the current branch into two or more branches. You can use one of three methods to split a branch:

* `--by-commit/--commit/-c`

* `--by-hunk/--hunk/-h`

* `--by-file/--file/-f`

If there is only one commit on the branch, you will enter `hunk` mode automatically. If there's more than one commit on the branch and you don't pass in an option, you'll be prompted to choose one.

### By commit using the `--by-commit` flag

In this mode, you split your branch along already-defined commit boundaries. For example, if you have a branch with five commits on it, you could put the first three into one branch and the others into another. This preserves commit history of the original branch and its descendants.

<Frame>
  <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://www.datocms-assets.com/85246/1687975920-rpreplay_final1687975546.mov" />
</Frame>

### By hunk using the `--by-hunk` flag

This mode allows you to split your branch by selecting hunks that you'd like to apply to each new branch. The interface is made up of iterative calls to `git add --patch`, which prompts you to stage your changes. You can split your branch by first staging only those you'd like to include in the first branch, then giving it a name, then moving on to the second, giving that one a name, and so on.

<Frame>
  <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://www.datocms-assets.com/85246/1687975922-rpreplay_final1687975370.mov" />
</Frame>

### By file using the `--by-file` flag

This mode allows you to split files matching the specified pathspec into a new parent branch of the branch you're splitting.
Examples:

* `gt split --by-file "*.json"` : all json files

* `gt split -f "folder/**"` : all files in the specified folder

* `gt split -f "*.json" -f "*.yaml"` : match multiple patterns

<Note>
  The branch name on a GitHub PR is **immutable**, so if you already have a PR open for a branch you're splitting and would like one of the new branches to stay attached to the PR, **make sure to give the original branch's name to that new branch**!

  For example, if I have a PR open for my branch `new_feature` and I get asked to split out a necessary refactor that I included in the same branch, I can split my branch into `necessary_refactor` and (a now smaller) `new_feature`. When I resubmit, my feature changes will stay attached to any ongoing discussion on the original PR.
</Note>
