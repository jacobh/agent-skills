> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Develop On Multiple Trunk Branches

> Learn how to develop against multiple trunk branches with the Graphite CLI.

Some codebases don't have a single trunk branch (e.g. all commits go to `main`), but rather multiple longer-lived trunk branches. Some reasons for this workflow may be release/deploy branches, long-lived feature branches, or staging branches. In these setups, creating branches and PRs off the correct trunk branch is critical for many reasons:

* **Developing:** The output of `gt ls` will be clearer, e.g. running `gt ls` on `main` will show stacks based on `main`.

* **Reviewing:** Requirements like CI status will be evaluated against the trunk branch's branch protection rules on Graphite's PR page. This is especially useful for upstack PR's, where Graphite evaluates requirements like CI against trunk.

* **Merging:** Graphite's [Merge feature for stacks](/merge-pull-requests) will merge down to the correct trunk branch.
  <Note>[Merge When Ready](/merge-when-ready) is only supported for merges into the default branch of your repo. Make sure you are enabling Merge When Ready only for PRs that you intend to merge into the default branch.</Note>

The guide below shows you how to use Graphite for such projects.

## Prerequisites

Your CLI version should be >= `1.4.0`. If you are on a lower version, [update your CLI version](/update-cli) to get the latest first-class support for multitrunk workflows.

You should be familiar with how to:

* [Create branches in a stack](/create-stack)

* [Create and submit pull requests](https://graphite.com/create-submit-prs)

<Info>Graphite treats each configured trunk independently and can only merge stacked PRs into their trunk. Performing trunk-to-trunk merges, such as updating a long-lived feature trunk with changes from a main trunk or vice-versa, is outside Graphite's scope and users can continue using their own `git` or CI workflow to handle this without conflicting with Graphite.</Info>

## Creating PRs off different trunks

The trunk branch is the root of your stack that you open PRs against and eventually merge into. When you first initialize the CLI in a repo, Graphite will ask you to select a trunk branch. In the following tree, `main` is the trunk and all the stacks are based off it. Each branch has a single dependency so each stack can only have a single trunk.

```bash Terminal theme={null}
◯    bug-fix
│ ◯  feature1-frontend
│ ◯  feature1-backend
◉─┘  main
```

In order to create a PR off a different trunk branch, you need to configure the branch you want to base off of as another trunk. Then you can check out that other trunk branch and create new branches off it. When you submit PRs for the branches based off other trunks, they will be based off these other trunks. The Graphite workflow is the same across trunks and Graphite now makes working with multiple trunks easy.

For example, say you had a release branch `release-v10` that you needed to merge a bug fix into. You would first need to add `release-v10` as a trunk branch. Then you can checkout the new trunk with `gt checkout release-v10`. Once you've implemented your fix, you can use `gt create` to create a branch for it in the same way as any other branch. You can then submit a PR for the bug fix which will open a PR against the trunk `release-v10`. Your state will now look like the following:

```bash Terminal theme={null}
◯    bug-fix-1
│ ◯  feature1-frontend
│ ◯  feature1-backend
◯─┘  main


◉  bug-fix-2
◯  release-v10
```

To switch back to working off of `main`, simply checkout `main` again with `gt checkout main`. Graphite supports easily switching between branches, even across trunks.

The next sections go into detail about how to add additional trunks and work with multiple trunks.

## Configuring trunks with the CLI

When you first initialize the CLI in a repo, Graphite will ask you to select a trunk branch.

```bash Terminal theme={null}
Welcome to Graphite!


? Select a trunk branch, which you base branches on - inferred trunk main (autocomplete or arrow keys) ›
❯   main
    release-v10
    green
```

After initial set up, you can then interactively configure what trunk branches you have configured via `gt config`:

Run `gt config`:

```shell  theme={null}
gt config
```

Select `Repository-level settings` then `Trunk branches`:

```bash Terminal theme={null}
? What would you like to configure? › - Use arrow-keys. Return to submit.
❯   Repository-level settings
    Branch naming settings
    Submit settings
    Restack settings
    Default utilities
    Tips
    Yubikey reminders
    Exit
```

```bash Terminal theme={null}
? Repo-level configuration › - Use arrow-keys. Return to submit.
❯   Trunk branches
    PR Templates
    Remote repository
    Back
    Exit
```

See your currently configured trunk branches, and the different options for configuring trunk branches:

```bash Terminal theme={null}
? Configured trunks:
        main
        release-v10
 › - Use arrow-keys. Return to submit.
❯   Add additional trunk branch
    Remove configured trunk
    Configure a target trunk to open PRs against
    Back
    Exit
```

### Adding an additional trunk branch

From the interactive menu, select `Add additional trunk branch`:

```bash Terminal theme={null}
? Configured trunks:
        main
        release-v10
 › - Use arrow-keys. Return to submit.
❯   Add additional trunk branch
    Remove configured trunk
    Configure a target trunk to open PRs against
    Back
    Exit
```

Select the branch you want to configure as a trunk:

```bash Terminal theme={null}
? Select a trunk branch, which you base branches on (autocomplete or arrow keys) ›
     main
     develop
❯    release-v10
```

You can also add an additional trunk branch non-interactively by using the `--add` flag with the [gt trunk](/command-reference#gt-trunk) command:

```bash Terminal theme={null}
gt trunk --add <trunk-name>
```

### Removing a configured trunk branch

**Note that removing a configured trunk may un-track all branches based locally on this trunk.**

From the interactive menu, select `Remove configured trunk`:

```bash Terminal theme={null}
? Configured trunks:
        main
        release-v10
 › - Use arrow-keys. Return to submit.
    Add additional trunk branch
❯   Remove configured trunk
    Configure a target trunk to open PRs against
    Back
    Exit
```

Select the configured trunk you would like to remove:

```bash Terminal theme={null}
? Which configured trunk would you like to remove? ›
❯   main
    deploys
```

### \[Optional] Configuring a target trunk to open PRs against

**This is a not a common workflow and usually only used in workflows where you work off a branch locally (i.e. \*\***`green`\***\*) that is strictly a descendant of the branch they merge into (i.e. \*\***`main`\***\*)**. Targeting a different branch on remote than the one you have locally can otherwise have unknown consequences in the Graphite CLI.

By using this setup, you are choosing to open PRs against a different trunk than the one you work on locally. This means that you can base your branches off `green` locally and have all PRs submitted through Graphite open PRs against another branch, `main`.

From the interactive menu, select `Configure a target trunk to open PRs against`:

```bash Terminal theme={null}
? Configured trunks:
        main
        release-v10
 › - Use arrow-keys. Return to submit.
    Add additional trunk branch
    Remove configured trunk
❯   Configure a target trunk to open PRs against
    Back
    Exit
```

Select the local trunk you would like to set a target trunk for:

```bash Terminal theme={null}
WARNING: You are about to configure Graphite to open PRs against a different remote branch than the one you are based on locally.
WARNING: This is an uncommon workflow since most users develop locally based off the same branch they are merging PRs into.
WARNING: This workflow is only recommended if your local branch is a descendant of the remote target.
? Which configured trunk would you like to set a target trunk for? ›
❯   green
    release-v10
```

Select the remote branch you would like to open PRs against on remote (by default, Graphite opens PRs against the same trunk you have set locally):

```bash Terminal theme={null}
? For branches based on main, which remote branch should Graphite open PRs against?
By default, PRs will be opened against main on remote. ›
    green (default)
❯   main
    release-v10
```

## Working with multiple trunks

By default, all Graphite commands assume you are working off a single trunk. For times when you want to do things across multiple trunks, some commands have a `--all` flag to see/perform actions across all configured trunks. Everything else should work normally.

### Seeing your configured trunks

`gt trunk` will print out the trunk your current branch is based off of:

```bash Terminal theme={null}
> gt trunk
main
```

`gt trunk --all` will print out all your configured trunks:

```bash Terminal theme={null}
> gt trunk --all
main
deploys
```

### Seeing your stacks across trunks

`gt log [short]` will show you your stacks on your current trunk:

```bash Terminal theme={null}
> gt log short
◉    bug-fix
│ ◯  feature1-frontend
│ ◯  feature1-backend
◯─┘  main
```

`gt log [short] --all` will show you all your stacks across all your configured trunks:

```bash Terminal theme={null}
> gt log short --all
◉    bug-fix-1
│ ◯  feature1-frontend
│ ◯  feature1-backend
◯─┘  main


◯    bug-fix-2
│ ◯  bug-fix-3
◯─┘  release-v10
```

### Checking out branches across trunks

`gt checkout {branch_name}` will work with any Graphite tracked branch, regardless of the trunk it is based off of.

In the interactive selector, `gt checkout` will by-default only show you options based off your current trunk.

```bash Terminal theme={null}
> gt checkout
? Checkout a branch (autocomplete or arrow keys) ›
❯   ◯    bug-fix-1
    │ ◯  feature1-frontend
    │ ◯  feature1-backend
    ◯─┘  main
```

Add the `--all` flag to see all branches across all configured trunks.

`gt checkout --all`:

```bash Terminal theme={null}
> gt checkout --all
? Checkout a branch (autocomplete or arrow keys) ›
❯   ◯    bug-fix-1
    │ ◯  feature1-frontend
    │ ◯  feature1-backend
    ◯─┘  main (trunk)
    ◯    bug-fix-2
    │ ◯  bug-fix-3
    ◯─┘  release-v10 (trunk)
```

### Moving branches across trunks

Similar to `checkout`, `gt move --onto {branch_name}` will work with any Graphite tracked branch, regardless of the trunk it is based off of. Add the `--all` flag to see all branches across all configured trunks.

### Syncing branches across trunks

By default, `gt sync` will only update the trunk you are currently based off of and sync branches based off this current trunk. To update all your trunks and sync branches based off all your trunks at once, pass the `--all` flag.

## Troubleshooting

**PR is targeting the wrong trunk.** You can fix this by simply moving the branch onto the correct trunk: `gt move --onto {trunk}`. After that, you can submit your stack to reflect the changes remotely. Learn more about [tracking branches with gt track](/track-branches).

## Versions before 1.4.0

Before `1.4.0`, Graphite only supported working off a single trunk at a time. So to switch trunk branches, you had to re-initialize the CLI with a different trunk every time you needed to switch which trunk you were working off of:

```bash Terminal theme={null}
gt init --trunk <trunk-name>
```

There was no real support for working on multiple trunks simultaneously.
