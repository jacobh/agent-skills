> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GitHub Enterprise Server

> Learn how Graphite Enterprise customers can use Graphite with a GitHub Enterpise Server instance.

By default, Graphite connects to GitHub Cloud seamlessly - including [GitHub Enterprise Cloud](https://docs.github.com/en/enterprise-server@3.12/admin/overview/setting-up-a-trial-of-github-enterprise-cloud). Some companies chose to self-host their GitHub servers however, in an offering formally known as [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.12/admin/overview/about-github-enterprise-server).

## Does Graphite support connecting to a self-hosted GitHub server?

Graphite Enterprise customers can use Graphite with a self-hosted GitHub Enterprise Server instance. We are able to connect through a combination of stable IP addresses and an IP allow list in the user's VPC. There is currently no way to self-serve connecting Graphite to one's self-hosted GitHub server. If you are interested in adopting Graphite at your company and do not use GitHub Cloud, [please reach out to our support team](https://graphite.com/contact-us) for help integrating. Note: we only support this pattern of integration for Enterprise customers.

## How can I tell if my company is self-hosting GitHub?

If you are uncertain whether your team uses a self-hosted GitHub server, try browsing to a company pull request and inspecting your URL. If the URL matches the pattern `https://github.com/<org>/<repo>/pull/<number>`, then you are using a standard cloud-hosted version of GitHub. However, if the URL matches a custom domain that does not include the host `github.com`, then it's likely your company is self-hosting GitHub Enterprise Server.

<Note>
  Most modern companies choose to run on GitHub Cloud. If your company does not have specific important reasons to self-host such as extreme security concerns, we strongly recommend folks chose to host on GitHub Cloud, regardless of their use of Graphite.
</Note>

## Does Graphite offer a self-hosted form of Graphite itself?

No. There is no self-hosted deployment of Graphite's service available for a user to run in their own cloud. It's possible that we may consider such an offering in the future, but there are no plans in the works at the moment.
