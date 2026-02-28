> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Slack Notifications

> Learn how to integrate Graphite with Slack to receive real-time, actionable notifications about your PRs.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=dcc683d0d35f0600590a69f0ffd868a0" data-og-width="5392" width="5392" data-og-height="4210" height="4210" data-path="images/61b6128c-1688839902-notifs.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=30fa00b35bffbbf7ba0f01ef0ce94552 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e059cf916d9f2c6eac1189781e474e30 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=dd449123dbc5a39337f06cc472ef2b5d 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b15337382712631ff72a3b4bc2431d84 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=54e3dd2a3a285823890fea24be3c5dc0 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/61b6128c-1688839902-notifs.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=8d55575cbf331decc380392edadca222 2500w" />
</Frame>

You have the ability to configure Slack notifications for PR activities like review requests, comments, mentions, and status changes. For some PRs, you can also approve, comment, request changes, or merge directly from Slack.

### Prerequisites

* A Slack workspace (free or paid)

## Install Graphite for Slack

Install the Graphite integration for Slack directly from the [notifications settings page](https://app.graphite.com/settings/notifications) on the Graphite app.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b7bc33ac38e0b2d7abe9de6f6cf773ef" data-og-width="2328" width="2328" data-og-height="588" height="588" data-path="images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=141e5e4aabc88765d620940a48d31956 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4d6b715b8a22e0358d5e010142b7d941 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=87269879e71fabaddb57ac9041d6c420 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=86c720131451374ad1d2f12472a2af9d 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=d6fff7fd3093838bbb6d87973d387e56 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/9e707430-1688840382-screenshot-2023-07-08-at-2-19-27-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2a47437dae218a7d71aec61cda75999b 2500w" />
</Frame>

After adding your Slack workspace, you will be prompted to give the Graphite app permissions to proceed.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=1acbb3cd2603bcb96d6e7d94f091f074" data-og-width="1218" width="1218" data-og-height="1162" height="1162" data-path="images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c98464dde82e205348dcebe85c743eb6 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b082c80a3257f40d645ccff66992121f 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=25d9c9638d293fc2c7d80ff78995c60e 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=cb97e27fb5f8583ca0686292737d2a07 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=0cf69208dd0dfea92a27483db2239b31 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/1e2a70e0-1675699556-screenshot-2023-02-06-at-11-05-49-am.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=604d583e1c1774f1e7e236d4f7a2f28b 2500w" />
</Frame>

In the future, you can modify the Graphite App's access to select workspaces and channels through this settings page.

<Note>
  **Note**

  When there are major updates to our integration for Slack, we will sometimes prompt users to "re-install" the integration for their workspace. To do so, you can follow the exact same installation flow in this guide. No need to remove the existing integration—adding the integration again will override your previous one.
</Note>

## Set up real-time notifications

After you've installed the integration, you can enable real-time notifications in the [notifications settings page](https://app.graphite.com/settings/notifications) on the Graphite app. You can configure which types of events you want to receive notifications for.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d73642bf9a30b1b70c9b17f68ae373dc" data-og-width="3340" width="3340" data-og-height="4210" height="4210" data-path="images/10bb323e-1688840928-notifs-settings.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e6167eca342aa558bef664bf5997a2f6 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=8759e3ff35e595c54b50b375e46792cd 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=8f67eee4e7c22689d4b518f88000d02c 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=1e8967a90d539512b716666422463013 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=1c6ef03b9455f148dba28042e3174a0b 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/10bb323e-1688840928-notifs-settings.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=5649727919626063735e4982066d0370 2500w" />
</Frame>

### Reviewing and merging PRs from Slack

The Slack integration gives you the option to directly review and merge PRs from Slack. No extra setup is needed: simply enable Slack notifications for **Review requests** and **Activity on your PRs**. Reviewing from Slack is available for PRs of up to 25 lines.

### Privacy and authorization

For the purpose of providing personalized and configurable updates and information about code contributions, the Graphite app can:

* Send messages as **@graphite** in selected channels

* Start direct messages with people

* Upload, edit, and delete files as **Graphite**

* View files shared in channels and conversations that Graphite has been added to

* Add, edit, and delete remote files on a user’s behalf

* View remote files added by the app in a workspace

* Show previews of app.graphite.com URLs in messages

* View people in a workspace

* View URLs from app.graphite.com

<Note>
  You can only connect a Slack workspace to a single Graphite user account at once. If you have previously authorized the Slack workspace in a different Graphite user account, you will need to completely remove that Slack workspace from in that user account's [Notification settings](https://app.graphite.com/settings/notifications) before it can be authorized in another user account.

  <img src="https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=f22ae0fb4b70cc3476c460ba17870ffa" data-og-width="787" width="787" data-og-height="292" height="292" data-path="images/remove-slack-example.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?w=280&fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=f8a456dbd5eb31070bddbcfe46965f9c 280w, https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?w=560&fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=7e69411d6e546f03f62d40e1a93b39ba 560w, https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?w=840&fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=60169f5ceab1dad322acf63bd428528e 840w, https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?w=1100&fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=f792177c942ba7a0107970f03c565bd0 1100w, https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?w=1650&fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=c06c590fd52718e304ab0f74437d7c55 1650w, https://mintcdn.com/graphite-58cc94ce/N1aRY7SRCeaXzTF2/images/remove-slack-example.png?w=2500&fit=max&auto=format&n=N1aRY7SRCeaXzTF2&q=85&s=059b34a461b8501bbbe9d550303666df 2500w" />
</Note>
