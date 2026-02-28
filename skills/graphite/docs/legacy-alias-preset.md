> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Legacy CLI Command Alias Preset

> Copy legacy aliases to retain old command names & avoid deprecation warnings in Graphite CLI.

Copy the following into your `gt aliases` configuration to replicate the legacy command names. This will remove deprecation warnings when the old names are used.

```md .md theme={null}
# Edit this file to configure aliases for Graphite commands.
# If you delete this file, it will be recreated with the default aliases.
# The first word of each line is the alias, and the rest is the command.
# Lines starting with # are ignored.


# The aliases for ss, ls, and ll are defined by default and must be overridden to be disabled.
# They are shown below to demonstrate the formatting.


ls log short
ll log long
ss submit --stack


# GRAPHITE LEGACY PRESET
# SOURCE: https://graphite.com/docs/legacy-alias-preset


bc create
ca modify
cc modify --commit
dss submit
bs submit
uss submit --stack
rs repo sync
bco checkout
bi info
bu up
bd down
bt top
bb bottom
ri init
uso move --onto
dse reorder
brn rename
bdl delete
dsg get
bf fold
bsp split
bsq squash
br restack --only
usr restack --upstack
dsr restack --downstack
sr restack
be modify --interactive-rebase
btr track
but untrack
dsm merge
```
