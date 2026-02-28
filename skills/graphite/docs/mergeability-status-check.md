> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Mergeability Status Check

> Prevent accidental mid-stack merges.

### Mergeability status check on GitHub

To help prevent accidental mid-stack merges, Graphite creates an optional status check on GitHub for upstack PRs. This status check appears as "in progress" for all upstack PRs, and passes for all base PRs.

<Frame>
  <img src="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=27642ae19c6d5c965d23e134ceb7f8de" data-og-width="1640" width="1640" data-og-height="70" height="70" data-path="images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?w=280&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=003a082a1871d7d5846b429b18e69fc1 280w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?w=560&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=122b703080d5dc0b4880da30e95cec86 560w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?w=840&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=9608298d4e114ea2c41fa001e86f96e7 840w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?w=1100&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=37b7d175cac513abe4f721db73956e9c 1100w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?w=1650&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=f137fe58a8cf6646db8c432834aed052 1650w, https://mintcdn.com/graphite-58cc94ce/v5snjlX4njZhFyeg/images/8d80d3f4-1738275171-screenshot-2025-01-30-at-17-02-27.png?w=2500&fit=max&auto=format&n=v5snjlX4njZhFyeg&q=85&s=138dfc57dad42157ef3083c5f29ac994 2500w" />
</Frame>

Since it's an optional check, you can still merge mid-stack if needed.

To configure this status check for your GitHub org:

* Open the Graphite web app's settings page

* Select the "Mergeability checks" page

* Edit the `Mergeability check on GitHub` setting
