> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Jira

> Learn how to integrate Graphite with Jira to view, link, and create issues associated with pull requests.

<img src="https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=95dc0543454ecb8c56399207dc9e765f" data-og-width="1161" width="1161" data-og-height="822" height="822" data-path="images/jira-access-request.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?w=280&fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=9fb4f5cbbd55fd450c189a6583445b04 280w, https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?w=560&fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=ba1cbd277995ecd86b7131ff7fe14802 560w, https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?w=840&fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=81159de02e9d202c7136bdec4b6eb637 840w, https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?w=1100&fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=e025257ae7583586503586991f3d6559 1100w, https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?w=1650&fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=89b367daff3aa6c4e2078ca67a714de7 1650w, https://mintcdn.com/graphite-58cc94ce/4eK3kidU7PG-WjjO/images/jira-access-request.png?w=2500&fit=max&auto=format&n=4eK3kidU7PG-WjjO&q=85&s=618110d386ce7b34d75a923796e13140 2500w" />

With Graphite's Jira integration you can view, link, and create issues associated with pull requests right from the Graphite web app.

### Prerequisites

* A Jira account

## Connect Jira

Connect your Jira account directly from the [*Connected accounts* settings page](https://app.graphite.com/settings/connected-accounts) on the Graphite app.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=bddd924f6eacb14710e4c7311440fc6c" data-og-width="1435" width="1435" data-og-height="635" height="635" data-path="images/show-connect-jira-button.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?w=280&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=420c7aa12a82d5b65ff049e77f54e883 280w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?w=560&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=20d460c97a644272f29b10e19f262d60 560w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?w=840&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=c4e9e18206d7874b4e03c1ff86082381 840w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?w=1100&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=6f3cae48e205e31fed727f5665ead521 1100w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?w=1650&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=70417278453097800bee3b1c5173954e 1650w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-connect-jira-button.png?w=2500&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=5dc451349c3ca6e7c6e7b86ac05f87e8 2500w" />
</Frame>

After clicking the `Connect` button you will be directed to Jira to finish the integration setup process.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=78527e40723016333175f3d741fedaa6" data-og-width="1163" width="1163" data-og-height="511" height="511" data-path="images/graphite-connected-accts-w-jira.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?w=280&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=0be40f403e374768f066cd1f6a547834 280w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?w=560&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=c7a2afa999a9ffc03bc03efe7a6dd0f9 560w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?w=840&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=df2a1b5d250c445fb9629a9a50e49df4 840w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?w=1100&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=4dbc13de2ca675f0e346fb4224ba3a2b 1100w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?w=1650&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=89d871fbb73ea57de949be33e2eaab91 1650w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/graphite-connected-accts-w-jira.png?w=2500&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=fcdff7289cda62a629dd77246e6996b1 2500w" />
</Frame>

Once the integration is successfully configured, you should see confirmation on the **Connected accounts** settings page.

## Using the Jira integration on the PR page

After you've installed the integration, you can will then be able to view any associated Jira issues in the sidebar of the **Pull Request** page.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=e935d18fed6744760e93006b917fd9ac" data-og-width="1446" width="1446" data-og-height="847" height="847" data-path="images/jira-in-graphite.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?w=280&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=d98cd1797af9d38666d9a8ff1927a119 280w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?w=560&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=ca94581d4d75dcc043035ee3d1c9a2e0 560w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?w=840&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=a4c775011aaa91eb6e40855210d2327f 840w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?w=1100&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=00feec51acc7a0aa85feabe65ff4530d 1100w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?w=1650&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=c5a1d3fc113dde986b4261ed040b6a27 1650w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/jira-in-graphite.png?w=2500&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=3988f097b1b695ede7a9d3d6d739a572 2500w" />
</Frame>

### Linking an existing issue

To link a Jira issue to a pull request, click the **+** symbol located in the issue tracker sidebar component.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=442f61bf53d8ce140bcc4a030b8401a3" data-og-width="1452" width="1452" data-og-height="879" height="879" data-path="images/show-link-issue-jira.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?w=280&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=019796c8947a84226208fb4fefd64191 280w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?w=560&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=3173c7a56647643ad3fb44318d07954f 560w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?w=840&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=aa6039d277a0c9593a9075243dd74fde 840w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?w=1100&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=52e6c20452bf1480e89b4974510f230b 1100w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?w=1650&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=42c9a040b50cabac306faa0cf0d75f30 1650w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/show-link-issue-jira.png?w=2500&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=703621cdc0cdfcc29f35f509a98275e2 2500w" />
</Frame>

From here you can:

* Search for a Jira Issue by name

* \[OR] Paste a Jira Issue URL

### Creating a new Jira Issue from PR page

To create and link a new Jira Issue from the Pull Request page, you can click `Create new issue` in the issue tracker sidebar component.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=35a608e0caaf4deb5262afc65307dd62" data-og-width="1582" width="1582" data-og-height="1521" height="1521" data-path="images/new-jira-modal.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?w=280&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=9be3f16478f040d9775717d621936fa9 280w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?w=560&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=837771f6eb40f13f1b236ac697665ca9 560w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?w=840&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=ced7c78833ef40a4bf86a51b472b754c 840w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?w=1100&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=b31afa77a5956a75241bf7851b549cbc 1100w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?w=1650&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=6935422c483b357d7f6351e870463704 1650w, https://mintcdn.com/graphite-58cc94ce/5-r_sd14jPfxQ4c9/images/new-jira-modal.png?w=2500&fit=max&auto=format&n=5-r_sd14jPfxQ4c9&q=85&s=b44811a9ecdb4e56abbd6850fa8f0587 2500w" />
</Frame>

From here you can assign a *Project, Issue Type, Summary, Description, Status, and Priority*. Once you click `Create issue`. The issue will be created in Jira, and will be linked to the current pull request.
