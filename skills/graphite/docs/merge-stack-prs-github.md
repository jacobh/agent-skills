> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Merge A Stack Of PRs Manually

> Learn how to merge a stack of PRs outside of Graphite.

## Merge a stack manually

<Note>
  For the best experience, we recommend merging a stack of pull requests [through Graphite stack merge](/merge-pull-requests).
</Note>

Merging with stack merge in the Graphite app saves a substantial amount of time. However, if you'd like to manually merge your PRs, merge the PRs in the stack one at a time:

<Steps>
  <Step title="Merge">
    Merge the bottom PR of your stack into your trunk on the [Graphite app](https://app.graphite.com/) (or through GitHub).
  </Step>

  <Step title="Sync">
    Run `gt sync` from any branch of your stack to pull `trunk` to local, delete the merged branch, and restack the rest of your stack on `trunk`.
  </Step>

  <Step title="Submit">
    From any branch in your stack, run `gt submit` to force push the restacked branches so the new bottom of your stack can be merged into `trunk`.
  </Step>

  <Step title="Repeat until you've landed all of the branches in your stack." />
</Steps>

<Note>
  We recommend always merging from the bottom of the stack. While there are other techniques, we've found that this is the most intuitive and safest model for our users.

  Merging in reverse order from the middle or top of the stack and collapsing all of the PRs into one is the **fastest** way to merge an entire stack, but there are a number of pitfalls for users—namely around syncing this merged state locally (to continue developing on any upstack PRs) or undoing these changes if a user decides not to merge a PR. This may lead to perilous situations where users have felt like they've lost code or can't re-create their previous state.

  While certainly not impossible, it's also harder to re-derive the original stack of PRs when looking at the `git` history.
</Note>
