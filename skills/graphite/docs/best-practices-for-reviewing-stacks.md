> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Best Practices For Reviewing Stacked PRs

> Learn best practices to keep in mind when reviewing PRs in a stack.

Introducing [stacked pull requests](https://www.stacking.dev/) to your engineering org can seem like a big change to your code review workflow, but it doesn’t need to be painful. While many code changes will still be small enough for a single, un-stacked PR, sharing a few best practices with your team around reviewing PRs in a stack can help you seamlessly introduce stacking into your engineering workflow and get the full benefits of doing so. With these simple guidelines, you’ll provide relevant, timely feedback to the stack’s author and keep changes flowing smoothly.

### Best practices for reviewing stacked PRs

Here’s how we recommend you & your team to review stacked pull requests with Graphite:

1. **Review a PR in a stack as though it was an independent change:** If the PR doesn’t make sense without a lot of additional context from the stack, request that the author split up the stack differently to make each change more atomic.

2. **Review stacked PRs as soon as you’re tagged as a reviewer:** Don’t wait for downstack changes to be approved and merged, as this serializes reviews and greatly reduces the time savings of stacking.

3. **Start from the bottom:** If you’re tagged as a reviewer on multiple PRs in the stack, review from the bottom of the stack (closest to main) upwards.

4. **Check for upstack changes as you review:** If code in the stacked PR you’re reviewing changes again upstack (indicated by an orange bar on the right in Graphite), click to view the upstack change. You can then navigate back to the PR you were reviewing using the stack visualization (or navigate down the stack with the keyboard shortcut `⌘` + `Shift` + `↓`) and finish your review with the context of the upstack change.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=43a5882098f40fee83d55257c149dd67" data-og-width="1082" width="1082" data-og-height="502" height="502" data-path="images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=1c9a85dee6ad26270f6fc3f51d62bfca 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5622de896f1acbe9c56f6973dc210530 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=3dc76523a67099f41601ec2ccb626f91 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=228316a0369e6e739d95376d0a0177d6 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=6ce455ff4f9452c14915cd5fc9241be5 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/e31d13cd-1715821959-screenshot-2024-05-15-at-5-47-05-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=8a577de21f8b1be6b5e54edd0e1e2575 2500w" />
</Frame>

### Make your stacked PRs easy to review

Reviewing is only part of the stacking workflow - you should also make sure to follow best practices when creating stacks to make them as easy as possible to understand and review:

1. **Separate stacked PRs logically:** Each PR should be easy to understand and review independently - see [best practices frameworks for splitting up large changes into stacks](https://graphite.com/blog/five-methods-for-stacking) for ideas on how to do this.

2. **Submit PRs as soon as they’re ready to review:** Even if you plan to stack additional changes on top, you should submit your changes for review to ensure you get feedback as quickly as possible.

3. **If you’re actively working on a PR, mark it as a draft:** Open PRs in a stack should be considered ready to review, so if you’re still working on the PR or need to go back and make changes to address review feedback you should mark the PR as a draft until it’s ready to be reviewed again.

4. **Choose the best reviewers for each PR in the stack:** Choose who is most relevant for each individual change (or set up automations to do this for you) - you most likely don’t want the same set of reviewers to every PR.

5. **Use “merge when ready” to put stack merges on autopilot:** Unless a change needs manual assistance to land, default to turning on “merge when ready” to ensure your stacked PRs merge quickly once approved.

### Set up your org for successful stacking

Lastly, make sure your engineering organization is set up to start stacking successfully with the following best practices:

1. **Update your branch protection rules in GitHub:** Turn off “dismiss stale approvals” & “require approval of the most recent reviewable push” [settings in GitHub](/github-configuration-guidelines#required-settings) to ensure stacks merge smoothly.

2. **Assign reviewers automatically with automations:** [Set up automations](https://app.graphite.com/automations) in Graphite to automatically assign the most relevant reviewers for each PR based on file types & paths. Automations is a more powerful and granular system than `CODEOWNERS` for assigning reviewers, built for teams building in large monorepos.

3. **Warn authors about large PRs:** [Set up an automation](https://app.graphite.com/automations) to comment on PRs larger than 250 lines of code or 25 files changed to encourage authors to break up larger changes into stacks.

By following these simple best practices for reviewers, authors, and your organization, you’ll be set up for success when introducing stacking to your workflow, and ensure that you’re maximizing the time savings stacked PRs can provide in the review cycle.
