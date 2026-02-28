> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure GitHub Repository Settings

> Learn how to configure your repository settings on GitHub for the best experience stacking with Graphite.

## GitHub repository settings

**Limit how many branches and tags can be updated in a single push**: `Disabled` **(Required)**

* This is a new GitHub setting that limits the number of branches that can be pushed atomically

* The Graphite CLI pushes all branches in your stack (and potentially a temporary base branch for each) atomically to ensure accurate behavior for PR history and code owner protections. A limit on the number of branches that can be pushed will prevent `gt submit` for stacks above a certain size.

* Alternatively, you can set the number to a very high value, but stack sizes will be limited for Graphite users in your repository (i.e. setting the limit to 30 will limit stack sizes to 15).

**Automatically delete head branches**: `Enabled` **(Highly recommended)**

* This helps prevent mistakes when merging PRs in a stack.

* For example, if you have a stack of PRs (A ← B, where A is the base PR), when you merge A with this setting on, GitHub automatically changes the target branch of B from A to `main`. However, when this setting is off, then merging A does not change the target branch of B: you must first manually restack—otherwise merging B won't work as intended.

## Branch protection rules

Branch protection rules allow you to set requirements for changes being made to specified branches on GitHub.

These rules can be useful to ensure that code changes are passing tests, and get the right approval from the right people. The recommendations are meant internally (that is, not for open source repositories with external contributors) for fast-moving companies to balance security and efficiency.

<Note>
  Graphite projects branch protection rules from the base of the stack (the branch that everything is merging into).
</Note>

### Required settings

The following branch protection rule settings are required for Graphite. Without these, Graphite's automatic management of stacked PRs may result in unexpected behavior.

**Dismiss stale pull request approvals when new commits are pushed:** `Disabled`

* As part of the merge process, Graphite may rebase a PR causing new commits to be pushed. If those changes cause approvals to be dismissed, it can lead to merge failures.

* If you need non-rebase changes to be dismissed, we created an open-source GitHub Action that is a drop-in replacement for this rule. You can find it on the GitHub Actions marketplace here: [https://github.com/marketplace/actions/dismiss-stale-approvals](https://github.com/marketplace/actions/dismiss-stale-approvals)

**Require approval of the most recent reviewable push**: `Disabled`

* As part of the merge process for a stack of PRs, Graphite changes the target branch of PRs before merging. Since this counts as a reviewable push, it can lead to merge failures or dismissed approvals- these can appear as though the Graphite app dismissed them with the message "The base branch was changed".

**Require signed commits**: action needed if `Enabled`

* If you have this enabled, each engineer should set up their [signing key in Graphite](/configure-signed-commits).

**Require merge queue**: `Disabled`

* The GitHub merge queue does not understand stacks and can end up merging PRs out of order. We recommend using the [Graphite Merge Queue](/graphite-merge-queue), which is optimized for merging stacks.

**Require deployments to succeed before merging**: `Disabled`

* Graphite does not currently support deployment checks.

### Recommended settings

The following are branch protection rules that we've found to work best for teams balancing velocity with safety. While Graphite does not require these settings, you may find these useful alongside Graphite's recommended workflow of small, frequent PRs.

**Restrict who can dismiss pull request reviews**: `Disabled`

* There are many cases where a pull request author can become blocked by a previous review. For example, if a reviewer requests changes to a pull request and then goes on vacation, the author is now blocked on merging that pull request even after making the appropriate changes because the “Changes requested” review is blocking the merge. An author might also want to dismiss a previous approval if they’ve made significant changes to the code since the original review.

**Require a pull request before merging**: `Enabled`

* It's standard practice to require changes to have pull requests for any changes you plan to merge. This ensures some visibility for changes that are being made.

**Require approvals**: `Enabled`

* Requiring approvals ensures that there is always someone else to sign off on the changes before they are merged.

**Recommended number of approvals needed**: `1`

* It's easier to stay unblocked by only requiring one approval. This helps make it clear to any reviewer that their approval will completely unblock the pull request for merge. It also removes the undue burden for engineers to review. If the author decides they want additional reviews they can always tag specific reviewers.

**Require status checks to pass before merging**: `Enabled`

* We recommend that you turn this on and set important CI tests as “required” to ensure that they are passing before a pull request is merged. If you have this branch protection rule turned on you can still have a mix of required and not required status checks—only failed required status checks will block a pull request merge. If you have a flaky test that is incorrectly returning a failed status, you can also leave it as not-required and it won’t block merges. For required status checks, you can select an app as the expected source of status state changes.

**Require conversation resolution before merging**: `Enabled`

* This branch protection rule is meant to ensure that all conversation threads have been read and acknowledged by the author. Sometimes, the pull request gets updated in a way in which GitHub can no longer tie an older conversation thread with the latest changes. In these cases GitHub will not display the conversation thread in-line in the code. This makes it difficult for authors to find and resolve old conversation threads that may no longer apply to the latest version of the pull request.

**Require linear history**: `Enabled`

* This setting prevents people from pushing merge commits to the protected branch. This will require them to merge pull requests using the “squash and merge” or “rebase and merge” options. Therefore, in order to enable this branch protection rule you must first enable at least one of these merge strategy options. Ensuring linear history will make it easier to diagnose issues introduced by changes and also make it easier to reverse those changes.

**Include administrators**: `Disabled`

* There might be unforeseen circumstances where an admin needs to bypass one or more branch protection rules above. In order to merge pull requests that are missing requirements, admins need to check a box acknowledging that they are bypassing requirements. Our recommendation is that anyone that you designate as an administrator should be trusted to use this only when appropriate.

## Rulesets

If you use GitHub rulesets instead of branch protection rules, we recommend the equivalent configurations as above. Make sure to update any rulesets that may apply to your Graphite-enabled repo.

Please note that admin merge is not currently supported on repositories using rulesets.

## GitHub Actions

We recommend the following triggers for Github Actions:

```yaml  theme={null}
on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches: [main]
```

We do not recommend triggering CI on the pull\_request type `edited`. This action is triggered when metadata about the PR is changed, not the PR itself (that would be `synchronize`). The `edited` event triggers a CI run when the PR below a given PR is merged—as the change of the base branch from the downstack PR to trunk is considered an “edit”.

We also recommend [updating "concurrency" to prevent multiple concurrent CI runs](/troubleshooting#why-are-my-actions-running-twice) on the same pull request.

## IP allowlisting

If you are using GitHub Enterprise's IP allowlisting features, you will need to make sure the Graphite GitHub app's IP addresses are allowlisted. If these IP addresses are not
allowlisted, Graphite will be unable to communicate with your GitHub organization altogether.

GitHub Enterprise offers IP allowlisting at two levels:

* [Enterprise level IP allowlisting](https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/hardening-security-for-your-enterprise/restricting-network-traffic-to-your-enterprise-with-an-ip-allow-list)
* [Organization level IP allowlisting](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization)

The Graphite GitHub app's IP addresses must be allowlisted both at the enterprise level *and* at the organization level for any organizations you plan to use with Graphite. The simplest way of making sure
all the necessary IPs are allowlisted is to enable the "Allowing access by GitHub Apps" option in the allowlist settings for **both the organization *and* enterprise allowlist settings**. This will
allow the Graphite GitHub app to automatically enable the IP addresses necessary for it to function when it is installed.

The IP addresses that are required to be allowlisted are as follows:

```
35.80.247.239
34.210.111.72
52.11.184.182
44.241.156.90
35.164.188.136
34.213.244.255
54.201.38.224
52.37.31.16
35.167.55.232
44.237.65.108
52.89.111.21
44.240.138.209
35.83.76.28
54.71.134.117
44.238.76.52  
```

If you are using IP allowlisting for your GitHub organization or enterprise and are unable to access your repositories and PRs in Graphite,
we strongly recommend verifying that the above IP addresses are allowlisted at both the enterprise and organization levels. If issues persist
after checking the IP allowlists against the above list, reach out to us at [support@graphite.com](mailto:support@graphite.com) and we can help troubleshoot further.
