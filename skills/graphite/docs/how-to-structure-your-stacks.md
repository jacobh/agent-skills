> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How To Structure A Stack

> Five helpful frameworks for breaking up large changes into stacked PRs.

[Stacking](https://www.stacking.dev/) helps you break up large changes into small, independent PRs that can be easily reviewed and merged, but how do you actually split up a feature and start "thinking in stacks" as you build? Learning how to architect your stacks effectively will both help you derive the largest efficiency gains from the workflow and perhaps even give you a better way of thinking about building large features. This doc outlines 5 classic frameworks for structuring stacks of PRs - we use nearly all of them here at Graphite and we encourage you to add them all to your toolbox as you get comfortable with stacking!

## Before you start stacking

Before you start doing any stacking, consider your repository’s architecture. How is your code structured? What are the different functional components of your codebase?

For example, a common layout for simple web apps might be to split the code into a[layered architecture](https://en.wikipedia.org/wiki/Multitier_architecture), i.e. a database layer, a backend service, and a frontend service.

Once you note the different functional components your codebase is comprised of, think about how those components interact - there will typically be some sort of dependency graph. In the simple layered architecture, you'd need to first add support for a new feature to the database and backend layers before adding it to the frontend.

Remember that each PR in a stack should be easy to understand and review independently - having a good understanding of the architecture of your codebase will help you follow this principle in your stacks.

With that in mind, here are five helpful frameworks for splitting large code changes up into stacks.

## Functional component stacks

The most straightforward way to structure a stack is to have each branch/PR in the stack contain one major component of the feature you're building.

For example, if you're building a full-stack feature, you could create the following stack:

1. PR for database/model changes

2. PR for changes to the backend

3. PR for front-end changes using the backend changes

4. PR for integration tests for the change as a whole

By splitting the change up into functional components like this, your reviewers can focus their attention on just one part of the change at a time. Additionally, this framework lets you tag different reviewers for each part of the change, so reviewers with expertise in a certain subsystem can just focus on that part of the review.

## Iterative improvement stacks

Another framework we use frequently here at Graphite is a stack where each PR improves on the preceding changes iteratively. In this model, as soon as you have a change large enough to be reviewable, you create a PR and put it up for review. While waiting for that change to be reviewed, you can continue to make improvements on top of your first PR, forming the next PR in the stack. Continue this process until the feature you're building is ready to ship.

A common pattern in this model is to address non-blocking review feedback by adding a new PR with the changes to the top of the stack. These feedback-driven PRs make it easy for your reviewer to confirm that their feedback was addressed appropriately.

Here's what this kind of stack might look like:

1. PR for the initial feature

2. PR for an iterative improvement

3. PR for an iterative improvement

4. PR addressing review feedback on the initial feature PR

One failure mode to watch out for with this structure of stack is waiting too long before merging any of the PRs. Until a PR is merged, there is a risk that a colleague could introduce conflicting changes that require your PR to be reworked. Additionally you don’t need the full stack to be complete to start merging it - you can merge a set of PRs at the base of the stack as soon as they're ready, and then continue to work on the top of the stack.

## Refactor/change stacks

When fixing bugs, you'll often need to refactor the code around where the bug lives. Instead of fixing and refactoring at the same time, stacking lets you first refactor the code and then stack the actual bug fix on top of the refactor as a separate PR.

Here's what a refactor/change stack looks like:

1. PR for the refactor

2. PR for the bug fix

By making this separation, it makes it very explicit to reviewers what part of the changes are refactoring and what part of the changes are the actual bug fix.

## Version bumps/generated code stacks

Another common software development task is updating library versions or generating code. These types of updates are usually not particularly interesting or risky, but they create noise in code review that can distract reviewers and make it more difficult to determine the more meaningful parts of the change.

In practice, version bump/code gen stacks look very similar to refactor/change stacks:

1. PR for the version bump or code generation

2. PR for anything that uses the updates

By separating out these types of changes into their own PR and then stacking the changes that use the updates in another PR on the stack, reviewers will have a much easier time understanding what part of the code is just boilerplate and what part of the code has the more meaningful changes.

## Riskiness stacks

Finally, you can use stacks to isolate risky parts of a change. Ideally, if you need to revert a change, you want to revert the smallest amount of code possible to minimize the revert's impact on unrelated code or features. If you worry that some of the changes you are making are riskier than others, you can pull the risky parts of the change into their own PRs, but still keep them part of the stack they belong to.

Here's what this might look like:

1. PR for low-risk changes

2. PR for a high-risk change

3. PR for another high-risk change

This way, if either of the high-risk PRs cause issues, you can easily them while still keeping the code that landed in the low-risk PR in production.

## When to split up your changes

These five frameworks are helpful ways of thinking about splitting up larger changes into a stack. One last practical question is *when* you should perform these splits: as you write your code or at the end once you've finished your change? The short answer is that you can do either - it's largely a matter of personal preference. Both the Graphite [CLI](/cli-overview) and [VS Code extension](/vs-code-extension) support stacking new PRs on top of existing changes as the default workflow. If you prefer to write all of your code changes and then split them into stacks, you can do this easily with [gt split](/squash-fold-split#split-a-branch-into-multiple-branches).

By incorporating these five frameworks into your development practice, you can make the most of stacked PRs and streamline your development cycle.
