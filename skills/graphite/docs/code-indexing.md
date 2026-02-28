> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Code Indexing

> Graphite can index your code for short periods of time to improve performance of various features.

By default, Graphite doesn't store your code. Any time that you see your code on the Graphite web app, that code is coming from **GitHub**.

This approach comes with tradeoffs: our customers often see inconsistent performance or run into rate limits. In order to provide you with a faster and more reliable experience, Graphite offers an optional (but recommended) feature called "code indexing". When enabled, Graphite maintains an index of the files in each of your synced repositories, delivering dramatically faster response times, higher availability, and eliminating rate limits versus falling back to GitHub.

## Improvements

When enabled, the code index is used to improve the following:

* [Graphite Chat](/graphite-chat): Tool call results are returned faster, more consistently, and without rate limits.
* [AI Reviews](/ai-reviews): Reviews can reference related files in the codebase to improve review quality. *(coming soon)*
* [Merge Queue](/graphite-merge-queue): Substantial improvement in the speed of merge operations. *(coming soon)*
* [PR Review Page](/pr-page-overview): File diff views load faster and are resilient to third-party networking issues.

We intend to leverage the index to improve more parts of the Graphite platform as well!

## Enabling and Disabling

[Graphite admins](/graphite-admin) can toggle code indexing at any time from the [settings](https://app.graphite.com/settings/code-indexing).

When you **enable** the Graphite code index:

* Graphite begins to index your repositories and PRs as they are updated.

When you **disable** the Graphite code index:

* Graphite stops indexing your repositories and PRs.
* All Graphite features stop using the index.
* All code stored in the index is deleted within 30 days.

## Privacy Considerations

To understand more about the security and privacy implications of using the Graphite code index, please see [our dedicated page](/code-indexing-security).
