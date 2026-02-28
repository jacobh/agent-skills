> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Signed Commits

> Learn how to enable commit signing in Graphite.

Setting up a GPG key enables Graphite to sign commits when performing remote operations on your behalf to simplify your workflow, like rebasing, and allows GitHub to mark commits as verified.

If your repo is configured in GitHub to require [commit signing](https://docs.github.com/en/authentication/managing-commit-signature-verification), you need to configure GitHub to recognize Graphite’s signed commits as well. In these cases, Graphite needs to sign the commit or GitHub will not allow the commits to be merged.

## Set up signed commits

To set up a key for signing commits, visit [https://app.graphite.com/settings/preferences](https://app.graphite.com/settings/preferences). The “Commit signing” section walks you through:

* Generating a personal private/public key pair in Graphite for signing

* Adding the public key to GitHub
