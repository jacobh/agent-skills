> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Merge Queue

> Learn how Graphite's merge queue can help your team merge stacks faster and reduce merge conflicts.

A merge queue prevents semantic merge conflicts by automating the rebase process during merge and ensures that the `trunk` branch stays “green"—helping development teams move faster while preventing breakages.

The Graphite Merge Queue is the only merge queue that is stack-aware.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d883af35a85f3ec3d691988e80a6da5f" data-og-width="6668" width="6668" data-og-height="3388" height="3388" data-path="images/24270600-1688786414-mq-updated.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e1840141197fd0dccd1719c188d9bf80 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=dc6148b96a04951903d605c6f713a0e9 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c1c78ca1688150f4ad158c36003edea6 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d6d613413ca470a5223f4f03479f013e 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e4b1490650fc4c75db680d76110e934c 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/24270600-1688786414-mq-updated.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e69c8e4528c6df50a8135206b140f307 2500w" />
</Frame>

<Note>
  Ready to start using the Graphite Merge Queue? See [Set up the Graphite merge queue](/set-up-merge-queue).
</Note>

## Why Graphite's merge queue?

You would likely benefit from a merge queue if:

* Your `trunk` branch is frequently broken

* You're consistently slowed down from rebasing changes

* You have the combined issue of long-running checks with a high PR merge rate

Traditional merge queues provide many benefits, but they can also slow teams down by enforcing the ordering of commits and validating those commits in sequence—likely reducing the speed at which merges land.

The Graphite Merge Queue is **stack-aware**, providing opportunities for faster concurrent/batched merges and optimizing the order in which PRs are merged. So if the stack is added to the queue together, the merge queue can process and validate the entire stack in parallel. No need for CI to run again since we have already validated the CI against that exact change (this is also known as fast-forward merge, as described below).

Beyond stack awareness, the Graphite Merge Queue can be configured with further [optimizations](/merge-queue-optimizations) to both increase speed and reduce CI cost.

See our [blog post](https://graphite.com/blog/what-is-a-merge-queue) to learn more about the benefits of merge queues.

### Supported merge strategies

**Rebase:** rebase your changes on top of your trunk with commits unchanged (equivalent to GitHub's rebase and merge)

**Squash:** rebase your changes on top of your trunk with each PR squashed to a single commit (equivalent to GitHub's squash and merge)

**Fast-forward merge:** you can opt to enable "fast-forward merge" on either of the above strategies in order to process stacked PRs in parallel (a Graphite-only setting).

### How the Graphite merge queue interacts with GitHub

In your repository settings, you have the option to enforce the Graphite merge queue. If it isn't enforced, users will be able to merge PRs through GitHub directly (bypassing the merge queue entirely). Enforcing the Graphite merge queue requires some configuration on GitHub's side, namely setting up the correct branch protection rules and authorizing with Graphite's GitHub App. Read more about advanced Graphite merge queue [settings](/set-up-merge-queue).

<Warning>
  The Graphite merge queue is not compatible with GitHub's merge queue. If you want to use the Graphite merge queue and you're currently using GitHub's, you must disable it for your repository before continuing. Instructions on using Graphite with the GitHub merge queue can be found [here](/external-merge-queue-integration).
</Warning>

When a PR is added to the Graphite merge queue, we leave comments on your GitHub PR in three instances: when the PR is added to the queue, when it is merged through the queue, and when it fails/is removed from the queue.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=fd1ecd1ef2fd92495ad06989b33b0c44" data-og-width="1856" width="1856" data-og-height="330" height="330" data-path="images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=035685f4f860f2eb889dd1db12dc3bdd 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b50e9e80ebbc42744f5e6becf91c8187 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=596525218f2481241777e8e78de7fa72 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5e7e2ee2868c3a1c6136ae75f0783d9e 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4f52db20aad0b9b72dc5e74e793489fa 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b4832b39-1683658248-screenshot-2023-05-09-at-2-50-43-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=8fa25dfc85cc25380691819d0069b28d 2500w" />
</Frame>

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=6e835051adb137559e660b48f6f6b419" data-og-width="1852" width="1852" data-og-height="326" height="326" data-path="images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=ae22bb8566f8d4120a56b6bc3de498bd 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a182f6cac684a47192d1cd8ce0548aa5 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=fe287c3de44c2af48c5cbafd735d14f1 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=3318acba90ffc2e36f8fe95fafaa581e 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=fd3a8c41f3156170cdf6da014d5672f5 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/41c7ae08-1683658272-screenshot-2023-05-09-at-2-51-08-pm.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b2379e7f92647ca0bad5f76a5879c6e9 2500w" />
</Frame>

## External merge queue integration

If you already use a separate external merge queue offering, Graphite's external merge queue integration simplifies the merging experience. While it doesn't experience the same stack-aware optimizations as Graphite's merge queue, it can be a quick way to ramp-up your team. See [external merge queue integration](/external-merge-queue-integration) for more info.
