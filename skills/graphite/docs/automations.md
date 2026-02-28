> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Automations

> Learn how to automate tedious code review tasks like assigning reviewers, adding labels, and more with automations.

Graphite supports automating common actions when PR attributes meet your specified criteria by creating automation rules.

With these rules, automatically take actions such as adding reviewers, labels, or comments when a PR is opened by a specific author, containing files in specific directories, or a variety of other powerful filters.

<Frame>
  <video controls width="100%" poster="/images/1705419433-automations_cover.jpg">
    <source src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1705419433-automations_cover.mp4?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=de39f14c584fe9f1c454de0a32e0e7a5" type="video/mp4" data-path="images/1705419433-automations_cover.mp4" />

    Your browser does not support the video tag.
  </video>
</Frame>

## Automation rules

Automation rules have two aspects: a filter trigger and an action.

### Filter trigger

To specify the filtering trigger for PRs:

* You can use any of the filters powering Graphite's PR inbox today

* Additionally, you can specify a glob pattern for filenames. With this, you can create rules for PRs containing common suffixes (e.g. `**/*.ts` files), or that are contained in specified sub-directories (e.g. `**/myteam/**`), among other patterns.

### Actions

When a PR matches your condition, you can configure one or more of the following actions:

* Add reviewers to the PR. This supports both individuals and GitHub teams.

* Add assignees to the PR. This supports making the PR author the assignee.

* Add labels to the PR.

* Leave a comment on the PR. For example, you can leave a reminder for PRs opened containing changes to a particularly sensitive area of the code.

* Notify someone through Slack. For example, set a notification for all frontend changes for instances when you want to know about a change, but don’t necessarily want to be added as the reviewer.

* Post a GIF on the PR. For example, post a random "approved!" GIF from GIPHY each time a PR is fully approved.

## Manage rules

Navigate to *Automations* from the sidebar in the Graphite web app.

### **Create rules**

* Click **Create rule**.

* Specify the repository for the rule. Note that this must be one of your synced repositories (see [configuring default repositories](/use-pr-inbox#default-repositories)).

* Configure the conditions you want to match PRs on, and the actions to automatically take on those matched PRs.

To confirm your conditions are configured correctly, you can preview past PRs that match your rules before activating the rule.

When you're done, click **Activate rule**. This automatically applies the rule to open PRs that match your triggers, as well as all matching PRs going forward, until the rule is deactivated.

<Info>
  Rules match once per PR. If a PR doesn't initially match, it's re-evaluated on each update until there is a match. After it's matched once, it won't trigger again on that PR, avoiding surprises like leaving the same comment repeatedly. Automations evaluate on published PRs only, and do not evaluate on PRs that are closed or in draft mode.
</Info>

### View rules

To view a rule, navigate to *Automations* in the Graphite web app. There you'll see a list of all active rules in your GitHub org for repositories that you have access to. If you don't have access to a given repository, you won't see rules configured for it.

### Edit rules

To edit a rule, navigate to \*Automations \*in the Graphite web app.

Click the pencil icon to edit the rule. You can edit any rule for repositories you have access to, making it easy for teammates to update shared team rules.

<Info>
  Because PR actions trigger at most once, if a given PR has previously already matched a rule that you're editing, note that it won't re-evaluate again after you edit your rule. This means that if you change your actions, those new actions won't apply to previously matched PRs.
</Info>

## Rule triggering

When a rule triggers on a PR, Graphite automatically applies the triggers. Graphite will also leave a comment on the PR on GitHub to let the author know the rule matched, including a link to the rule in Graphite so it's easy to see why that rule matched the PR.
