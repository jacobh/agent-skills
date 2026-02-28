> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Graphite CLI V1 Command Names

> Discover Graphite CLI v1's revamped command names.

The Graphite CLI v1 release included a shift in the naming scheme for Graphite CLI commands. We removed the noun-verb model and shifted to a flat command naming scheme. For those of you who have been with us for a while and gotten used to the beta commands, we also introduced a **custom aliasing system** that allows you to use any command names you want. You can configure it by editing the `.graphite_aliases` file in your home directory.

**See the [Legacy alias preset](/legacy-alias-preset) subpage for a list of aliases that replicates the old command names.**

| Command name                     | Default alias | Old command name                    |
| -------------------------------- | ------------- | ----------------------------------- |
| `gt create`                      | `gt c`        | `gt branch create`                  |
| `gt modify`                      | `gt m`        | `gt commit amend`                   |
| `gt modify --commit`             | `gt m -c`     | `gt commit create`                  |
| `gt submit`                      | `gt s`        | `gt downstack submit`               |
| `gt submit --stack`              | `gt ss`       | `gt stack submit`                   |
| `gt sync`                        |               | `gt repo sync`                      |
| `gt checkout`                    | `gt co`       | `gt branch checkout`                |
| `gt log`                         | `gt l`        | `gt log`                            |
| `gt log short`                   | `gt ls`       | `gt log short`                      |
| `gt log long`                    | `gt ll`       | `gt log long`                       |
| `gt info`                        |               | `gt branch info`                    |
| `gt up`                          | `gt u`        | `gt branch up`                      |
| `gt down`                        | `gt d`        | `gt branch down`                    |
| `gt top`                         | `gt t`        | `gt branch top`                     |
| `gt bottom`                      | `gt b`        | `gt branch bottom`                  |
| `gt auth`                        |               | `gt auth`                           |
| `gt init`                        |               | `gt repo init`                      |
| `gt config`                      |               | `gt user <config>/gt repo <config>` |
| `gt move`                        |               | `gt upstack onto`                   |
| `gt reorder`                     |               | `gt downstack edit`                 |
| `gt rename`                      | `gt rn`       | `gt branch rename`                  |
| `gt delete`                      | `gt dl`       | `gt branch delete`                  |
| `gt pop`                         |               | `gt branch unbranch`                |
| `gt get`                         |               | `gt downstack get`                  |
| `gt fold`                        |               | `gt branch fold`                    |
| `gt split`                       | `gt sp`       | `gt branch split`                   |
| `gt squash`                      | `gt sq`       | `gt branch squash`                  |
| `gt restack`                     | `gt r`        | `gt <scope> restack`                |
| `gt modify --interactive-rebase` |               | `gt branch edit`                    |
| `gt track`                       | `gt tr`       | `gt stack/downstack track`          |
| `gt untrack`                     | `gt utr`      | `gt branch untrack`                 |
| `gt feedback`                    |               | `gt feedback`                       |
| `gt dash`                        |               | `gt dash`                           |
| `gt docs`                        |               | `gt docs`                           |
| `gt changelog`                   |               | `gt changelog`                      |
| `gt continue`                    | `gt cont`     | `gt continue`                       |
| `gt merge`                       | `gt mg`       | `gt downstack merge`                |
| `gt completion`                  |               | `gt completion`                     |
| `gt fish`                        |               | `gt fish`                           |
