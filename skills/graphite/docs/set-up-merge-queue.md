> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set Up The Graphite Merge Queue

With the Graphite merge queue, rather than being merged straight into main, the PR will enter a "queue" and wait its turn to be merged.

The merge queue is **repository-specific**. When you enable it for a repository, it will operate on its `main`/`trunk` branch. We currently don't have support for multiple queues on a single repository (that is, two merge queues for the `trunk` branch and `deploy` branch of a repository).

## Prerequisites

* [Graphite Team or Enterprise plan](/pricing-faq)

* [Graphite App installed](/authenticate-with-github-app) on your org

## Enable the Graphite merge queue for your repository

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c97b69ed7e99d99b4455d57618dceb99" data-og-width="5326" width="5326" data-og-height="2094" height="2094" data-path="images/21877fe2-1683648016-repo_settings.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=8cadbe0bb875a57e264f18c8b35a3791 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=af0a2c6d38da6f7055b057ba949eac27 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=baeaced0bcc43d94c98b9d95a66f68e8 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=7bd14fc4f789421b81166e9acb377a3f 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2341ca256c38fcd1e20f1de3c116bcd1 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/21877fe2-1683648016-repo_settings.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=04e0cef3fadae9348a6b6be4993cb187 2500w" />
</Frame>

Enable the Graphite merge queue for a given repository:

Go to *Merge queue* in the Graphite app settings page ([https://app.graphite.com/settings/merge-queue)](https://app.graphite.com/settings/merge-queue)

1. Click **Add merge queue**

2. Select the repository you want to enable it for by using the dropdown selector

3. Click **Next** to adjust and save your merge queue settings

## Configure the merge queue for your repository

In GitHub, most repos use either **branch protection rules** or **rulesets** to restrict certain actions. Follow the corresponding instructions for what your repo uses.

Some orgs may use both if transitioning from branch protection rules to rulesets: in that case, follow both instructions.

### Branch protection rules

#### Push permissions

Some repositories restrict which accounts can merge to the trunk branch with the **Restrict who can push to matching branches** branch protection rule.

* **Required:** if this setting is already enabled for your repo's trunk branch, add `graphite-app` to the list of actors with push access. Otherwise, this rule will prevent the merge queue from merging PRs.

* **Strongly recommended:** enable this setting, and make `graphite-app` the *only* actor with push access. This helps your teammates remember to use the merge queue for merging.

<Info>
  Graphite is not "required" to be the controller of history on `main`—and combining Graphite merge queue merges and non-merge queue merges will function—but the experience is much worse. If there are merges made to `main` outside the merge queue, they will be detected and the merge queue will restart the merge (rebase on top of those changes and restart CI) that is currently active. This could lead to failures if a timeout is configured for the merge queue, and results in users constantly being pushed behind non-merge queue users.
</Info>

To view this setting, go to **Settings** in GitHub for the repository you have the Graphite merge queue enabled for.

Next, go to the **Branches** settings under **Code and automation**.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=c847fb7aaefe3265a732da82071cf996" width="750" data-og-width="664" data-og-height="548" data-path="images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=61409b1a6361d3758a5780693c3e3be9 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ab19c8d2f5274f44a868095b14bbbe81 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7059cb51323a6f5a0c0a032eb073bca6 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=640b18b74e79370a8df014b21695a148 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=0b4de21e3efc2179242c23fd4f453898 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ca7ef7f2-1688787122-screenshot-2023-06-30-at-4-29-16-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e505869be1c48d60a3be16356d8312a8 2500w" />
</Frame>

Click the **edit** button on the branch the Graphite merge queue targets (the branch which all PRs are merged into).

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5582a02ea1112e42fe70838cd0c94306" data-og-width="1574" width="1574" data-og-height="312" height="312" data-path="images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7e5ae1f167cc5a2528c411a2ece0a093 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=0001df93df3b28acf990f8d9e90ec2b9 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ac01f120fbe6de437f193d72e7a54b30 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5391e2a360bc2016059359a777eb1526 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ed36fbaa1f29f08784910b08ee0d8214 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b31c570b-1688787204-screenshot-2023-06-30-at-4-30-32-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=138ad4c44983d727b3bed0e410418ecb 2500w" />
</Frame>

Here you'll find the **Restrict who can push to matching branches** setting.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=cc50652613dad04f334ed4b17424b2c0" data-og-width="2292" width="2292" data-og-height="1186" height="1186" data-path="images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b7b48bb6ea77e9b46c5b139bc6b3b77f 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=678a624cb26bb79bb2485eff2735da13 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=395302172e8554931ff660c6842f2d5f 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=dbab06fa567e6e056ff39b428d458c65 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=3d722f7bf09c7f2b31449e0bee235a80 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/ed4583f6-1689791434-screenshot-2023-07-19-at-2-30-22-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5562ff5843e31832c4925f29d757ddbd 2500w" />
</Frame>

<Warning>
  GitHub automatically includes admins and maintainers as users who can bypass these rules and there currently isn't a setting to disable this.

  As it stands, admins and maintainers will still have the ability to bypass the merge queue despite having these settings enabled.
</Warning>

#### Bypass PR permissions

In order to implement speed improvements, the Graphite merge queue requires the **Allow specified actors to bypass required pull requests** permission. While you can use the merge queue with this setting disabled, enabling it will help our merge queue merge faster with [merge queue optimizations](/merge-queue-optimizations).

Under *Protect matching branches* → *Require a pull request before merging*

* Ensure that you have **Allow specified actors to bypass required pull requests** selected

* Add the Graphite App (graphite-app) to the list of who can bypass required requests

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=9730b5932584f86f1a16e0e95d2d01c9" data-og-width="1580" width="1580" data-og-height="1434" height="1434" data-path="images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2c22549b10c37027e908e6dc48f6f932 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a257256852f72d2275e1e3b9b4a26625 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f25a1a302044dfe08cfdd4dce15afe4d 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=faece2215f2537b08f77b05727baba98 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=326610f48dc05c7f73943cc39f35cfa0 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/96bfc5b0-1688787289-screenshot-2023-06-30-at-4-31-44-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=cd84a050b271353ede972b06a07be675 2500w" />
</Frame>

### Rulesets

Simply add the `Graphite App` to the **Bypass list** with **Always allow**.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=4fe8c8bcfd1a75bcda5417286e868def" data-og-width="1588" width="1588" data-og-height="302" height="302" data-path="images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=a428c5feeb315d44f356f30149c33767 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=ff9e2701212120f7a3cd3534a34fb2cf 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=4b5b99803abea2f553e9ece06b0d9d0d 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2262ce10c3a04d0994c8f45f5b7bb362 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=f673577f498c4761e82f9a6f3179a762 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/18d8ecf7-1709912717-screenshot-2024-03-08-at-10-41-38-am.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=f0d01d965a99eb80eeeae6a53088082e 2500w" />
</Frame>

Note that multiple rulesets can apply to a single repo or branch. Make sure to update this for all rulesets impacting your merge queue enabled repo and branch.

## Optional: Adjust merge queue settings

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=1806afc2ff0ec8fa2006b40b97c15388" data-og-width="5326" width="5326" data-og-height="2094" height="2094" data-path="images/40d96e88-1683648678-merge_queue_settingw.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=3a20590a92e1c575f84a8837169075b8 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=40969aa7a3ebc4bc463517fec51d5eef 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=7995a6e8ca2afaec39efb23ec33b213f 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=df1973e39ed8fcd005198808bcde3134 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e90f10e84c0932a2329c63621b1e4a2a 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/40d96e88-1683648678-merge_queue_settingw.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c93536a00547a082c51462acacdc2f01 2500w" />
</Frame>

When you enable the Graphite merge queue for your repository, there are a few settings and configurations that are available to customize. Before you enable these settings, make sure you have [GitHub App authentication enabled](/authenticate-with-github-app), and have configured your repository's branch protection rules accordingly as explained above.

### Default merge strategy

* **Rebase**: rebase your changes on top of your trunk with commits unchanged (equivalent to GitHub's rebase and merge)

* **Squash**: rebase your changes on top of your trunk with each PR squashed to a single commit (equivalent to GitHub's squash and merge)

If you haven't enabled the queue, you can change the merge strategy for your PR directly from the merge modal. When the queue is enabled, you can set the merge strategy at the queue level so that all the PRs that are queued to that merge queue abide by the same rule.

### Timeout

Configuring the merge queue timeout allows you to place an upper-limit on the amount of time a PR can stay at the head of the queue, ensuring that the queue never hangs in the event that a regression is introduced.

### Merge queue label

Allows your team to add pull requests to the merge queue from anywhere by applying this label. The PR will be queued when it’s ready to merge.

Make sure your team uses this label exclusively for the merge queue.

For more information on using the label to enqueue PRs see [here](/get-started-merge-queue#enqueue-via-label).

<Note>
  You can only enqueue via label if you have a Graphite account set up.

  If a user tries to add the merge queue label to their PR and doesn't have a Graphite account, the label will be removed and the user will be prompted to create an account on Graphite in the PR's comments on GitHub.
</Note>
