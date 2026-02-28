> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up merge queue integration

> To allow users to merge stacks via the Graphite UI, Graphite needs to know who to hand off PRs to for merging

| Merge mechanism          | Integration                                                                                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No merge queue           | You can skip this step. Users will be able to merge stacks directly through the Graphite UI without any additional setup.                                                                                                    |
| Non-Graphite merge queue | You need to set up the merge queue integration for each repo so that users can enqueue stacks from the Graphite UI. For instructions, refer to [External Merge Queue Integration (Beta)](/external-merge-queue-integration). |
| Graphite merge queue     | To learn about Graphite's stack-optimized merge queue, refer to [Merge queue](/graphite-merge-queue).                                                                                                                        |
