> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Insights Stats Definitions

> Learn how the stats on Graphite insights are computed.

Graphite computes stats for each user as an author and as a reviewer. **Stats are computed on merged PRs only**.

## Methodology

**Active users:** For a user to be active in the selected time frame and repos they must have:

1. created a PR on GitHub to be considered active on GitHub **or**

2. created a stack of 2+ PRs on Graphite to be considered active on Graphite

**Rollups**: The graphed metrics are weekly rollups, where weeks start on Monday and end on Sunday. Rollups are medians-of-medians, where we first take each individual active user’s median value for the week, then take the median of those values.

**Calculating pre-Graphite median:** For each active Graphite user in the selected time frame, we look at the median of each user’s 28 days of usage on GitHub before they ever created a stack with Graphite (in the selected repos). Then take the median again across all users. The goal is to create a fair benchmark of performance before these users starting using Graphite

**Minimum 5+ active Graphite users:** We won’t attempt to draw comparisons between developers using Graphite or GitHub if there are fewer than 5 active Graphite users in the selected timeframe.

## Author stats

* **PRs merged:** Total number of PRs where the user was an author

* **Time waiting on reviews:** Median time of PRs authored by the user (that have open requests for reviews) were sitting without any reviews

* **Wait time to first review:** Median time of a PR being marked as *ready for review* for the first time, and someone reviewing it

* **Publish to merge time:** Median time between a PR being marked as *ready for review* for the first time, and it being merged

* **Review cycles until merge:**

  * Computes the max number of review cycles any reviewer had until the PR was merged

  * Then across all PRs, computes the median of this number

## Reviewer side stats

* **PRs reviewed:** Total number of PRs that the user left a review on

**Response time to review requests:** Median of the difference in time between the user being requested (or re-requested) for a review, (referred to as review request/review *pairs*) for the given user

## Insights example

Here's an example of a sequence of events and how that activity will impact Insights stats:

1. User X authors a PR in draft state that adds 10 lines of code, and deletes 5 lines of code

2. User X publishes the PR, making it ready for review

3. User X requests reviews from User A, User B, and User C

4. User A requests changes on the PR

5. User B leaves a review comment on the PR

6. User X makes updates, and re-requests reviews from User A and User B

7. User A leaves a review comment on the PR

8. User B leaves a review comment on the PR

9. User X makes updates, and re-requests review from User A

10. User A approves the PR

11. User X merges the PR

These events will affect each stats in the following ways:

* PRs merged will go up by 1 for User X

* PRs reviewed will go up by 1 for User A and User B (User C did not review, so no change there)

* Response time to review requests will be computed for each reviewer on each review request/review pair as (\*review time \*- *review request time*). This will then feed into the reviewer’s aggregated median statistic.

  * User A response time for first review request = *time at event #4* - *time at event #3*

  * User B response time for first review request = *time at event #5* - *time at event #3*

  * User A response time for second review request = *time at event #7* - *time at event #6*

  * User B response time for second review request = *time at event #8* - *time at event #6*

  * User A response time for third review request = *time at event #10* - *time at event #9*

* Time waiting on reviews will be computed based on how long the author was waiting on reviews for that PR. This then feeds into the author’s aggregated median statistic.

  * Time waiting on reviews on the PR above for User X as author = (*time at event #4* - *time at event #3*) + (*time at event #7* - *time at event #6*)

  * Note that we didn’t count the time between event #10 and event #9 here because there was a review from User B on the PR—so the author wasn’t waiting on reviews during this time period. In case User X re-requested review from both User A and User B in event #9, we would also add (*time at event #10* - *time at event #9*) into the computation above.

* Wait time to first review will be computed based on how long the author waited until anyone reviewed their PR after it was published/ready for review. This will then feed into the author’s aggregated median statistic.

  * Wait time until first review on above PR for User X as author = *time at event #4* - *time at event #2*

* Publish to merge time will be computed based on how long it took for the PR to be merged after it was published/ready for review. This will then feed into the author’s aggregated median statistic.

  * Publish to merge time on above PR for User X as author = *time at event #11* - *time at event #2*

* Review cycles until merge for a PR will be computed as the max number of review request/review pairs that a reviewer had until the PR was merged. This will then feed into the author’s aggregated median statistic.

  * Review cycles for User A as reviewer = \[(event #10, event #9), (event #7, event #6), (event #4, event #3)] (count = 3)

  * Review cycles for User B as reviewer = \[(event #8, event #6), (event #5, event #3)] (count = 2)

  * Max review cycles on above PR for User X as author = max(3, 2) ⇒ 3

* Lines of code added will go up by 10 for User X

* Lines of code deleted will go up by 5 for User X
