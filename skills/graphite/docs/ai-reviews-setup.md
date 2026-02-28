> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Setup & configuration

> Get started with AI reviews in under 5 minutes

## Getting started with AI reviews

AI reviews can be enabled in just a few clicks, with no configuration required to start catching bugs in your pull requests.

### Enabling AI reviews

1. Navigate to the [AI code review settings page](https://app.graphite.com/ai-reviews?reviewerTab=settings)

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=a6d22d38697f4658f7e4ca887ab963c2" data-og-width="1590" width="1590" data-og-height="1390" height="1390" data-path="images/ai-reviews-1.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?w=280&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=d76163e0cdfeafbef05e8dc1102c580e 280w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?w=560&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=d0797cc30880243d744b5e2db813a9bc 560w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?w=840&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=5e94298ff88d5a9fa121a97c9047534c 840w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?w=1100&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=a0771f4cc591dbc6417292099195c34e 1100w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?w=1650&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=940eb5eaadd2e90973915ef2d2653659 1650w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-1.png?w=2500&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=52227c2ead00d4495ead1229effd7627 2500w" />
</Frame>

2. Select the repositories where you want AI reviews enabled
   * You can choose specific repositories or enable AI reviews across your entire organization
   * If you don't see the repositories you're looking for, make sure they're [synced with Graphite](https://app.graphite.com/settings/synced-repos)

3. Click "Save" to save your settings. Graphite Agent will now automatically review all new pull requests in the selected repositories

### What happens next

Once enabled, Graphite Agent:

* Automatically analyzes new pull requests in the selected repositories
* Comments directly on pull requests when it finds potential issues
* Suggests fixes for the problems it identifies

Graphite Agent works behind the scenes, with no changes required to your existing PR workflow. Your team can continue using GitHub just as they do today, with Graphite Agent providing additional feedback alongside human reviewers.

For teams using continuous integration, Graphite Agent works alongside your test suite to catch issues that tests often miss, like logic bugs, edge cases, and security vulnerabilities.

You can monitor AI review performance from the **Overview** tab on the [AI code review dashboard](https://app.graphite.com/ai-reviews), which shows metrics like issues found, acceptance rates, and PRs reviewed over time.

## Enabling AI reviews on personal repositories

In order to enable AI reviews on your personal repositories, you must first install the Graphite GitHub App on your personal account.

1. Navigate to your [GitHub authentication settings page](https://app.graphite.com/settings)

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b4789c7b73c1c0ab577b728a1c79ab57" data-og-width="2840" width="2840" data-og-height="2160" height="2160" data-path="images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=3d94cfef51da895fecc12274c147fbb9 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b01150fee43820fa027e45b8fe1e629e 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=317bf76986e066a284540b72c6ce6db1 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ada9f41ad3961dde58ea8393172a8e80 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=54f679ac0bd2c0848682bb9a1bd59e9d 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/fea9a14c-1752606292-diamond-product-images_0004_01-enabling-personal.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7949f9ad67e04aa2ff2eb734441917c8 2500w" />
</Frame>

2. If this is your first time authenticating Graphite using the GitHub App, select the "Install GitHub App" button; otherwise, select the "Add organization" button.

3. Install the Graphite GitHub App using the pop-up window that appears, selecting your personal account's login.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b3e957118043903a50ad26ffe51e0dfb" data-og-width="780" width="780" data-og-height="910" height="910" data-path="images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=6e16b8923bbebb2bd15ba61a0fb15c2a 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=25a39d4b4ffd042177b331e43e79b11e 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f3c28c80f8d673e28d4659319006c617 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=1c3a8197b707cd63c8cc5ad283e4b33e 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b1c44e10dc81dfb913ced16048565d57 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/93c5fe56-1752606392-diamond-product-images_0004_02-installing-personal.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=36340374f27e21e8bffad5064428493b 2500w" />
</Frame>

4. After returning to the GitHub authentication settings page, click the "Join team" button next to your personal account's login.

After completing these steps, you can enable AI reviews on your personal account following the instructions for [Getting started with AI reviews](/ai-reviews-setup#getting-started-with-ai-reviews).

<Info>
  You can only enable AI reviews on personal repositories that you own.
</Info>

## Advanced configuration

While AI reviews work great out of the box, you can customize them to better fit your team's workflow and standards. Navigate to the **Rules & exclusions** tab on the [AI code review dashboard](https://app.graphite.com/ai-reviews) to configure these options, or see our [Customization](/ai-review-customization) page for details on:

* Setting up exclusions to prevent Graphite Agent from commenting on certain types of issues
* Creating custom rules that match your team's coding guidelines
* Excluding files from AI review analysis

The **Rules & exclusions** tab also shows metrics like acceptance rate and issues caught for each rule and exclusion, helping you track their effectiveness over time.
