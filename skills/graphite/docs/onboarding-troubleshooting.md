> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Onboarding FAQs

> Answers to common questions when getting started with Graphite.

## Having issues selecting a repository owner?

If you don’t see your desired owner in the list of owners in the Graphite onboarding flow and know that the Graphite GitHub App isn’t installed on the owning account, you should follow the instructions underneath the list of owners starting with `Don't see what you're looking for above?`. If you know that the Graphite GitHub App is installed on your organization, you should click the `Authenticate Graphite App` button.

If you're [a collaborator on a personal repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository) that you'd like to use with Graphite, you must install the Graphite GitHub App on your personal account.

If you're still unable to select your desired repository owner, contact us at **[support@graphite.com](mailto:support@graphite.com)**.

## Don't see the repository you're looking for?

You can choose which repositories within your organization you want the Graphite GitHub App to have access to. If you don't see a certain repo in the repository selector in the Graphite Web App, it's likely that you haven't granted the Graphite GitHub App access to those repositories. You can do so in the GitHub App settings within your organization. (The URL will look like this: `https://github.com/{orgname}/settings/installations`)

If you're using a Personal Access Token to onboard with Graphite and you don't see repositories for that organization, there are two possibilities:

1. Your organization may use SAML SSO, so you must authorize the token after it's been created for it to have access to that organization's resources. See [GitHub's instructions](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on).

2. The organization has restricted access to resources for classic PATs. See more about this on [GitHub's documentation](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization#restricting-access-by-personal-access-tokens-classic), and you can reach out to an organization owner to find out if they can lift this restriction.

If you're a collaborator on a private personal repository, then the owner of the repository must also install the Graphite GitHub application on their personal account in order to select the repository in Graphite. You can also authenticate with a Personal Access Token to see private repositories, but installing the Graphite GitHub App is recommended.

## Why is Graphite asking to act on my behalf?

You have arrived at this step because:

1. The Graphite App is installed on your organization but you don’t see it in the organizations list

2. You clicked `Add organization from GitHub` and the organization had the word `Configure` next to it in this list (indicating that the app is already installed on the organization)

This primarily treats the case where a new user is onboarding with Graphite and wants to join an organization that **already has the Graphite App installed.** Once you click this button, you will see a confirmation modal saying that we will redirect you to GitHub to authorize the Graphite App along with a special note that if you do so, **the Graphite App will only have access to the organizations on which it's installed**.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4e22e8aea1a15e73c7e4457b1920a343" data-og-width="1350" width="1350" data-og-height="1246" height="1246" data-path="images/d7298895-1700536958-frame-10123321.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a9f5dcbde123335bb996ed1d77b9ba62 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4b44bbfe98e2b2ef957bd487368d6527 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=041c0dddd9e0ecb4ef2ddc42a0d34ef1 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=db7b50dfc2aa71ee049580a701a9a6db 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ebee02ca922b1fcee9eaaeafba17c4ae 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/d7298895-1700536958-frame-10123321.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=a5ff45cf54003ebd1dd5dc623349c4bd 2500w" />
</Frame>

This button only appears if you haven’t already authenticated the Graphite App. Once you do so, you will return to the organization selection screen and see your desired organization.

## Why are all my GitHub organization's repositories saying `Missing permissions` in Graphite UI, or `gt` CLI saying I need to join a team?

You may have been removed from the GitHub organization. Check this with the organization's GitHub administrators.

If you have not been removed and the organization uses [SAML SSO authentication](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-single-sign-on/about-authentication-with-single-sign-on), ensure that your GitHub user account also has an active SAML session with your organization.
