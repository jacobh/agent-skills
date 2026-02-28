> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Merge Queue Optimizations

> Learn how to speed up your Graphite merge queue

The Graphite merge queue offers three optimizations that both speed up the merging process and reduce CI costs.

You can use all merge queue optimizations at the same time. The optimizations are:

1. Fast-forward merge (run CI on all PRs in a stack in parallel)

2. Parallel CI (run CI in parallel on multiple stacks simultaneously, and merge them as CI passes)

3. Batching (run CI and merge batches of stacks at a time, instead of one-by-one)

CI Optimization is available regardless of if you use the Graphite merge queue. It lets you skip running CI on mid-stack PRs when updates to other PRs in the stack trigger rebases.

Note that a "stack" can be a single PR.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a1a97b33d8380c59ad3b4875a7b51f91" data-og-width="1196" width="1196" data-og-height="1128" height="1128" data-path="images/2a567c9f-1732219799-pika-1732219769508-1x.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e910cef5c48a36b53e11916790ca593a 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=7ec9d8c07ed2d9f36f98fde4e9d0b688 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=4b664b1bec783e6ecd0ad4cbce55b072 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a5ddd761bc5c7915e2c633d8e4d2d8c6 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b835be7e01e06473889a5b2cd808202b 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a567c9f-1732219799-pika-1732219769508-1x.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2a81fe45290ccbad55f308dbe85defdb 2500w" />
</Frame>

## Running CI on multiple *PRs* in a stack in parallel (fast-forward merge)

Process CI on all PRs in a stack in parallel. We highly recommend keeping this setting enabled.

## Running CI on multiple *stacks* in parallel

For even faster merges, you can run CI on multiple stacks at the same time. Paired with fast-forward merging, this means you're processing PRs in each stack in parallel *and* processing the larger unit of stacks

Parallel CI speeds up your merge queue by running your CI checks in parallel for multiple stacks (including individual PRs not part of a stack) at once, without compromising on correctness. This is especially helpful if your repo sees a high volume of PRs, long CI times, or both.

<Tip>
  Companies who have enabled Parallel CI on their Graphite Merge Queues have seen **1.5x faster merges**, which includes time spent running CI (33% decrease for p95, 26% for p75).

  Orgs heavily using stacked PRs can expect to see even greater speed gains. Customers have seen up to **2.5x faster merges** (60% decrease for p95, 34% decrease for p75).
</Tip>

### How running CI in parallel works

Parallel CI uses speculative execution, similar to branch prediction, to run CI for multiple enqueued stacks at the same time. This significantly speeds up time-to-merge: instead of waiting for CI to run one-by-one, it can run (for example) 3 at a time. For repos with long queues, this can shorten your time-to-merge to a fraction of the time. In many cases, this brings the expected wait time down to just 1 CI cycle.

### Trading off speed vs. correctness

Graphite’s merge queue operates on stacks as the primary unit rather than a PR (where single PR’s are equivalent to a stack of size 1), and this applies to parallel CI as well. If any PR in the stack encounters a failure, the whole stack will fail to merge, allowing you to treat stack merges as atomic operations.

When setting up parallel CI mode, you can choose whether to:

* **Run CI on each PR in the stack individually**. This is the highest level of correctness guarantees: it ensures no PR in your stack would independently break trunk.

* **Run CI on the topmost PR in the stack.** This relaxes CI guarantees, while further reducing CI runs. If you require each merged stack to keep trunk green, but don’t have that same strictness for each PR within a stack, then we recommend this mode for a combination of higher speed and lower CI costs.

### Example of running CI in parallel

Suppose you’ve configured Graphite to run up to 3 parallel CI runs, and you have 5 unrelated stacks enqueued at a similar time: `A`, `B`, `C`, `D`, and `E`.

1\. CI starts for `A`. In parallel, Graphite creates these temporary groupings and starts CI at the same time:

* `A` ← `B` (i.e. `B` rebased on `A`), thereby testing this group of 2 PR’s at once

* `A` ← `B` ← `C`, thereby testing this group of 3 PR’s at once

2\. Once `A` succeeds, it’s merged.

* Graphite then starts CI for the grouping: `B` ← `C` ← `D`, thereby testing this group of 3 PR’s at once.

3\. Once `B` succeeds, the same process repeats: a group for `C` ← `D` ← `E` is created and CI runs.

4\. If at this point `C` fails, then:

* `C` is evicted from the queue.

* The runs for groups `C` ← `D` and `C` ← `D` ← `E` are both canceled.

5\. `D` then becomes the first PR in the queue:

* CI starts for `D`.

* Graphite starts CI for the grouping: `D` ← `E`.

If your CI tests aren’t flaky, the cost is low and the benefits are high: parallel execution only runs more CI when CI fails in the merge queue.

However, because parallel CI assumes that your CI tests in the merge queue will pass, be careful with flaky tests. If CI tests fail, you not only need to evict the failing PR, but restart CI runs on any subsequently enqueued PR’s with speculatively running CI. While this doesn’t make your time-to-merge any slower than when parallel CI is disabled, it does generate more CI runs.

### Enabling parallel CI

**Prerequisites**:

* You must allow the `graphite-app` bot in GitHub to bypass merge restrictions, via your existing branch protection rules or rulesets. See how to set up this up [here](/set-up-merge-queue#bypass-pr-permissions)

* Your repo must support [draft PR's](https://github.blog/2019-02-14-introducing-draft-pull-requests/)

**To enable:** go to *Merge queue* in [your Graphite app settings page](https://app.graphite.com/settings/merge-queue), and:

1. If you haven't already, [enable the Graphite merge queue](/set-up-merge-queue#enable-the-graphite-merge-queue-for-your-repository) in your repo

2. If you already have the merge queue enabled in the repo, find it in the list and click the **Edit** icon

3. In the merge queue configuration panel, enable **Parallel CI**

4. Select an option for **How should CI run?** - see the section above for more details.

5. Specify a **Concurrency** value, which determines the number of stacks to run CI for in parallel

<Tip>
  Not sure which concurrency value to use? You'll get the most benefit by from having enough concurrent runs to handle your PR volume given your typical CI runtimes. For example, if your CI takes 30min, and your peak hour PR volume is 3 PR's per 30min, 3 concurrent runs will give you the most benefit.

  If your tests are flaky, you may want to start lower and then gradually increase it as you see how your CI performs.
</Tip>

### End-user experience when using parallel CI

In order to implement this strategy, Graphite groups stacks into a temporary draft PR. This draft PR is used to execute CI runs. The Graphite PR page will point you to this draft PR. These PRs’ titles are always prefixed with `[Graphite MQ] Draft PR` to make them easy to identify.

When Graphite groups stacks in the merge queue for running CI, it creates a branch with a predictable prefix: `gtmq_`. You can use this for customizing CI runs or other behavior for enqueued PR’s.

When an enqueued PR merges, it’ll be marked as *closed* in GitHub instead of *merged*. Graphite will render and treat it as *merged* across the product, including the PR inbox, PR page, and statistics shared by Insights. This allows you to keep the GitHub branch protection rule on to require a linear history.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a27d50cbbfe83bf2a376d3ce38ad0146" data-og-width="2520" width="2520" data-og-height="1032" height="1032" data-path="images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=70b8fcc72dac0b4b971f356871424e1d 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=49fdcbde848fbd3280bd09fe307f3fff 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=4422d4435116fbf4317483f004af4ecd 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=58cf4a766cdf840cba354908b890047c 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=50ceb5401326fa9ff023aebec880f746 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/8278df1d-1709237882-screenshot-2024-02-29-at-3-17-49-pm.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=5a8e25888b58b98050f06919540c0107 2500w" />
</Frame>

### Further reading about parallel CI

* Read more about [speculative execution](https://www.uber.com/blog/bypassing-large-diffs-in-submitqueue/) in Uber's paper

* If you use tools that monitor whether the PR is merged, your integration may stop working. Many tools have options to monitor merged commits rather than PR status: for example, see [Linear's guide on linking commits](https://linear.app/docs/github#link-using-commits).
  * Linear can also detect the `externally-merged` label if it is added before the PR is closed. This tells Linear to treat the pull request as successfully merged even though it was closed. See [Linear's documentation for custom merge queues](https://linear.app/docs/github#custom-merge-queues).

## Running CI on multiple *groups* of stacks in parallel (batching)

<Note>
  This feature is available in private beta. Please [contact support](https://graphite.com/contact-us) for access.
</Note>

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2f00e34fbf5cda622c2f0b77fd07bde4" data-og-width="1142" width="1142" data-og-height="960" height="960" data-path="images/2a679334-1732229774-pika-1732225950829-1x.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=5e96d9981bf8ec0c6d1bc3287b401da8 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2d0c5b7f9cc6b9ede961553834aa00a3 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c0a539d1b0b8293a6ca2d99ef0dc6662 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e505eeb052cc2fab1058da41c6eeb793 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d8ba5ec6f6d738545680ff2bb90d6d78 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2a679334-1732229774-pika-1732225950829-1x.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=3f9be967f31f0904966de986c3265db4 2500w" />
</Frame>

To increase merge queue throughput and speed up merges, the Graphite merge queue also supports processing groups of stacks simultaneously.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=11769854ace1d16bf954b90e2b3acf69" data-og-width="1560" width="1560" data-og-height="880" height="880" data-path="images/b98850c1-1738093764-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=38391682b5aeda63eb5de664ebebe2ec 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=6123e216a6beaaaf06212ac1705a938b 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=de983f175ef33d84d5b4514c989d5b29 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=1e2558adf61cdda55ecb139236b5c40d 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f1bf367e877da66829bb92e1f4a77861 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b98850c1-1738093764-image.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=84dedaa38fbd0e413d8314edad899ae9 2500w" />
</Frame>

When a batch merge fails, Graphite can automatically handle the failure by identifying the offending change:

<Steps>
  <Step title="The system identifies which stacks in the batch caused the failure by running CI on smaller subsets of the batch" />

  <Step title="Stacks that pass CI are automatically added back to the merge queue to continue processing" />

  <Step title="Stacks that fail CI are identified and removed from the queue" />
</Steps>

This process ensures that even if only one stack in a batch causes issues, the other stacks can still merge without manual intervention.
Two strategies are supported:

1. Full parallel isolation (default): By checking every stack in the batch in parallel, the problematic stacks are identified quickly.

2. Bisection: By using a bisection approach, problematic stacks are identified efficiently with fewer CI runs, as each iteration verifies half of the remaining stacks as safe.
