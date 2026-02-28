> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# External Merge Queue Integration (Beta)

> Learn how to use Graphite with your existing external merge queue.

If you already use a separate, external merge queue offering, Graphite can integrate with that merge queue, reducing the manual work required to merge stacks of PRs.

Graphite's integration will:

* Merge PRs one-by-one by enqueueing them in your merge queue

* Automatically rebase PRs before adding them to the merge queue, as necessary

This offers a quick and seamless way to onboard your team to Graphite when you're already using an external merge queue.

## Limitations

Unlike Graphite's merge queue, external merge queues don't use stack context to optimize merges, so you won't benefit from the same performance boosts and guarantees available with the [Graphite merge queue](/graphite-merge-queue).

In particular, with external merge queues Graphite can only merge PRs one at a time: for a stack of PRs `A` ← `B` ← `C`, where `A` is the base PR

* `A` will be added to the queue

* Only when `A` is successfully merged will Graphite rebase `B` and then add `B` to the queue

* Repeat for `C`

## GitHub merge queue

### Enable the external merge queue integration

Go to *Merge queue* in the Graphite app settings page ([https://app.graphite.com/settings/merge-queue)](https://app.graphite.com/settings/merge-queue), and:

<Steps>
  <Step title="Click Add merge queue" />

  <Step title="Select the repository you want to enable it for by using the dropdown selector" />

  <Step title="Select External merge queue integration as the merge queue type" />

  <Step title="Click Next" />

  <Step title="Select Enable adding to GitHub merge queue and save your merge queue settings" />
</Steps>

To merge, click the **Merge when ready** toggle in the top right of the PR page.

When a PR is the first open PR in the stack and has **Merge when ready** active, Graphite will then add the PR to your GitHub merge queue.

<Tip>
  When merging stacks with the GitHub merge queue, you may notice that an **upstack** (not yet merged) PR shows files or commits that were actually introduced by a **downstack** PR that just merged. This is an expected side-effect: after GitHub merges a PR, it deletes the merged branch and auto-retargets dependent PRs to the base branch (e.g. `main`). To mitigate this you can `gt sync && gt submit` to rebase your branch properly.
</Tip>

## Other merge queues

**If you use a merge queue outside of the Graphite or GitHub merge queues, Graphite can be configured to add PR to your queue by applying a custom label to the PR.**

Note: if you merge PRs with your merge queue another way, such as running CLI commands or calling an API, Graphite won't be able to merge your PRs for you.

### Prerequisites

1. Ensure that a PR can be enqueued via label
2. (Recommended) Prevent the merge queue from merging into branches named `graphite-base/*`. See [Automatic rebasing](https://graphite.com/docs/merge-pull-requests#automatic-rebasing) for more information.

### Enable the external merge queue integration

Go to *Merge queue* in the Graphite app settings page ([https://app.graphite.com/settings/merge-queue)](https://app.graphite.com/settings/merge-queue), and:

<Steps>
  <Step title="Click Add merge queue" />

  <Step title="Select the repository you want to enable it for by using the dropdown selector" />

  <Step title="Select External merge queue integration as the merge queue type" />

  <Step title="Click Next to specify your merge label and save your merge queue settings" />
</Steps>

### Merging via your merge queue

Once you've completed the configuration steps above, PRs created in that repo can now be merged via your merge queue.

* **For single PRs, and base PRs in a stack:** the merge button is replaced with an "Apply merge label" button that immediately applies the merge label

* **For upstack PRs:** the merge button is replaced with an "Apply merge label when ready" button that acts as follows: for a stack of PRs `A` ← `B` ← `C`, where `A` is the base PR:

  * `A` immediately receives your repo's merge label, handing off merging to your merge queue

  * When `A` is successfully merged, Graphite rebases `B`, and upon succeeding applies your repo's merge label. If the rebase fails, Graphite informs the author as usual.

  * It repeats the process for `B`, and so forth for larger stacks.

During the merge process, the PR status for each PR will communicate if the PR is actively waiting on downstack merges, or if the merge has been handed off to your merge queue.

### (Optional) Updating your PR inbox

#### Enqueued PRs

To track enqueued PRs in your PR inbox, you can create a section with the following settings:

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=632d8b378bdbe71fae96d27b1a2badde" data-og-width="1380" width="1380" data-og-height="1215" height="1215" data-path="images/2503211e-1707176385-3p-mq-pr-inbox.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d1fa3ae92fb06db998bfe10c5aadef15 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=87d5f5770616364e28909a5c76c71b78 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=6de20b6247ef93cc1549f2ac629891f9 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c9cd0eeac07ddc0ab1734065e357d49a 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c5df21313b5c3513c3f006de0ad64968 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/2503211e-1707176385-3p-mq-pr-inbox.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=66a21651a7aae087a465bf02b1e0bc08 2500w" />
</Frame>

#### Blocked PRs

Many merge queues represent merge failures by adding a label denoting that the PR is blocked. You can create a section to track these with the following settings:

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4cd0801a1964035e68f32229958df150" data-og-width="1380" width="1380" data-og-height="1298" height="1298" data-path="images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=c052aaf63928a8c7de0ac65821f219e5 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=bd60429964e692123cf75c8cbf8743f5 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=402fe893d416a39265f05d2124057342 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=58375cc8efc769bd404acaadf785609d 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=dcf556378bb9646bf904c3545bbbbe83 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/a3bfa94b-1707176539-3p-mq-blocked-pr-inbox.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=31cbeb80f80534323ba1d15a4f88f28f 2500w" />
</Frame>

### Troubleshooting

* **PRs getting evicted while enqueued:** once you mark a stack as ready to merge, re-stacking those PRs when they're already in your merge queue may result in your merge queue evicting them due to making changes. You may want to avoid re-stacking a PR while your merge queue is processing it.

* **Handling failed merges:** your merge queue may take actions like adding a "blocked" label on PRs that failed to merge. To re-enqueue after fixing the issues, manually remove the custom label.
