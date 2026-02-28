> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Evaluating Tools For Stacking

> Learn about the differences between Graphite and other tools for stacking pull requests.

Graphite aims to enable a stacked-PR workflow with an industry-standard version control system (GitHub). Besides Graphite, there are other tools aiming to solve this problem as well.

## Comparing Phabricator and Graphite

You can think of a Graphite design goal as bringing the Phabricator code review and authoring experience to GitHub, such as a robust review queue and first-class support for stacking—along with some enhancements, such as bidirectional syncing with GitHub and Team Insights.

As a result of being built on GitHub, there are some differences. For example, Phabricator PRs (“diffs”) have a single state tied to the PR, while Graphite (and GitHub) PRs convey state on a per reviewer level.

Both Graphite and Phabricator encourage stacking atomic changes that are reviewed one at a time, but the tools and steps differ in some ways (the `gt` flow vs. the `arc` flow). And it’s not always straightforward to compare the Mercurial vs. `gt` workflows one-to-one. For example, in Mercurial you would commit as usual, then submit with `arc diff` / `jf submit`. In Graphite, you commit using `gt create` and `gt submit`.

Overall however Graphite offers the best features of Phabricator, along with a greatly improved, polished user experience.

## Comparing Sapling and Graphite

[Sapling](https://sapling-scm.com/) is a source control system with a CLI and review interface that sits on top of GitHub. It’s inspired by the versions of Mercurial and Phabricator used internally at Meta, and is maintained by [Meta Open Source](https://opensource.fb.com/). Graphite and Sapling provide similar CLI tools (with some differences), and a review interface optimized for diff stacking. There are some key differences between the products to consider when choosing one.

### CLI comparison

The Sapling CLI requires that you clone a new repository using `sl`, meaning you can't use familiar `git` commands. Each `sl` command is used completely in place of its equivalent `git` command.

The Graphite CLI works on any repository as long as you’ve initialized `gt` inside of it (using `gt repo init`, or invoking any other `gt` command). The `gt` CLI also utilizes Git passthrough: `gt` will pass any commands it doesn’t know through to `git` so that your regular `git` workflow remains uninterrupted.

#### Branching and commits

Sapling doesn’t have a staging area (like there is in `git`), and each branch has exactly one commit —this may look familiar and feel comfortable to those coming from a Mercurial background, but might feel restrictive to those coming from Git.

Graphite is flexible across multiple workflows in order to account for developers of all backgrounds and experiences. Depending on what you’re comfortable with, you can stage your changes, create multiple commits on a branch, continuously amend one commit and so on, all while maintaining the ability to stack and submit PRs with `gt`.

#### Commands

Sapling commands are straightforward and generally do one task each.

Graphite commands range from simple to more complex and can execute several subsequent `git` commands under the hood to try to automate some of the more repetitive parts of the workflow.

Sapling has support for commands like `undo` which Graphite doesn’t yet support.

Both Sapling and Graphite CLI tools optimize development for stacked changes, and both automatically rebase your modifications as you build your stack. In general, Sapling reflects a workflow very close and true to Mercurial’s, while Graphite is a bit more flexible and might be more accommodating for users who are starting with an established Git workflow.

### Review interface comparison

Sapling’s ReviewStack is a minimal interface that allows you to see a list of PRs on a repository along with their approval state. Graphite’s app features a “pull request inbox” that functions like an email client.

#### App features

Graphite shows the overall approval state of the PRs as well as merge conflict status, check statuses, individual reviewer statuses, and the last updated date. It includes five pre-made sections with PRs that need your review, have been approved, returned to you for changes, and so on. You can also modify and create custom sections with filters on properties like author, date published, and status.

#### Design systems

Sapling’s ReviewStack uses the GitHub design system, which may be more visually familiar for GitHub users but lacks some of the features from GitHub.

Graphite uses a unique design system and components and supports more features for writing comments and reviews.

#### Comment and review

Sapling’s comment and review experience supports GitHub's markdown rendering but does not have a way to preview your comment before submission nor does it include buttons to insert markdown tags. Sapling also doesn't support typeahead search when tagging people and teams and linking to pull requests in comments. The PR description is not editable through ReviewStack.

Graphite’s interface fully supports GitHub markdown and previews when writing and editing PR descriptions, comments and reviews. Graphite supports typeahead search when tagging teams, teammates, and pull requests in comments. You can also use the `/` shortcut to invoke your own macros, and include emojis and memes from a shared customizable meme library.

#### File uploads

Sapling's ReviewStack doesn't have support for file uploads through their interface.

Graphite supports multi-file uploads for images, videos, and other GitHub supported file formats.

#### Visualization and navigation

The UIs provided for both Sapling and Graphite make viewing stacked PRs a lot easier, with visualizations that allow you to quickly navigate between PRs in a stack, and a dropdown to view each independently submitted version of a PR.

Both seamlessly integrate with GitHub; each PR in GitHub has an equivalent page in Graphite or Sapling.

#### Additional features

Graphite’s app has a few additional features like live check status and ability to re-run checks, AI summarization, and a customizable diff view (like whitespace settings, unified vs. split views, and font settings), and keyboard shortcuts to help you create and review PRs even faster.

Graphite supports webhooks from GitHub for faster event detection without hitting rate limits/API errors. Read more about [GitHub authentication methods supported by Graphite](/authenticate-with-github-app).

### Features for fast-moving teams

Sapling does a great job of building a platform that supports the use of stacked PRs. Graphite has additional features oriented around team productivity, including team insights, a stack-aware merge queue, a Slack integration for real-time actionable notifications (including the ability to review small PRs directly from Slack), static analysis (coming soon), and reviewer assignment (coming soon). We encourage you to try out both to see what works best for you and your team.

## Get in touch

Want to know how Graphite compares to a software you're considering or currently using? [Reach out to us!](https://graphite.com/contact-us)
