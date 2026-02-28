> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

> Customize the Graphite VS Code extension.

Everyone's IDE is personalized to their own workflow, so we've introduced some customizations to make using the VS Code extension as personalized as possible.

## Branch name vs. PR title

In the "settings" on the top right corner of the extension, you can select whether you'd like to show the branch name or the PR title in the stack visualization by default. When PR title is selected as the default and a branch doesn't have a PR title or a PR yet, we'll show you the branch name.

## Amend vs. commit

In the "settings" on the top right corner of the extension, you can select whether you'd like the default modification of a branch to amend the most recent commit on that branch, or to create an entirely new one on the branch. This corresponds to `gt modify` or `gt modify -c`.

## Draft vs. publish

Choose whether you want to default to creating draft or published PRs upon submitting from the extension. Draft will be selected by default.

## Open stack edit on submit (beta)

Upon submitting from the extension, open Graphite's "stack edit" feature to add reviewers, edit description, tags, etc.

## Filetree display

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=6021d1bcc9f8bd7761a916ada4f76f4a" data-og-width="1384" width="1384" data-og-height="626" height="626" data-path="images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=f2ea42b94201e8eb8f9a63b2eb039874 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=76635e87dc10d19f48e56f510303d603 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2bed6f5f02a89f43e565329bf86d36a5 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=3e2c815b73741e75383e951b34bf698c 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b934b28826abd14fae727fd0bcefc3bb 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/570a2f26-1705600451-screenshot-2024-01-18-at-12-51-50-pm.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=29f7c46841a1880b4cfc49e1df181fcb 2500w" />
</Frame>

When focusing the contents of a branch of viewing uncommitted changes, you can click the "..." in the branch pane to adjust the filetree view to:

* Short file names

* Full file paths

* Tree

* One-letter directories

In the same menu, you can opt to show changes by:

* Commit

* [Version](/pull-request-versions)
