> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Authenticate With GitHub

> Graphite is built on top of GitHub's APIs, so you need to provide Graphite access to your GitHub resources to create, review, and merge PRs.

## GitHub authentication methods

Currently, GitHub is the only git provider that Graphite integrates with. When setting up an account with Graphite, you'll have two options to authenticate with GitHub:

* Option 1: Install [the Graphite App](https://github.com/apps/graphite-app) (a GitHub App) on your organization ***(recommended)***

* Option 2: Provide Graphite with a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

<Note>
  We no longer support OAuth as an authentication method. Users who previously authenticated with OAuth remain supported, but new signups must use GitHub App or PAT.
</Note>

## Option 1 - Install the Graphite GitHub App

When creating an account on Graphite, it's strongly recommended that you install or request installation of Graphite's GitHub App on your organization.

GitHub Apps are the officially [recommended way](https://docs.github.com/en/apps/publishing-apps-to-github-marketplace/github-marketplace-overview/about-github-marketplace-for-apps) to integrate with GitHub. Some benefits for installing [Graphite’s GitHub App](https://github.com/marketplace/graphite-dev) on your organization:

* Access to GitHub webhooks, which provides Graphite with push-based updates for information like CI status, mergeability, and real-time push events within seconds.

* Access to the Graphite Merge Queue. The Merge Queue is only available if our GitHub App is installed on the organization.

* Avoid hitting secondary rate limits with the GitHub API. This means fewer API requests to keep your data up-to-date, leading to fewer API errors and lower latency.

* Provides the most security for your organization, giving users more control over which repositories the app can access through fine-grained permissions and short-lived tokens.

### Install the Graphite App on an organization

<Note>
  You can only install a Graphite App on an organization if you're an organization owner. If you're not an owner, you should [request to install the Graphite App](/authenticate-with-github-app#request-to-install-the-graphite-app-on-an-organization) instead.
</Note>

If you're an organization owner, you can install the Graphite App on your chosen organization by following the Graphite onboarding flow, or directly from the [GitHub marketplace.](https://github.com/apps/graphite-app)

See GitHub's instructions to [install an App from the GitHub marketplace](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-organizations).

### Request to install the Graphite App on an organization

If you're not an organization owner, you can [request approval for the app to be installed](https://docs.github.com/en/apps/using-github-apps/requesting-a-github-app-from-your-organization-owner). Once you've done so, you should reach out to an organization owner to have your request approved. You can find a list of organization roles and members using this link: `https://github.com/orgs/{org-name}/people`.

### Authorize the GitHub App with your personal account

After the Graphite App has been installed on your organization or if you're signing up for Graphite with an organization that has the app installed, you'll also need to [give the Graphite App approval](https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps) to retrieve information about your GitHub account and make changes on your behalf.

The screen to do so will look like this:

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4e22e8aea1a15e73c7e4457b1920a343" data-og-width="1350" width="1350" data-og-height="1246" height="1246" data-path="images/d7298895-1700536958-frame-10123321.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a9f5dcbde123335bb996ed1d77b9ba62 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4b44bbfe98e2b2ef957bd487368d6527 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=041c0dddd9e0ecb4ef2ddc42a0d34ef1 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=db7b50dfc2aa71ee049580a701a9a6db 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ebee02ca922b1fcee9eaaeafba17c4ae 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a5ff45cf54003ebd1dd5dc623349c4bd 2500w" />
</Frame>

<Note>If your GitHub Organization uses [SAML SSO authentication](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-single-sign-on/about-authentication-with-single-sign-on), ensure that your GitHub user account also has an active SAML session with the organization on GitHub while authorizing the GitHub app.</Note>

## Option 2 - Provide Graphite with a Personal Access Token

If you're unable to authenticate/install the Graphite App for any reason, you can always use Graphite with a Personal Access Token. At any point in the Graphite onboarding flow, you can click **"Authenticate with a personal access token"**, and the screen will look like this:

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=9df32a82a78c5b6005f599ffc9796ef0" data-og-width="1364" width="1364" data-og-height="954" height="954" data-path="images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=38e15fe6036be2c25096a86dc5bb1ddb 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=84f76751d0e1208c32e0c836d74a0192 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=9e872e0a875f66e958c5738e1c49ad41 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=6d775ff26d771405d276614878ab8559 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=8b706aa87f42088d7fb307a9967b4bb7 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/804e52b5-1700444982-screenshot-2023-11-19-at-7-49-31-pm.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c5aa3379e3bb13c16082587d484d6f69 2500w" />
</Frame>

From here, generate a token on GitHub with the requires scopes pre-selected and paste it into the field to continue account creation. Learn more about the scopes Graphite requires in our [privacy and security docs](/privacy-and-security).

<Warning>
  **Warning**

  GitHub Personal Access Tokens are designed to give command line tools limited access to work with your account. While they provide the minimum clearance to use the Graphite CLI and app, they give the user the added responsibility of granting the token the correct permissions and have a limited lifespan before they expire. You may have a slower/limited experience with Graphite if you proceed with a PAT.
</Warning>

## Manage GitHub authentication

To make adjustments to your GitHub authentication and the resources which Graphite has access to, go to your [GitHub authentication settings](https://app.graphite.com/settings?org=withgraphite) in Graphite:

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=1ca4cad1d9a342e410403f892b30267f" data-og-width="728" width="728" data-og-height="696" height="696" data-path="images/f306b329-1700537052-frame-10123322.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=de47f2f7a66909a8e53f7a5b5dbcd65f 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=db3ec5e8c55a2af808b137a3518e547c 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=aeadc400cb5b3c2ddef5f6334ef12d7e 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=947f8d678f2f1cfc9f300439fa28c37d 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a790822c159c2bfb23f92475181fc1f1 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f306b329-1700537052-frame-10123322.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=39d08a847692d2e901e38b4aef33ef4c 2500w" />
</Frame>
