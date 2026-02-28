> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Insights

> Learn how to track your team's engineering velocity with Graphite Insights.

<Note>
  Insights is currently in beta.
</Note>

Graphite's goal is to improve engineering efficiency. Graphite Insights helps measure and improve that efficiency through transparent, customizable stats.

Insights allows you to create, save, and share custom views with your queries. You can look at activity for yourself and your team members. This transparency aims to give all team members the benefit of data—regardless of their role on the team.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=99f47df5abdb25604a94e2d267125fe3" data-og-width="6668" width="6668" data-og-height="3388" height="3388" data-path="images/9006508a-1688787621-insights.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5bc8556c217e21fac402ac004c9f88d5 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2fbf73644d4be9b43f3e2e9fc09104b0 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f729d9b88569640dc851a83f8a2ce49e 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=aaeb6382a4cd3346e39ce48bbdd92a43 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4a0130ddbfcc787ca48ffd1b783d8864 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9006508a-1688787621-insights.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=34d1316fee0323b90d5ee3eb7a6e0f0d 2500w" />
</Frame>

### What kind of data will I see?

<Note>
  For a deep dive into Insights stats and how they're computed, see [Insights stats definitions](/insights-stats-definitions).
</Note>

For selected users (aggregated):

* Total PRs merged

* Average number of PRs merged per person

* Average number of PRs reviewed per person

* Median publish to merge time

* Median review response time

* Median wait time to first review

* Average number of review cycles until merge

* (Graph) Number of PRs reviewed per person over a time period

* (Graph) Number of PRs reviewed by Graphite users vs. non-Graphite users over a time period

* (Graph) Number of PRs merged per person over a time period

* (Graph) Number of PRs merged by Graphite users vs. non-Graphite users over a time period

For each individual user:

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=38ddd1e4915f88582c1a924433ffa369" data-og-width="6668" width="6668" data-og-height="3388" height="3388" data-path="images/92368f05-1688789123-insights-table.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7d493068a8c07ad1ff4c3b72d3cf5f89 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=732ba3cf3ece91ff393ece4300ceba0e 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f2050542bed77617bd30a4c9199c3435 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=30612858fff614e4dfef3c02b2611f20 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5d53933f13a4430b90f8a345aa330c5d 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/92368f05-1688789123-insights-table.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2822c804ac13d9046275d05b14f637f4 2500w" />
</Frame>

### Adjust the Insights time period

The statistics that are shown on the Insights page are aggregated over a specific time period. Graphite provides four fixed time periods for your convenience: the past week, month, quarter, or year. You also have the option to input a custom time period.

Each Graphite plan includes a defined sync period for historical GitHub data. The Starter plan includes insights going back up to 2 months. The Standard and Enterprise plans include up to 2 years.

### Select users

You also have the ability to filter and view insights for specific people or groups of people, as well as the aggregate across your entire organization.
