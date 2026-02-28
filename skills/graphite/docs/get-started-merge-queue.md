> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Use The Graphite Merge Queue

> Learn how to use the Graphite merge queue in your repo.

Before starting, make sure the merge queue is [set up and configured](/set-up-merge-queue).

## Add a pull request to the merge queue

You can add a pull request to the Graphite merge queue from the Graphite app or by adding a label to a PR on Graphite or GitHub.

### Enqueue through the Graphite app

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=8bfb9e3ad8376a1db1b2f22a171d87f7" data-og-width="5326" width="5326" data-og-height="2094" height="2094" data-path="images/14128d4e-1683650434-queue-pull-request.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=0278f6861e19bce6ba4b6f54ca9f7f28 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=441fc43cc79b7c4a210523ef8a1f27a1 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=be8a33e757ce5703dd1b423d0bd610e9 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a2796c8c3503bbaa52cbe9fe2b940a08 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a0df6bd7af655d405f5ddce9f5e9daae 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/14128d4e-1683650434-queue-pull-request.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=281256003569749a36efeea565805304 2500w" />
</Frame>

Once the Graphite merge queue is enabled on a repository, you'll still see the option to merge a pull request, but the confirmation modal will show an option to queue the PR rather than to merge it immediately. There are a few minor differences between the merge modal and the queue modal:

* You **cannot** override the merge strategy from the queue modal as you can from the merge modal. Merge strategy for the queue is set at the repository-level through your [repository settings](https://app.graphite.com/settings/repo)

* We don't support commit message/title edits from the queue modal as we do in the merge modal. For PRs merged using the squash and merge strategy, the PR title and PR description will be used for the commit message/title.

* When queuing individual PRs (not a stack), you have the option to queue the PR as a **fast-track**. When you queue a PR as a fast-track, your PR will automatically jump to the front of the queue. Note that it will still wait to rebase and rerun CI, but will merge next in line. Fast-tracks will be marked in the merge activity page with a small flame icon.

<Info>
  Enqueueing a PR authored by a user without a Graphite account is only available in the [Enterprise plan](/billing-plans).
</Info>

### Enqueue via label

Make sure you've [configured your repository](/set-up-merge-queue#enable-adding-to-the-queue-via-a-label) to enqueue PRs with a GitHub label.\
After you've created/configured a label which you want to use to indicate that a PR should be added to the queue, simply adding the label to any PR will enqueue the PR. There are a few things to note:

* If the label is added to a PR that isn't mergeable, it will toggle the PR's **merge when ready** property on and will be enqueued once mergeable

* If the label is removed from a PR, it will be removed from the queue (or merge when ready will be toggled off)

* If a PR is removed from the queue for any reason (failing checks, merge conflicts), the label will be removed

* If the label is added to a PR that is part of a stack, the label will be automatically added to all downstack PRs as well.

* If the label is removed from a PR that is part of a stack, the label will be automatically removed from all upstack PRs as well.

<Info>
  A Graphite account is required for using merge labels. If we detect a user without a Graphite account applies a merge label, it will be removed and a note will be added to the PR about this requirement.

  If a user successfully merges with a label on GitHub into the Graphite merge queue, they become a billable active user per our [pricing plans](/pricing-faq).
</Info>

## Merge activity page

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d883af35a85f3ec3d691988e80a6da5f" data-og-width="6668" width="6668" data-og-height="3388" height="3388" data-path="images/24270600-1688786414-mq-updated.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e1840141197fd0dccd1719c188d9bf80 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=dc6148b96a04951903d605c6f713a0e9 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c1c78ca1688150f4ad158c36003edea6 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d6d613413ca470a5223f4f03479f013e 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e4b1490650fc4c75db680d76110e934c 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e69c8e4528c6df50a8135206b140f307 2500w" />
</Frame>

The merge activity page shows merge history for a given repository. You can select which repository you're viewing with the repository selector in the top right of the page.

#### PR details

Queued PRs display directly above the `trunk`'s merge history where you can see the PR's position in the queue, size, and estimated time to merge. Under the `...` menu, you also have the option to remove PRs (including the currently merging PR) from the queue.

#### Timeline

The timeline on the right side of the page shows the queue activity, which includes merges, fast-tracks, removals, and failures.

#### Pause the queue

In case you need to do so, you can pause the queue by clicking the `...` on the PR header and selecting `pause queue`. When the queue is paused, PRs can still be added to the queue but they **will not** be merged.
