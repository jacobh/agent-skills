> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Privacy and Security

> Graphite offers a handful of AI features to automate parts of the developer workflow. These features are opt-in and do not store or train on your data.

Graphite offers a handful of generative AI features to automate parts of the developer workflow.

Examples of our AI features include:

* Generating pull request titles and descriptions

* Generating review comments

* Generating suggested edits in response to review comments

* And others coming soon

We know that AI can be a sensitive topic for many organizations, which is why:

* By default, Graphite does not include your data in any requests we make to either of our AI subprocessors (currently Anthropic and OpenAI;see below for more details)

* Graphite will always ask for user approval before triggering or enabling features that include your data in requests to either of these subprocessors

* Neither Graphite nor any of its subprocessors use your data to train their models

* Graphite holds a high bar when protecting your data, as outlined in our [Terms of Service](https://graphite.com/terms-of-service) and [Privacy Policy](https://graphite.com/privacy)

Many of our AI features are powered through partnerships with Anthropic and OpenAI, who currently act as our AI subprocessors. We have strict agreements in place with both companies that explicitly prohibit the use of your data to train models, and your data remains protected and confidential at all times. Our agreements are available here:

* Anthropic:

  * Agreement: [https://www.anthropic.com/legal/commercial-terms](https://www.anthropic.com/legal/commercial-terms)

  * Your data is not used for training: [https://support.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training#h\_1a7d240480](https://support.anthropic.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training#h_1a7d240480)

* OpenAI:

  * Agreement: [https://openai.com/policies/business-terms/](https://openai.com/policies/business-terms/)

  * Your data is not used for training: [https://openai.com/enterprise-privacy/](https://openai.com/enterprise-privacy/)

These subprocessors receive the minimum data necessary to generate the best possible response; examples of data we may send them include:

* Any metadata around the pull request (author, timestamp, etc.)

* The code the pull request changes

* Related or similar pull requests

* Related or similar parts of your codebase

We are committed to protecting your data and privacy at all times, and we understand that some organizations would rather not use these features at all. To disable AI features across your entire organization, please email [support@graphite.com](mailto:support@graphite.com) and request a complete block of all AI features for your organization. You can always email us again if you change your mind, and we will unblock these features for your organization upon request.

Lastly, depending on your plan, enabling some of these features may have additional costs. For more details on our features and pricing, please see our [pricing page](https://graphite.com/pricing).
