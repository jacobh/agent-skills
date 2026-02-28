> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction To Trunk Based Development

> Learn more about trunk-based development's benefits, best practices, and comparison with Gitflow.

## What is trunk-based development?

Trunk-based development is a practice in which all developers work on a shared branch, called the `trunk` or `mainline` using a version control system of their choice. Instead of creating long-lived feature branches, developers make changes directly to the `main` branch, which is continuously integrated and tested.

## Continuous integration

Trunk-based development is a prerequisite for continuous integration (CI). Each time changes are pushed to the `trunk` branch (which often happens several times a day), a suite of automated tests run before and after the merge to determine whether or not the change introduces regressions.

**Every change to `trunk` triggers a build and a series of automated tests**. A change that breaks your `trunk` branch must be fixed immediately before making any other changes—this may sound time-consuming at first, but since tests are run at each step of the development process, bugs and regressions are encountered far less frequently in a team that practices CI.

## Gitflow vs. trunk-based development

Gitflow is a branching model that creates multiple long-lived branches for different stages of the development process (for example, feature branch, develop branch, release branch, and master branch). Different developers use different techniques to merge/commit between these branches, adding increased complexity to the system.

Additionally, Gitflow developers work on large, long-lived feature branches for collaboration. These feature branches are often maintained for days or even months, making the merge into the `main` branch a tedious and risky task. These feature branches are usually so large that "code freeze" periods are required to ensure that the `main` branch is still in a working state, since these merge events are more prone to introducing regressions and bugs.

In contrast, trunk-based development uses a single shared branch (`trunk`) where all developers work and continuously integrate their changes. The model is relatively simple and agile, operating under the assumption that the `trunk` branch is always stable to work off of and commit to. Small batches or "stacks" of branches are extremely short-lived, and changes are merged into `trunk` every couple of hours.

Here's a visual distinction between trunk-based development, and a Gitflow-style of development:

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e623efdf786fc7e8409556c281aa207e" data-og-width="2094" width="2094" data-og-height="888" height="888" data-path="images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e9aee35b5cd5eb25ddb5c69e0fd67661 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=6e49b8566435d328dfc3d4ca66c3afc9 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=445afdb8a310040e3f2b3c3d433bb631 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=05138021d0e55ede0a28b32d9fbe02c1 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=e66d64782d48ab78e5b15abb06996476 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/019eb4b3-1678122396-screenshot-2023-03-06-at-12-06-07-pm.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=14b0d3475aa7934fc3077362eaa361c4 2500w" />
</Frame>

*Image from [Google Cloud](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development)*

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=8a30c0422d60dcc66364f32405c1ad2c" data-og-width="2096" width="2096" data-og-height="1296" height="1296" data-path="images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=3ac5dc3d882886b02b2c5d5eadb653c2 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f903c3ec11d5551a8050a0b70fc9905c 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=9719d0a3d21848faddfca78036075ed1 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ca93b51f756e5e0305412cbf1e3d8ca4 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2f13b3f8fae4da83744562e00ca3cbc8 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f97b5ea1-1678122402-screenshot-2023-03-06-at-12-06-22-pm.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=b015360e5bb10f9d6a1b82485f967e4d 2500w" />
</Frame>

*Image from [Google Cloud](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development)*

## Benefits of trunk-based development

There are many benefits of trunk-based development, but these are the most notable ones:

* **Fast feature delivery**: In trunk-based development, changes are continuously integrated and tested (the `trunk` must always be green), so new features can be delivered faster than in a feature-branching model where features are developed in isolation and then integrated later.

* **"Green" collaboration:** Team members frequently update and sync their work with the `main` branch in trunk-based development. With this approach, peers integrate each other's changes on an hourly or minute-by-minute basis, ensuring the base they're working off of is never stale.

* **Granular code reviews:** Trunk-based development encourages smaller, "stacked" changes off of `trunk`, making code reviews more manageable and easier to complete. Additionally, since changes are continuously merged and tested, review feedback cycles tend to be much shorter.

## Getting started with trunk-based development

### Small, batched, or stacked changes

First and foremost, developers must understand how to break their changes up into small, dependent branches—those coming from a feature-branch oriented workflow may find this difficult at first.

### Speedy, frequent code review

The goal of trunk-based development is to merge changes as quickly as possible, while still keeping `trunk` error-free. For this to happen, batched/stacked changes should be reviewed as quickly as possible, so branches exist for less than a day. The longer a branch exists, the higher the chance of introducing bugs and merge conflicts when merging the changes into `trunk`. Breaking up changes into smaller, dependent branches allows developers to have their code reviewed and merged while simultaneously working on new changes.

### Limit the number of active branches and feature flags

Many teams have three or more active branches on a given repository—such as a develop branch, a release branch, several feature branches, and a `main` branch. In trunk-based development, it's **strongly recommended** to keep the number of active branches to a minimum.

Since a team's agility depends on the working status of the `trunk` branch, having multiple open branches makes repairing or reverting bad changes to `trunk` unnecessarily complicated. In situations where developers are inclined to create a feature or release branch as a gate or to develop risky features separately from the `main` branch, using **feature flags** is suggested. Feature flags wrap specific changes in an "inactive" code path and can be conditionally enabled/disabled—eliminating the need for creating another branch and instead introducing the changes directly into `trunk` in a non-destructive way.

### Fast automated test suite and build process

To achieve CI, each commit to a repository must undergo testing before, during, and after it merges into `trunk`, and subsequently trigger an automated build process. As a result, this automated test suite should consist of only short-running integration or unit or acceptance tests, and the automated build process should be quick and repeatable. Automated tests should be reliable (not flaky), and should assess the high-level functionality of the code system—and more comprehensive end-to-end tests can be run later on in development.

## See also

* [Trunk-based development overview](https://trunkbaseddevelopment.com/#)

* [Short-lived feature branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/)

* [Trunk-based development: deciding factors](https://trunkbaseddevelopment.com/deciding-factors/)

* [Google Cloud Architecture DevOps tech: Trunk-based development](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development)

* [Google Cloud Architecture DevOps tech: Continuous integration](https://cloud.google.com/architecture/devops/devops-tech-continuous-integration)

* [Atlassian: Trunk Based Development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development)
