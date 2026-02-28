> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Setting Up A Proof Of Concept

> Best practices for teams new to stacking with Graphite.

Stacking is a team sport - here are some proven ways to help your team start stacking with Graphite successfully.

### Try Graphite as a team

It can be difficult to get all of your engineers to adopt a new workflow at once. A good way to ease your company into Graphite is to start with a group of 5–10 engineers who commit to using it together, preferably on the same team. This way there are enough engineers to experience the collaborative benefits of Graphite, and you can take the lessons learned from that group and apply them to the rest of the engineering organization.

### Evaluate for at least 4 weeks

Commit to using Graphite for at least one month as a team - this gives everyone enough time to acclimate to the tool and adapt their workflows.

### Define success criteria

Pick some heuristics to help identify how your team is trending. [Graphite Insights](/insights) provides plenty of data to gauge and improve developer productivity. When starting out, it’s useful to monitor:

* *Median PR size*: When your team starts stacking, their PRs should get smaller.

* *Median wait time to first review*. PRs should be reviewed quickly, which is typically indicative of right-sized PRs and good team patterns. You want this number to stay stable or decrease over time.

* *Average number of review cycles until merge*: PRs that are merged quickly are indicative of quick PR review cycles, which is representative of good collaboration practices. PRs that are self-contained are easier to review and limit the duration of iteration cycles and issues with merging. The longer it takes a PR to merge, the likelier it is to create more merge conflicts. You want this number to stay stable or decrease over time.

* *Total PRs merged*: Small PRs get merged faster. You should see this number increasing as your team gets more familiar with stacking and using Graphite.

### Emphasize high-leverage features

Graphite is designed to make engineers more efficient at every turn. Here are a handful of Graphite features that tend to show the most immediate impact:

* [Stacking in the CLI](/create-stack): Quickly create stacks with the CLI.

* [Merge a stack](/merge-pull-requests): Use Graphite’s automated solution to merge a stack of PRs.

* [PR review capabilities](/pr-page-overview): Comment on unchanged lines of code, unresolved threads, and suggested edits.

* [PR versions](/pull-request-versions): See and compare versions of a pull request to keep track of the history of a PR.

* [VS Code extension](/vs-code-extension): This is especially useful for engineers who are less comfortable using a CLI.

* [PR inbox](/use-pr-inbox): Even dedicated CLI users can find value in using the PR inbox to quickly see the state of their PRs, which ones need their attention, and have the ability to customize their inbox filters and layout.

* [Notifications](/slack-notifications): Get PRs reviewed quickly by integrating with Slack. Receive real-time notifications and approve, comment, or request changes on a PR directly from Slack.
