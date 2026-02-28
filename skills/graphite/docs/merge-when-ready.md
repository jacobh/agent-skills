> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Merge When Ready

> Learn how to automatically merge PRs with Graphite once all branch protection rules have been met.

*Merge when ready* is Graphite's equivalent to GitHub's [automerge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request). By enabling merge when ready on a single PR or a stack of PRs, you're granting Graphite permission to merge the PR(s) after all branch protection rules have been met.

<Info>
  Merge when ready is only supported for merges into the default branch of your repo. If you use a multitrunk setup, make sure you are enabling merge when ready for PRs that you intend to merge into the default branch.
</Info>

## Enable merge when ready for a single PR

To enable merge when ready for a PR, activate the toggle next to the merge button.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=678752980eda997d0e281ce0d3869482" data-og-width="1294" width="1294" data-og-height="206" height="206" data-path="images/8ca58d43-1695090211-frame-10123063.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=1e6f82bfa862ce64f1dc8f8fb1482da0 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=dc04af285e7350fc7bdc56b3bef7bfca 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=be4918c36d27557073b969816b1b6232 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=26345d51d669005b1750d7d4f3fd3cbd 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=bd0ca586f169793ac78f72261d131f3c 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8ca58d43-1695090211-frame-10123063.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4f1e94ec049ca2fb1f07b5ddb11d78f1 2500w" />
</Frame>

<Info>
  Merge when ready is only available if the PR is in a non-mergeable state. If the PR is mergeable, the merge when ready toggle will be disabled.
</Info>

## Enable merge when ready for a stack

You can quickly enable merge when ready for a stack by navigating to the top-most PR in the stack and toggling on merge when ready for that PR. Graphite will show you a confirmation modal asking whether or not you want to enable merge when ready on all downstack PRs.

<Note>
  Downstack PRs that have "merge when ready" enabled will merge whenever they individually become ready to, such as once they are approved and required CI checks have passed. They will not wait for or require any upstack PR to also be ready before merging.
</Note>

Graphite will show the same confirmation modal when disabling merge when ready for any PR in the middle or top of a stack.
