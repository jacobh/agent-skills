> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Review comments

> Understanding Graphite Agent's feedback and how to get the most value from it

## How Graphite Agent provides feedback

When Graphite Agent identifies an issue in a pull request, it adds a comment directly on the relevant lines of code. Each comment includes:

1. A clear description of the problem
2. An explanation of why it matters
3. A concrete suggestion for how to fix it

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=edfecd70e73ffcf614d47e7d71789575" data-og-width="1920" width="1920" data-og-height="1080" height="1080" data-path="images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=aa256609b96cba52119fc2f20cec1d2c 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=52759b1714791cfeb828219ad97e06f6 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=1854017b46299e9aa933352d13523e7b 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=07b9e9ea347f0c02d110fde87130dc1b 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=0a7d597db2c9ac0e936f8d72a713035a 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8a0393b0-1742254644-diamond-product-images_0007_08-commit-suggestion.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=e6493f91e72786c285672740f7ac0ef8 2500w" />
</Frame>

You can see Graphite Agent's comments, suggestions, and choose to commit suggestions — just like your teammates'.

## Types of issues Graphite Agent identifies

Graphite Agent catches a wide range of issues that often slip through manual code review and testing:

### Logic bugs

Graphite Agent identifies when your implementation doesn't match the intended behavior, detecting issues like:

* Functions that don't accomplish what they're named to do
* Inconsistencies between code behavior and documentation
* Mismatches between API usage and implementation
* Off-by-one errors and incorrect loop boundaries

### Edge cases

Graphite Agent finds potential failure modes that aren't handled in your code:

* Missing null checks or error handling
* Race conditions in asynchronous code
* Memory leaks and resource management issues
* Unexpected side effects

### Security vulnerabilities

Graphite Agent spots security issues before they reach production:

* SQL injection vulnerabilities
* Cross-site scripting (XSS) opportunities
* Authorization bypass possibilities
* Insecure cryptographic practices

### Performance issues

Graphite Agent detects code that might cause performance problems:

* Inefficient algorithms or data structures
* Unnecessary API calls or database queries
* Memory-intensive operations that could be optimized
* N+1 query patterns

### Accidentally committed code

Graphite Agent catches code that was likely not meant to be committed:

* Debug statements and console logs
* Test data and development configurations
* Commented-out code blocks
* Temporary workarounds

## Tracking AI review impact

You can monitor AI review activity and impact from the [AI code review dashboard](https://app.graphite.com/ai-reviews). The dashboard is organized into tabs for easy navigation:

### Overview tab

The **Overview** tab provides time-series metrics to help you understand your AI reviewer's performance:

<Frame caption="The Overview tab shows issues found, acceptance rates, and category breakdown">
  <img src="https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=d7ab1bd1900d87b13d0f9b61af3db823" data-og-width="3394" width="3394" data-og-height="1810" height="1810" data-path="images/ai-reviews-2.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?w=280&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=0bf0c7ed3a3a29f3217ef84549bed7ff 280w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?w=560&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=2af2501ffd5cda6133bdee8629075eb4 560w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?w=840&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=e8b0ce12f004e51fd87117e2fca857ff 840w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?w=1100&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=37b4227eb3b58d3e031a52849370cd50 1100w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?w=1650&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=5c8bab6dc5f153ce18e8695f780c33ce 1650w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-2.png?w=2500&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=c29d2af66266e25dd8e55dd751d71d32 2500w" />
</Frame>

* **Issues found**: Total issues identified, with a breakdown by category
* **Issues accepted**: Number of issues that led to code changes
* **Acceptance rate**: Percentage of suggestions that were accepted over time
* **PRs reviewed**: Volume of pull requests analyzed
* **Downvote rate**: Feedback tracking to identify areas for improvement

You can filter these metrics by:

* **Time period**: Last 4 weeks, 8 weeks, 12 weeks, or all time
* **Repository**: View metrics for specific repositories or across all repos

The category breakdown shows counts and acceptance rates for each issue type (logic bugs, security issues, edge cases, etc.), helping you understand where your reviewer adds the most value.

### Comment feed tab

The **Comment feed** tab lets you:

* View all comments Graphite Agent has left across your repositories
* Filter by category to focus on specific types of issues
* See prevented bugs and their potential impact
* Review code snippets with inline explanations

<Frame caption="The Comment feed shows highlighted issues with code snippets and fix suggestions">
  <img src="https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=21146580cbd9cb0db774266c16adaf4d" data-og-width="3394" width="3394" data-og-height="1808" height="1808" data-path="images/ai-reviews-3.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?w=280&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=0e0db5a0d0ae6ded3fcfe8983ca4841c 280w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?w=560&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=f4e126bdaa65c31f28cfaff39d8d3a63 560w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?w=840&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=e905e8267d3092e3b2614a5f4144486d 840w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?w=1100&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=66485a487cb1c3d99bf33d1aeebfb991 1100w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?w=1650&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=3233e85a8a9a4ac4d88b6b4901715fa9 1650w, https://mintcdn.com/graphite-58cc94ce/5GxUKNqcuyEAkMh7/images/ai-reviews-3.png?w=2500&fit=max&auto=format&n=5GxUKNqcuyEAkMh7&q=85&s=e8abaf29cb819877f6ed9c89102c291b 2500w" />
</Frame>

### Rules & exclusions tab

The **Rules & exclusions** tab shows detailed analytics for your custom rules and exclusions. See [Measuring rule and exclusion effectiveness](/ai-review-customization#measuring-rule-and-exclusion-effectiveness) for more details.

## How to check AI review status

For any pull request, you can see the AI review status in the right-hand panel of the PR page:

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=40fe4eb00134716cb9666290cfb120b6" data-og-width="1920" width="1920" data-og-height="1080" height="1080" data-path="images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?w=280&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=2cca6aa3c14dfdb324ad6e655b663815 280w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?w=560&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c588c4b8c65b45fd9bec924802a0014b 560w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?w=840&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=c9b4f5410d587529b8e44d4ed51c32eb 840w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?w=1100&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=b10de1dec9bd2428554c09457154548c 1100w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?w=1650&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=35d0a62c2ccfbd6084d4e9233fc6abc7 1650w, https://mintcdn.com/graphite-58cc94ce/vY1t0Vsr-LRJgMIn/images/0a7546b2-1742254644-diamond-product-images_0006_07-pr-page.png?w=2500&fit=max&auto=format&n=vY1t0Vsr-LRJgMIn&q=85&s=722f1dc9c3fe40f8d76ed706bc5fd7bf 2500w" />
</Frame>

The status will show as:

* **Running**: Graphite Agent is currently analyzing the PR
* **Completed**: Graphite Agent has finished reviewing and left any relevant comments
* **Not running**: The PR won't be analyzed (e.g., if the PR exceeds 200,000 characters)
