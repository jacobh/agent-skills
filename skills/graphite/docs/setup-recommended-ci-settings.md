> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure recommended CI settings

> Set up your GitHub repository's CI to work well with Graphite

### Ignore Graphite's temporary branches in your CI

You should configure your CI to ignore PRs whose base branch is named `graphite-base/*`. Not doing so may result in failed CI jobs, specifically when they reference Graphite's temporary branches which have been deleted.

Here’s how to disable running CI for these branches in GitHub Actions:

```
on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches-ignore:
      - "**/graphite-base/**"
```

For more information about when and why these temporary branches get created, refer to [Automatic rebasing](/merge-pull-requests#automatic-rebasing).

### Ensure that CI is running on upstack branches

Graphite calculates and enforces mergeability for pull requests that are dependent on other pull requests in a stack, based on the checks that are required to merge into the trunk (target) branch of the stack, e.g. `main`.

If your repository is only running checks for PRs based on your trunk branch, then checks for upstack PRs will not run until downstack PRs are merged. Thus, we recommend configuring your CI to run on any branch (aside from `graphite-base` branches as mentioned above).

We provide [CI Optimizations](/stacking-and-ci) that allow you to conditionally skip certain checks depending on stack position. This can be useful to help control CI costs.
