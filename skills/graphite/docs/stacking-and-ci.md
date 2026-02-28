> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CI Optimizations

> Learn CI optimizations & best practices for stacked pull requests.

Stacking leads to developers creating smaller easier-to-review pull requests, which can lead to more CI runs unless you optimize your CI for stacking. Organizations with fewer than 10 stackers are unlikely to see any difference in CI wait times or runs.

Additional CI runs occur when stacking PRs in part due to the additional PRs created, and due to behind-the-scenes rebasing to keep stacked branches up to date.

To solve this, Graphite offers an API endpoint for your CI workflows to query, allowing you to customize which PRs in stacks you want to run CI on.

## How CI Optimizations work

CI Optimizations is set up per-repository, and requires a very small amount of configuration, namely:

* How many PRs at the bottom of each stack should run CI?

* Should CI be run at the top of the stack?

In addition to this configuration, you'll add a step to your CI that calls the Graphite Buildkite/GitHub actions step. These CI steps are open-source, so you know exactly what is running in your CI pipeline. The details on adding these steps can be found below.

Each step is a wrapper script for a very simple API call that responds with a boolean: whether CI should be skipped. You don't need to worry about handling the API response manually or querying any additional data about the PR/stack from GitHub to decide whether to run CI – just add the step to the beginning of your configuration.

* If the request to our API is malformed or errors for any reason, we will not skip CI

* If CI Optimizations have been disabled, we will not skip CI

* If the PR is in a merge queue or merging as a stack with Graphite, we will not skip CI

## How to set up CI Optimizations

To begin setting up CI Optimizations, click the "Add new" button on its settings page on the Graphite dashboard.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=d03f4defc7b959bfdd0287a63693adc1" data-og-width="1358" width="1358" data-og-height="633" height="633" data-path="images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=0ed8d5e62d654b3f17f33b88f3a9e412 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=1a3b3ba6858c4ddc97793d207da8ad8a 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=3624cf6d0c0f93c9dae4e5e10bd59219 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=61e27cd39f91ac0a50d7d52b76fad1e5 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=48584ed9ed05ed6aea019ce412e0f821 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/4e66e804-1740619633-screenshot-2025-02-26-at-15-24-07.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=ccd3e45445df0d4c5f9af3c4f440cd4e 2500w" />
</Frame>

You'll see a panel as in the below screenshot, which will guide you through adding the step for your CI provider, and configuring when CI should run.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=00200f97c4e42bac75c550f0e89d8e8a" data-og-width="730" width="730" data-og-height="706" height="706" data-path="images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7477bde32e193ed4e4e1246e58cb1fbc 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=d91f93a128b5909e0d6cbddde7bbe170 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4e32b27dafdb0036ea5debdf6da7da8c 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e27b0c0a621d90e9d4c3f3801b239b54 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=c8075c51a63de3c0e2b96ad3cb2a5d3a 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/f197da27-1740624151-screenshot-2025-02-26-at-15-24-49.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f2b462e2a9f0275150d5bbb7a1b9e0ac 2500w" />
</Frame>

Once you're done, a card for your repository will appear on the settings page. You can edit the settings at any time.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4939608a8967bd4a2cb58a4fb7a7ee01" data-og-width="771" width="771" data-og-height="247" height="247" data-path="images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=cd7c7006c9c215a50db961def491a63e 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=ce5d40a3a7ab62f343c9a7f04907d0ec 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=8589a84753a91a30cfc4fcd241d90c6f 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=d0a06379df3aed29b7673bf242338e39 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=2bbce26253ccca3d6d7e1b1794eae562 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/efdb8a56-1740624315-screenshot-2025-02-26-at-15-25-11.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=7085558b8bd27e9d45f98988be88cc83 2500w" />
</Frame>

## Setting up the Buildkite step

There are two ways to configure Graphite to optimize your Buildkite pipelines:

### Option 1: Graphite *pipeline* runs first (recommended)

<Info>
  In this Buildkite configuration, you create a new **Graphite CI optimizer** pipeline that runs before your repo's other pipeline(s). It has the advantage of explicitly showing PR authors that some of their CI did not run when the optimizer skips CI.
</Info>

In Buildkite, create a new “Stack CI Optimizer” pipeline that runs before all other CI pipelines. This new pipeline determines if CI should run for this PR, and triggers the other pipeline(s) if so.

**Getting started**

1. [Create a new CI optimization in Graphite settings](https://app.graphite.com/settings/ci-optimizations) and copy the pipeline YAML

2. [In Buildkite](https://buildkite.com), create a new pipeline for the same repo you configured in the previous step

3. Paste the YAML copied from Graphite into the Buildkite pipeline configuration UI or into your repo's `.buildkite/` directory as a **new pipeline**. Remember to update the `trigger` step in the pasted YAML so the CI optimizer pipeline can call your own pipeline after it decides whether to optimize CI for your PR.

4. In **your own** pipeline settings under GitHub > GitHub Settings, check the box **Skip builds with existing commits**. This ensures the Graphite optimizer pipeline runs first and conditionally triggers your existing pipelines.

Note: you can test Buildkite pipeline changes in branches/PRs before merging them into your main trunk branch, so you can verify the optimizer is configured correctly before enabling it for your repo.

<Frame caption="">
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=be10531afe0bc618ab11a5b5abda6d96" data-og-width="1722" width="1722" data-og-height="478" height="478" data-path="images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=856fec656bf53eafb0d6f2f28520909c 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=93dc5149bdc5ae856eb6c5803aa6c434 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=da8f7a29c511e25772f9e209bb172607 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=3f42292daca4943014266f5b22fba984 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=4a899e798432296b3a64a067728e3894 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/b995bc95-1715363378-screenshot-2024-04-03-at-18-28-11.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=5af5817e8803502e5d3476c050e47fc4 2500w" />
</Frame>

### Option 2: Graphite *job* runs first

<Info>
  In this Buildkite configuration, you add a job to the start of your pipeline that your others wait for. It has the disadvantage of showing the overall pipeline status as green on GitHub, even when the CI optimizer decides to skip tests. The Buildkite and Graphite UIs show the accurate skip statuses.
</Info>

**Getting started**

1. [Create a new CI optimization in Graphite settings](https://app.graphite.com/settings/ci-optimizations) and copy the pipeline YAML

2. Add the following YAML to the beginning of your repo's pipeline(s), **including the `wait` step** (pipelines are typically stored in `.buildkite/`). Replace `graphite_token` with the token from the first step.

```yaml YAML theme={null}
steps:
  - name: ":graphite: Graphite CI optimizer"
    soft_fail: true
    plugins:
      withgraphite/graphite-ci#main:
        graphite_token: "xxxxxxxxxxxxxxxxxxxxxxx"


  - wait

  # the rest of your jobs in the pipeline
  - label: "Your first job to run after the optimizer"
    command: echo "hello"
```

*Note: You should *[*securely pass your token*](https://buildkite.com/pipelines/security/managing-secrets)* to the Graphite plugin instead of storing it in your pipeline configuration.*

## Setting up the GitHub Actions step

1. [Create a new CI optimization in Graphite settings](https://app.graphite.com/settings/ci-optimizations) and copy the pipeline YAML

2. Add the following to your GitHub Actions workflows (typically stored in `.github/workflows/)`. Replace `graphite_token` with the token from the first step.

```yaml YAML theme={null}
jobs:
  optimize_ci:
    runs-on: ubuntu-latest # or whichever runner you use for your CI
    outputs:
      skip: ${{ steps.check_skip.outputs.skip }}
    steps:
      - name: Optimize CI
        id: check_skip
        uses: withgraphite/graphite-ci-action@main
        with:
          graphite_token: ${{ secrets.GRAPHITE_CI_OPTIMIZER_TOKEN }}

  your_first_job:
    ...

  your_second_job:
    ...
```

Then **for each job** in the workflow you want to optimize, add the following YAML:

```yaml YAML theme={null}
job_name:
  needs: optimize_ci
  if: needs.optimize_ci.outputs.skip == 'false'
  ...
```

This ensures the optimized jobs only run when the CI optimizer gives them the signal.

## Error handling

Graphite's Buildkite and GitHub Actions integrations are configured to "fail open" so that outages and errors still result in your CI running.

## Other ways to optimize CI

### Breaking up CI

Google recommends breaking up your tests from one CI job into many which run at different points. One recommended split is:

* CI that runs on all PRs

* CI that runs on PRs, excluding upstack

* CI that runs after PRs merge to main

In GitHub actions, and other providers, you can do this by creating multiple workflows and setting different triggers for them.

### Dependencies and test caching

If your organization doesn’t already have one set up, a dependency management tool (such as [Bazel](https://bazel.build/) or [Buck](https://buck.build/)) can be really helpful. These tools look at what code changed, and determine which tests need to run as a result. This prevents unnecessary CI runs with stacking by skipping any tests that were unaffected.

In a similar vein, workflow orchestration tools with caching can create a similar effect. For example, [Turborepo](https://vercel.com/solutions/turborepo) caches CI results based on the hash of the project’s files. Unlike Bazel and Buck, all tests will still run, but if the input files were unchanged across a stack, the test will hit the cache and make the cost negligible.

### Required CI

If your organization has branch protection rules turned on for all base branches (instead of only trunk, for example), and you are not running CI on upstack PRs, you may see upstack PR as “missing required CI”. This is because the CI job that is required has not yet run on that PR (because it’s waiting for dependencies to be merged).

## Reducing CI runs with the Graphite Merge Queue

Lastly, the Graphite Merge Queue can help you save on CI cost when merging. The merge queue allows various configurations that help reduce the number of CI runs:

1. Batching: CI will run just once per `batch size` stacks, where `batch size` can be configured in our UI. This results in a saving of `batch size` \* `stack height` CI runs.

2. Parallel CI: Users can configure CI to run just once per stack, allowing users to save `stack height` CI runs.

This can be very useful for organizations that merge a lot of stacks.
