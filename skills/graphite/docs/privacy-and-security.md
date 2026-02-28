> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Privacy & Security

> Learn how Graphite prioritizes security to safeguard your source code.

To achieve our mission to build state-of-the-art developer tools, Graphite values security above all else. We are SOC 2 Type II compliant, passing a rigorous auditing procedure established by the American Institute of Certified Public Accountants (AICPA). SOC 2 Type II assesses non-financial reporting controls across five areas: security, availability, processing integrity, confidentiality, and privacy. We also continuously pen test. [Learn more](https://graphite.com/privacy) about our security practices.

<Note>
  Unlike SOC 2 Type I certification, which focuses on a company’s controls at a specific point in time, Type II goes further. It evaluates how effectively these controls operate over an extended period of typically six months or more. For our enterprise users, this certification streamlines the vendor due diligence process. If you have questions about our security policies or want to request a copy of our SOC 2 Type II report, please visit our [trust center](https://trust.graphite.com).
</Note>

## Permissions requested by the Graphite GitHub App

We recommend authenticating via the Graphite GitHub App when you first create your Graphite account, which allows your organization to grant Graphite access on a repo-by-repo basis.

The Graphite GitHub App asks for the following permissions:

* `Read & write: actions, checks, contents, pull requests, workflows`

  * Used to create, display, update, and merge PRs with Graphite

* `Read: administration, commit statuses, deployments, issues, metadata`

  * Used to display PRs and their relevant statuses and metadata on Graphite

* `Read: organization properties, roles, and members`

  * Used to display organization info on Graphite

* `Read: user emails`

  * Used to send transactional emails about Graphite

* `Webhook event subscriptions`

  * Used to keep Graphite's view of GitHub data up-to-date in real time, allowing for best performance of many features (only available with GitHub App authentication)

<Note>
  Depending on your GitHub organization's settings, you may have to "request to add" the Graphite GitHub App—one of your GitHub organization owner will then have to approve the app for use, at which point you'll be able to sign into Graphite.
</Note>

## CLI

When you call `gt submit`, the Graphite CLI pushes the branches in your stack to the remote repository in GitHub directly from the client. Metadata about which branches were pushed to GitHub are sent to Graphite servers so we can open those PRs on your behalf.

## Web app

When you open the app in your browser, it calls GitHub's API directly from the client to retrieve and display pull requests in repositories you have access to according to the filter views you've defined. The only data stored on Graphite servers are basic profile metadata (GitHub ID, username, profile picture) and the auth token generated when you sign in with GitHub, which we use to save your PR filter views and maintain your session.

### User-uploaded media assets

We use a secure domain for hosting all user-uploaded media assets, such as images and videos. If you are using a VPN, or other form of network security that could block network requests, then you may need to allowlist this domain: `https://user-attachments.graphiteusercontent.dev/`.

## AI Summarize

Graphite's AI Summarize feature on the app utilizes Anthropic's API to create summaries of PR changes with the help of artificial intelligence. In order to protect the source code and privacy of our customers and in accordance with [Anthropic's terms of use,](https://support.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training) your source code and PR metadata are not used in training sets.

We've also crafted the feature to be PR-by-PR opt-in; if you don't press the button, your code will not be processed by Anthropic. If you have more questions about this feature, don't hesitate to shoot us a message [on Slack](https://join.slack.com/t/graphite-community/shared_invite/zt-1oiaympp2-R3Oz2DZzycWc1vudtDDvLw) or email [security@graphite.com](mailto:security@graphite.com).

## Logging

During normal usage of the CLI and the website, Graphite will generate and store logs to help us better debug in the event of an error and better understand the profile of our users. Examples of that data include:

* Metadata about your repository: for example, number of branches or counts of Graphite commands being run. We use this to debug failing commands in the CLI (for example, in the past we found that a repository with a very high number of branches would cause the CLI to hang).

* Metadata about your usage: for example, commands being run, command run time, or any CLI errors. We use this to understand where to further our engineering investment and understand how widespread issues are.

* Metadata about your GitHub account: for example, organizations which you're a member of on GitHub. We use this to track the usage of our product and understand what types of organizations we work best for.

## How Graphite keeps your source code safe

We understand how important it is to keep your source code safe. That's why we built Graphite with security and privacy best practices from day one, using encryption in motion and at rest.

### Encryption

Graphite stores GitHub access tokens returned from App authentication logins. These tokens are revokable by both Graphite and the user’s GitHub settings.

We store these tokens in a Postgres database, encrypted in motion and at rest. We also manually encrypt the access tokens using`aes-256-cbc`and decrypt when we read them into server memory. To encrypt/decrypt, we use a secret stored in AWS secret manager.

We additionally encrypt data in our database with a key stored in a different service. So even if the database was compromised, access would not be gained to the Github API tokens.

### Learn more

For more information about our security practices, certifications, and policies, please visit our [trust center](https://trust.graphite.com).
